window.MP = window.MP || {};
MP.storage = (function() {
    /*
        Storage Reset
     */
    var storage = (function() {
        var obj = {};
        if (window.chrome && window.chrome.storage) {
            obj = window.chrome.storage.local;
        } else {
            obj = {
                get: function(key, callback) {
                    var result = {};
                    result[key] = localStorage.getItem(key);
                    callback(result);
                },
                set: function(obj) {
                    Object.keys(obj)
                        .forEach(function(key) {
                            localStorage.setItem(key, obj[key]);
                        });
                }
            };
        }
        return obj;
    }());

    function storageReset() {
        storage.set({
            'theme': 'indigo-pink'
        });
        storage.set({
            'font': 'Roboto'
        });
    }

    return storage;
}());
