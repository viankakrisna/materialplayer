window.MP = window.MP || {};
MP.artwork = (function ($) {
    var $window = $(window);
    $window.on('mp:metadataready', fetchArtworks);

    function fetchArtworks(event, el) {
        var artist = $(el)
            .find('.track-artist')
            .text();
        var album = $(el)
            .find('.track-album')
            .text();
        album = album.substring(0, album.indexOf('('));
        var query = artist + '+' + album;
        console.log(query);
        var query = 'https://itunes.apple.com/search?term=' + artist + '+' + album;
        $.ajax({
            url: query,
            async: false,
            jsonpCallback: 'jsonCallback',
            contentType: "application/json",
            dataType: 'jsonp',
            success: function (resp) {
                el.attr('data-artwork', resp.results[0].artworkUrl100.replace('100x100', '600x600'));
                if ($(el)
                    .hasClass('active')) {
                    showArtwork();
                }
            },
            error: function (e) {
                console.log(e.message);
            }
        });
    }

    function showArtwork() {
        var src = $('.track.active')
            .attr('data-artwork');
        $('#player')
            .attr('poster', src);
    }
}(jQuery))

