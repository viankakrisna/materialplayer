MP.youtube = (function($) {
    'use strict';
    var $window = $(window);
    // After the API loads, call a function to enable the search box.
    $window.on('load', function() {
        gapi.client.load('youtube', 'v3', handleAPILoaded);
    });

    function handleAPILoaded() {
        $('#search-button').attr('disabled', false);
        $('#search-button').on('click', search);
    }
    // Search for a specified string.
    function search() {
        var q = $('#query').val();
        var request = gapi.client.youtube.search.list({
            q: q,
            part: 'snippet'
        });
        console.log('querying youtube for:', q);

        request.execute(function(response) {
            console.log('Get response from youtube', response);
            response.items.forEach(function(item, index) {
                if (!index) {
                    $('#search-container').html('<iframe width="420" height="315" src="https://www.youtube.com/embed/' + item.id.videoId + '" frameborder="0" allowfullscreen></iframe>');
                } else {
                    $('#search-container').append('<iframe width="420" height="315" src="https://www.youtube.com/embed/' + item.id.videoId + '" frameborder="0" allowfullscreen></iframe>');
                }
            });
        });
    }

    var Yt = {
        init: {

        }
    };

    return Yt;
}(jQuery));
