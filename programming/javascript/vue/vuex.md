# WTF is Vuex? A Beginner’s Guide To Vue’s Application Data Store
[Reference](https://medium.com/js-dojo/vuex-for-the-clueless-the-missing-primer-on-vues-application-data-store-33fa51ffc3af)

- When you have multiple components in an application that share data, the complexity of their interconnections will increase to a point where the state of the data is no longer predictable or understandable.
- Vuex = Reactive.
- Single source of truth: Data that is to be shared between components needs to be kept in a single place, separate from the components that use it.
- This component is called the "store".

```
// Components access state from their computed properties
const MyComponent = {
  template: `<div>{{ myValue }}</div>`,
  computed: {
    myValue () {
      return store.state.myValue;
    }
  }
};
```

- Data is read-only. They cannot change data in the store, at least not directly.
- Mutations are synchronous: we should know the order that commits came in.

# Redux vs. Vuex
[Reference](https://medium.com/@Musclenun/redux-vs-vuex-9b682529c36)

- Redux:
   - Actions: objects with a `type` property and the minimum number of other properties and values that are necessary to explain the action.
   - The only way to manipulate your state is to use the `store.Dispatch()` method which takes in a type and a payload.
   - Reducers: pure functions that will always result in the same output and do not mutate the input or create side effects that are used to implement how the next state is calculated from the current state and the action.
   - In Redux, only one store, and one root reducing function. You never add a store, you only split the root reducer into smaller reducers that work on different parts of your state tree.
   - **Why it's not a fit for Vue? Because it replaces the state object on every update. React renders a virtual DOM that then calculates the most optimum DOM operations to make the currently rendered DOM match the new Virtual DOM.**
- Vuex:
  - ***Mutates the state rather than making the state immutable and replacing it entirely like with Redux's reducer functions.***
  - This allows Vue to know which need to be re-rendered when the state changes.
  - Mutations: Much like actions in Redux.
  - Actions: Functions that dispatch the mutations. They do not mutate the state directly, but only commit the mutations.

- Internalization: [Reference](https://kazupon.github.io/vue-i18n/)
