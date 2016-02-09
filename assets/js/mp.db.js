window.MP = window.MP || {};
MP.db = (function ($) {
    var $window = $(window);
    var db = new Dexie("MP");
    var defaultTableContent = '<thead><th>No Songs</th></thead><tbody><td>No Songs</td></tbody>';
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
            $window.on('load', function () {
                $('#fixed-header-drawer-exp')
                    .on('keyup', function (e) {
                        var value = $(this)
                            .val();
                        $('#libraryview')
                            .DataTable()
                            .search($(this)
                                .val())
                            .draw();
                    });
            })
            $window.on('load mp:databaseinserted', function () {
                var heading = false;
                $('#libraryview')
                    .DataTable()
                    .destroy();
                $('#libraryview')
                    .html(defaultTableContent);
                db.songs.each(function (song) {
                        var dom = $(song.dom);
                        dom.attr('data-src', URL.createObjectURL(song.file));
                        if (heading) {
                            $('#libraryview')
                                .append(dom)
                        } else {
                            $('#libraryview')
                                .html(MP.playlist.tableheading);
                            $('#libraryview')
                                .append(dom)
                            heading = true;
                        }
                    })
                    .then(function () {
                        $('#libraryview')
                            .DataTable({
                                paging: false,
                                order: [
                                    [1, "asc"],
                                    [0, "asc"]
                                ],
                            });
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

