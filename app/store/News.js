Ext.define('RSS.store.News', {
    extend: 'Ext.data.Store',
    requires: ['RSS.tux.data.proxy.FeedBurner'],
    config: {
	    model: 'RSS.model.News',
	    proxy: {
            type: 'feedburner',
            url: '',
            reader: {
                type: 'json',
                rootProperty: 'responseData.feed.entries'
			}
	    }
    }	
});