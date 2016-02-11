window.MP = window.MP || {};
MP.init = (function($) {
    'use strict';
    /*
        Helper Variables
     */
    var $wrapper = $('#wrapper');
    var $window = $(window);

    function preventDefault(e) {
        e.preventDefault();
    }

    function init() {
        $wrapper.css('opacity', 1);
    }

    function getBlob(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'blob';
        xhr.onload = function(e) {
            var blob = window.URL.createObjectURL(this.response);
            callback(blob);
        };
        xhr.send();
    }
    $window.on('load', init);
    return {
        preventDefault: preventDefault,
        libraryview: $('#libraryview'),
        databaseName: 'MP',
        databaseSchema: 'id,artist,album,track,title,file,dom',
        defaultTableContent: '<thead><th>No Songs</th></thead><tbody><td>No Songs</td></tbody>'
    };
})(jQuery);
