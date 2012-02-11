Ext.define('RSS.model.News', {
    extend: 'Ext.data.Model',
    config: {
	    idProperty: 'titleRewrite',
	    fields: [
	        { name: 'author',         type: 'string' },
	        { name: 'publishedDate',  type: 'date'   },
            { name: 'title',          type: 'string' },
            { name: 'link',           type: 'string' },
            { name: 'content',        type: 'string' },
            { name: 'contentSnippet', type: 'string' },
            { name: 'titleRewrite',   type: 'string' ,    convert: function(v, record){
		        return url.rewrite(record.get('title'));
	        }},
	        { name: 'friendlyDate',   type: 'string' ,    convert: function(v, record){
		            
		        var date = record.get('publishedDate'),
		            pf = date.getHours() > 12 ? 'PM' : 'AM';
		
		        return Ext.Date.dayNames[date.getDay()] +  ' ' + 
		               Ext.Date.format(date, 'Y/m/d') + ', ' + 
		               Ext.Date.format(date, 'h:i') + pf;

	        }}
	    ]
    }
});