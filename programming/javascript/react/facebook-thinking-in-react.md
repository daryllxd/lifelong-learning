# Thinking in React
[Reference](https://reactjs.org/docs/thinking-in-react.html#step-4-identify-where-your-state-should-live)

- ***Step 1: Break the UI into a Component Hierarchy.***
  - Identify the components in our mock, and let's arrange them into a hierarchy. Components that appear within another component in the mock should appear as a child in the hierarchy.
- ***Step 2: Build a Static Version in React.***
  - Don't use state at all to build this static version.
  - State is reserved only for interactivity.
- ***Step 3: Identify the Minimal, but Complete, Representation of UI State.***
  - To make your UI interactive, you need to be able to trigger changes to your underlying data model. React makes this easy with `state`.
  - State:
    - Is it passed in from a parent via props? Probably not a state.
    - Remain unchanged over time? Probably isn't a state.
    - Can you compute it based on any other state or props in your component? Not a state.
    - Ex:
      - Original list of products are passed in as props, so that's not state.
      - The search text and the checkbox seem to be state since they change over time and can't be computed from anything.
      - Search text, checkbox are state because they can change over time and can't be computed from anything.
- ***Step 4: Identify Where Your State Should Live.***
  - For each piece of state:
    - Identify every component that renders something based on that state.
    - Find a common owner component (a single component above all the components that need the state in the hierarchy).
    - Either the common owner or another component higher up in the hierarchy should own the state.
    - **If you can't find a component where it make sense to own the state, create a new component simply for holding the state and add it somewhere in the hierarchy above the common owner component.**
