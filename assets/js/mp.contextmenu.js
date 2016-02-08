window.MP = window.MP || {};
MP.contextmenu = (function ($) {
    'use strict';
    /*
        Context Menu
     */
    var $window = $(window);
    var $as = $('as');
    var $contextmenu = $('#contextmenu');

    function contextMenuHandler(e) {
        e.preventDefault();
        $contextmenu.css({
            display: "block",
            position: "fixed",
            top: e.clientY,
            left: e.clientX
        });
    }
    $as.on("contextmenu", contextMenuHandler);
}(jQuery));

