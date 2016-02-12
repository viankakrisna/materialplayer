window.MP = window.MP || {};
MP.log = (function ($) {
    return function () {
        var args = [].slice.call(arguments);
        $('#log')
            .html(args.join);
    }
}(jQuery));

