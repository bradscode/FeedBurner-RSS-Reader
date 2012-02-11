Ext.define('RSS.model.Feed', {
    extend: 'Ext.data.Model',
    config: {
	    fields: [
	        { name: 'name',           type: 'string' },
	        { name: 'url',            type: 'string' },
	        { name: 'nameRewrite',    type: 'string' ,    convert: function(v, record){
		        return url.rewrite(record.get('name'));
	        }},
	    ],
	    proxy: {
		    type: 'localstorage',
		    id: 'feeds'
	    }
    }
});