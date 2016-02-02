(function () {
    'use strict';
    var counter = 0;
    var content = '';

    function init() {
        setupClickEvents();
        setupWindowEvents();
        setupFileEvents();
        setupPlayer();
        setupDialog();
        resetHash();
    }

    function resetHash() {
        if (window.location.hash) {
            window.location.hash = '';
        }
    }

    function $id(id) {
        return document.getElementById(id);
    }

    function $class(name) {
        return toArray(document.getElementsByClassName(name));
    }

    function $tag(name) {
        return toArray(document.getElementsByTagName(name));
    }

    function $q(name) {
        return toArray(document.querySelectorAll(name));
    }

    function setupClickEvents() {
        var as = $tag('a');
        as.forEach(function (a) {
            a.addEventListener('click', function (e) {
                if (this.getAttribute('href')) {
                    window.location.hash = this.getAttribute('href');
                }
            }, false);
        });
    }

    function setupFileEvents() {
        var fileselect = $id("fileselect");
        var filedrag = $id("wrapper");
        fileselect.addEventListener("change", loopFiles, false);
        filedrag.addEventListener("drop", loopFiles, false);
    }

    function setupWindowEvents() {
        window.ondragover = preventDefault;
        window.ondrop = preventDefault;
        // window.oncontextmenu = preventDefault;
        window.onhashchange = hashListener;
    }

    function hashListener() {
        switch (window.location.hash) {
            case '#nowplaying':
                $id('wrapper')
                    .className = 'on-now-playing';
                break;
            default:
                $id('wrapper')
                    .className = '';
                break;
        }
    }

    function toArray(arraylike) {
        return Array.prototype.slice.call(arraylike);
    }

    function setupDialog() {
        var dialog = document.querySelector('dialog');
        var showDialogButton = document.querySelector('#show-dialog');
        if (!dialog.showModal) {
            dialogPolyfill.registerDialog(dialog);
        }
        showDialogButton.addEventListener('click', function () {
            dialog.showModal();
        });
        dialog.querySelector('.close')
            .addEventListener('click', function () {
                dialog.close();
            });
        $id('local')
            .onclick = function () {
                $id('fileselect')
                    .click();
            };
    }

    function renderPlaylist() {
        $id('playlist-view')
            .innerHTML = content;
        addEvent();
    }

    function loopFiles(e) {
        var files = e.target.files || e.dataTransfer.files;
        counter = 0;
        toArray(files)
            .forEach(parseFile);
        setTimeout(renderPlaylist, 250);
    }

    function parseFile(file, index) {
        var blob = URL.createObjectURL(file);
        var fileNameArr = file.name.split('.');
        var extension = fileNameArr[fileNameArr.length - 1];
        switch (extension) {
            case 'srt':
                $id('subtitle')
                    .src = blob;
                break;
            default:
                if (!index) {
                    content = `
                        <tr>
                            <th>No</th>
                            <th>Artist</th>
                            <th>Album</th>
                            <th>Title</th>
                        </tr>
                    `;
                }
                id3(file, function (error, tags) {
                    var number = counter += 1;
                    content += `
                                <tr class="track" data-src="${blob}">
                                    <td>${number}</td>
                                    <td>${tags.artist||''}</td>
                                    <td>${tags.album||''}</td>
                                    <td>${tags.title||file.name}</td>
                                </tr>
                            `;
                });
                break;
        }
    }

    function addEvent() {
        var tracks = $class('track');
        tracks.forEach(function (track, index) {
            var blob = track.dataset.src;
            track.addEventListener('click', function () {
                var active = $class('active')[0];
                if (active) {
                    active.className = 'track';
                }
                $id('player')
                    .src = blob;
                this.className = 'track active';
            }, false);
        });
        tracks[0].click();
    }

    function saveToLocalStorage(key, content) {
        window.localStorage[key] = content;
    }

    function seek(event) {
        seekto = $id('player')
            .duration * ($id('slider')
                .value / 100);
        $id('player')
            .currentTime = seekto;
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
        $id('player')
            .addEventListener('ended', function () {
                if ($class('active')[0].nextElementSibling) {
                    $class('active')[0].nextElementSibling.click();
                }
            });
        //Play if have source, click first song in playlist-view if not
        $id('play')
            .addEventListener('click', function () {
                if ($id('player')
                    .src) {
                    $id('player')
                        .play();
                } else {
                    if ($class('track')) {
                        $class('track')[0].click();
                    }
                }
            });
        //Well, pause the player
        $id('pause')
            .addEventListener('click', function () {
                $id('player')
                    .pause();
            });
        //Click the previous sibling if it has
        $id('previous')
            .addEventListener('click', function () {
                if ($class('active')) {
                    if ($class('active')[0].previousElementSibling) {
                        $class('active')[0].previousElementSibling.click();
                    }
                }
            }, false);
        //Click the next sibling if it has
        $id('next')
            .addEventListener('click', function () {
                if ($class('active')) {
                    if ($class('active')[0].nextElementSibling) {
                        $class('active')[0].nextElementSibling.click();
                    }
                }
            }, false);
        $id('player')
            .onpause = function () {
                $id('footer')
                    .className = 'paused';
            };
        $id('player')
            .onplay = function () {
                $id('footer')
                    .className = 'played';
                $id('currenttrack')
                    .innerHTML = $class('active')[0].innerText;
            };
        $id('player')
            .ontimeupdate = function () {
                var value = (this.currentTime / this.duration) * 100;
                $id('slider')
                    .MaterialSlider.change(value);
                $id('time')
                    .innerHTML = '(' + formatTime(this.currentTime) + ' / ' + formatTime(this.duration) + ')';
            };
        $id('slider')
            .addEventListener("input", function (event) {
                seek(event);
            });
        $id('slider')
            .addEventListener("change", function (event) {
                seek(event);
            });
    }

    function preventDefault(e) {
        e.preventDefault();
    }
    if (window.File && window.FileList && window.FileReader) {
        init();
    }
})();

