(function ($) {
    'use strict';
    //States
    var counter = 0;
    var playlist = [];
    var $window = $(window);
    var $document = $(document);
    var $wrapper = $('#wrapper');
    var $playlistview = $('#playlist-view');
    var $subtitle = $('#subtitle');
    var $player = $('#player');
    var $slider = $('#slider');
    var $as = $('a');
    var $contextmenu = $('#contextmenu');
    var $fileselect = $('#fileselect');
    var $loop = $('#loop');
    var $play = $('#play');
    var $pause = $('#pause');
    var $footer = $('footer');
    var $previous = $('#previous');
    var $next = $('#next');
    var $currenttrack = $('#currenttrack');
    var $tracks = $('.track');
    var $time = $('#time');
    var $dialog = $('dialog');
    var $showDialogButton = $('#show-dialog');
    var $local = $('#local');
    var $close = $('.close');

    function init() {
        setupClickEvents();
        setupWindowEvents();
        setupFileEvents();
        setupPlayer();
        setupDialog();
        resetHash();
        addEvent();
        // contextMenu();
    }

    function initPicker() {
        var picker = new FilePicker({
            apiKey: 'AIzaSyBMDM4v6cjmt3k00QO7PAZn2MGg8hRvSv4',
            clientId: '1868175267',
            buttonEl: $('#pick')[0],
            onSelect: function (fileList) {
                createPlaylist(fileList);
            }
        });
    }

    function toBlob(url) {
        jsonp(url, function () {
            return new File(url);
        });
    }

    function resetHash() {
        if (window.location.hash) {
            window.location.hash = '';
        }
    }

    function setupClickEvents() {
        $as.on('click', function () {
            if (this.getAttribute('href')) {
                window.location.hash = this.getAttribute('href');
            }
        });
        $loop.on('click', function () {
            var $this = $(this);
            $this.toggleClass('active');
        });
    }

    function setupFileEvents() {
        $fileselect.on("change", loopFiles);
        $wrapper.on("drop", loopFiles);
    }

    function setupWindowEvents() {
        window.ondragover = preventDefault;
        window.ondrop = preventDefault;
        // window.oncontextmenu = preventDefault;
        window.onhashchange = hashListener;
        window.onload = initPicker;
    }

    function contextMenu() {
        $as.on("contextmenu", function (e) {
            $contextmenu.css({
                display: "block",
                position: "fixed",
                top: e.clientY,
                left: e.clientX
            });
        });
    }

    function hashListener() {
        switch (window.location.hash) {
        case '#nowplaying':
            $wrapper.addClass('on-now-playing');
            break;
        default:
            $wrapper.removeClass('on-now-playing');
            break;
        }
    }

    function toArray(arraylike) {
        return Array.prototype.slice.call(arraylike);
    }

    function setupDialog() {
        $dialog.each(function (index, dialog) {
            if (!dialog.showModal) {
                dialogPolyfill.registerDialog(dialog);
            }
        });
        $showDialogButton.on('click', function () {
            $dialog.each(function () {
                this.showModal();
            });
        });
        $close.on('click', function () {
            $dialog.each(function () {
                this.close();
            });
        });
        $local.on('click', function () {
            $fileselect.click();
        });
    }

    function renderPlaylist() {
        $playlistview.html(playlist.join(''));
    }

    function loopFiles(e) {
        e = e.originalEvent;
        var files = e.target.files || (e.dataTransfer && e.dataTransfer.files);
        var fileArray = toArray(files);
        counter = 0;
        fileArray.forEach(parseFile);
        setTimeout(renderPlaylist, 250);
    }

    function createPlaylist(arr) {
        arr.sort(ascending)
            .forEach(createPlaylistCallback);
    }

    function createPlaylistCallback(file, index) {
        if (!index) {
            playlist = [];
            playlist.push("<thead><tr><th>Filename</th<th></th></tr></thead>");
        }
        playlist.push('<tr class="track" data-src="' + file.webContentLink + '">' + '<td class="track-file">' + file.title + '</td>' + '<td><a href="' + file.webContentLink + '" class="mdl-button">Download</a></td></tr>');
        if (index === (arr.length - 1)) {
            renderPlaylist();
        }
    }

    function ascending(a, b) {
        if (a.title < b.title) {
            return -1;
        } else if (a.title > b.title) {
            return 1;
        } else {
            return 0;
        }
    }

    function parseFile(file, index) {
        var url = URL.createObjectURL(file);
        var fileNameArr = file.name.split('.');
        var extension = fileNameArr[fileNameArr.length - 1];
        switch (extension) {
        case 'srt':
            $subtitle.attr('src', url);
            break;
        default:
            if (!index) {
                playlist = [];
                playlist.push("<tr><th>No</th><th>Artist</th><th>Album</th><th>Title</th</tr>");
            }
            id3(file, function (error, tags) {
                playlist.push(['<tr class="track" data-src="' + url + '">', '<td class="track-number">' + (++counter) + '</td>', '<td class="track-artist">' + (tags.artist || '') + '</td>', '<td class="track-album">' + (tags.album || '') + '</td>', '<td class="track-artist">' + (tags.title || file.name) + '</td>', '</tr>'].join(''));
            });
            break;
        }
    }

    function parseFileFromDrive(file, index) {
        var url = URL.createObjectURL(file);
        var fileNameArr = file.name.split('.');
        var extension = fileNameArr[fileNameArr.length - 1];
        switch (extension) {
        case 'srt':
            $('#subtitle')
                .attr('src', url);
            break;
        default:
            if (!index) {
                playlist = "<tr><th>No</th><th>Artist</th><th>Album</th><th>Title</th</tr>";
            }
            id3(file, function (error, tags) {
                var number = counter += 1;
                playlist += '<tr class="track" data-src="' + url + '">' + '<td>' + number + '</td>' + '<td>' + (tags.artist || '') + '</td>' + '<td>' + (tags.album || '') + '</td>' + '<td>' + (tags.title || file.name) + '</td>' + '</tr>';
            });
            break;
        }
    }

    function addEvent() {
        $wrapper.on('click', '.track', function (e) {
            var $this = $(this);
            var url = $this.data('src');
            $this.siblings()
                .removeClass('active');
            $this.addClass('active');
            play(url);
        });
        $tracks.first()
            .click();
    }

    function play(url) {
        $player.attr('src', url);
    }

    function saveToLocalStorage(key, playlist) {
        window.localStorage[key] = playlist;
    }

    function seek(event) {
        var seekto = $player[0].duration * ($slider.val() / 100);
        $player[0].currentTime = seekto;
    }

    function formatTime(seconds) {
        var minutes = Math.floor(seconds / 60);
        seconds = Math.floor(seconds % 60);
        minutes = (minutes >= 10) ? minutes : "0" + minutes;
        seconds = (seconds >= 10) ? seconds : "0" + seconds;
        return minutes + ":" + seconds;
    }

    function setupPlayer() {
        //Play next song in the playlist-view on song ended
        $player.on('ended', function () {
            if ($loop.hasClass('active')) {
                this.pause();
                this.currentTime = '0';
                this.play();
            } else {
                $('.track.active')
                    .next()
                    .click();
            }
        });
        //Play if have source, click first song in playlist-view if not
        $play.on('click', function () {
            if ($player.attr('src')) {
                $player[0].play();
            } else {
                $tracks.first()
                    .click();
            }
        });
        //Well, pause the player
        $pause.on('click', function () {
            $player.pause();
        });
        //Click the previous sibling if it has
        $previous.on('click', function () {
            $('.track.active')
                .previous()
                .click();
        });
        //Click the next sibling if it has
        $next.on('click', function () {
            $('.track.active')
                .next()
                .click();
        });
        $player.on('pause', function () {
            $footer.removeClass('played');
            $footer.addClass('paused');
        });
        $player.on('play', function () {
            var currentTrack = '';
            $footer.removeClass('paused');
            $footer.addClass('played');
            $('.track.active').find('td').each(function(index, info){
                var $info = $(info);
                currentTrack += $info.text() + ' / ';
            });
            $currenttrack.html(currentTrack);
        });
        $player.on('timeupdate', function () {
            var value = (this.currentTime / this.duration) * 1000000;
            var time = '(' + formatTime(this.currentTime) + ' / ' + formatTime(this.duration) + ')';
            $slider[0].MaterialSlider.change(value);
            $time.html(time);
        });
        $slider.on("change input", seek);
    }

    function jsonp(url, callback) {
        var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
        window[callbackName] = function (data) {
            delete window[callbackName];
            document.body.removeChild(script);
            callback(data);
        };
        var script = document.createElement('script');
        script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
        document.body.appendChild(script);
    }

    function preventDefault(e) {
        e.preventDefault();
    }
    if (window.File && window.FileList && window.FileReader) {
        init();
    }
})(jQuery);

