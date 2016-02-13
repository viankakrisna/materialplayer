window.MP = window.MP || {};
MP.network = (function($) {
    'use strict';
    if (window.chrome && window.chrome.app && window.chrome.app.window) {

    } else {
        $('head').append([
            '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">',
        ]);
        $('#font-link').attr('src', 'https://fonts.googleapis.com/css?family=Roboto');
        $('body').append([
            '<script src="https://www.google.com/jsapi?key=AIzaSyCtkghKt38OyadfYdhm3Ybubq2JVFl-QAo"></script>',
            '<script src="https://apis.google.com/js/client.js"></script>',
            '<script type="text/javascript" src="https://www.dropbox.com/static/api/2/dropins.js" id="dropboxjs" data-app-key="1h54ipc0xt6l0os"></script>'
        ].join(''));
    }
    var network = {
        init: {

        }
    };

    return network;
}(jQuery));
