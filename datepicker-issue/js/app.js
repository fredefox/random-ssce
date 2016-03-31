(function() {
    'use strict';
    var DATEPICKER_DEFAULT_OPTIONS = {
        showOn: 'both',
        buttonText: 'Calendar'
    };
    $.datepicker.setDefaults(DATEPICKER_DEFAULT_OPTIONS);
    var cb = function(v) {
        var val = $(this).datepicker('getDate');
        console.info(val);
    }
    var $dp = $('.datepicker').datepicker({
        onSelect: cb
    });
    $dp.on('changeDate', cb);
})();
