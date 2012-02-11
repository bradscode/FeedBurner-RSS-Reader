Ext.define('RSS.tux.dataview.FeedListItem', {
    extend: 'Ext.dataview.component.DataItem',
    requires: ['Ext.Button'],
    xtype: 'feedlistitem',

    config: {
	    
	    cls: 'feed-list-item',
	
	    dataMap: {
            getName: {
                setHtml: 'name'
            }
        },
	
	    name: {
            cls: 'x-name',
            flex: 1
        },
	
        editButton: {
	        text: 'Edit',
	        width: 20
        },

        layout: {
            type: 'hbox',
            align: 'stretch'
        }
    },

    applyName: function(config) {
        return Ext.factory(config, Ext.Component, this.getName());
    },

    updateName: function(newName, oldName) {
        if (newName) {
            this.add(newName);
        }

        if (oldName) {
            this.remove(oldName);
        }
    },

    applyEditButton: function(config) {
        
        return Ext.widget('button', {
            width: 50,
            ui: 'plain',
            iconMask: true,
            iconCls: 'compose',
            navigation: true
        });

    },

    updateEditButton: function(newEditButton, oldEditButton) {
	
        if (oldEditButton) {
            this.remove(oldEditButton);
        }

        if (newEditButton) {
	        newEditButton.on('tap', this.onItemEdit, this);
            this.add(newEditButton);

        }

    },

    onItemEdit: function(btn, e){
	
	    var dataview = this.config.dataview,
	        record = this.getRecord();

        dataview.fireEvent('feededit', dataview, this, record);

        //Prevent the item tap event
        e.stopPropagation();
	
    }

});
