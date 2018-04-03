# Full Stack React

- Uncontrolled component: React does not "control" how the `value` is rendered. This means that knowing the application state is not enough to predict what the page looks like.
- Because the could have typed (or not typed) input into the field, the only way to know what the input field looks like is to access it via `refs` and change its `value`.

# Forms
[Reference](https://reactjs.org/docs/forms.html)

- Form elements such as `<input>`, `<textarea>`, and `<select>` typically maintain their own state and update it based on user input.
- In React, mutable state is kept in the state property of components, and only updated with `setState()`.
- We combine the two by making the React state be the "single source of truth".

``` js
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

