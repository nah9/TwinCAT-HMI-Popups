// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../Packages/Beckhoff.TwinCAT.HMI.Framework.12.752.0/runtimes/native1.12-tchmi/TcHmi.d.ts" />
(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var Popups;
        (function (Popups) {
            function ClosePopup(Control) {
                if (Control.getType().indexOf('UserControl') > -1) {
                    Control.getParent().destroy();
                } else if (Control.getType().indexOf('Content') > -1) {
                    Control.getParent().destroy();
                }
            }
            Popups.ClosePopup = ClosePopup;
        })(Popups = Functions.Popups || (Functions.Popups = {}));
        Functions.registerFunctionEx('ClosePopup', 'TcHmi.Functions.Popups', Popups.ClosePopup);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);
