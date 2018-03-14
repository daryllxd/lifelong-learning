# Full-stack React

- React, client-side routing, Redux, GraphQL, Relay (glue between GraphQL and React), React Native.

## Part 1

- Semantic UI: framework like Bootstrap.
- Components: Hierarchy of one parent component and many child components.
- Is there a pre-processor/.
- `.render()` is the only required method for a React component. React uses the return value from this method to determine what to render to the page.
- ES6 classes: syntactical sugar over JavaScript's prototype-based inheritance model.
- To declare React components:
   - ES6 classes.

```
class HelloWorld extends React.Component {
  render() { return(<p>Hello, world!</p> }
}

// It's the same as this:

import createReactClass from 'create-react-class';

const HelloWorld = createReactClass({
  render() { return(<p>Hello, world!</p> }
});
```

- JSX: Javascript Extension Syntax. Using JSX enables us to write the markup for our component views in a familiar, HTML-like syntax.
  - The `render()` method of a component needs to describe how the view should be represented as HTML.

### Babel

- Babel is a JS transpiler. It turns ES6 into ES5 code. It also understands JSX a.

### To actually render shit:

- Need to include `react-dom.js`.
- `ReactDOM.render([what], [where]);`
- `ReactDOM.render(<ProductList/>, document.getElementById('content'));`

- We cannot use any reserved JavaScript words in JSX.
- The JSX components return is NOT actually the HTML that gets rendered, but is the representation that we want React to render in the DOM.
- `this.props` → Can't see the contents of props?

### Your app's first interaction

- While the child can read its props, it can't modify them. A child does not own its props. The parent component owns the props given to Product.
- One-way data flow, changes come from the top of the app and are propagated downwards through its various components.
- We can pass down functions as props too. We can have the `ProductList` component give each `Product` component a function to call when the upvote is clicked. Functions passed down through props are the canonical manner in which children communicate events with their parent components.

### Passing shit downward:

- Inside `render()`, we say that `this` is "bound" to the component. Put another way, `this` references the component.
- For the `render()` function, React binds `this` to the component for us. Same with `componentDidMount()` and other methods. But when we create new methods, we have to manually bind `this` to the component ourselves.

### Using state

- Whereas props are immutable and owned by a component's parent, state is owned by the component. `this.state` is private to the component and can be updated by `this.setState()`.
- Every React component is rendered as a function of `this.props` and `this.state`. The rendering is deterministic. This means that give a set of props and a set of state, a React component will always render a certain way.
- Because we are mutating the data for our products, we should consider this data to be stateful.
  - `ProductList` will be the owner of this state. It will pass the state down as props to `Product`.
  - At the moment, `ProductList` is reading directly from `Seed` inside `render()` to grab the products.
  - Initial state: constructor.

```
class ProductList extends React.Component {
  // Defining an
  handleProductUp(productId, productName) {
    // There's no such thing as
    // stuff = [productId]
    // You have to do const stuff or var stuff
    var stuff = [productId, productName, 'was voted'];

    console.log(stuff.join(' '));
  }

  render() {
    // Sorting: This actually mutates the array
    const sortedProducts = Seed.products.sort((a, b) => ( b.votes - a.votes ));

    const productComponents =  sortedProducts.map(
      (product) => (
        // You need to pass in the 'key' just for React to internally know which Product is which
        // There is also no method called this.props.key inside the Product
        <Product
          key={'product' + product.id }
          id={product.id }
          title={product.title}
          description={product.description}
          url={product.url}
          votes={product.votes}
          submittedAvatarUrl={product.submittedAvatarUrl}
          productImageUrl={product.productImageUrl}
          onVote={this.handleProductUp}
        />
      )
    );

    // Remember, put everything before the return
    return (
      <div className='ui unstackable items'>
        {productComponents}
      </div>
    );
  }
}

class Product extends React.Component {
  // JS special constructor method.
  constructor(props) {
    super(props);

    // Remember your best friend, the JS "this"? It's back.
    // For the React lifecycle methods like `render`, `this` is automatically bound to the component that we are using.
    // For created methods like `handleUp`, we have to explicitly set the `this` to be the handler.
    // Why this type of syntax? I have no idea. F JS.
    this.handleUp = this.handleUp.bind(this);
  }

  // Defined own method, that calls the method above it, to update things below?
  handleUp() {
    this.props.onVote(this.props.id, "pants");
  }

  // You always need a return from the render function.
  // If you want to render nothing, then render null;
  render()  {
    return (
      <div className='item'>
        <div className='image'>
          <img src={ this.props.productImageUrl }/>
          <p></p>
        </div>
        <div className='middle aligned content'>
          <div className='header'>
            <a onClick={this.handleUp}>
              <i className='large caret up icon'/>
            </a>
          </div>
          <div className='description'>
            <a>{ this.props.title }</a>
            <p>{ this.props.description }</p>
            <a>{ this.props.votes }</a>
          </div>
          <div className='extra'>
            <span>Submitted by:</span>
            <img
              className='ui avatar image'
              src='images/avatars/daniel.jpg'
            />
            <p>
              Hello
            </p>
            props
          </div>
        </div>
      </div>
    );
  }
}


ReactDOM.render(
  <ProductList />,
  document.getElementById('content')
);
```

### Components

- `server.js`: Last time, we used a pre-built Node package called `live-server` to serve our assets.
- Components:
  - `TimersDashboard`
    - `TimersList`
      - `Timer`
    - `ToggleableTimerForm`: The plus sign. This transmutes into a form. When the form is closed, the widget transmutes back into a "+" button.
- We want the `ToggleableTimerForm` to either render a `TimerForm` or a "+" button.
- Displaying a timer and editing a timer are also two distinct UI elements. These should be two distinct React components.
  - `EditableTimer`: Can either be a `Timer`, or a `TimerForm`.

- For the `ProductList` in the last chapter, we can probably hoist sort responsibility up to a parent component and
- ***Ultimately, the top-level component will communicate with a server. The server will be the initial source of state, and React will render itself according to the data the server provides. Our app will also send updates to the server, like when a timer is started.***

- The framework:
  - Break the app into components.
  - Build a static version of the app.
  - Determine what should be stateful.
  - Determine in which component each piece of state should live.
  - Hard-code initial states.
  - Add inverse data flow.
  - Add server communication.
- You can do something like not pass something into the `TimerForm` because sometimes, the C and the U forms are the same, but not really.


133

### Components & Servers

- State management of timers takes place in the top-level compound `TimersDashboard`.
