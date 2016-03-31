/* This example uses polling (ugh) to accomplish accurate timing in
JavaScript */
(function(interval) {
    "use strict";
    var time = new Date().getTime();
    (function instance() {
        var now = new Date().getTime(),
            drift = time - now;
        time += interval;
        console.info(time, drift);
        window.setTimeout(instance, interval + drift);
    })();
})(400);
