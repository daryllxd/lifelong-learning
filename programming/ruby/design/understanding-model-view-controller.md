# Understanding Model-View-Controller
[link](http://blog.codinghorror.com/understanding-model-view-controller/)

Models: Models represent knowledge. A model could be a single object, or it could be some structure of objects. There should be a one-to-one correspondence between the model and its parts on one hand, and the represented world as perceived by the owner of the model on the other hand.

Views: A view is a visual representation of its model (presentation filter). A view attached to its model (or model part) gets the data from the model by asking questions. It can also update the model by asking questions. These have to be in the terminology of the model, so the view will have to know the semantics of the attributes of the model it represents.

Controllers: A controller is the link between a user and the system. It provides the users with input by arranging for relevant views to present themselves in appropriate places on the screen. It provides means for user output by presenting the user with menus or other means of giving commands and data. Controller receives user output, translates it into the appropriate messages and pass these messages on to one or more of the views.

Model = HTML. View = CSS. Controller = Browser.

Model: Text that communicates information to the reader.

CSS: Adds visual style to the content.

Controller: The browser is responsible for combining and rendering the CSS and HTML into a set of final, manipulatible pixels on the screen. It gathers input from the user and sends stuff to JS. We can also plug in a different browser and get comparable results.


