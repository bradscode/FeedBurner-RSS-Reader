Ext.Loader.setConfig({
    enabled: true,
    paths: {
	    'RSS.tux': 'tux'
    }
});

Ext.ClassManager.setAlias('RSS.tux.data.proxy.FeedBurner', 'proxy.feedburner');

Ext.application({
	
	name: 'RSS',
	
	requires: [
	    'RSS.tux.util.UrlRewrite'
	],

	controllers: [
	    'Feeds'
	],
	
	models: [
	    'Feed',
	    'News'
	],
	
	stores: [
	    'Feeds',
	    'News'
	],
	
	viewport: {
	    layout: {
		    type: 'card',
		    animation: {
			    type: 'slide'
		    }
		}	
	},
	
	launch: function(){}
	
});