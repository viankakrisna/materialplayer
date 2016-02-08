    var $wrapper = $('#wrapper');
    var $window = $(window);
    var $as = $('a');
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
    $window.on('hashchange', hashListener);

