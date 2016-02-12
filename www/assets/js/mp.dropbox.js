(function($) {
    var sortby = MP.playlist.sortby;
    var renderPlaylist = MP.playlist.renderPlaylist;
    var readTags = MP.playlist.readTags;
    var playlist = [];
    var ids = [];
    var $playlistview = $('#playlist-view');
    var $tracks = $('.track');
    var tableheading = "<tr><th>No</th><th>Artist</th><th>Album</th><th>Title</th><th>File</th></tr>";
    var $fileselect = $('#fileselect');
    var $wrapper = $('#wrapper');
    var $button = $('#dropbox');
    var $window = $(window);
    $window.on('load', initDropbox);

    function initDropbox() {
        console.log('Initializing Dropbox integration');
        var options = {
            success: function(files) {
                files.forEach(parseDropbox);
                renderPlaylist($playlistview, playlist);
                files.forEach(downloadFile);
            },
            cancel: function() {

            },
            linkType: "direct", // or "direct"
            multiselect: true, // or true
            extensions: ['.mp3', '.mp4', '.m4a'],
        };
        if (window.Dropbox) {
            $button.attr('disabled', false);
            $button.on('click', function() {
                Dropbox.choose(options);
            });
            console.log('Dropbox integration enabled');
        } else {
            console.log('Dropbox integration failed');
        }
    }

    function downloadFile(fileObj, index) {
        var xhr = new XMLHttpRequest();
        var $track = $($playlistview.find('tr')[index + 1]);
        xhr.open('GET', $track.data('src'));
        xhr.responseType = "blob";
        xhr.onload = function() {
            var file = new File([xhr.response], 'blob');
            var url = URL.createObjectURL(file);
            var $track = $($playlistview.find('tr')[index + 1]);
            var oldSrc = $track.data('src');
            $track.data('src', url);
            $track.attr('data-src', url);
            $track.attr('data-link', oldSrc);
            readTags(file, index);
        };
        xhr.onerror = function() {
            downloadFile(fileObj, index, true);
        };
        xhr.send();
    }

    function parseDropbox(file, index) {
        console.log(file);
        if (!index) {
            ids = [];
            playlist = [];
            playlist.push("<tr><th>No</th><th>Artist</th><th>Album</th><th>Title</th><th>File</th></tr>");
        }
        ids.push(file.id);
        var row = ['<tr class="track" data-src="' + file.link + '">', '<td class="track-number">' + (++index) + '</td>', '<td class="track-artist"></td>', '<td class="track-album"></td>', '<td class="track-title"></td>', '<td class="track-file">' + file.name + '</td></tr>'].join('');
        playlist.push(row);
    }
}(jQuery));
