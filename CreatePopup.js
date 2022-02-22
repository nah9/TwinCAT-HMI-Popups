// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../Packages/Beckhoff.TwinCAT.HMI.Framework.12.752.0/runtimes/native1.12-tchmi/TcHmi.d.ts" />
(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var Popups;
        (function (Popups) {
            function CreatePopup(Parameters) {
                // Create unique id for the popup as every control should have unique name
                var PopupUuid = String("Popup_" + tchmi_create_guid());

                var popupType = Parameters.ContentFace.split(".");
                if (popupType.length > 2) {
                    // The popup has been launched from a popup
                    Parameters.ContentFace = Parameters.ContentFace.split(".").slice(1).join('.');
                }
                // File has no extension
                if (popupType.length < 2) {
                    TcHmi.Log.error('Please use a proper content.');
                    return;
                } else {
                    popupType = popupType[popupType.length - 1].toLowerCase();
                }

                // Holder for all the settings to be generated
                var popupParameters = {};

                // If the popup is made of a usercontrol we can do attribute based bindings (if there is any) 
                if (popupType == "usercontrol" && Parameters.Bindings.length > 0) {
                    for (var binding = 0; binding < Parameters.Bindings.length; binding++) {
                        if (Parameters.Bindings[binding].ParameterMode.indexOf('ParameterAttribute') > -1) {
                            // Only partial parameters (usercontrol parameters) need to be resolved
                            if (Parameters.Bindings[binding].Symbol.indexOf('%pp%') > -1) {
                                // Find the control id and parameter name from the mess
                                var ParameterBinding = Parameters.Bindings[binding].Symbol.split("%pp%").join('').split('%/pp%').join('').split('::');
                                var PreviousControl = TcHmi.Controls.get(ParameterBinding[0]);
                                // Resolve the original symbol from the binding
                                var PreviousSymbol = TcHmi.Binding.resolveEx(ParameterBinding[1], PreviousControl);
                                popupParameters[Parameters.Bindings[binding].Parameter] = PreviousSymbol.__expression;
                            } else {
                                popupParameters[Parameters.Bindings[binding].Parameter] = Parameters.Bindings[binding].Symbol;
                            }
                        }
                    }
                }

                // Insert the layout parameters
                if (Parameters.Positioning.Left != '') { popupParameters['data-tchmi-left'] = Parameters.Positioning.Left } 
                if (Parameters.Positioning.Right != '') { popupParameters['data-tchmi-right'] = Parameters.Positioning.Right } 
                if (Parameters.Positioning.Top != '') { popupParameters['data-tchmi-top'] = Parameters.Positioning.Top } 
                if (Parameters.Positioning.Bottom != '') { popupParameters['data-tchmi-bottom'] = Parameters.Positioning.Bottom }
                if (Parameters.Positioning.Width != '') { popupParameters['data-tchmi-width'] = Parameters.Positioning.Width }
                if (Parameters.Positioning.Height != '') { popupParameters['data-tchmi-height'] = Parameters.Positioning.Height } 

                popupParameters['data-tchmi-left-unit'] = Parameters.Positioning.LeftUnit;
                popupParameters['data-tchmi-right-unit'] = Parameters.Positioning.RightUnit;
                popupParameters['data-tchmi-top-unit'] = Parameters.Positioning.TopUnit;
                popupParameters['data-tchmi-bottom-unit'] = Parameters.Positioning.BottomUnit;
                popupParameters['data-tchmi-width-unit'] = Parameters.Positioning.WidthUnit;
                popupParameters['data-tchmi-height-unit'] = Parameters.Positioning.HeightUnit;
                popupParameters['data-tchmi-width-mode'] = Parameters.Positioning.WidthMode;
                popupParameters['data-tchmi-height-mode'] = Parameters.Positioning.HeightMode;

                // Use the last known keypress to determine where to add
                if (Parameters.InsertWherePressed == true) {
                    popupParameters['data-tchmi-left'] = ClickPressCoordinates.x;
                    popupParameters['data-tchmi-top'] = ClickPressCoordinates.y;
                }

                // Make the popup quite top
                popupParameters['data-tchmi-zindex'] = "10000";

                if (popupType == "usercontrol") {
                    popupParameters['data-tchmi-target-user-control'] = Parameters.ContentFace;
                    var popup = TcHmi.ControlFactory.createEx(
                        'tchmi-user-control-host',
                        PopupUuid,
                        popupParameters
                    );
                }
                else if (popupType == "content") {
                    popupParameters['data-tchmi-target-content'] = Parameters.ContentFace;
                    var popup = TcHmi.ControlFactory.createEx(
                        'tchmi-region',
                        PopupUuid,
                        popupParameters
                    );
                } else {
                    TcHmi.Log.error('Please use a proper type.');
                    return;
                }

                // If the popup is made of a usercontrol we can do part of the bindings (if there is any) 
                if (popupType == "usercontrol" && Parameters.Bindings.length > 0) {
                    for (var binding = 0; binding < Parameters.Bindings.length; binding++) {
                        // Only partial parameters (usercontrol parameters) need to be resolved
                        if (Parameters.Bindings[binding].ParameterMode.indexOf('ParameterName') > -1) {
                            if (Parameters.Bindings[binding].Symbol.indexOf('%pp%') > -1) {
                                // Find the control id and parameter name from the mess
                                var ParameterBinding = Parameters.Bindings[binding].Symbol.split("%pp%").join('').split('%/pp%').join('').split('::');
                                var PreviousControl = TcHmi.Controls.get(ParameterBinding[0]);
                                // Resolve the original symbol from the binding
                                var PreviousSymbol = TcHmi.Binding.resolveEx(ParameterBinding[1], PreviousControl);
                                for (let param of popup.__params.values()) {
                                    if (param.descr.propertyName.indexOf(Parameters.Bindings[binding].Parameter) > -1) {
                                        TcHmi.Binding.createEx2(PreviousSymbol.__expression, param.descr.propertyName, popup);
                                    }
                                }
                                
                            } else {
                                for (let param of popup.__params.values()) {
                                    if (param.descr.propertyName.indexOf(Parameters.Bindings[binding].Parameter) > -1) {
                                        TcHmi.Binding.createEx2(Parameters.Bindings[binding].Symbol, param.descr.propertyName, popup);
                                    }
                                }
                            }
                        }
                    }
                }

                // Select the view from parameters
                var view = TcHmi.Controls.get(Parameters.Destination.replace("%ctrl%", "").replace("%/ctrl%", ""));
                if (!view) {
                    TcHmi.Log.error('Please use a proper destination.');
                    return;
                }
                // Check that popup was created succesfully
                if (popup) {
                    if (Parameters.Modal) {
                        // If user wants the popup to be modal, create the hiding plane
                        var TopMostLayerUuid = String("PopUpTopMostLayer");
                        var TopMostLayerParameters = {};
                        TopMostLayerParameters['data-tchmi-left'] = 0;
                        TopMostLayerParameters['data-tchmi-top'] = 0;
                        TopMostLayerParameters['data-tchmi-right'] = 0;
                        TopMostLayerParameters['data-tchmi-bottom'] = 0;
                        TopMostLayerParameters['data-tchmi-background-color'] = {
                            "color": "rgba(0, 0, 0, 0.33)"
                        };
                        // TopMostLayer higher than normal popup
                        TopMostLayerParameters['data-tchmi-zindex'] = "10100";
                        // Modal popup higher than hiding plane
                        popup.setZindex(10110);

                        var TopMostLayer = TcHmi.ControlFactory.createEx(
                            'tchmi-container',
                            TopMostLayerUuid,
                            TopMostLayerParameters
                        );
                        view.addChild(TopMostLayer, null);
                        view = TopMostLayer;

                        //TopMostLayerElement = TopMostLayer.getElement()[0];
                        //TopMostLayerElement.addEventListener('mousedown', function (e) {
                        //    if (e.target.parentElement.id.search(/TopMostLayer_/i) > -1) {
                        //        popup.destroy();
                        //        TopMostLayer.destroy();
                        //    }
                        //}, true);
                        //TopMostLayerElement.addEventListener('touchstart', function (e) {
                        //    if (e.target.parentElement.id.search(/TopMostLayer_/i) > -1) {
                        //        popup.destroy();
                        //        TopMostLayer.destroy();
                        //    }
                        //}, true);
                    }

                    view.addChild(popup, null);
                    if (Parameters.Dragging != 'None') {
                        TcHmi.Functions.getFunction('TcHmi.Functions.Popups.MakeDraggable')(popup, Parameters.Dragging);
                    }
                } else {
                    TcHmi.Log.error('Popup creation failed.');
                    return;
                }
                return;
            }
            Popups.CreatePopup = CreatePopup;
        })(Popups = Functions.Popups || (Functions.Popups = {}));
        Functions.registerFunctionEx('CreatePopup', 'TcHmi.Functions.Popups', Popups.CreatePopup);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);

var ClickPressCoordinates = { x: 0, y: 0 };

function setClickPressCoordinates(event) {
    ClickPressCoordinates.x = event.clientX;
    ClickPressCoordinates.y = event.clientY;
}

(function () {
    TcHmi.EventProvider.register('onInitialized', function (e, data) {
        e.destroy();
        document.addEventListener("click", setClickPressCoordinates, true);
        document.addEventListener("press", setClickPressCoordinates, true);
    })
})()
