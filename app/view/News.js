Ext.define('RSS.view.News', {
    extend: 'Ext.Container',
    alias: 'widget.news',
    config: {
	    cls: 'rss-news',
        styleHtmlContent: true,
        scrollable: 'vertical',
        tpl: [
            '<h2>{title}</h2>',
            '<p>{content}</p>'
        ]
    }
});