window.MP = window.MP || {};
MP = (function ($) {
    'use strict';
    /*
        Helper Variables
     */
    var $window = $(window);
    var $document = $(document);
    var $as = $('a');
    var app = window.app = {};
    var $wrapper = $('#wrapper');

    function preventDefault(e) {
        e.preventDefault();
    }

    function init() {
        $wrapper.css('opacity', 1);
    }

    function getBlob(src, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', src, true);
        xhr.responseType = 'blob';
        xhr.onload = function (e) {
            var blob = window.URL.createObjectURL(this.response);
            callback(blob);
        };
        xhr.send();
    }
    $window.on('load', init);
    return {
        preventDefault: preventDefault
    };
})(jQuery);

