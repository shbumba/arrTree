'use strict';
(function (global, factories) {
    var object = factories(),
        objectKeys = Object.keys(object);

    if (typeof module !== 'undefined' && module.exports) {
        objectKeys.map(function(key, index) {
            module.exports[key] = object[key];
        });
    } else {
        objectKeys.map(function(key, index) {
            global[key] = object[key];
        });
    }
})(typeof window !== 'undefined' ? window : this, function () {
    var ArrTree = {
        get: function (obj, name, defaultVal) {
            var parts = name.split('.');
            var stoped = false;

            defaultVal = defaultVal != undefined ? defaultVal : null;

            parts.forEach(function (val) {
                if (stoped == true) {
                    return false;
                }

                if (obj[val] != undefined) {
                    obj = obj[val];
                } else {
                    stoped = true;
                }
            });

            return !stoped ? obj : defaultVal;
        },
        set: function (obj, name, val) {
            var parts = name.split('.');

            while (parts.length > 1) {
                var currentPath = parts.shift();

                if (obj[currentPath] == undefined) {
                    obj[currentPath] = {};
                }

                obj = obj[currentPath];
            }

            obj[parts.shift()] = val;
        },
        has: function (obj, name) {
            var parts = name.split('.');
            var stoped = false;

            parts.forEach(function (val) {
                if (stoped == true) {
                    return false;
                }

                if (obj[val] == undefined) {
                    stoped = true;
                } else {
                    obj = obj[val];
                }
            });

            return !stoped;
        },
        remove: function (obj, name) {
            var parts = name.split('.');
            var stoped = false;

            while (parts.length > 1) {
                var currentPath = parts.shift();

                if (obj[currentPath] == undefined) {
                    stoped = true;

                    break;
                }

                obj = obj[currentPath];
            }

            if (!stoped) {
                delete obj[parts.shift()];
            }

            return !stoped;
        }
    };

    return {
        'ArrTree': ArrTree
    };
});