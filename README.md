# TwinCAT HMI Popups
An example code for TwinCAT HMI popup framework extension.

See releases for NuGet package!

## Usage
1. Create something to launch the popup

![01_Desktop](https://user-images.githubusercontent.com/74287696/154477252-eaf43690-9969-4357-b933-16732c3ee477.JPG)

2. Add the CreatePopup function call from the Popups folder to the event

![02_EventFunctionCall](https://user-images.githubusercontent.com/74287696/154477283-13d8ae8d-029f-44a4-8763-695cb8277ab6.JPG)

3. Add the call for ClosePopup to the button

![02_EventFunctionCall_b](https://user-images.githubusercontent.com/74287696/154478190-57fb0ab3-4578-4e5c-9fbd-e24060ffe4d3.JPG)

4. Edit the parameters

![03_UsercontrolParameters](https://user-images.githubusercontent.com/74287696/154477299-e1bec8e9-c9ed-47fa-a8d8-ef3eac16b8c2.JPG)

5. See the result

![04_Action](https://user-images.githubusercontent.com/74287696/154477309-a63030ba-0eaf-4344-aef4-de58860f31af.JPG)


## Parameters

Parameters (TcHmi.Functions.Popups.PopupParameters)
- The object containing all the parameters for the call

Bindings (TcHmi.Functions.Popups.BindingItemList)
- List of all the bindings to a usercontrol popup.
*Bindings will be dismissed if content file is used.*

Bindings.Parameter (String)
- Property name OR Attribute name of the usercontrols parameter.
- *Property name is named "Name" if "Details" mode is not active.*
- *Attribute Name can be seen also when "Details" mode is active.*

Bindings.ParameterMode (TcHmi.Functions.Popups.UsercontrolBindingMode)
- The flavor of the Parameter name.

Bindings.Symbol (String)
- The symbol to be bound on the usercontrol.
- *Parameter symbols (%pp%) will be resolved before being used for the binding.*

ContentFace (Path)
- Usercontrol or Content to be shown in the popup.

Destination (String)
- Where the popup should be added.
- *Typically views work best on this but is not limited to views.*

Dragging (TcHmi.Functions.Popups.DraggingBehaviour)
- Where the popup be draggable from: 
  - Nowhere.
  - Anywhere.
  - From a item whichs ID includes "header" e.g. "Popup_Header", "ValvePopupHEADER", "headersomewherehere".
  - Body of the popup usercontrol.

InsertWherePressed (Boolean)
- Should the popup be inserted where the user last pressed
- *The package listens all keypresses on the HMI View and save them to a global scope variable **ClickPressCoordinates**.*
- *The positioning will be made with Left and Top properties.*

Modal (Boolean)
- Should the user be able to interact with things while popup is open.

Positioning (TcHmi.Functions.Popups.PositioningOptions)
- The positioning data for the popup. Is used like in typical controls.
- *Take care of left and top when using with InsertWherePressed.*

## Version history

### 1.1.6
- Bugfix: In TwinCAT HMI 1.12.754.x textboxes inside popups did not work.
- Updated Beckhoff.TwinCAT.HMI.Framework version required to 12.754.4 
### 1.1.5
- Bugfix: Dragging could be stopped by dragging too quickly.
### 1.1.4
- Bugfix: Dragging on PC based touch devices fixed.
### 1.1.3
- Dragging the popup outside the area it lives is prohibted.
- Bugfix: Header and body dragging did not work properly with touch.
### 1.1.2
- Bugfix: Modal popup was not always the topmost popup.
- Bugfix: Header draggable popup threw unnecessary error.
### 1.1.1
- Bugfix: User was able to only move newest popup.
- Bugfix: Modal background did not disappear when popup was closed.
### 1.1.0
- Modal popup.
- Definable dragging areas on the popup.
- WidthMode and HeightMode added to positioning.
### 1.0.0
- Initial release.