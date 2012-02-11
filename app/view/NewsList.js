Ext.define('RSS.view.NewsList', {
    extend: 'Ext.List',
    alias: 'widget.newslist',
    config: {
	    cls: 'rss-news-list',
	    store: 'News',
	    itemTpl: [
	        '<h1>{title}</h1>',
	        '<p class="content">{contentSnippet}</p>',
	        '<span class="author">{author}</span>',
	        '<span class="date">{friendlyDate}</span>',
	    ],
	    items: [
	        {
		        xtype: 'toolbar',
		        docked: 'top',
		        title: 'News',
		        items: [
		            {
			            text: 'Feeds',
			            action: 'showfeeds',
			            ui: 'back',
			            navigation: true
		            }
		        ]
	        }
	    ]
    }	
});