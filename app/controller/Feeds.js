Ext.define('RSS.controller.Feeds', {
    extend: 'Ext.app.Controller',
    views: [
	    'Feeds',
	    'NewsList',
	    'NewsContainer',
	    'News',
	    'New'
	],
    config: {
	    routes: {
		    '': 'showFeeds',
		    'feeds.html': 'showFeeds',
		    'feeds/add.html': 'showFeedConfig',    
		    'feeds/:feed.html': 'showFeedNews',
		    'feeds/:feed/edit.html': 'editFeed',
		    'feeds/:feed/:news.html': 'readNews'
	    },
	    refs: {
		    feedList: {
			    xtype: 'feedlist',
		        selector: 'feedlist',
		        autoCreate: true
		    },
		    newFeedView: {
			    xtype: 'newfeed',
		        selector: 'newfeed',
		        autoCreate: true
		    },
		    newsList: {
			    xtype: 'newslist',
		        selector: 'newslist',
		        autoCreate: true
		    },
		    newsContainer: {
			    xtype: 'newscontainer',
		        selector: 'newscontainer',
		        autoCreate: true
		    },
		    toolbarFeedConfig: '#tbrFeedConfig',
		    saveFeedBtn: 'button[action=savefeed]',
		    deleteFeedBtn: 'button[action=deletefeed]',
		    prevNewsButton: 'button[action=prevnews]',
		    nextNewsButton: 'button[action=nextnews]'
	    },
	    control: {
		    'button[navigation=true]': {
			    tap: 'changeViewportAnimation'
		    },
		    'dataview': {
			    itemtap: 'changeViewportAnimation'
		    },
		    'button[action=addfeed]': {
			    tap: 'rtAddFeed'
		    },
		    'button[action=showfeeds]': {
			    tap: 'rtShowFeeds'
		    },
		    'button[action=shownews]': {
			    tap: 'rtShowNews'
		    },
		    'button[action=readmore]': {
			    tap: 'onReadMore'
		    },
		    feedsBtn: {
			    tap: 'rtShowFeeds'
		    },
		    saveFeedBtn: {
			    tap: 'saveFeed'
		    },
		    deleteFeedBtn: {
			    tap: 'deleteFeed'
		    },
		    prevNewsButton: {
			    tap: 'moveToNews'
		    },
		    nextNewsButton: {
			    tap: 'moveToNews'
		    },
		    feedList: {
			    itemtap: 'rtViewFeed',
			    feededit: 'rtEditFeed'
		    },
		    newslist: {
			    itemtap: 'rtReadNews'
		    },
		    newsContainer: {
			    activeitemchange: 'onCardChange'
		    }
	    }
    },
    
    newsIndex: 0,

    init: function() {

        Ext.Viewport.on('activeitemchange', this.onCardChange, this);

	},
	
	onCardChange: function(view, newCard, oldCard){
    
        if(oldCard){
            oldCard.on('hide', oldCard.destroy);
        }

    },

    changeViewportAnimation: function(component){

	    if(component instanceof Ext.Button){
		    this.doChangeViewportAnimation(component.config.ui === 'back' ? true : false);
	    }else{
		    this.doChangeViewportAnimation(false);
	    }
    },

    doChangeViewportAnimation: function(reverse){
	
	    Ext.Viewport.getLayout().setAnimation({
		    type: 'slide',
		    reverse: reverse
	    });
	
    },

    showFeeds: function(){
	   
	    Ext.Viewport.setActiveItem(this.getFeedList());    
	
    },
    showFeedConfig: function(){
	
	    Ext.Viewport.setActiveItem(this.getNewFeedView());
	    this.getToolbarFeedConfig().setTitle('Add Feed');
	
    },
    rtAddFeed: function(){
	
	    //Routed to "showFeedConfig" function
	    url.browseTo('#feeds/add.html');
	
    },
    rtShowFeeds: function(){
	
	    //Routed to "showFeeds" function
	    url.browseTo('#feeds.html');
	
    },
    rtShowNews: function(){
	
	    //Going back with the Url Path
	    url.up();
	
    },
    editFeed: function(feed){
	
	    var me = this,
	        record = Ext.getStore('Feeds').findRecord('nameRewrite', feed);
	    
	    if(record){
	        me.showFeedConfig();
	        me.getToolbarFeedConfig().setTitle(record.get('name'));
	        me.getDeleteFeedBtn().show();
	        me.getNewFeedView().setRecord(record);
	    }else{
		
		    Ext.Msg.alert('Feed not found', 'The feed requested has not been found!');
		    me.rtShowFeeds();
	    }
	
    },
    readNews: function(feed, news){
	
	    if(!this.disableRouting){
	
	    	var me = this,
		        feedRecord = Ext.getStore('Feeds').findRecord('nameRewrite', feed);
		        newsIndex = Ext.getStore('News').find('titleRewrite', news);
	
		    if(feedRecord){
		
	            if(newsIndex >= 0){
	
		            me.doReadNews(newsIndex);
	
	            }else{
	
		            if(Ext.getStore('News').getCount() == 0){
		
			            me.showFeedNews(feed, Ext.bind(me.readNews, me, [feed, news]), false);
			
		
			        }else{
			
		            	Ext.Msg.alert('News not found', 'The News requested has not been found!');
					    me.rtShowFeeds();
			
				    }
	
	            }

			}else{
			
				Ext.Msg.alert('Feed not found', 'The feed requested has not been found!');
			    me.rtShowFeeds();
			
			}
			
		}
		
		this.disableRouting = false;
	
    },
    showFeedNews: function(feed, callback, showView){
	
	    var store = Ext.getStore('News'),
	        record = Ext.getStore('Feeds').findRecord('nameRewrite', feed),
	        proxy = store.getProxy(),
	        oldUrl = proxy.getUrl(),
	        newUrl = record.get('url'),
	        showView = Ext.isDefined(showView) ? showView : true;

	    if(record){

		    if(newUrl !== oldUrl){
			
			    store.removeAll();
			
		        proxy.setUrl(newUrl);

		    	store.load({
				    callback: callback ? callback : Ext.emtpyFn,
				    scope: this
			    });
			
			}
			
			if(showView){
		        Ext.Viewport.setActiveItem(this.getNewsList());
		    }
		    
		}
	
    },
    saveFeed: function(){
	
        var store = Ext.getStore('Feeds'),
            record = this.getNewFeedView().getRecord(),
            feed = Ext.create('RSS.model.Feed', this.getNewFeedView().getValues());
	    
		if(record !== null){
			store.remove(record);
		}  
		
		store.add(feed);
	
	    this.rtShowFeeds();
	
    },
    deleteFeed: function(){

	   Ext.Msg.confirm('Delete Feed', 'Are you sure you want to delete this feed?', function(btn){

		    if(btn == 'yes'){
			
		        Ext.getStore('Feeds').remove(this.getNewFeedView().getRecord());
		
		        this.rtShowFeeds();
		
		    }
		
	    }, this);
	
    },
    rtEditFeed: function(list, item, record){
	    
	    var name = record.get('nameRewrite');

	    //Routed to "showFeedNews" function
	    url.browseTo(Ext.String.format('#feeds/{0}/edit.html', name));
	    
    },
    rtViewFeed: function(list, index){
	
	    var name = list.getStore().getAt(index).get('nameRewrite');
	
	    //Routed to "showFeedNews" function
	    url.browseTo(Ext.String.format('#feeds/{0}.html', name));
	    
    },
    rtReadNews: function(list, index){
	
	    var feed = url.getPath(1),
	        news = list.getStore().getAt(index).getId();

	    //Routed to "readNews" function
	    url.browseTo(Ext.String.format('#feeds/{0}/{1}.html', feed, news));
	    
    },

    moveToNews: function(btn){
	
        var direction = btn.config.direction,
            index = direction === 'past' ? --this.newsIndex : ++this.newsIndex;
  
        this.doReadNews(index, direction);
	
    },

    doReadNews: function(index, direction){

        var me = this,
            newsContainer = me.getNewsContainer(),
            store = Ext.getStore('News'),
            news = store.getAt(index);

        direction = Ext.isDefined(direction) ? direction : me.newsIndex > index ? 'future' : 'past';
        
        if(Ext.isDefined(me.newsIndex)){

            newsContainer.getLayout().setAnimation({
                type: 'timemachine',
                direction: direction,
                duration: 1000
            });
    
        }else{
            newsContainer.getLayout().setAnimation(null);
        }
        
        Ext.Viewport.setActiveItem(newsContainer);

        newsContainer.setActiveItem(me.getNewsView(news));

        me.newsIndex = index;
        
        me.getPrevNewsButton().setHidden(me.newsIndex == 0);

        me.getNextNewsButton().setHidden(me.newsIndex == store.getCount() - 1);

        me.disableRouting = true;

        url.browseTo(Ext.String.format('{0}/{1}.html', url.getPrevPath(), news.getId()));

    },

    getNewsView: function(news){
        
        var newsView = Ext.widget('news', {
            data: news.getData()
        });

        return newsView;

    },

    onReadMore: function(){
	
	    Ext.Msg.confirm('Redirect', 'You are going to be redirected to an external Url.<br/>Do you want to continue?', function(btn){

			if(btn == 'yes'){

		        window.open(Ext.getStore('News').getAt(this.newsIndex).get('link'));

		    }

	    }, this);
	
    }

});