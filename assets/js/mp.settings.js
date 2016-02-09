window.MP = window.MP || {};
MP.settings = (function ($) {
    var $window = $(window);
    var storage = window.MP.storage;
    var $defaulttab = $('#defaulttab');
    var $deletedatabase = $('#deletedatabase');
    $defaulttab.on('change', function () {
        storage.set({defaulttab: $defaulttab.val()});
    });
    $window.on('load', function () {
        storage.get('defaulttab', function (setting) {
            if (setting !== null) {
                $defaulttab.val(setting.defaulttab);
                $('[href="'+setting.defaulttab+'"]').find('span').click();
            }
        });
    });
    $deletedatabase.on('click', function () {
        var yes = confirm('are you sure?');
        var req;
        if (yes) {
            req = indexedDB.deleteDatabase('MP');
            req.onsuccess = function () {
                console.log("Deleted database successfully");
            };
            req.onerror = function () {
                console.log("Couldn't delete database");
            };
            req.onblocked = function () {
                console.log("Couldn't delete database due to the operation being blocked");
            };
        }
    });
    return {
        tableheading: "<tr><th>No</th><th>Artist</th><th>Album</th><th>Title</th><th>File</th></tr>",
        defaultTableContent: "<thead><th></th></thead><tbody><td></td></tbody>"
    }
}(jQuery));

