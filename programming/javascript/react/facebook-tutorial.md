## Tutorial: Into to React
[Reference](https://reactjs.org/tutorial/tutorial.html)

- It's `onClick`, not `onclick`.
- Initializing state: constructor class always, with `super(props)`.
- React Dev tools is a thing!
- Benefits of Immutability
  - Easier undo/redo, time travel.
  - Tracking changes.
  - Determining when to re-render. Pure components. Since immutable data can more easily determine if changes have been made, it also helps to determine when a component requires being re-rendered.
    - `shouldComponenteUpdate`.
- Functional components: for types that only consist of a `render` method.
  - What is a pure component?
- In their case, to accommodate moving across game states, they created another component above `Board`.

``` js
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
    };
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}
```

- File Structure: Either by features/routes or by file types.
- Passing functions to components:
  - Pass event handlers and other functions are props to child components. `<button onClick={this.handleClick}>`
  - Binding a function to a component instance: `this.props` and `this.state`. Arrow functions in rendering.
  - Why is binding necessary?
  - **With React, typically you only need to bind the methods you pass to other components. For example, `<button onClick={this.handelClick}>`**
- If your function is being called every time the component renders, then make sure you aren't calling the function (no params) when you pass it to the component.
- Passing a parameter to an event handler or callback:
  - `<button onClick={() => this.handleClick(id)} />`
  - Same as `<button onClick={this.handeClick.bind(this, id)}>`
  - You can also pass via DOM APIs (`data-letter`).
- Preventing a function from being called too quickly or too many times in a row?
  - Throttling, debouncing, `requestAnimationFrame` throttling.

- Component State
  - `setState()` schedules an update to a component's `state` object. When state changes, the component responds by re-rendering.
  - **`props` get passed to the component, while `state is managed within the component.**
