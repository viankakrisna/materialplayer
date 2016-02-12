window.MP = window.MP || {};
MP.player = (function ($) {
    /*
        Player View
     */
    var $window = $(window);
    var $playerwrapper = $('footer');
    var $player = $('#player');
    var $subtitle = $('#subtitle');
    var $slider = $('#slider');
    var $loop = $('#loop');
    var $shuffle = $('#shuffle');
    var $play = $('#play');
    var $pause = $('#pause');
    var $previous = $('#previous');
    var $next = $('#next');
    var $currenttrack = $('#currenttrack');
    var $time = $('#time');
    var $fileselect = $('#fileselect');
    var $wrapper = $('#wrapper');
    var sliderResolution = $slider.attr('max');

    function formatTime(seconds) {
        var minutes = Math.floor(seconds / 60);
        seconds = Math.floor(seconds % 60);
        minutes = (minutes >= 10) ? minutes : "0" + minutes;
        seconds = (seconds >= 10) ? seconds : "0" + seconds;
        return minutes + ":" + seconds;
    }

    function seek(event) {
        var seekTo = $player[0].duration * ($slider.val() / sliderResolution);
        $player[0].currentTime = seekTo;
    }

    function play(url) {
        $player[0].src = url;
        $player[0].play();
        $playerwrapper.addClass('loading');
    }

    function playBtnHandler() {
        if ($player.attr('src')) {
            $player[0].play();
        } else {
            $('.track')
                .first()
                .click();
        }
    }

    function pauseBtnHandler() {
        $player[0].pause();
    }

    function prevBtnHandler() {
        if ($shuffle.hasClass('active')) {
            shuffle();
        } else {
            $('.track.active')
                .prev()
                .click();
        }
    }

    function nextBtnHandler() {
        if ($shuffle.hasClass('active')) {
            shuffle();
        } else {
            $('.track.active')
                .next()
                .click();
        }
    }

    function onPlay() {
        var currentTrack = [];
        var $activeTrack = $('.track.active');
        $playerwrapper.removeClass('paused');
        $playerwrapper.addClass('played');
        $activeTrack.find('td')
            .each(function (index, info) {
                var $info = $(info);
                if (index && $info.text() && index !== 4) {
                    currentTrack.push($info.text());
                }
            });
            currenttrack = currentTrack.join(' - ');
            console.log(currenttrack);
        if (!currenttrack.length){
            currenttrack = $activeTrack.find('.track-file').text();
        }
        $currenttrack.html(currenttrack);
        $('[href="#nowplaying"]')
            .find('span')
            .click();
        $window.trigger('mp:played', [$activeTrack]);
        srt();
    }

    function onPause() {
        $playerwrapper.removeClass('played');
        $playerwrapper.addClass('paused');
    }

    function onTimeupdate(e) {
        var value = (e.target.currentTime / e.target.duration) * sliderResolution;
        var time = '(' + formatTime(e.target.currentTime) + ' / ' + formatTime(e.target.duration) + ')';
        $slider[0].MaterialSlider.change(value);
        $time.html(time);
        $playerwrapper.removeClass('loading');
    }

    function onEnded(e) {
        if ($loop.hasClass('active')) {
            e.target.pause();
            e.target.currentTime = '0';
            e.target.play();
        } else if ($shuffle.hasClass('active')) {
            shuffle();
        } else {
            $('.track.active')
                .next()
                .click();
        }
    }

    function shuffle() {
        var $siblings = $('.track.active')
            .siblings('.track');
        var random = Math.floor(Math.random() * $siblings.length);
        $($siblings)
            .eq(random)
            .click();
    }

    function toggleActive(e) {
        var $target = $(e.target);
        $target.toggleClass('active');
    }

    function keyupListener(e) {
        if (e.keyCode == 32) {
            if (e.target.tagName !== 'INPUT') {
                e.preventDefault();
                if ($playerwrapper.hasClass('played')) {
                    $pause.click();
                } else {
                    $play.click();
                }
            }
        }
    }

    function setupPlayerEvents() {
        $play.on('click', playBtnHandler);
        $pause.on('click', pauseBtnHandler);
        $previous.on('click', prevBtnHandler);
        $next.on('click', nextBtnHandler);
        $player.on('pause', onPause);
        $player.on('play', onPlay);
        $player.on('ended', onEnded);
        $player[0].ontimeupdate = onTimeupdate;
        $loop.on('click', toggleActive);
        $shuffle.on('click', toggleActive);
        $wrapper.on('keyup', keyupListener);
        $slider.on("change input", seek);
        $window.on('mp:playlistrendered', playFirstSong);
    }

    function playFirstSong() {
        $('.track')
            .first()
            .click();
    }
    $window.on('load', setupPlayerEvents);
    return {
        play: play
    };
}(jQuery));

