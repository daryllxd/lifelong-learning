# How to Structure Your React Project
[Reference](https://daveceddia.com/react-project-structure/)


```
src
  - api.js              # Put all calls to the API here
  - components          # Dumb components
    - Button.js
    - Icon.js
    - UserDetail.js
    - UserList.js
  - containers          # Container components. If Redux, connected to the store
    - App.css
    - App.js
    - App.text.js
    - HomePage.js
    - UserDetailPage.js
    - UserListPage.js
  - images
    - logo.svg
  - index.js            # Where you initialize the app and call ReactDOM.render, so it makes sense to keep this at the top level.
  - utils               # Error handlers, formatters...
    - testUtils.js
```

Imports:

- In `package.json`, look for this line:
- `"start": "NODE_PATH=src react-scripts start"`
- To enable: `import Thing from components/Thing`

## Redux

- `src/redux/actions`: Create a file for each set of related actions.
- `src/redux/reducers`: Create a file for each reducer, and an `index.js` to contain the root reducer.
- `src/redux/configureStore.js`: Create and configure the store here.
- Another way: organize files by functional area rather than kind.

## Summary/Comments

- Don't stress about getting the folder structure permanent.
- Routing: `src/routes.js`, then `src/index.js` imports them and passes them to the Router.
