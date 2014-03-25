# Understanding Model-View-Controller
[link](http://blog.codinghorror.com/understanding-model-view-controller/)

Models: Models represent knowledge. A model could be a single object, or it could be some structure of objects. There should be a one-to-one correspondence between the model and its parts on one hand, and the represented world as perceived by the owner of the model on the other hand.

Views: A view is a visual representation of its model (presentation filter). A view attached to its model (or model part) gets the data from the model by asking questions. It can also update the model by asking questions. These have to be in the terminology of the model, so the view will have to know the semantics of the attributes of the model it represents.

Controllers: A controller is the link between a user and the system. It provides the users with input by arranging for relevant views to present themselves in appropriate places on the screen. It provides means for user output by presenting the user with menus or other means of giving commands and data. Controller receives user output, translates it into the appropriate messages and pass these messages on to one or more of the views.

Model = HTML. View = CSS. Controller = Browser.

Model: Text that communicates information to the reader.

CSS: Adds visual style to the content.

Controller: The browser is responsible for combining and rendering the CSS and HTML into a set of final, manipulatable pixels on the screen. It gathers input from the user and sends stuff to JS. We can also plug in a different browser and get comparable results.

Terrence Parr:

"For the MVC of a web app, I make a direct analogy with the Smalltalk notion of MVC. The model is any of the logic or the database or any of the data itself. The view is simply how you lay the data out and how it is displayed.

If you want a subset of some data, my opinion is that is a responsibility of the model. The model knows how to make a subset. You should not ask your graphic designer to filter a list according to age or some other criteria.

The controller has two parts: The web server that maps incoming HTTP URL requests to a particular handler for that request. Second part: The handler itself.

I look at a website as nothing but a graph with edges with POSTs and GETs that route pages."
 
To know if your app has been segregated: **Is your app skinnable?**

"My experience is that designers don't understand loops or any kind of state. They do understand templates with holes in them. So separating model and view addresses this very important practical problem of how to have designers work with coders."

You should refactor your code so that only the controller is responsible for poking the model data through the relatively static templates represented by the view.

## Comments

"A view is a visual representation of its model. It would highlight certain attributes of the model and suppress others. It is thus acting as a presentation filter. Isn't this what CSS does to HTML? 'Make this bold, increase the size of this, move this DIV over here, hide this content...'"
