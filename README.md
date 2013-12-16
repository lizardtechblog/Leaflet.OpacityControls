Leaflet.OpacityControls
=======================

Simple Leaflet controls to adjust the opacity of a map.

There are three controls that you can add to a map: a control to increase opacity, a control to decrease opacity, and an interactive slider control. The slider control uses the jquery-ui library.

To add the controls to the map, add the following to the HEAD of your HTML document:

    <link rel="stylesheet" href="lib/leaflet/leaflet.css" />
	  <!--[if lte IE 8]><link rel="stylesheet" href="libs/leaflet.ie.css" /><![endif]-->
    <script src="lib/leaflet/leaflet.js"></script>
    
    <link rel="stylesheet" href="lib/opacity/Control.Opacity.css" />
    <script src="lib/opacity/Control.Opacity.js"></script>
        
    
    <script src="lib/jquery/jquery-1.9.1.js"></script>
    <script src="lib/jquery/jquery-ui-1.10.3.custom.min.js"></script>
    <link rel="stylesheet" href="lib/jquery/jquery-ui-1.10.3.custom.min.css" />
    
Then to initialize the controls, add the following lines to the BODY of your HTML document:

    var higherOpacity = new L.Control.higherOpacity();
    map.addControl(higherOpacity);
    var lowerOpacity = new L.Control.lowerOpacity();
    map.addControl(lowerOpacity);
    var opacitySlider = new L.Control.opacitySlider();
    map.addControl(opacitySlider);
    
