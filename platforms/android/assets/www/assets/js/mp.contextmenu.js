window.MP = window.MP || {};
MP.contextmenu = (function ($) {
    'use strict';
    /*
        Context Menu
     */
    var $window = $(window);
    var $document = $(document);
    var $as = $('.track');
    var $contextmenu = $('#contextmenu');

    function contextMenuHandler(e) {
        e.preventDefault();
        var x = e.clientX;
        var y = e.clientY;
        if (e.clientX > window.innerWidth - 100) {
            x = x - 100;
        }
        $contextmenu.hide()
            .css({
                position: "fixed",
                top: y,
                left: x,
                zIndex: 9999
            })
            .show('fast')
            .data('target', e.originalEvent.target);
    }

    function closeContextMenu(e) {
        if ($contextmenu.is(':visible')) {
            e.preventDefault();
            $contextmenu.hide('fast');
        }
    }
    $('#play-track')
        .click(function () {
            $contextmenu.data('target')
                .click();
        });
    $('#delete-track')
        .click(function () {
            var $target = $($contextmenu.data('target'))
                .parents('.track');
            var id = $($contextmenu.data('target'))
                .parents('.track')
                .data('id');
            if ($target.parents('#libraryview')
                .length) {
                MP.db.songs.delete(id);
            }
            $target.remove();
        });
    $('#download-track')
        .click(function () {
            var $target = $($contextmenu.data('target'))
                .parents('.track');
            var link = $target.data('link') || $target.data('src');
            window.open(link);
        });
    $('#reload-track')
        .click(function () {
            var $target = $($contextmenu.data('target'))
                .parents('.track');
            var src = $target.attr('data-src');
            var xhr = new XMLHttpRequest();
            xhr.open('GET', src, true);
            xhr.responseType = 'blob';
            xhr.onload = function (e) {
                if (this.status == 200) {
                    var file = new File([xhr.response], 'blob');
                    MP.playlist.readTags(file, false, $target);
                }
            };
            xhr.send();
        });
    $document.on("contextmenu", '.track', contextMenuHandler);
    $document.on("click", closeContextMenu);
}(jQuery));

