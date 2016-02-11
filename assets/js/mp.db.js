window.MP = window.MP || {};
MP.db = (function($) {
    var $window = $(window);
    var $document = $(document);
    var databaseName = MP.init.databaseName;
    var defaultTableContent = MP.init.defaultTableContent;
    var databaseSchema = MP.init.databaseSchema;
    var $searchinput = $('#fixed-header-drawer-exp');
    var $libraryview = $('#libraryview');
    var db = new Dexie(databaseName);

    function renderLibrary() {
        console.log('Library rendered.');
        var heading = false;
        $libraryview
            .DataTable()
            .destroy();
        $libraryview
            .html(defaultTableContent);
        db.songs.each(function(song) {
                var dom = $(song.dom);
                dom.attr('data-src', URL.createObjectURL(song.file));
                dom.attr('data-id', song.id);
                if (heading) {
                    $libraryview
                        .append(dom);
                } else {
                    $libraryview
                        .html(MP.playlist.tableheading).append(dom);
                    heading = true;
                }
            })
            .then(function() {
                $libraryview.DataTable({
                    paging: false,
                    order: [
                        [1, "asc"],
                        [0, "asc"]
                    ],
                });
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    db.version(1)
        .stores({
            songs: databaseSchema,
        });
    db.open();
    db.transaction("rw", db.songs, function() {
            renderLibrary();
            $window.on('mp:metadataready', function(event, dom, tags, file) {
                console.log('Metadata is ready, adding file to database.', [arguments]);
                db.songs.add({
                        id: tags.artist + '|' + tags.album + '|' + tags.track + '|' + tags.title,
                        artist: tags.artist,
                        album: tags.album,
                        track: tags.track,
                        title: tags.title,
                        dom: dom[0].outerHTML,
                        file: file,
                    })
                    .then(function() {
                        $window.trigger('mp:databaseinserted');
                        console.log('Database inserted for:', arguments);
                    })
                    .catch(function(e) {
                        console.log(e);
                    });
            });
            $searchinput
                .on('keyup', function(e) {
                    console.log('Spacebar events initialized.');
                    var value = $(this)
                        .val();
                    $libraryview
                        .DataTable()
                        .search($(this)
                            .val())
                        .draw();
                });

            $window.on('mp:databaseinserted', renderLibrary);
        })
        .catch(function(error) {
            console.error(error);
        });
    return db;
})(jQuery);
