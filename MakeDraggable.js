// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../Packages/Beckhoff.TwinCAT.HMI.Framework.12.752.0/runtimes/native1.12-tchmi/TcHmi.d.ts" />
(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var Popups;
        (function (Popups) {
            function MakeDraggable(Control) {

                function makeDraggable(elmnt) {
                    elmnt = document.getElementById(elmnt);
                    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
                    elmnt.onmousedown = dragMouseDown;
                    elmnt.ontouchstart = dragTouchStart;
                    function dragMouseDown(e) {
                        e = e || window.event;
                        e.preventDefault();
                        // get the mouse cursor position at startup:
                        pos3 = e.clientX;
                        pos4 = e.clientY;
                        document.onmouseup = closeDragElement;
                        // call a function whenever the cursor moves:
                        document.onmousemove = elementDrag;
                    }
                    function dragTouchStart(e) {
                        e = e || window.event;
                        //e.preventDefault();
                        // get the mouse cursor position at startup:
                        pos3 = e.touches[0].clientX;
                        pos4 = e.touches[0].clientY;
                        document.ontouchend = closeTouchDragElement;
                        // call a function whenever the cursor moves:
                        document.ontouchmove = elementTouchDrag;
                    }
                    function elementDrag(e) {
                        e = e || window.event;
                        //e.preventDefault();
                        // calculate the new cursor position:
                        pos1 = pos3 - e.clientX;
                        pos2 = pos4 - e.clientY;
                        pos3 = e.clientX;
                        pos4 = e.clientY;
                        // set the element's new position:
                        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
                        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
                    }
                    function elementTouchDrag(e) {
                        e = e || window.event;
                        //e.preventDefault();
                        // calculate the new cursor position:
                        pos1 = pos3 - e.touches[0].clientX;
                        pos2 = pos4 - e.touches[0].clientY;
                        pos3 = e.touches[0].clientX;
                        pos4 = e.touches[0].clientY;
                        // set the element's new position:
                        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
                        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
                    }
                    function closeDragElement() {
                        // stop moving when mouse button is released:
                        document.onmouseup = null;
                        document.onmousemove = null;
                    }
                    function closeTouchDragElement() {
                        // stop moving when mouse button is released:
                        document.ontouchend = null;
                        document.ontouchmove = null;
                    }
                }

                makeDraggable(Control.getId());
            }
            Popups.MakeDraggable = MakeDraggable;
        })(Popups = Functions.Popups || (Functions.Popups = {}));
        Functions.registerFunctionEx('MakeDraggable', 'TcHmi.Functions.Popups', Popups.MakeDraggable);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);
