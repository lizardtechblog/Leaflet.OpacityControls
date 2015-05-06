/*
        Leaflet.OpacityControls, a plugin for adjusting the opacity of a Leaflet map.
        (c) 2013, Jared Dominguez
        (c) 2013, LizardTech

        https://github.com/lizardtechblog/Leaflet.OpacityControls
*/

//Declare global variables
var opacity_layers = [];
var opacity_control_map = undefined;

L.Control.setOpacityControlMap = function (map) {
    opacity_control_map = map;
}

//Create a control to increase the opacity value. This makes the image more opaque.
L.Control.higherOpacity = L.Control.extend({
    options: {
        position: 'topright'
    },
    setOpacityLayer: function (layer) {
        opacity_layers.length = 0;
        opacity_layers.push(layer);
    },
    addOpacityLayer: function (layer) {
        opacity_layers.push(layer);    
    },
    removeOpacityLayer: function (layer) {
        var index = opacity_layers.indexOf(item);
        opacity_layers.splice(index, 1);
    },
    onAdd: function () {
        
        var higher_opacity_div = L.DomUtil.create('div', 'higher_opacity_control');

        L.DomEvent.addListener(higher_opacity_div, 'click', L.DomEvent.stopPropagation)
            .addListener(higher_opacity_div, 'click', L.DomEvent.preventDefault)
            .addListener(higher_opacity_div, 'click', function () { onClickHigherOpacity() });
        
        return higher_opacity_div;
    }
});

//Create a control to decrease the opacity value. This makes the image more transparent.
L.Control.lowerOpacity = L.Control.extend({
    options: {
        position: 'topright'
    },
    setOpacityLayer: function (layer) {
        opacity_layers.length = 0;
        opacity_layers.push(layer);
    },
    addOpacityLayer: function (layer) {
        opacity_layers.push(layer);
    },
    removeOpacityLayer: function (layer) {
        var index = opacity_layers.indexOf(item);
        opacity_layers.splice(index, 1);
    },
    onAdd: function (opacity_control_map) {
        
        var lower_opacity_div = L.DomUtil.create('div', 'lower_opacity_control');

        L.DomEvent.addListener(lower_opacity_div, 'click', L.DomEvent.stopPropagation)
            .addListener(lower_opacity_div, 'click', L.DomEvent.preventDefault)
            .addListener(lower_opacity_div, 'click', function () { onClickLowerOpacity() });
        
        return lower_opacity_div;
    }
});

//Create a jquery-ui slider with values from 0 to 100. Match the opacity value to the slider value divided by 100.
L.Control.opacitySlider = L.Control.extend({
    options: {
        position: 'topright'
    },
    setOpacityLayer: function (layer) {
        opacity_layers.length = 0;
        opacity_layers.push(layer);
    },
    addOpacityLayer: function (layer) {
        opacity_layers.push(layer);
    },
    removeOpacityLayer: function (layer) {
        var index = opacity_layers.indexOf(item);
        opacity_layers.splice(index, 1);
    },
    onAdd: function (opacity_control_map) {
        var opacity_slider_div = L.DomUtil.create('div', 'opacity_slider_control');
        
        $(opacity_slider_div).slider({
          orientation: "vertical",
          range: "min",
          min: 0,
          max: 100,
          value: 60,
          step: 10,
          start: function ( event, ui) {
            //When moving the slider, disable panning.
            opacity_control_map.dragging.disable();
            opacity_control_map.once('mousedown', function (e) { 
              opacity_control_map.dragging.enable();
            });
          },
          slide: function ( event, ui ) {
            var slider_value = ui.value / 100;
            for (var i = 0; i < opacity_layers.length; i++) {
                opacity_layers[i].setOpacity(slider_value);
            }
          }
        });
        
        return opacity_slider_div;
    }
});


function onClickHigherOpacity() {
    for (var i = 0; i < opacity_layers.length; i++) {
        var opacity_value = opacity_layers[i].options.opacity;
    
        if (opacity_value > 1) {
            return;
        } else {
            opacity_layers[i].setOpacity(opacity_value + 0.2);
            //When you double-click on the control, do not zoom.
            opacity_control_map.doubleClickZoom.disable();
            opacity_control_map.once('click', function (e) { 
                opacity_control_map.doubleClickZoom.enable();
            });
        }
    }
}

function onClickLowerOpacity() {
    for (var i = 0; i < opacity_layers.length; i++) {
        var opacity_value = opacity_layers[i].options.opacity;
    
        if (opacity_value < 0) {
            return;
        } else {
            opacity_layers[i].setOpacity(opacity_value - 0.2);
            //When you double-click on the control, do not zoom.
            opacity_control_map.doubleClickZoom.disable();
            opacity_control_map.once('click', function (e) { 
                opacity_control_map.doubleClickZoom.enable();
            });
        }
    }
}

