(function ($) {
    /*
      Google Drive Picker
    */
    function getFileUrl(fileId, index) {
        gapi.client.drive.files.get({
                'fileId': fileId
            })
            .execute(function (resp) {
                downloadFile(resp, index);
            });
    }

    function initDrive() {
        if (window.FilePicker && window.gapi) {
            var picker = new FilePicker({
                buttonEl: $('#pick')[0],
                onSelect: pickerCallback
            });
        }
    }

    function pickerCallback(fileList) {
        fileList = fileList.sort(ascending);
        fileList.forEach(parseGoogleDrive);
        renderPlaylist();
        ids.forEach(getFileUrl);
    }

    function downloadFileCallBack() {
        var file = new File([xhr.response], 'blob');
        var url = URL.createObjectURL(file);
        var $track = $($playlistview.find('tr')[index + 1]);
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

    function downloadFile(fileObj, index, fromLink) {
        if (fileObj.downloadUrl) {
            chrome.identity.getAuthToken({
                'interactive': false
            }, function (accessToken) {
                var xhr = new XMLHttpRequest();
                if (fromLink) {
                    xhr.open('GET', $track.data('src'));
                    xhr.responseType = "blob";
                    xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
                    xhr.onload = downloadFileCallBack;
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
            });
        }
    }

    function parseGoogleDrive(file, index) {
        if (!index) {
            ids = [];
            playlist = [];
            playlist.push(tableheading);
        }
        ids.push(file.id);
        var row = ['<tr class="track" data-id="' + file.id + '" data-src="' + 'https://docs.google.com/uc?id=' + file.id + '&export=download' + '">', '<td class="track-number">' + (++index) + '</td>', '<td class="track-artist"></td>', '<td class="track-album"></td>', '<td class="track-title"></td>', '<td class="track-file">' + file.name + '</td></tr>'].join('');
        playlist.push(row);
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
    window.gapiIsLoaded = initDrive;
}(jQuery));

