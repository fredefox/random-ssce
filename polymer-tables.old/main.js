(function(Polymer) {
    setup();

    function setup() {
        registerElement("employee-tr");
        var MyTable = registerElement("employee-table");
        var instance = new MyTable();
        document.body.appendChild(instance);
        setTimeout(function() {
            var people =
                [ { name: "Frederik Hanghøj Iversen", title: "Developer" }
                , { name: "Mads Højborg", title: "Manager" }
                ];
            instance.set("employees", people);
        }, 500);
    }

    function registerElement(what, props) {
        console.info(window.Polymer);
        var Element = Polymer.Class({
            is: what,
            properties: props
        });
        document.registerElement(what, Element);
        return Element;
    }
})(window.Polymer);
