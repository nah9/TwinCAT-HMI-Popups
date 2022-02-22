// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../Packages/Beckhoff.TwinCAT.HMI.Framework.12.752.0/runtimes/native1.12-tchmi/TcHmi.d.ts" />
(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var Popups;
        (function (Popups) {
            function MakeDraggable(Control, DragFrom) {

                var elmnt = document.getElementById(Control.getId());
                    
                var pos1, pos2, pos3, pos4 = 0;

                switch (DragFrom) {
                    case "Anywhere":
                        elmnt.addEventListener('mousedown', dragMouseDown, false);
                        elmnt.addEventListener('touchstart', dragTouchStart, false);
                        break;
                    case "Header":
                        elmnt.addEventListener('mousedown', dragMouseDownHeader, false);
                        elmnt.addEventListener('touchstart', dragTouchStartHeader, false);
                        break;
                    case "Body":
                        elmnt.addEventListener('mousedown', dragMouseDownBody, false);
                        elmnt.addEventListener('touchstart', dragTouchStartBody, false);
                        break;
                    default:
                        elmnt.addEventListener('mousedown', dragMouseDown, false);
                        elmnt.addEventListener('touchstart', dragTouchStart, false);
                } 

                function dragMouseDown(e) {
                    e = e || window.event;
                    e.preventDefault();
                    pos3 = e.clientX;
                    pos4 = e.clientY;
                    document.onmouseup = closeDragElement;
                    document.onmousemove = elementDrag;
                }
                function dragMouseDownBody(e) {
                    e = e || window.event;
                    e.preventDefault();
                    if (!e.target.classList.contains('tchmi-partial-template')) {
                        return;
                    }
                    pos3 = e.clientX;
                    pos4 = e.clientY;
                    document.onmouseup = closeDragElement;
                    document.onmousemove = elementDrag;
                }
                function dragMouseDownHeader(e) {
                    e = e || window.event;
                    e.preventDefault();
                    if (!(e.target.parentElement.id.search(/header/i) > -1 || e.target.id.search(/header/i) > -1 || e.target.parentElement.parentElement.id.search(/header/i) > -1 )) {
                        return;
                    }
                    pos3 = e.clientX;
                    pos4 = e.clientY;
                    document.onmouseup = closeDragElement;
                    document.onmousemove = elementDrag;
                }
                function dragTouchStart(e) {
                    e = e || window.event;
                    //e.preventDefault();
                    pos3 = e.touches[0].clientX;
                    pos4 = e.touches[0].clientY;
                    document.ontouchend = closeTouchDragElement;
                    document.ontouchmove = elementTouchDrag;
                }
                function dragTouchStartBody(e) {
                    e = e || window.event;
                    //e.preventDefault();
                    pos3 = e.touches[0].clientX;
                    pos4 = e.touches[0].clientY;
                    document.ontouchend = closeTouchDragElement;
                    document.ontouchmove = elementTouchDrag;
                }
                function dragTouchHeader(e) {
                    e = e || window.event;
                    //e.preventDefault();
                    pos3 = e.touches[0].clientX;
                    pos4 = e.touches[0].clientY;
                    document.ontouchend = closeTouchDragElement;
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
                    pos1 = pos3 - e.touches[0].clientX;
                    pos2 = pos4 - e.touches[0].clientY;
                    pos3 = e.touches[0].clientX;
                    pos4 = e.touches[0].clientY;
                    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
                    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
                }
                function closeDragElement() {
                    // stop moving when mouse button is released:
                    document.onmouseup = null;
                    document.onmousemove = null;
                }
                function closeTouchDragElement() {
                    document.ontouchend = null;
                    document.ontouchmove = null;
                }

            }
            Popups.MakeDraggable = MakeDraggable;
        })(Popups = Functions.Popups || (Functions.Popups = {}));
        Functions.registerFunctionEx('MakeDraggable', 'TcHmi.Functions.Popups', Popups.MakeDraggable);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);
