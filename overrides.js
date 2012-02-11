Ext.define('Ext.data.proxy.ServerFix',{
    override: 'Ext.data.proxy.Server',
    getUrl: function(request){
	    return request ? request.getUrl() || this.getApi()[request.getAction()] || this._url : this._url;
    }	
});