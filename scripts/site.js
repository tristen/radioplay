var mm = com.modestmaps;
var m;
var baseLayer = 'tristen.base-layer';
var stationLayer = 'tristen.cfbx';

function drawMap() {

    wax.tilejson('http://api.tiles.mapbox.com/v3/' + baseLayer + ',' + stationLayer + '.jsonp', function(tilejson) {
        tilejson.minzoom = 4;
        tilejson.maxzoom = 8;

        m = new mm.Map('map', new wax.mm.connector(tilejson), null, [
            new mm.DragHandler(),
            new mm.TouchHandler(),
            new mm.DoubleClickHandler(),
            new mm.MouseWheelHandler()
        ]);

        m.draw();
        m.setCenterZoom(new mm.Location(50, -80), 4);
        wax.mm.zoomer(m, tilejson).appendTo(m.parent);
        wax.mm.interaction(m, tilejson);
    });
}

$(document).ready(function (){
    // Initialize the map.
    drawMap();

    $('#canada a').click(function(e) {
        e.preventDefault();
        $('#canada a').removeClass('active');
        $(this).addClass('active');

        stationLayer = $(this).attr('data-layer');
        // With the station variable set as data-layer attribute name
        // of the anchor link the user has clicked, redraw the map.
        drawMap();

        var stationName = stationLayer.split('.')[1];
        var s = station[stationName]; // Current station object from data.js
        var stationContent = '<h2>' + s.name + ' <small>' + s.location + '</small></h2>'
                        + '<p>Songs tracked: ' + s.count + '</p>'
                        + '<h3>Where:</h3>'
                        + '<ul>'
                        + '<li>Canada: ' + s.cdn_play + '</li>'
                        + '<li>USA: ' + s.us_play + '</li>'
                        + '<li>United Kingdom: ' + s.uk_play + '</li>'
                        + '<li>International: ' + s.int_play + '</li>'
                        + '</ul>';

        // Swap out the station information block
        // content with the station selected.
        $('#station').html(stationContent);
    });
});
