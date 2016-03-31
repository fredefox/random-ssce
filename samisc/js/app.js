(function() {
    'use strict';
    loadScript('js/foo.js').then(function() {
        console.info('I loaded foo.js');
    });
})();
