# Presentational and Container Components
[Reference](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)

- Presentational components:
  - Concerned with how things look.
  - May contain both presentational and container components inside.
  - Allow containment via `this.props.children`.
  - No dependencies on the rest of the app.
  - Don't specify how the data is loaded or mutated.
  - Receive data and callbacks exclusively via props.
  - Rarely have their own state, and when they do, it's UI state rather than data.
  - Are written as functional components until they need state, lifecycle hooks, or performance optimizations.
  - Examples: "Page", "Sidebar", "Story", "`UserInfo`", "List".

- Container components:
  - Are concerned with how things work.
  - May contain both presentational and container components inside, but usually don't have any DOM markup of their own except for some wrapping divs.
  - Provide the data and behavior to presentational or other container components.
  - Call Flux actions and provide these as callbacks to the presentational components.
  - Are often stateful, as they tend to serve as data sources.
  - Usually generated using higher order components.
  - Examples: `UsersPage`, `FollowersSidebar`, `StoryContainer`, `FollowedUserList`.

- **Components don't have to emit DOM, they only need to provide composition boundaries between UI concerns.**

## When to Introduce Containers?

- I suggest building your app with just presentational components first, and eventually you'll realize that you are passing too many props down the intermediate components.
- When you notice that some components don't use the props they receive, but merely forward them down and you have to rewire all those intermediate components any time the children need more data, it's a good time to introduce some container components.

## Comments

- Data concerns are in the smart components, because it replicates the conventional controller-view relationship.
- You can always extract the presentational part that accepts children as props from a "mixed" component. Or you can make the child component type configurable as a prop, with the container component type being the default value.
- Redux is your M, React is your V and C.

# Gist
[Reference](https://gist.github.com/chantastic/fc9e3853464dffdb1e3c)

- In practice, React is the V and the C. This is bad because it has both a presentation and data concern.

``` jsx
// CommentList.js
// Bad because it has both presentation and data concerns
import React from "react";

class CommentList extends React.Component {
  constructor() {
    super();
    this.state = { comments: [] }
  }

  componentDidMount() {
    fetch("/my-comments.json")
      .then(res => res.json())
      .then(comments => this.setState({ comments }))
  }

  render() {
    return (
      <ul>
        {this.state.comments.map(({ body, author }) =>
          <li>{body}-{author}</li>
        )}
      </ul>
    );
  }
}
```

### Better example

``` jsx
// CommentList.js
import React from "react";

const Commentlist = comments => (
  <ul>
    {comments.map(({ body, author }) =>
      <li>{body}-{author}</li>
    )}
  </ul>
)
```

``` jsx
// CommentListContainer.js
import React from "react";
import CommentList from "./CommentList";

class CommentListContainer extends React.Component {
  constructor() {
    super();
    this.state = { comments: [] }
  }

  componentDidMount() {
    fetch("/my-comments.json")
      .then(res => res.json())
      .then(comments => this.setState({ comments }))
  }

  render() {
    return <CommentList comments={this.state.comments} />;
  }
}
```

# Container Components
[Reference](https://medium.com/@learnreact/container-components-c0e67432e005)

- A container does data fetching and then renders its corresponding sub-component. That's it.

``` jsx
class CommentListContainer extends React.Component {
  state = { comments: [] };
  componentDidMount() {
    fetchSomeComments(comments =>
      this.setState({ comments: comments }));
  }
  render() {
    return <CommentList comments={this.state.comments} />;
  }
}
```

``` jsx
const CommentList = props =>
  <ul>
    {props.comments.map(c => (
      <li>{c.body}—{c.author}</li>
    ))}
  </ul>

```
