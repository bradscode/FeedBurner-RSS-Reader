Ext.define('RSS.view.New', {
    extend: 'Ext.form.Panel',
    alias: 'widget.newfeed',
    config: {
	    items: [
            {
		        xtype: 'toolbar',
		        itemId: 'tbrFeedConfig',
		        docked: 'top',
		        items: [
		            {
			            text: 'Feeds',
			            action: 'showfeeds',
			            ui: 'back',
			            navigation: true
		            }
		        ]
	        },
	        {
		        xtype: 'fieldset',
		        title: 'Feed',
		        instructions: 'The feed url will be updated automatically with the feed burner fase url (feed://feeds.feedburner.com/) so please enter only its name.',
		        items: [
		            {
			            xtype: 'textfield',
			            label: 'Name',
			            name: 'name'
		            },
		            {
			            xtype: 'textfield',
			            label: 'Url',
			            name: 'url'
		            }
		        ]
	        },
	        {
                xtype: 'button',
                action: 'savefeed',
                ui: 'action',
                text: 'Save',
                height: 50
            },
            {
	            xtype: 'container',
	            height: 10
            },
            {
                xtype: 'button',
                action: 'deletefeed',
                ui: 'decline',
                text: 'Delete',
                hidden: true,
                height: 50
            }
	    ]
    }	
});