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
    var tableheading = "<thead><tr><th>No</th><th>Artist</th><th>Album</th><th>Title</th><th>File</th></tr></thead>";
    var $fileselect = $('#fileselect');
    var $wrapper = $('#wrapper');
    var $subtitle = $('#subtitle');

    function toArray(arraylike) {
        return Array.prototype.slice.call(arraylike);
    }

    function renderPlaylist($playlistview, playlist) {
        $playlistview.html(playlist.join(''));
        $window.trigger('mp:playlistrendered');
    }

    function traverseFileTree(item, path) {
        path = path || "";
        if (item.isFile) {
            // Get file
            item.file(function (file) {
                console.log("File:", path + file.name);
            });
        } else if (item.isDirectory) {
            // Get folder contents
            var dirReader = item.createReader();
            dirReader.readEntries(function (entries) {
                for (var i = 0; i < entries.length; i++) {
                    traverseFileTree(entries[i], path + item.name + "/");
                }
            });
        }
    }

    function loopFiles(e) {
        e = e.originalEvent;
        e.preventDefault();
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
            $subtitle.attr('data-srt', url);
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

    function readTags(file, index, $track) {
        if (file.name.indexOf('.mp4') === -1) {
            ID3.loadTags('', function () {
                var $track = $track || $($playlistview.find('tr')[index + 1]);
                var tags = ID3.getAllTags('');
                $track.find('.track-artist')
                    .html(tags.artist);
                $track.find('.track-album')
                    .html(tags.album);
                $track.find('.track-title')
                    .html(tags.title);
                console.log(tags);
                $window.trigger('mp:metadataready', [$track, tags, file]);
            }, {
                dataReader: ID3.FileAPIReader(file)
            });
        }
    }

    function setupTrackEvents() {
        $wrapper.on('click', '.track', function (e) {
            var $this = $(this);
            var url = $this.data('src');
            $('.track')
                .removeClass('active');
            $this.addClass('active');
            MP.player.play(url);
        });
    }
    setupTrackEvents();
    window.ondragover = MP.init.preventDefault;
    $window.on('drop', loopFiles);
    $fileselect.on('change', loopFiles);
    return {
        tableheading: tableheading,
        sortby: sortby,
        renderPlaylist: renderPlaylist,
        readTags: readTags
    };
}(jQuery));

