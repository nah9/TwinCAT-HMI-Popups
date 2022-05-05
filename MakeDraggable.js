// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../Packages/Beckhoff.TwinCAT.HMI.Framework.12.752.0/runtimes/native1.12-tchmi/TcHmi.d.ts" />
(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var Popups;
        (function (Popups) {
            function MakeDraggable(Control, DragFrom) {

                var elmnt = document.getElementById(Control.getId());
                    
                var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
                var touch

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

                 //*********************
                //
                //   Mouse Events
                //
                //*********************
               function dragMouseDown(e) {
                    e = e || window.event;
                    //e.preventDefault();
                    pos3 = e.clientX;
                   pos4 = e.clientY;
                   document.addEventListener('mouseup', closeDragElement, false);
                   document.addEventListener('mousemove', elementDrag, false);
                }
                function dragMouseDownBody(e) {
                    e = e || window.event;
                    //e.preventDefault();
                    if (!e.target.classList.contains('tchmi-partial-template')) {
                        return;
                    }
                    pos3 = e.clientX;
                    pos4 = e.clientY;
                    document.addEventListener('mouseup', closeDragElement, false);
                    document.addEventListener('mousemove', elementDrag, false);
                }
                function dragMouseDownHeader(e) {
                    e = e || window.event;
                    
                    if (!(e.target.parentElement.id.search(/header/i) > -1 || e.target.id.search(/header/i) > -1 || e.target.parentElement.parentElement.id.search(/header/i) > -1 )) {
                        return;
                        //e.preventDefault();
                    }
                    pos3 = e.clientX;
                    pos4 = e.clientY;
                    document.addEventListener('mouseup', closeDragElement, false);
                    document.addEventListener('mousemove', elementDrag, false);
                }
                function elementDrag(e) {
                    e = e || window.event;
                    //e.preventDefault();
                    // calculate the new cursor position:
                    var newPosX = e.clientX;
                    var newPosY = e.clientY;
                    var boundingRectangleX = elmnt.parentElement.parentElement.getBoundingClientRect().width;
                    var boundingRectangleY = elmnt.parentElement.parentElement.getBoundingClientRect().height;
                    if (newPosX > boundingRectangleX || newPosX < 0) {
                        return;
                    }
                    if (newPosY > boundingRectangleY || newPosY < 0) {
                        return;
                    }
                    pos1 = pos3 - newPosX;
                    pos2 = pos4 - newPosY;
                    pos3 = e.clientX;
                    pos4 = e.clientY;
                    // set the element's new position:
                    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
                    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
                }
                function closeDragElement() {
                    // stop moving when mouse button is released:
                    document.removeEventListener('mouseup', closeDragElement);
                    document.removeEventListener('mousemove', elementDrag);
                }

                //*********************
                //
                //   Touch Events
                //
                //*********************
                function dragTouchStart(e) {
                    e = e || window.event;
                    //e.preventDefault();
                    pos3 = e.touches[0].clientX;
                    pos4 = e.touches[0].clientY;
                    elmnt.addEventListener('touchend', closeTouchDragElement, false);
                    elmnt.addEventListener('touchmove', elementTouchDrag, false);
                }
                function dragTouchStartBody(e) {
                    e = e || window.event;
                    //e.preventDefault();
                    if (!e.target.classList.contains('tchmi-partial-template')) {
                        return;
                    }
                    pos3 = e.touches[0].clientX;
                    pos4 = e.touches[0].clientY;
                    elmnt.addEventListener('touchend', closeTouchDragElement, false);
                    elmnt.addEventListener('touchmove', elementTouchDrag, false);
                }
                function dragTouchStartHeader(e) {
                    e = e || window.event;
                    //e.preventDefault();
                    if (!(e.target.parentElement.id.search(/header/i) > -1 || e.target.id.search(/header/i) > -1 || e.target.parentElement.parentElement.id.search(/header/i) > -1)) {
                        return;
                    }
                    pos3 = e.touches[0].clientX;
                    pos4 = e.touches[0].clientY;
                    elmnt.addEventListener('touchend', closeTouchDragElement, false);
                    elmnt.addEventListener('touchmove', elementTouchDrag, false);
                }
                function elementTouchDrag(e) {
                    e = e || window.event;
                    //e.preventDefault();
                    var newPosX = e.touches[0].clientX;
                    var newPosY = e.touches[0].clientY;
                    var boundingRectangleX = elmnt.parentElement.parentElement.getBoundingClientRect().width;
                    var boundingRectangleY = elmnt.parentElement.parentElement.getBoundingClientRect().height;
                    if (newPosX > boundingRectangleX || newPosX < 0) {
                        return;
                    }
                    if (newPosY > boundingRectangleY || newPosY < 0) {
                        return;
                    }
                    pos1 = pos3 - newPosX;
                    pos2 = pos4 - newPosY;
                    pos3 = e.touches[0].clientX;
                    pos4 = e.touches[0].clientY;
                    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
                    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
                }
                function closeTouchDragElement() {
                    elmnt.removeEventListener('touchend', closeTouchDragElement);
                    elmnt.removeEventListener('touchmove', elementTouchDrag);
                }

            }
            Popups.MakeDraggable = MakeDraggable;
        })(Popups = Functions.Popups || (Functions.Popups = {}));
        Functions.registerFunctionEx('MakeDraggable', 'TcHmi.Functions.Popups', Popups.MakeDraggable);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);
