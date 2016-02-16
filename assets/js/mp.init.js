window.MP = window.MP || {};
MP.init = (function($) {
    'use strict';
    /*
        Helper Variables
     */
    var $wrapper = $('#wrapper');
    var $window = $(window);
    return {
        preventDefault: function preventDefault(e) {
            e.preventDefault();
        },
        libraryview: $('#libraryview'),
        databaseName: 'MP',
        databaseSchema: 'id,artist,album,track,title,file,dom',
        defaultTableContent: '<thead><th>No Songs</th></thead><tbody><td>No Songs</td></tbody>',
        el: {
            searchInput: $('#fixed-header-drawer-exp'),
            libraryView: $('#libraryview'),
            deleteDatabase: $('#deletedatabase'),
        },
        option: {
            table: {
                paging: false,
                order: [
                    [1, "asc"],
                    [0, "asc"]
                ],
            }
        }

    };
})(jQuery);
