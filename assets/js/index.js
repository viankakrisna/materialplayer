(function ($) {
    'use strict';
    //States
    var storage = chrome.storage.local;
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
    var $showFilePickerBtn = $('.show-file-picker-btn');
    var $local = $('#local');
    var $close = $('.close');
    var $openFileDialog = $('#open-file-dialog');
    var $showCustomizerBtn = $('#show-customizer');
    var $customizerModal = $('#customizer');
    var $resetstyle = $('#reset-style');
    var $libraryview = $('#libraryview');
    var name = 'name';
    var ids = [];
    var loading = false;
    // storage.set({
    //     'theme': 'indigo-pink'
    // });
    // storage.set({
    //     'font': 'Roboto'
    // });
    function init() {
        getBlob('drive.html', function (blob) {
            $('#webview')
                .attr('src', blob);
        });
        setupClickEvents();
        setupWindowEvents();
        setupFileEvents();
        setupSelectEvents();
        setupPlayer();
        setupDialog();
        setupTrackEvents();
        loadingAnimation();
        resetHash();
        // contextMenu();
    }

    function initPicker() {
        if (window.FilePicker && window.gapi) {
            var picker = new FilePicker({
                buttonEl: $('#pick')[0],
                onSelect: function (fileList) {
                    fileList = fileList.sort(ascending);
                    fileList.forEach(parseGoogleDrive);
                    renderPlaylist();
                    fileList.forEach(downloadFile);
                }
            });
        }
    }

    function getFileUrl(fileId, index) {
        var request = gapi.client.drive.files.get({
            'fileId': fileId
        });
        request.execute(function (resp) {
            downloadFile(resp, index);
        });
    }

    function downloadFileCallBack() {
        var file = new File([xhr.response], 'blob');
        var url = URL.createObjectURL(file);
        var oldSrc = $track.data('src');
        var fileReader = new FileReader();
        fileReader.onload = function (evt) {
            var result = evt.target.result;
            try {
                save[$track.data('id')] = result;
                storage.set(save);
            } catch (e) {
                console.log("Storage failed: " + e);
            }
        };
        fileReader.readAsDataURL(file);
        $track.data('src', url);
        $track.attr('data-src', url);
        $track.attr('data-link', oldSrc);
        readTags(file, index);
    }

    function downloadFile(fileObj, index) {
        if (fileObj.downloadUrl) {
            chrome.identity.getAuthToken({
                'interactive': false
            }, function (accessToken) {
                var $track = $($playlistview.find('tr')[index + 1]);
                var xhr = new XMLHttpRequest();
                xhr.open('GET', $track.data('src'));
                xhr.responseType = "blob";
                xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
                xhr.onload = downloadFileCallBack;
                xhr.onerror = function () {
                    downloadFile(fileObj, index, true);
                };
                xhr.send();
            });
        }
    }

    function parseGoogleDrive(file, index) {
        if (!index) {
            ids = [];
            playlist = [];
            playlist.push("<tr><th>No</th><th>Artist</th><th>Album</th><th>Title</th><th>File</th></tr>");
        }
        ids.push(file.id);
        var row = ['<tr class="track" data-id="' + file.id + '" data-src="' + 'https://docs.google.com/uc?id=' + file.id + '&export=download' + '">', '<td class="track-number">' + (++index) + '</td>', '<td class="track-artist"></td>', '<td class="track-album"></td>', '<td class="track-title"></td>', '<td class="track-file">' + file.name + '</td></tr>'].join('');
        playlist.push(row);
    }

    function resetHash() {
        if (window.location.hash) {
            window.location.hash = '';
        }
    }

    function saveToLibrary(tag, detail) {
        var library = JSON.parse(storage.get('library')) ? JSON.parse(storage.get('library')) : {};
        library[tag.artist] = library[tag.artist] || {};
        library[tag.artist][tag.album] = library[tag.artist][tag.album] || [];
        tag.detail = detail;
        library[tag.artist][tag.album].push(tag);
        storage.set({
            'library': library
        });
    }

    function setupClickEvents() {
        $as.on('click', function (e) {
            if (e.target.getAttribute('href')) {
                window.location.hash = e.target.getAttribute('href');
            }
        });
        $loop.on('click', toggleActive);
        $resetstyle.on('click', resetStyle);
        $footer.on('keyup', keyupListener);
    }

    function setupFileEvents() {
        $fileselect.on("change", loopFiles);
        $wrapper.on("drop", loopFiles);
    }

    function toggleActive(e) {
        var $target = $(e.target);
        $target.toggleClass('active');
    }

    function setupWindowEvents() {
        window.ondragover = preventDefault;
        window.ondrop = preventDefault;
        // window.oncontextmenu = preventDefault;
        window.onhashchange = hashListener;
        window.onload = load;
    }

    function keyupListener(e) {
        if (e.keyCode == 32) {
            if ($footer.hasClass('played')) {
                $pause.click();
            } else {
                $play.click();
            }
        }
    }

    function load() {
        initPicker();
        storage.get('theme', setTheme);
        storage.get('font', setFont);
        $('#wrapper')
            .css('opacity', 1);
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

    function toArray(arraylike) {
        return Array.prototype.slice.call(arraylike);
    }

    function setupDialog() {
        $dialog.each(function (index, dialog) {
            if (!dialog.showModal) {
                dialogPolyfill.registerDialog(dialog);
            }
        });
        $showFilePickerBtn.on('click', function () {
            $openFileDialog[0].showModal();
        });
        $showCustomizerBtn.on('click', function () {
            $customizerModal[0].showModal();
        });
        $close.on('click', function (e) {
            $(e.target)
                .parents('dialog')[0].close();
        });
        $local.on('click', function () {
            $fileselect.click();
        });
    }

    function renderPlaylist() {
        $playlistview.html(playlist.join(''));
        $('.track')
            .first()
            .click();
    }

    function loopFiles(e) {
        e = e.originalEvent;
        var files = e.target.files || (e.dataTransfer && e.dataTransfer.files);
        var fileArray = toArray(files);
        fileArray = fileArray.sort(ascending);
        fileArray.forEach(parseFile);
        renderPlaylist();
        fileArray.forEach(readTags);
    }

    function blobToFile(theBlob, fileName) {
        theBlob.lastModifiedDate = new Date();
        theBlob.name = fileName;
        return theBlob;
    }

    function ascending(a, b) {
        if (a[name] < b[name]) {
            return -1;
        } else if (a[name] > b[name]) {
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
                playlist.push("<tr><th>No</th><th>Artist</th><th>Album</th><th>Title</th><th>File</th></tr>");
            }
            playlist.push(['<tr class="track" data-src="' + url + '">', '<td class="track-number">' + (++index) + '</td>', '<td class="track-artist"></td>', '<td class="track-album"></td>', '<td class="track-title"></td>', '<td class="track-file">' + file.name + '</td></tr>'].join(''));
            break;
        }
    }

    function readTags(file, index) {
        ID3.loadTags('', function () {
            var $track = $($playlistview.find('tr')[index + 1]);
            var tags = ID3.getAllTags('');
            $track.find('.track-artist')
                .html(tags.artist);
            $track.find('.track-album')
                .html(tags.album);
            $track.find('.track-title')
                .html(tags.title);
        }, {
            dataReader: ID3.FileAPIReader(file)
        });
    }

    function setupTrackEvents() {
        $wrapper.on('click', '.track', function (e) {
            var $this = $(this);
            var url = $this.data('src');
            var $siblings = $this.siblings();
            $siblings.removeClass('active');
            $this.addClass('active');
            play(url);
        });
    }

    function play(url) {
        $player.attr('src', url);
        loading = true;
    }

    function saveToLocalStorage(key, playlist) {
        storage[key] = playlist;
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
            $player[0].pause();
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
            $('.track.active')
                .find('td')
                .each(function (index, info) {
                    var $info = $(info);
                    if (index && $info.text()) {
                        currentTrack += $info.text() + ' - ';
                    }
                });
            $currenttrack.html(currentTrack);
        });
        $player.on('timeupdate', function () {
            var value = (this.currentTime / this.duration) * 1000000;
            var time = '(' + formatTime(this.currentTime) + ' / ' + formatTime(this.duration) + ')';
            $slider[0].MaterialSlider.change(value);
            $time.html(time);
            loading = false;
        });
        $slider.on("change input", seek);
    }

    function setupSelectEvents() {
        $('#font')
            .on('change', function (e) {
                var font = $(e.target)
                    .val();
                setFont({
                    font: font
                });
            });
        $('#theme')
            .on('change', function (e) {
                var theme = $(e.target)
                    .val();
                setTheme({
                    theme: theme
                });
            });
    }

    function setFont(setting) {
        var font = !$.isEmptyObject(setting) ? setting.font : 'Roboto';
        if (font) {
            $('#font-link')
                .attr('href', 'https://fonts.googleapis.com/css?family=' + font.replace(/ /g, '+'));
            $('#current-font')
                .text('.mdl-button,h1,h2,h3,h4,h5,h6,.mdl-layout-title,body{font-family: ' + font + ' }');
        }
        storage.set(setting);
    }

    function setTheme(setting) {
        var theme = !$.isEmptyObject(setting) ? setting.theme : 'indigo-pink';
        $('#theme-link')
            .attr('href', 'assets/css/material.' + theme + '.min.css');
        storage.set(setting);
    }

    function loadingAnimation() {
        function step(timestamp) {
            if (loading) {
                $footer.addClass('loading');
            } else {
                $footer.removeClass('loading');
            }
            window.requestAnimationFrame(step);
        }
        window.requestAnimationFrame(step);
    }

    function resetStyle() {
        $('#theme')
            .val('blue-pink')
            .trigger('change');
        $('#font')
            .val('Roboto')
            .trigger('change');
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

    function preventDefault(e) {
        e.preventDefault();
    }
    if (window.File && window.FileList && window.FileReader) {
        init();
        chrome.storage.onChanged.addListener(function (changes, namespace) {
            for (var key in changes) {
                var storageChange = changes[key];
                console.log('Storage key "%s" in namespace "%s" changed. ' + 'Old value was "%s", new value is "%s".', key, namespace, storageChange.oldValue, storageChange.newValue);
            }
        });
    }
})(jQuery);

