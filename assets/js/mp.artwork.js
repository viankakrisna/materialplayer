window.MP = window.MP || {};
MP.artwork = (function($) {
    var $window = $(window);
    $window.on('mp:played', fetchArtworks);

    function fetchArtworks(event, el) {
        var artist = $(el)
            .find('.track-artist')
            .text();
        var album = $(el)
            .find('.track-album')
            .text();
        if (album.indexOf('(') !== -1) {
            album = album.substring(0, album.indexOf('('));
        }
        var query = artist + '+' + album;
        // query = 'https://itunes.apple.com/search?term=' + query + '&entity=album&atrribute=albumTerm';
        // $.ajax({
        //     url: query,
        //     async: false,
        //     jsonpCallback: 'jsonCallback',
        //     contentType: "application/json",
        //     dataType: 'jsonp',
        //     success: function (resp) {
        //         el.attr('data-artwork', resp.results[0].artworkUrl100.replace('100x100', '600x600'));
        //         showArtwork();
        //     },
        //     error: function (e) {
        //         console.log(e.message);
        //     }
        // });
        query = 'http://ws.audioscrobbler.com/2.0/?method=album.getInfo&api_key=813a8ce6c2b9f14978fc0f3ee0be7b23&artist=' + artist + '&album=' + album;
        $.ajax({
            url: query,
            contentType: 'application/xml',
            success: function(resp) {
                var url = $(resp).find('image[size="mega"]').text();
                el.attr('data-artwork', url);
                showArtwork();
            }
        });
    }

    function showArtwork() {
        var src = $('.track.active')
            .attr('data-artwork');
        $('#player')
            .attr('poster', src);
    }
}(jQuery));
