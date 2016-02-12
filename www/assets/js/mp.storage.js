window.MP = window.MP || {};
if (!Object.keys) {
    Object.keys = (function() {
        'use strict';
        var hasOwnProperty = Object.prototype.hasOwnProperty,
            hasDontEnumBug = !({
                toString: null
            })
            .propertyIsEnumerable('toString'),
            dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'],
            dontEnumsLength = dontEnums.length;
        return function(obj) {
            if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
                throw new TypeError('Object.keys called on non-object');
            }
            var result = [],
                prop, i;
            for (prop in obj) {
                if (hasOwnProperty.call(obj, prop)) {
                    result.push(prop);
                }
            }
            if (hasDontEnumBug) {
                for (i = 0; i < dontEnumsLength; i++) {
                    if (hasOwnProperty.call(obj, dontEnums[i])) {
                        result.push(dontEnums[i]);
                    }
                }
            }
            return result;
        };
    }());
}
MP.storage = (function() {
    /*
        Storage Reset
     */
    var storage = (function() {
        var obj = {};
        switch (true) {
            case (window.chrome && window.chrome.storage):
                obj = window.chrome.storage.local;
                break;
            default:
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
