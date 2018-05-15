# Idiomatic Redux: Why use action creators?
[Reference](http://blog.isquaredsoftware.com/2016/10/idiomatic-redux-why-use-action-creators/)

- Why not put all your logic right into a component?
  - Action = plain simple object (`{ type: 'ADD_TODO', text: 'Buy milk'}`).
  - Action type: the value for the type field in an action.
  - Action creator: a function that returns and action.

``` js
function addTodo(text) {
    return {
        type : "ADD_TODO",
        text
    }
}
```

- Thunk action creator: A function that returns a function.
- *It is completely possible to do the work of making AJAX calls and calling `dispatch` entirely inline in a component. But it is also a good practice to encapsulate behavior/separate concerns/keep code duplication to a minimum.*

- Why action creators?
  - Basic abstraction, rather than writing action type strings in every component, put the logic for creating that action in one place.
  - Documentation.
  - Brevity/DRY: There could be some larger logic that goes into preparing the action object, rather than just immediately returning it.
  - Encapsulation and consistency.
  - Testability.

- On approaches to dispatch actions from components:

``` js
// approach 1: define action object in the component
this.props.dispatch({
    type : "EDIT_ITEM_ATTRIBUTES",
    payload : {
        item : {itemID, itemType},
        newAttributes : newValue,
    }
});

// approach 2: use an action creator function
const actionObject = editItemAttributes(itemID, itemType, newAttributes);
this.props.dispatch(actionObject);

// approach 3: directly pass result of action creator to dispatch
this.props.dispatch(editItemAttributes(itemID, itemType, newAttributes));

// approach 4: pre-bind action creator to automatically call dispatch
const boundEditItemAttributes = bindActionCreators(editItemAttributes, dispatch);
boundEditItemAttributes(itemID, itemType, newAttributes);
```

- Literal shorthand for binding actions with `connect`:

``` js
import {connect} from "react-redux";
import {action1, action2} from "myActions";


const MyComponent = (props) => (
    <div>
        <button onClick={props.action1}>Do first action</button>
        <button onClick={props.action2}>Do second action</button>
    </div>
)

// Passing an object full of actions will automatically run each action
// through the bindActionCreators utility, and turn them into props

export default connect(null, {action1, action2})(MyComponent);
```
