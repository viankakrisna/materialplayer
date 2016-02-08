window.MP = window.MP || {};
MP.playlist = (function ($) {
    'use strict';
    /*
        Playlist View
     */
    var $window = $(window);
    var playlist = [];
    var ids = [];
    var $playlistview = $('#playlist-view');
    var $tracks = $('.track');
    var tableheading = "<tr><th>No</th><th>Artist</th><th>Album</th><th>Title</th><th>File</th></tr>";
    var $fileselect = $('#fileselect');
    var $wrapper = $('#wrapper');

    function toArray(arraylike) {
        return Array.prototype.slice.call(arraylike);
    }

    function renderPlaylist($laylistview, playlist) {
        $playlistview.html(playlist.join(''));
        $('.track')
            .first()
            .click();
    }

    function loopFiles(e) {
        e = e.originalEvent;
        var files = e.target.files || (e.dataTransfer && e.dataTransfer.files);
        var fileArray = toArray(files);
        fileArray = fileArray.sort(sortby('name', 'ascending'));
        fileArray.forEach(parseFile);
        renderPlaylist($playlistview, playlist);
        fileArray.forEach(readTags);
        return false;
    }

    function blobToFile(theBlob, fileName) {
        theBlob.lastModifiedDate = new Date();
        theBlob.name = fileName;
        return theBlob;
    }

    function sortby(prop, ascdesc) {
        var selectedSort;

        function ascending(a, b) {
            if (a[prop] < b[prop]) {
                return -1;
            } else if (a[prop] > b[prop]) {
                return 1;
            } else {
                return 0;
            }
        }

        function descending(a, b) {
            if (a[sortby] > b[prop]) {
                return -1;
            } else if (a[prop] < b[prop]) {
                return 1;
            } else {
                return 0;
            }
        }
        switch (ascdesc) {
        case 'ascending':
            selectedSort = ascending;
            break;
        case 'descending':
            selectedSort = descending;
            break;
        }
        return selectedSort;
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
                playlist.push(tableheading);
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
            MP.player.play(url);
        });
    }
    setupTrackEvents();
    window.ondragover = MP.preventDefault;
    $window.on('drop', loopFiles);
    $fileselect.on('change', loopFiles);
    return {
        sortby: sortby,
        renderPlaylist: renderPlaylist,
        readTags: readTags
    }
}(jQuery));

