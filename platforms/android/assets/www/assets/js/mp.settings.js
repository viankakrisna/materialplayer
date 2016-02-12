window.MP = window.MP || {};
MP.settings = (function ($) {
    var $window = $(window);
    var storage = window.MP.storage;
    var $defaulttab = $('#defaulttab');
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
    return {
        tableheading: "<tr><th>No</th><th>Artist</th><th>Album</th><th>Title</th><th>File</th></tr>",
        defaultTableContent: "<thead><th></th></thead><tbody><td></td></tbody>"
    };
}(jQuery));

