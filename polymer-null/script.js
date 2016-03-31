/* Set the values in the Polymeric way */
HTMLImports.whenReady(function() {
    'use strict';
    var e = document.getElementById('script');
    e.set('foo', {name: 'script'});
    e.push('bar', {$: 'hej'});
});
/* Set attribute in the standard way */
(function() {
    'use strict';
    var e = document.getElementById('json');
    e.setAttribute('foo', JSON.stringify({name: 'json'}));
})();
