# Compound Components

In this exercise we're going to make <Toggle /> the parent of a few compound components:

- <ToggleOn /> renders children when the on state is true
- <ToggleOff /> renders children when the on state is false
- <ToggleButton /> renders the <Switch /> with the on prop set to the on state and the onClick prop set to toggle.

// Compound Components
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import {Switch} from '../switch'

function Toggle(props) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  const tabs = React.Children.map(props.children, (child, index) => {
    const components = [ToggleOn, ToggleOff, ToggleButton];

    return React.cloneElement(child, components.includes(child.type) ? {
      index,
      on,
      toggle,
    } : {});
  });


  return tabs;
}

// Accepts `on` and `children` props and returns `children` if `on` is true
const ToggleOn = ({ on, children }) => {
  if(!on) {
    return;
  }

  return children;
}

// Accepts `on` and `children` props and returns `children` if `on` is false
const ToggleOff = ({ on, children }) => {
  if(on) {
    return;
  }

  return children;
}

// Accepts `on` and `toggle` props and returns the <Switch /> with those props.
const ToggleButton = ({on, toggle }) => {

  return <Switch on={on} onClick={toggle} />
}

function App() {
  return (
    <div>
      <Toggle>
        <ToggleButton />
        <ToggleOn><code>The button is on</code></ToggleOn>
        <span>Hello</span>
        <ToggleOff>The button is off</ToggleOff>
      </Toggle>
    </div>
  )

}

export default App

# Flexible Compound Components

- What if they are nested in the div?
