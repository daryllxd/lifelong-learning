# Redux, Do I have to import store in all my containers if I want to have access to the data?
[Reference](https://stackoverflow.com/questions/35300419/redux-do-i-have-to-import-store-in-all-my-containers-if-i-want-to-have-access-t)


- In general, you want to only make top-level container components ones that have access to the store.
- Smart components = know about the Redux store/state, dumb components just get passed to them and have no idea about the bigger application state.
- Provider component: you wrap your whole app with it.

``` js
import createStore from '../store';

const store = createStore()

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <MainAppContainer />
      </Provider>
    )
  }
}
```

- Usually there is a separate config file for the store, for things like `compose` to apply middleware.
- The remaining "smart" components need to listen to the store using the `connect` method. This allows you to map pieces of the state to your component properties as well as dispatch actions as properties.
- What is `mapStateToProps` and `mapDispatchToProps`?


```
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from './actionCreators';
```
