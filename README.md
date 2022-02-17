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

Parameters ()
: The object containing all the parameters for the call

Bindings
: List of all the bindings to a usercontrol popup.
*Bindings will be dismissed if content file is used.*

Bindings.Parameter
: Property name OR Attribute name of the usercontrols parameter.
*Property name is named "Name" if "Details" mode is not active.*
*Attribute Name can be seen also when "Details" mode is active.*

Bindings.ParameterMode
: The flavor of the Parameter name.

Bindings.Symbol
: The symbol to be bound on the usercontrol.
*Parameter symbols (%pp%) will be resolved before being used for the binding.*

ContentFace
: Usercontrol of Content to be shown in the popup.

Destination
: Where the popup should be added.
*Typically views work best on this but is not limited to views.*

Draggable
: Should the popup be draggable.

InsertWherePressed
: Should the popup be inserted where the user last pressed
*The package listens all keypresses on the HMI View and save them to a global scope variable **ClickPressCoordinates**.*
*The positioning will be made with Left and Top properties.*

Positioning
: The positioning data for the popup. Is used like in typical controls.
*Take care of left and top when using with InsertWherePressed.*
