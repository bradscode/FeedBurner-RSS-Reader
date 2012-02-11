Ext.define('RSS.view.NewsContainer', {
    extend: 'Ext.Container',
    alias: 'widget.newscontainer',
    requires: [
	    'RSS.tux.fx.animation.TimeMachine', 
	    'RSS.tux.fx.layout.card.TimeMachine'
	],
    config: {
	    layout: {
		    type: 'card',
		    animation: {
			    type: 'timemachine',
			    direction: 'future',
			    duration: 1000
		    }
	    },
	    items: [
	        {
		        xtype: 'toolbar',
		        docked: 'top',
		        items: [
		            {
			            text: 'News',
			            action: 'shownews',
			            ui: 'back',
			            navigation: true
		            },
		            {
			            text: 'Open News',
			            action: 'readmore'
		            },
		            {
			            xtype: 'spacer'
		            },
		            {
			            action: 'prevnews',
			            direction: 'past',
			            ui: 'plain',
			            iconMask: true,
			            iconCls: 'arrow_left'
		            },
		            {
			            action: 'nextnews',
			            direction: 'future',
			            ui: 'plain',
			            iconMask: true,
			            iconCls: 'arrow_right'
		            }
		        ]
	        }
	    ]
    }	
});