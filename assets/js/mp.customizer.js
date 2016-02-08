window.MP = window.MP || {};
MP.customizer = (function ($) {
    /*
        Customizer
     */
    var $window = $(window);
    var $showCustomizerBtn = $('#show-customizer');
    var $customizerModal = $('#customizer');
    var $resetstyle = $('#reset-style');
    var $font = $('#font');
    var $theme = $('#theme');
    var storage = window.MP.storage;

    function initCustomizer() {
        $showCustomizerBtn.attr('disabled', false);
        $showCustomizerBtn.on('click', function () {
            $customizerModal[0].showModal();
        });
        $font.on('change', function (e) {
            var font = $(e.target)
                .val();
            setFont({
                font: font
            });
        });
        $theme.on('change', function (e) {
            var theme = $(e.target)
                .val();
            setTheme({
                theme: theme
            });
        });
        $resetstyle.on('click', resetStyle);
        storage.get('theme', setTheme);
        storage.get('font', setFont);
    }

    function setFont(setting) {
        var font = !$.isEmptyObject(setting) ? setting.font : 'Roboto';
        if (font) {
            // $('#font-link')
            //     .attr('href', 'https://fonts.googleapis.com/css?family=' + font.replace(/ /g, '+'));
            $('#current-font')
                .text('.mdl-button,h1,h2,h3,h4,h5,h6,.mdl-layout-title,body{font-family: ' + font + ' }');
        }
        storage.set(setting);
        $font.val(font);
    }

    function setTheme(setting) {
        var theme = !$.isEmptyObject(setting) ? setting.theme : 'indigo-pink';
        $('#theme-link')
            .attr('href', 'assets/css/material.' + theme + '.min.css');
        storage.set(setting);
        $theme.val(theme);
    }

    function resetStyle() {
        $('#theme')
            .val('blue-pink')
            .trigger('change');
        $('#font')
            .val('Roboto')
            .trigger('change');
    }
    $window.on('load', initCustomizer);
}(jQuery));

