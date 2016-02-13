window.MP = window.MP || {};
MP.network = (function($) {
    'use strict';
    if (chrome && !!chrome.app.window) {
        console.log('Loading external scripts');
        var xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = function() {
            console.log('Script successfully downloaded');
            var script = document.createElement('script');
            var image = new File([xhr.response], 'blob');
            var blob = window.URL.createObjectURL(image);
            script.setAttribute('data-app-key', '1h54ipc0xt6l0os');
            script.src = blob;
            script.id = 'dropboxjs';
            script.onload = MP.dropbox;
            document.body.appendChild(script);

        };
        xhr.open('GET', 'https://www.dropbox.com/static/api/2/dropins.js');
        xhr.onerror = function(e) {
            console.log('Failed to load Dropbox', e);
        };
        xhr.send();
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
