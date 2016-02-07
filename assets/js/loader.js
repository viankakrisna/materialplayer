(function ($) {
    $('link[rel="import"]')
        .each(function (index, el) {
            $.ajax({
                url: el.href,
                type: 'GET',
                success: function (html) {
                    $(el)
                        .after(html);
                    $(el)
                        .remove();
                }
            });
            if (index === $('link[rel="import"]')
                .length - 1) {
                $('body')
                    .append('<script src="assets/js/material.min.js">');
            }
        });
}(jQuery));

