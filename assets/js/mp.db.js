window.MP = window.MP || {};
MP.db = (function($) {
    var $window = $(window);
    var $document = $(document);
    var databaseName = MP.init.databaseName;
    var defaultTableContent = MP.init.defaultTableContent;
    var databaseSchema = MP.init.databaseSchema;
    var $searchinput = MP.init.el.searchInput;
    var $libraryview = MP.init.el.libraryView;
    var $databasedeleted = MP.init.el.deleteDatabase;
    var tableOption = MP.init.option.table;
    var rows = [];

    var db = new Dexie(databaseName);

    $searchinput.on('keyup', searchLibrary);

    function searchLibrary(e) {
        var value = $(this)
            .val();
        $libraryview
            .DataTable()
            .search($(this)
                .val())
            .draw();
        console.log('Spacebar events initialized.');
    }

    function createRows(song) {
        var src = URL.createObjectURL(song.file);
        var number = $(song.dom).find('.track-number').text();
        var dom = '<tr class="track" data-src="' + src + '" data-id="' + song.id + '"><td class="track-number">' + number + '</td><td class="track-artist">' + song.artist + '</td><td class="track-album">' + song.album + '</td><td class="track-title">' + song.title + '</td><td class="track-file"></td>/tr>';
        rows.push(dom);
    }

    function rowsCreated() {
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
    }

    function databaseError(error) {
        console.log('Fail to render library.');
        console.log(error);
    }

    function renderLibrary() {
        rows = [];
        db.songs.each(createRows)
            .then(rowsCreated)
            .catch(databaseError);
    }

    function insertSongToDB(event, dom, tags, file) {
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
            .then(songInserted)
            .catch(errorInsertingSong);
    }

    function songInserted() {
        $window.trigger('mp:databaseinserted');
        console.log('Database inserted for:', arguments);
    }

    function errorInsertingSong(e) {
        console.log(e);
    }

    function databaseDeleted() {
        $window.trigger('mp:databasedeleted');
        console.log('Database deleted!');
        alert('Database deleted!');
    }

    function errorDeletingDatabase(e) {
        alert('Error deleting database!');
        console.log(e);
    }

    function deleteDatabase() {
        var yes = confirm('Are you sure? A deleted database contains cached files and it could not be restored.');
        if (yes) {
            db.songs.clear().then(databaseDeleted).catch(errorDeletingDatabase);
        }
    }

    db.version(1)
        .stores({
            songs: databaseSchema,
        });
    db.open();
    db.transaction("rw", db.songs, function() {
            renderLibrary();
            $databasedeleted.on('click', deleteDatabase);
            $window.on('mp:metadataready', insertSongToDB);
            $window.on('mp:databaseinserted', renderLibrary);
            $window.on('mp:databasedeleted', renderLibrary);
        })
        .catch(function(error) {
            console.error(error);
        });
    return db;
})(jQuery);
