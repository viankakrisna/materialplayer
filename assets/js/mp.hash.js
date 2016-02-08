(function ($) {
    var $wrapper = $('#wrapper');
    var $window = $(window);
    var $as = $('a');
    var $player = $('#player');
    var $header = $('header')
        /*
                Hash Reset
             */
    function resetHash() {
        if (window.location.hash) {
            window.location.hash = '';
        }
    }

    function hashListener() {
        $as.on('click', function (e) {
            if (e.target.getAttribute('href')) {
                window.location.hash = e.target.getAttribute('href');
            }
        });
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
    $header.on('click', function (e) {
        $wrapper.removeClass('on-now-playing');
    });
    $player.on('click', function () {
        $wrapper.toggleClass('on-now-playing');
        // var elem = document.documentElement;
        // if (elem.requestFullscreen) {
        //     elem.requestFullscreen();
        // } else if (elem.msRequestFullscreen) {
        //     elem.msRequestFullscreen();
        // } else if (elem.mozRequestFullScreen) {
        //     elem.mozRequestFullScreen();
        // } else if (elem.webkitRequestFullscreen) {
        //     elem.webkitRequestFullscreen();
        // }
    });
    $window.on('hashchange', hashListener);
}(jQuery))

