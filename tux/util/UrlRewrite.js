Ext.define('RSS.tux.util.UrlRewrite',{
    
    singleton: true,
    
    alternateClassName: 'url',
    
    rewrite: function(url){
	
	    return url = url.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase();
	
    },

    browseTo: function(url){
	
	    window.location.hash = url;
	
	},

    getPath: function(index){
	
	    return window.location.hash.replace('#','').split('/')[index].replace('.html', '');

    },

    getPrevPath: function(){
	
	    var url = window.location.hash,
	        lastIndex = url.lastIndexOf('/');
	
	    return url.substr(0, lastIndex);
	
    },

    up: function(){
	
	    window.location.hash = this.getPrevPath() + '.html';
	
    }
	
});