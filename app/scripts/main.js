require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery',
        bootstrap: 'vendor/bootstrap'
    },
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }
    }
});

require(['app', 'jquery', 'slider', 'css3Slider'], function (app, $, Slider, Css3Slider) {
    'use strict';
    // use app here
    console.log(app);
    console.log('Running jQuery %s', $().jquery);
    // console.log(Slider);

    $('#baseSlider').slider({
        speed: 200
    });
    $('#css3Slider').css3slider();
});
