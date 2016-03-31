(function () {
    "use strict";
    var init = function (Polymer, $, TestManagement) {
        TestManagement("TestCase").then(setupPolymer);
        function setupPolymer(util) {
            Polymer({
                is: "x-tree-element",
                properties: {
                    element: {
                        type: Object,
                        notify: true,
                        // These are the *required* properties.
                        value: {
                            fieldValues: Object
                        }
                    },
                    isLeaf: {
                        type: Boolean,
                        computed: 'computeIsLeaf(element)'
                    },
                    imgSrc: {
                        type: String,
                        computed: 'computeImgSrc(isLeaf)'
                    },
                    editLink: {
                        type: String,
                        computed: 'computeEditLink(element)'
                    }
                },
                ready: function () {
                    // Unfortunately the `listeners` is not working on the field
                    // `attributes` - most likely because it is a span-element.
                    // So we will set up the listeners by using jQuery to
                    // dynamically set up listeners on all child `input`-elements.
                    // Note that we cannot do this with Polymers `listeners`
                    // since we are binding events to a dynamic set of fields.
                    // Please also note that `this` and `arguments` *might* be
                    // bound differently depending on wether we use jQuery or
                    // Polymer.
                    $(this.$.attributes)
                        .children("input")
                        .on('blur', this.update.bind(this))
                        .on('click', function (e) { e.stopPropagation(); });
                    /*
                     * We can unfortunately not use Polymers declarative
                     * `on-*`-syntax for events. So we set it up with
                     * jQuery.
                     *
                     * We may have already perfomed a hack that does
                     * this. If we needed that hack some of these events
                     * should not fire. So we can register them in any
                     * case.
                     */
                    $(this.$.test)
                       .on("dragover", allowDropOperation)
                       .on("drop", this.setTargetOfDrop.bind(this))
                       .on("dragend", this.moveElement.bind(this));
                },
                computeIsLeaf: function (element) {
                    return util.isSpFile(element.fieldValues);
                },
                computeImgSrc: function (isLeaf) {
                    return isLeaf
                        ? "/_layouts/15/images/icgen.gif"
                        : "/_layouts/15/images/folder.gif?rev=23";
                },
                computeEditLink: function (element) {
                    return "DispForm.aspx?ID=" + element.fieldValues.ID;
                },
                toggleCollapse: function () {
                    var $subts = $(this.$.subElements)
                    // This call is needed because fading doesn't work for
                    // custom elements.
                        .children();
                    $subts.fadeToggle();
                },
                update: function (e) {
                    var $t = $(this.$.test),
                        data = this.element.fieldValues,
                        // TODO: Update correct subset of values:,
                        p = util.update(data, PROPERTIES_TO_UPDATE);
                    changeStyle($t, p);
                    e.stopPropagation();
                },
                deleteElem: function (e) {
                    var remove = (function (t) {
                        return function () {
                            t.remove();
                        };
                    })(this);
                    util.deleteElem(this.element.fieldValues)
                        .then(remove);
                    e.stopPropagation();
                },
                /*
                 * It would appear that managing drag and drop operations are not so
                 * straight-forward. Please refer to this excellent question on SO:
                 *
                 *     http://stackoverflow.com/questions/11065803/determine-what-is-being-dragged-from-dragenter-dragover-events
                 */
                setTargetOfDrop: function () {
                    setTargetOfDrop(this);
                },
                moveElement: function () {
                    // `this` is what we are currently dragging
                    var source = this,
                        // `TestManagement.targetOfDrop` is what we are dropping onto.
                        // TODO: If targetOfDrop is a file - then use it's parent
                        // We may not call `TestManagement.move(fr, to)`
                        // for values of `to` that are files.
                        target = getTargetOfDrop(),
                        frEl = source.element,
                        fr = source.element.fieldValues,
                        to = target && target.element.fieldValues;
                    if (to === undefined) {
                        console.warn("Element can not be moved here.");
                        return;
                    }
                    util.move(fr, to).then(function () {
                        source.remove();
                        target.$.subElements.addElem(frEl);
                    }).catch(function (err) {
                        console.error(err);
                    });
                },
                contextmenu: function (event) {
                    var spListItem = this.element.fieldValues,
                        $t = $(this.$.test),
                        targetLoc = this.$.subElements,
                        e = createContextMenuAt(
                            event.clientX,
                            event.clientY,
                            this.element),
                        del = this.deleteElem.bind(this);
                    $(e).on("copy", function () {
                        var p = util.copy(spListItem);
                        changeStyle($t, p);
                    }).on("paste", function () {
                        var addNewItem = function (newItem) {
                                // We must wrap the new item into a
                                // tree like so:
                                var wrapped = {
                                    fieldValues: newItem
                                };
                                targetLoc.addElem(wrapped);
                            },
                            p = util.paste(spListItem, PROPERTIES_TO_UPDATE);
                        p.then(addNewItem);
                        changeStyle($t, p);
                    }).on("delete", function (delEvent) {
                        // We must supply an event to `deleteElem` even
                        // though we don't really need the side-effect
                        // that that method provides.
                        del(delEvent);
                    });
                    event.preventDefault();
                }
            });
            /**
             * This is super awful. It is needed because of an
             * incompatibility between Webcomponents and Internet
             * Explorer.
             */
            if (needHack()) {
                console.warn("Applying drag and drop hack.");
                doHack(function (event) {
                    // Unfortunately this is not very user-friendly
                    // In Internet Explorer 10 you will have to drop
                    // the element on e.g. the input-box. If you drop
                    // it where you think the `li`-element is (that
                    // should span the width of the containing element)
                    // it will not actually hit the `li` but rather some
                    // containing element and this not find a parent
                    // with the name `x-tree-element`.
                    var e = $(event.target)
                        .closest("x-tree-element")
                        .get(0);
                    // Now `e` will be `undefined` iff we are not
                    // dropping our element on a child of an
                    // `x-tree-element`, so the current target should
                    // also be undefined.
                    setTargetOfDrop(e);
                });
            }
        };
        /**
         * This function colors element `$e` depending on whether or not the
         * promise `p` went well or not.
         */
        function changeStyle($e, p) {
            return p.then(function () {
                // Color stuff green
                $e.addClass("validation-success");
            }).catch(function (err) {
                console.error(err);
                // Color stuff red
                $e.addClass("validation-error");
            }).done(function () {
                setTimeout(function () {
                    $e.removeClass("validation-error");
                    $e.removeClass("validation-success");
                }, VALIDATION_FADE);
            });
        }
        /** Just heap it onto the global object `TestManagement`. */
        function setTargetOfDrop(t) {
            TestManagement.__targetOfDrop = t;
        }
        /** Retrieve target from the global object `TestManagement`. */
        function getTargetOfDrop() {
            return TestManagement.__targetOfDrop;
        }
        /**
         * We will need to apply this ugly looking hack if Webcomponents
         * has had to wrap `addEventListener`. A symptom of this is if
         * `document.addEventListener_` has been defined.
         */
        function needHack() {
            return document.addEventListener_ !== undefined;
        }
        /**
         * There is an issue with drag and drop in Internet Explorer
         */
        function doHack(setTarget) {
            $(document)
                .on("dragover", allowDropOperation)
                .on("drop", setTarget);
        }
        function allowDropOperation(event) {
            event.preventDefault();
        }
        function createContextMenuAt(x, y, element) {
            var mn = document.createElement("x-context-menu");
            mn.setAttribute('element', JSON.stringify(element));
            mn.style.position = "absolute";
            mn.style.left = x + "px";
            mn.style.top = y + "px";
            document.body.appendChild(mn);
            return mn;
        }
        // TODO: Make it configurable what properties we should display
        // and update.
        var PROPERTIES_TO_UPDATE = ["Title"],
            VALIDATION_FADE = 5 * 1000;
    };
    init(window.Polymer, window.ccm$, window.TestManagement);
})();
