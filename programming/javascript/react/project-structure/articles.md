# The 100% correct way to structure a React app (or why there’s no such thing)
[Reference](https://hackernoon.com/the-100-correct-way-to-structure-a-react-app-or-why-theres-no-such-thing-3ede534ef1ed)

- ***The only thing you're trying to do when deciding on a file structure is to maximize how easily you can navigate through your code. Your "files" are nothing more than markers to parts of the code that will wind up being a single chunk of JS at the end of the day.***
- Figure out the most common activities:
  - Change tab to another open file.
  - Open a known file.
  - Jump to source.
  - Import one module into another.
  - Browse for a file I don't know the name of.
  - Create new component.
- (I prefer naming it `HeaderNav` rather than `Nav` because I open files by typing names in.)

## Container Components

- TODO.

# Techniques for decomposing React components
[Reference](https://medium.com/dailyjs/techniques-for-decomposing-react-components-e8a1081ef5da)

- Split the `render()` method: `const PanelHeader`, `const PanelBody`.
- Pass React elements as props: For comments, one component to serve as a template, and one component to figure out what to fill `metadata` and possible actions (like, reply, and delete)
- Higher-order components. Ex: Add analytics to a specific component.

Obvious solution:

``` js
class Document extends React.Component {
  onClick = (e) => {
    if (e.target.tagName === 'A') { // Naive check for <a> elements
      sendAnalytics('link clicked', {
        documentId: this.props.documentId // Specific information to be sent
      });
    }
  };
}
```

- The component now has a concern re: displaying a document.
- The analytics code is not reusable.
- Refactoring the component is harder, because you have to work around the analytics code.
- Higher-order components: functions that can be applied to any React component, wrapping that component with a desired behavior.

``` js
function withLinkAnalytics(mapPropsToData, WrappedComponent) {
  class LinkAnalyticsWrapper extends React.Component {
    onClick = (e) => {
      if (e.target.tagName === 'A') { // Naive check for <a> elements
        const data = mapPropsToData ? mapPropsToData(this.props) : {};
        sendAnalytics('link clicked', data);
      }
    };

    render() {
      // Simply render the WrappedComponent with all props
      return <WrappedComponent {...this.props} />;
    }
  }

  return LinkAnalyticsWrapper;
}

class Document extends React.Component {
  render() {
    // ...
  }
}

export default withLinkAnalytics((props) => ({
  documentId: props.documentId
}), Document);
```

- You add a new wrapping component which adds behavior to the original `Document` component. (Decorator?)
- Used in `react-redux`, `styled-components`, and `react-intl`.
