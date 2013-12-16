L.Control.higherOpacity = L.Control.extend({
    options: {
        position: 'topright'
    },

    onAdd: function (map) {
        
        var higher_opacity_div = L.DomUtil.create('div', 'higher_opacity_control');

        // ... initialize other DOM elements, add listeners, etc.
        L.DomEvent.addListener(higher_opacity_div, 'click', L.DomEvent.stopPropagation)
            .addListener(higher_opacity_div, 'click', L.DomEvent.preventDefault)
            .addListener(higher_opacity_div, 'click', function () { onClickHigherOpacity() });
        
        return higher_opacity_div;
    }
});

L.Control.lowerOpacity = L.Control.extend({
    options: {
        position: 'topright'
    },

    onAdd: function (map) {
        
        var lower_opacity_div = L.DomUtil.create('div', 'lower_opacity_control');

        // ... initialize other DOM elements, add listeners, etc.
        L.DomEvent.addListener(lower_opacity_div, 'click', L.DomEvent.stopPropagation)
            .addListener(lower_opacity_div, 'click', L.DomEvent.preventDefault)
            .addListener(lower_opacity_div, 'click', function () { onClickLowerOpacity() });
        
        return lower_opacity_div;
    }
});

L.Control.opacitySlider = L.Control.extend({
    options: {
        position: 'topright'
    },

    onAdd: function (map) {
        
        var opacity_slider_div = L.DomUtil.create('div', 'opacity_slider_control');
        
        $(function() {
            $( ".opacity_slider_control" ).slider({
              orientation: "vertical",
              range: "min",
              min: 0,
              max: 100,
              value: 60,
              step: 10,
              start: function ( event, ui) {
                map.dragging.disable();
                map.once('mousedown', function (e) { 
                    map.dragging.enable();
                });
              },
              slide: function ( event, ui ) {
                
                var slider_value = ui.value / 100;
                historic_seattle.setOpacity(slider_value);
                
              }
            });
            
        });

        
        return opacity_slider_div;
    }
});


function onClickHigherOpacity() {
    var opacity_value = historic_seattle.options.opacity;
    
    if (opacity_value > 1) {
        return;
    } else {
        historic_seattle.setOpacity(opacity_value + 0.2);
        map.doubleClickZoom.disable();
        map.once('click', function (e) { 
            map.doubleClickZoom.enable();
        });
    }

}

function onClickLowerOpacity() {
    var opacity_value = historic_seattle.options.opacity;
    
    if (opacity_value < 0) {
        return;
    } else {
        historic_seattle.setOpacity(opacity_value - 0.2);
        map.doubleClickZoom.disable();
        map.once('click', function (e) { 
            map.doubleClickZoom.enable();
        });
    }
      
}

