MP.youtube = (function($) {
    'use strict';
    var $window = $(window);
    // After the API loads, call a function to enable the search box.
    $window.on('load', function() {
        gapi.client.load('youtube', 'v3', handleAPILoaded);
    });

    function handleAPILoaded() {
        $('#query').attr('disabled', false);
        $('#query').on('change', search);
    }
    // Search for a specified string.
    function search() {
        var q = $('#query').val();
        var request = gapi.client.youtube.search.list({
            q: q,
            type: 'video',
            part: 'snippet',
            maxResults: 50
        });
        console.log('querying youtube for:', q);

        request.execute(function(response) {
            console.log('Get response from youtube', response);
            response.items.forEach(function(item, index) {
                fetchVideoUrl(item.id.videoId, index);
                var iframe = '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/' + item.id.videoId + '" frameborder="0" allowfullscreen></iframe>';
            });
        });
    }

    function fetchVideoUrl(item, index) {
        $.get('http://www.youtubeinmp3.com/fetch/?format=JSON&video=http://www.youtube.com/watch?v=' + item, function(res) {
            console.log(JSON.parse(res));
            res = JSON.parse(res);
            renderYoutube(res, index);
        });
    }

    function renderYoutube(res, index) {
        res = '<tr class="track" data-src="'+res.link+'">'+'<td>'+res.title+'</td>'+'</tr>';
        if (!index) {
            $('#search-container').html(res);
        } else {
            $('#search-container').append(res);
        }
    }

    var Yt = {
        init: {

        }
    };

    return Yt;
}(jQuery));
