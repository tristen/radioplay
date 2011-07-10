var m, o;
var stationOverlay = function (item) {
    $('<a></a>').addClass('station-point ' + item.station).appendTo('#canada').click(function () {
        $('.station-point').removeClass('active');
        var content = '<h2>' + item.station + '</h2>'
                    + '<span>Songs Tracked: ' + item.count + '</span>'
                    + '<h3> Where </h3>'
                    + item.location
                    + '<ul>'
                    + '<li>Canada: ' + item.cdn_play + '</li>'
                    + '<li>USA: ' + item.us_play + '</li>'
                    + '<li>United Kingdom: ' + item.uk_play + '</li>'
                    + '<li>International: ' + item.int_play + '</li>'
                    + '</ul>';
        $('#station').html(content);
        $('#station').show();
        $(this).addClass('active');
        o.setProvider(new com.modestmaps.WaxProvider({
            baseUrl: 'http://a.tiles.mapbox.com/tristen/',
            layerName: item.station,
            filetype: '.png',
            zoomRange: [4, 8]
        }));
    });
};

var mapSetup = function () {
        var mm = com.modestmaps;

        m = new mm.Map('map', new com.modestmaps.WaxProvider({
            baseUrl: 'http://a.tiles.mapbox.com/tristen/',
            layerName: 'base-layer',
            zoomRange: [4, 8]
        }));
        m.setCenterZoom(
        new com.modestmaps.Location(50, -80), 4);

        o = new mm.Map('map-overlay', new com.modestmaps.WaxProvider({
            baseUrl: 'http://a.tiles.mapbox.com/tristen/',
            layerName: 'cfbx',
            zoomRange: [4, 8]
        })).zoomer().interaction();
        o.setCenterZoom(
        new com.modestmaps.Location(50, -80), 4);

        o.addCallback('drawn', function (modestmap, e) {
            m.setCenterZoom(o.getCenter(), o.getZoom());
        });
    };

$(function () {
    _(stations).map(stationOverlay);
    mapSetup();
    $('a.cfbx').trigger('click');

    $('div#map-overlay').bind('addedtooltip', function (e, tooltip, context, evt) {
        var tooltip = $(tooltip);
        // Position far outside of the page in order for it to get a height
        tooltip.offset({ top: -10000 });
        tooltip.bind('selectstart', function (e) { e.stopPropagation(); });
        tooltip.append('<div class="arrowsprite">&nbsp;</div>');
        $('body').append(tooltip);
        tooltip.offset({
            top: evt.pageY - tooltip.outerHeight(true) - 10,
            left: evt.pageX - (tooltip.outerWidth(true) / 2)
        });
        // continue to follow the mouse.
        return true;
    });
});