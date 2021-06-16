# 6 things I wish I knew about state management when I started writing React apps
[Reference](https://medium.com/@veeralpatel/things-ive-learned-about-state-management-for-react-apps-174b8bde87fb)

- State management is how you mitigate prop drilling.
  - Ex: dark mode support - to know what theme is on, they can render the UI in the right color.
  - Prop drilling is impractical when the app gets larger.
  - State management either via store or React Context is the answer.
- Put your state in the right places:
  - Data + loading state: Redux.
  - Global UI: Whether the user is logged in, value of a global search bar. Redux.
  - Local UI: Whether a dropdown is expanded. Component state.
  - Form state: Library or component state.
  - URL state: Read and update window location, don't create a second source of truth.
  - Page state: Create a Redux store or pass down as a lain JS object with context.
- Other state management:
  - Redux ORM? Boilerplate. Redux reducers feels needlessly unintuitive.  Thunk/saga?
  - MobX: Each store is a plain JS class, no boilerplate.
- React app has two layers:
  - State - a JS object, and methods that update it.
  - View layer, which turns that JS object into DOM elements.
- Shared vs non-shared components
  - Fetch data in container components?
  - Can you have container components that are rendered in more than one place?

# The 5 Types Of React Application State
[Reference](http://jamesknelson.com/5-types-react-application-state/)

- Every piece of received Data has a type and a selector.
- Communication state: status of any not-yet-complete requests to other services. Type, selector, and expected change of any operations, as well as error messages for anything which didn't go quite as planned.
- Control state: The state which the user has input into the app. Form inputs, selected items. These are not stored in the URL or the history API.
  - These just need to be available to a specific view.
- Session state- about the user using the application. Session - only read when the component is mounted.
- Location state: URL bar.
- Side effects
  - Changing location mounts container components, causing control state to change.
  - Changing location makes HTTP requests which cause communication state to change, before also causing Data state to change.
  - Changing location can cause location to change.

# Prop Drilling
[Reference](https://kentcdodds.com/blog/prop-drilling)

- Prop drilling - the process you have to go through to get data to parts of the component tree.
  - A component which doesn't actually need those values to function, but we need to accept and forward those props because its children need them.
- Answering "can I modify/delete this code without breaking anything" is difficult to answer with global variables. We want to be more explicit about where our values are used, making it much easier to track values and ease the process determining what impact your changes will have on the rest of the application.
- Problems:
  - When you need to refactor the shape of some data.
  - Over-forwarding props (passing more props that is necessary) due to moving/removing a component.
  - Under-forwarding props.
  - Renaming props.
- How to avoid:
  - Don't break out components prematurely?
  - Avoid using `defaultProps` for anything that's a required prop.
  - Use React Context API.

# Application State Management with React
[Reference](https://kentcdodds.com/blog/application-state-management-with-react)

- React is a state management library.
- Component composition if possible.
- React Context API: Can also change to `useReducer` rather than `useState` as well.
- Not everything in the app needs to be in a single state object. Keep things logically separated. Keep state as close to where it's needed as possible.
- Server cache vs UI state.
  - Server cache: state that is actually stored in the server.
  - UI state - only useful in the UI for controlling the interactive parts of our app.
  - `react-query` and `rx-query`?
- When you have state-related performance problems, the first thing to check is how many components are being re-rendered due to a state change and determine whether those components really need to be re-rendered due to that state change.
- To solve performance issues:
  - Separate your state into different logical pieces rather than in one big store, so a single update to any part of state does not trigger an update to every component in your app.
