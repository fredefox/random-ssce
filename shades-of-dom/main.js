(function() {
    reportDefined("Polymer");
    console.info(NodeList.constructor);

    function reportDefined(what, scope) {
        var isDefined = what in (scope || window);
        if(isDefined) console.info("%s is defined", what);
        else          console.error("%s is not defined", what);
        return isDefined;
    }
})();
