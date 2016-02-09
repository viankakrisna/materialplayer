window.MP = window.MP || {};
if (!Object.keys) {
    Object.keys = (function () {
        'use strict';
        var hasOwnProperty = Object.prototype.hasOwnProperty,
            hasDontEnumBug = !({
                toString: null
            })
            .propertyIsEnumerable('toString'),
            dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'],
            dontEnumsLength = dontEnums.length;
        return function (obj) {
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
MP.storage = (function () {
    /*
        Storage Reset
     */
    var storage = (function () {
        var obj = {};
        var storage = null;
        switch (true) {
        case (chrome && chrome.storage):
            obj = chrome.storage.local;
            break;
        case window.LargeLocalStorage:
            storage = new LargeLocalStorage({
                size: 500 * 1024 * 1024,
                name: 'library'
            });
            storage.initialized.then(function (grantedCapacity) {
                if (grantedCapacity != -1 && grantedCapacity != desiredCapacity) {
                    console.log(storage);
                }
            });
            break;
        default:
            obj = {
                get: function (key, callback) {
                    var result = {};
                    result[key] = localStorage.getItem(key);
                    callback(result);
                },
                set: function (obj) {
                    Object.keys(obj)
                        .forEach(function (key) {
                            localStorage.setItem(key, obj[key]);
                        });
                }
            }
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

