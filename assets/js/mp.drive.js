(function ($) {
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
    window.onload = initPicker;

    function initPicker() {
        var picker = new FilePicker({
            apiKey: 'AIzaSyBMDM4v6cjmt3k00QO7PAZn2MGg8hRvSv4',
            clientId: '1868175267',
            buttonEl: $('#login')[0],
            onSelect: function (fileList) {
                // console.log(fileList);
                fileList = fileList.sort(sortby('name', 'ascending'));
                fileList.forEach(parseGoogleDrive);
                renderPlaylist($playlistview, playlist);
                ids.forEach(getFileUrl);
            }
        });
    }

    function getFileUrl(fileId, index) {
        var request = gapi.client.drive.files.get({
            'fileId': fileId
        });
        request.execute(function (resp) {
            downloadFile(resp, index, true);
        });
    }

    function downloadFile(fileObj, index, fromLink) {
        if (fileObj.downloadUrl) {
            var accessToken = gapi.auth.getToken()
                .access_token;
            var xhr = new XMLHttpRequest();
            if (fromLink) {
                xhr.open('GET', $track.data('src'));
                xhr.responseType = "blob";
                xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
                xhr.onload = function () {
                    var file = new File([xhr.response], 'blob');
                    var url = URL.createObjectURL(file);
                    var $track = $($playlistview.find('tr')[index + 1]);
                    var oldSrc = $track.data('src');
                    $track.data('src', url);
                    $track.attr('data-src', url);
                    $track.attr('data-link', oldSrc);
                    readTags(file, index);
                };
                xhr.onerror = function () {
                    downloadFile(fileObj, index, true);
                };
                xhr.send();
            } else {
                xhr.open('GET', fileObj.downloadUrl);
                xhr.responseType = "blob";
                xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
                xhr.onload = function () {
                    var file = new File([xhr.response], 'blob');
                    var url = URL.createObjectURL(file);
                    var $track = $($playlistview.find('tr')[index + 1]);
                    var oldSrc = $track.data('src');
                    $track.data('src', url);
                    $track.attr('data-src', url);
                    $track.attr('data-link', oldSrc);
                    readTags(file, index);
                };
                xhr.onerror = function () {
                    downloadFile(fileObj, index, true);
                };
                xhr.send();
            }
        }
    }

    function parseGoogleDrive(file, index) {
        var row = ['<tr class="track" data-id="' + file.id + '" data-src="' + 'https://docs.google.com/uc?id=' + file.id + '&export=download' + '">', '<td class="track-number">' + (++index) + '</td>', '<td class="track-artist"></td>', '<td class="track-album"></td>', '<td class="track-title"></td>', '<td class="track-file">' + file.name + '</td></tr>'].join('');
        if (!index) {
            ids = [];
            playlist = [];
            playlist.push("<tr><th>No</th><th>Artist</th><th>Album</th><th>Title</th><th>File</th></tr>");
        }
        ids.push(file.id);
        playlist.push(row);
    }
}(jQuery));

