window.MP = window.MP || {};
MP.chrome = (function($) {
    var sortby = MP.playlist.sortby;
    var renderPlaylist = MP.playlist.renderPlaylist;
    var $playlistview = $('#playlist-view');
    var readTags = MP.playlist.readTags;
    var playlist = [];
    var list = [];
    var $window = $(window);

    function parseLocalFile(url, index) {
        if (!index) {
            playlist = [];
            playlist.push("<tr><th>No</th><th>Artist</th><th>Album</th><th>Title</th><th>File</th></tr>");
        }
        var urlArray = url.split('/');
        var row = ['<tr class="track" data-src="' + url + '">', '<td class="track-number">' + (++index) + '</td>', '<td class="track-artist"></td>', '<td class="track-album"></td>', '<td class="track-title"></td>', '<td class="track-file">' + urlArray[urlArray.length - 1] + '</td></tr>'].join('');
        playlist.push(row);
    }

    function processFiles() {
        $playlistview.find('.track').each(function(index, track) {
            var $track = $(track);
            var xhr = new XMLHttpRequest();
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
            xhr.open('GET', $track.data('src'));
            xhr.onerror = function() {
                downloadFile(fileObj, index, true);
            };
            xhr.send();
        });
    }
    $window.on('load', function() {
        if (window.chrome && window.chrome.storage) {
            console.log('checking for open file');
            chrome.storage.local.get('open', function(item) {
                chrome.storage.local.set({ open: false }, function() {
                    if (item.open) {
                        list.push(item.open);
                        list.forEach(parseLocalFile);
                        console.log(list);
                        console.log(playlist);
                        renderPlaylist($playlistview, playlist);
                        processFiles();

                    }
                });
            });
            chrome.runtime.onMessage.addListener(
                function(request, sender, sendResponse) {
                    list.push(request);
                    list.forEach(parseLocalFile);
                    renderPlaylist($playlistview, playlist);
                    processFiles();

                });
        }
    });

}(jQuery));
