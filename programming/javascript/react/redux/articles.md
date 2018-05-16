# Full Stack React

- The pain point: tight coupling between user interactions and state changes. For complex web applications, a single user interaction can affect many different/discrete parts of the state.
- Flux
  - The view dispatches actions that describe what happened. The store receives these actions and determines what state changes should occur. After the state updates, the new state is pushed to the View.
  - React notifies the Store that "the user clicked on an email".
- Benefits
  - Break up state management logic: Flux relieves the top-level component of state management responsibility and allows you to break up state management into isolated, smaller, and testable parts.
  - React components are simpler: by managing all state externally, React components become simple HTML rendering functions.
  - Mismatch between the state and DOM tree.

## Redux's Key Ideas

- All of your application's data is in a single data structure called the state which is held in the store.
- Your app reads the state from this store.
- The state is never mutated directly outside the store.
- The views emit actions that describe what happened.
- A new state is created by combining the old state and the action by a function called the reducer.
- For a store with a current state of `5`, if you receive an increment action, the store will use its reducer to derive the next state.
- Actions in Redux are objects, which always have a `type` property.

``` js
{ type: 'INCREMENT' }, { type: 'DECREMENT' }
```

``` js
function reducer(state, action) {
  if (action.type === 'INCREMENT') {
    return state + action.amount;
  } else if (action.type === 'DECREMENT') {
    return state - action.amount;
  } else {
    return state;
  }
}
```

## The Store

- The store is responsible for both maintaining the state and accepting actions from the view. Only the store has access to the reducer.
- The Redux library provides a function for creating stores, `createStore()`.
- Our methods when we implement store:
  - `dispatch`: the method we use to send the store actions
  - `getState`: The method we'll use to read the current value of `state`.

``` js
// We take in the reducer as an argument.
function createStore(reducer) {
  // Then we initialize the initial state via let. `state` is private and inaccessible outside of this function.
  let state = 0;

  // This fucntion grants access to the state from outside createStore()
  const getState = () => (state);

  // This tells the reduce what's going to happen
  // WE DO NOT RETURN THE STATE, because dispatching actions in Redux are fire and forget.
  // Dispatching actions is decouples from reading the latest version of the state.
  const dispatch = (action) => {
    state = reducer(state, action);
  };

  return {
    getState,
    dispatch,
  };
}
```

## The Factory Pattern

- `value` is a private variable. This lives on between function calls.
- `value` is only accessible to functions inside the factory.

``` js

function createAdder() {
  let value = 0;

  const add = (amount) => (value = value + amount);
  const getValue = () => (value);

  return {
    add,
    getValue,
  }
}
```

## The Core of Redux

- All of our application's data is in a single data structure called the state which is held in the store.
- Your app reads the state from this store.
- The state is never mutated directly outside the store.
- The views emit actions that describe what happened, using `dispatch()`.
-  A new state is created by combining the old state and the action by a function called the reducer.
- Inside of `dispatch()`, our store uses `reducer()` to get the new state, passing in the current state and the action.

``` js
// Pass argument to event handlers [Reference](https://reactjs.org/docs/handling-events.html#passing-arguments-to-event-handlers)

onChange = (name, e) => {
  // ES6 way of dynamic keys [Reference](https://stackoverflow.com/questions/11508463/javascript-set-object-key-by-variable)
  this.setState({
    [name]: e.target.value,
  })
};

<input
  onChange={(e) => this.onChange('name', e)}
  value={this.state.name}
  type='text'
/>
```

## Subscribing to the store

- We use the observer pattern to allow the views to immediately update when the state changes. The views will register a callback function that they would like to be invoked when the state changes.
- After the `app` has been mounted, it would subscribe a function in the app's `subscribe()` method as a listener.
- Then when store calls `dispatch()`, it iterates through the listeners in `subscribe` and triggers each callback function.

- When Redux manages state, top-level React components will use `store.getState()` as opposed to `this.state` to drive their `render()` functions. The state provided by Redux will trickle down from there.
- Lower-level components can dispatch actions in response to events that should modify state.

- For keeping the state from the bottom-level component:
  - Set an initial state as well as the `onChange` handler function.
- Could we have kept the component state in Redux's store? Yes.

``` js
// Final JS from this chapter
import React from 'react';

function createStore(reducer, initialState) {
  let state = initialState;
  const listeners = [];

  // Listeners can subscribe to the store here
  const subscribe = (listener) => (
    listeners.push(listener)
  );

  const getState = () => (state);

  // Notify listeners that the state has changed
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(l => l(action));
  };

  // This makes it possible for a createStore to call these functions outside
  return {
    subscribe,
    getState,
    dispatch,
  };
}

function reducer(state, action) {
  if (action.type === 'ADD_MESSAGE') {
    // We return a new value. Reducers must be a pure function. This does not alter `state, instead it returns a new one.
    return {
      messages: state.messages.concat({ name: action.message.name, value: action.message.value }),
    };
  } else if (action.type === 'DELETE_MESSAGE') {
    // Same here, we return a new array
    return {
      messages: [
        ...state.messages.slice(0, action.index),
        ...state.messages.slice(
          action.index + 1, state.messages.length
        ),
      ],
    };
  } else {
    return state;
  }
}

const initialState = { messages: [] };

const store = createStore(reducer, initialState);

class App extends React.Component {
  componentDidMount() {
    store.subscribe((a) => {
      if(a !== undefined) {
        console.log(a);
      }


      this.forceUpdate();
    }
    )
  }

  render() {
    const messages = store.getState().messages;

    return (
      <div className='ui segment'>
        <MessageView messages={messages} />
        <MessageInput />
      </div>
    );
  }
}

class MessageInput extends React.Component {
  // This component has its own state
  state = {
    name: '',
    value: '',
  };

  // A change to itself modifies the internal state
  onChange = (name, e) => {
    this.setState({
      [name]: e.target.value,
    })
  };

  // Submitting means sending a state change to the dispatcher and then wiping its own state
  handleSubmit = () => {
    store.dispatch({
      type: 'ADD_MESSAGE',
      message: { name: this.state.name, value: this.state.value },
    });
    this.setState({
      name: '',
      value: '',
    });
  };

  render() {
    return (
      <div className='ui input'>
        <input
          onChange={(e) => this.onChange('name', e)}
          value={this.state.name}
          type='text'
        />
        <input
          onChange={(e) => this.onChange('value', e)}
          value={this.state.value}
          type='text'
        />
        <button
          onClick={this.handleSubmit}
          className='ui primary button'
          type='submit'
        >
          Submit
        </button>
      </div>
    );
  }
}

class Message extends React.Component {
  render() {
    return (
      <span>
        <strong>{this.props.name}: </strong>
        {this.props.value}
      </span>
    );
  }
}

class MessageView extends React.Component {
  handleClick = (index) => {
    store.dispatch({
      type: 'DELETE_MESSAGE',
      index: index,
    });
  };

  render() {
    const messages = this.props.messages.map((message, index) => (
      <div
        className='comment'
        key={index}
        onClick={() => this.handleClick(index)}
      >
        <Message name={message.name} value={message.value} />
      </div>
    ));
    return (
      <div className='ui comments'>
        {messages}
      </div>
    );
  }
}

export default App;
```

## Intermediate Redux

- `import { createStore } from 'redux';` to use Redux's actual `createStore` class.
- `import uuid from 'uuid';`

- Message threads
- Initial state:

``` js
{
  activeThreadId: ...
  threads: [
    {
      id: (thread_id),
      title: 'Buzz',
      messages: [
        { text: ..., timestamp: ..., id: ... },
        { text: ..., timestamp: ..., id: ... }
      ]
    }

  ]
}

return {
  ...state,
  threads: [
    ...
  ,
};
```

## Reducer composition

``` JS
function reducer(state, action) {
  return {
    // We only pass the part of the state that this reducer is responsible for
    activeThreadId: activeThreadIdReducer(state.activeThreadId, action),
    threads: threadsReducer(state.threads, action),
  };
}

function activeThreadIdReducer(state, action) {
  if (action.type === 'OPEN_THREAD') {
    return action.id;
  } else {
    return state;
  }
}
```

- We'll figure this out later lol.

## Defining the Initial State in the Reducers

- ???


# Tutorial Thingie
[Reference](https://www.valentinog.com/blog/react-redux-tutorial-beginners/)

- Connecting React to Redux:
  - `connect` connects a React component with the Redux store.
  - `mapStateToProps` connected a part of the Redux state to the props of a React component.
  - `mapDispatchToProps` connects Redux actions to React props.
- Provider: an HOC coming from react-redux which makes your React app aware of the entire Redux's store.
