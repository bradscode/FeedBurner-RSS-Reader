/* Overriding the "Ext.data.proxy.Server" class to solve
 * a small bug inside the "getUrl" method. */
Ext.define('Ext.data.proxy.ServerFix',{
    override: 'Ext.data.proxy.Server',
    getUrl: function(request){
        return request ? request.getUrl() || this.getApi()[request.getAction()] || this._url : this._url;
    }
});