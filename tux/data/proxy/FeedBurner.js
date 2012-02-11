Ext.define('RSS.tux.data.proxy.FeedBurner', {
	
    extend: 'Ext.data.proxy.JsonP',

    xtype: 'feedburner',
    
    autoAppendParams: false,

    baseUrl: 'https://ajax.googleapis.com/ajax/services/feed/load',

    feedBurnerUrl: 'http://feeds.feedburner.com/',

    buildRequest: function(operation) {
	
        var request    = this.callParent(arguments),
            params     = request.getParams();

        Ext.applyIf(params, {
            v: '1.0',
            num: 100,
            q: this.feedBurnerUrl + request.getUrl()
        });

        request.setParams(params);
        request.setUrl(Ext.urlAppend(this.baseUrl, Ext.urlEncode(params)));

        console.log(request.getUrl());

        return request;
    }
});