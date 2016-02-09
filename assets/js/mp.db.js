window.MP = window.MP || {};
MP.db = (function ($) {
    var $window = $(window);
    var db = new Dexie("MP");
    db.version(1)
        .stores({
            songs: 'id,artist,album,track,title,file,dom',
        });
    db.open();
    db.transaction("rw", db.songs, function () {
            $window.on('mp:metadataready', function (event, dom, tags, file) {
                db.songs.add({
                        id: tags.artist + '|' + tags.album + '|' + tags.track + '|' + tags.title,
                        artist: tags.artist,
                        album: tags.album,
                        track: tags.track,
                        title: tags.title,
                        dom: dom[0].outerHTML,
                        file: file,
                    })
                    .then(function () {
                        $window.trigger('mp:databaseinserted')
                        console.log('Database inserted for:', arguments)
                    })
                    .catch(function (e) {
                        console.log(e);
                    });
            });
            $window.on('load mp:databaseinserted', function () {
                var count = 1;
                $('#libraryview')
                    .html('');
                db.songs.each(function (song) {
                        var dom = $(song.dom);
                        dom.attr('data-src', URL.createObjectURL(song.file));
                        $('#libraryview')
                            .append(dom);
                            MP.log(dom);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            });
        })
        .catch(function (error) {
            console.error(error);
        });
    return db;
})(jQuery);

