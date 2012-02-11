Ext.define('RSS.view.Feeds', {
    extend: 'Ext.dataview.DataView',
    alias: 'widget.feedlist',
    requires: [
	    'RSS.tux.dataview.FeedListItem'
	],
    config: {
	    cls: 'rss-feed-list',
	    store: 'Feeds',
	    useComponents: true,
		defaultType: 'feedlistitem',
	    items: [
	        {
		        xtype: 'toolbar',
		        docked: 'top',
		        title: 'Feeds',
		        items: [
		            {
			            text: 'New',
			            action: 'addfeed'
		            }
		        ]
	        }
	    ]
    }	
});