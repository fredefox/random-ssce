window.bottles = (function() {
    return bottles;

    function bottles(e) {
        var logIt = (v) => console.log(v),
            mkP = function(t) {
                var p = document.createElement("p");
                p.innerHTML = t;
                return p;
            },
            addToDoc = (v) => e.appendChild(mkP(v));
        song(100).forEach(addToDoc);
    }

    function song(n) {
        var bottles = function(n) {
                switch (n) {
                    case 1:
                        return "1 bottle";
                }
                return n + " bottles";
            },
            verse = function(n) {
                switch (n) {
                    case 0:
                        return "No more bottles of beer on the wall, no more bottles of beer.\n"
                            + "Go to the store and buy some more, 99 bottles of beer on the wall.";
                }
                return bottles(n) + " of beer on the wall, " + bottles(n) + " of beer.\n"
                    + "Take one down and pass it around, " + bottles(n-1)
                    + " of beer on the wall.\n";
            }
        return range(n, 0).map(verse);
    }
    
    function range(a, b, step) {
        step = step || 1;
        return Array.apply(null, Array(a-b)).map(() => a-=step);
    }
})();
