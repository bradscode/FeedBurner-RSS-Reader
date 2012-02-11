Ext.define('RSS.store.Feeds', {
    extend: 'Ext.data.Store',
    config: {
	    model: 'RSS.model.Feed',
	    autoLoad: true,
	    autoSync: true,
	    reader: {
		    type: 'json'
	    }
    }	
});