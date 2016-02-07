window.MP = window.MP || {};
MP = (function ($) {
    'use strict';
    /*
        Helper Variables
     */
    var $window = $(window);
    var $document = $(document);
    var $wrapper = $('#wrapper');
    var $as = $('a');
    var app = window.app = {};
    var storage = window.app.storage = chrome.storage.local;
    /*
        Storage Reset
     */
    function storageReset() {
        storage.set({
            'theme': 'indigo-pink'
        });
        storage.set({
            'font': 'Roboto'
        });
    }

    function preventDefault(e) {
        e.preventDefault();
    }
    /*
        Hash Reset
     */
    function resetHash() {
        if (window.location.hash) {
            window.location.hash = '';
        }
    }

    function setupClickEvents() {
        $as.on('click', function (e) {
            if (e.target.getAttribute('href')) {
                window.location.hash = e.target.getAttribute('href');
            }
        });
    }

    function setupWindowEvents() {
        // window.oncontextmenu = preventDefault;
        window.onhashchange = hashListener;
    }

    function init() {
        $wrapper.css('opacity', 1);
    }

    function hashListener() {
        $('[href="' + window.location.hash + '"]')
            .find('span')
            .click();
        $wrapper[0].className = '';
        switch (window.location.hash) {
        case '#nowplaying':
            $wrapper.addClass('on-now-playing');
            break;
        default:
            $wrapper.removeClass('on-now-playing');
            break;
        }
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

