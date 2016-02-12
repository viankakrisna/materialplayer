window.MP = window.MP || {};
MP.db = (function($) {
    var $window = $(window);
    var $document = $(document);
    var databaseName = MP.init.databaseName;
    var defaultTableContent = MP.init.defaultTableContent;
    var databaseSchema = MP.init.databaseSchema;
    var $searchinput = $('#fixed-header-drawer-exp');
    var $libraryview = $('#libraryview');
    var $databasedeleted = $('#deletedatabase');
    var tableOption = {
        paging: false,
        order: [
            [1, "asc"],
            [0, "asc"]
        ],
    };

    var db = new Dexie(databaseName);


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

    function renderLibrary() {
        var rows = [];
        db.songs.each(function(song) {
                var src = URL.createObjectURL(song.file);
                var number = $(song.dom).find('.track-number').text();
                var dom = '<tr class="track" data-src="' + src + '" data-id="' + song.id + '"><td class="track-number">' + number + '</td><td class="track-artist">' + song.artist + '</td><td class="track-album">' + song.album + '</td><td class="track-title">' + song.title + '</td><td class="track-file"></td>/tr>';
                rows.push(dom);
            })
            .then(function() {
                if ($.fn.dataTable.isDataTable($libraryview)) {
                    $libraryview.DataTable().destroy();
                }
                if (rows.length) {
                    $libraryview.html(MP.playlist.tableheading);
                    $libraryview.append(rows.join(''));
                    $libraryview.DataTable(tableOption);
                    console.log('Library rendered.');
                } else {
                    $libraryview.html('<tr class="open-dialog" href="#open"><td colspan="5"><h4>Your library is empty.</h4></td></tr>');
                    console.log('No songs found.');
                }
            })
            .catch(function(error) {
                console.log('Fail to render library.');
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
            $databasedeleted
                .on('click', function() {
                    var yes = confirm('Are you sure? A deleted database contains cached files and it could not be restored.');
                    if (yes) {
                        db.songs.clear().then(function() {
                            $window.trigger('mp:databasedeleted');
                            console.log('Database deleted!');
                            alert('Database deleted!');
                        }).catch(function(e) {
                            console.log(e);
                        });
                    }
                });
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
            $window.on('mp:databaseinserted', renderLibrary);
            $window.on('mp:databasedeleted', renderLibrary);
        })
        .catch(function(error) {
            console.error(error);
        });
    return db;
})(jQuery);
