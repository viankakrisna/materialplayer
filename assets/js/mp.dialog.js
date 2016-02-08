window.MP = window.MP || {};
MP.dialog = (function ($) {
    /*
        Dialog
     */
    var $openFileBtn = $('.show-file-picker-btn');
    var $opendialog = $('.open-dialog');
    var $openFileDialog = $('#open-file-dialog');
    var $dialog = $('dialog');
    var $close = $('.close');
    var $local = $('#local');
    var $fileselect = $('#fileselect');
    $dialog.each(function (index, dialog) {
        if (!dialog.showModal) {
            dialogPolyfill.registerDialog(dialog);
        }
    });
    $opendialog.on('click', function (e) {
        e.preventDefault();
        var $target = $(e.currentTarget.getAttribute('href'));
        $target[0].showModal();
    });
    $close.on('click', function (e) {
        $(e.target)
            .parents('dialog')[0].close();
    });
    $local.on('click', function () {
        $fileselect.click();
    });
}(jQuery));

