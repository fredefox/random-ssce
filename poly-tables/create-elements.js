document.addEventListener("WebComponentsReady", function() {
    var items = Math.E.toString().split("").map(function(e) {return {$: e}});
    createThenSet(); createAndSet(); createDoc();
    function createThenSet(e) {
        var tbl = Polymer.Base.create("x-table-div");
        tbl.set("items", items);
        document.getElementById("create-then-set")
            .appendChild(tbl);
    }
    function createAndSet(e) {
        var tbl = Polymer.Base.create("x-table-div", {items: items});
        document.getElementById("create-and-set")
            .appendChild(tbl);
    }
    function createDoc(e) {
        var tbl = document.createElement("x-table-div");
        tbl.setAttribute("items", JSON.stringify(items));
        document.getElementById("create-doc")
            .appendChild(tbl);
    }
});
