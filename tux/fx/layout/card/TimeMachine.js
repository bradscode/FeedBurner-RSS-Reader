/**
 * @private
 */
Ext.define('RSS.tux.fx.layout.card.TimeMachine', {
    extend: 'Ext.fx.layout.card.Style',
    alias: 'fx.layout.card.timemachine',
    config: {
        inAnimation: {
            type: 'timemachine',
            easing: 'ease-out'
        },
        outAnimation: {
            type: 'timemachine',
            easing: 'ease-out',
            out: true
        }
    }
});