(function(global) {
    'use strict';
    global.loadScript = function(src) {
        return new Promise(function(resolve) {
            var script = document.createElement('script');
            script.src = src;
            script.onload = function () {
                resolve();
            };
            document.head.appendChild(script);
        });
    };
})(window);
