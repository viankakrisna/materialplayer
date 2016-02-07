window.MP = window.MP || {};
MP.dialog = (function ($) {
    /*
        Dialog
     */
    var $openFileBtn = $('.show-file-picker-btn');
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
    $openFileBtn.on('click', function () {
        $openFileDialog[0].showModal();
    });
    $close.on('click', function (e) {
        $(e.target)
            .parents('dialog')[0].close();
    });
    $local.on('click', function () {
        $fileselect.click();
    });
}(jQuery));

