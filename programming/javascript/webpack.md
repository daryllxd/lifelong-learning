## Webpack
[link](https://webpack.js.org/concepts/)

- Webpack: Module bundler for JS apps.
- *Entry:* Creates a graph of all of your application's dependencies. Entry point tells webpack where to start

    webpack.config.js

    module.exports = {
      entry: './path/to/my/entry/file.js'
      };

- *Output:* Where to bundle your application. This emits everything to /dist with that filename.

    const path = require('path');

    module.exports = {
      entry: './path/to/my/entry/file.js',
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'my-first-webpack.bundle.js'
      }
    };

- *Loaders:* We want the project assets to be Webpack's concern and not the browser's. Webpack treats every file (html, css, jpg..) as a module, but webpack only understands JavaScript.
- 2 purposes: `test` (which files will be transformed by a certain loader) and `use` (transform the files using this loader)

    const path = require('path');

    const config = {
      entry: './path/to/my/entry/file.js',
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'my-first-webpack.bundle.js'
      },
      module: {
        rules: [
          {test: /\.(js|jsx)$/, use: 'babel-loader'}
        ]
      }
    };

    module.exports = config;

- "Hey webpack compiler, when you come across a path that resolves to a '.js' or '.jsx' file inside of a require()/import statement, use the babel-loader to transform it before you add it to the bundle".
- *Plugins:* Since Loaders only execute transforms on a per-file basis, `plugins` are most commonly used when performing actions and custom functionality on chunks of your bundled modules.

    const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
    const webpack = require('webpack'); //to access built-in plugins
    const path = require('path');

    const config = {
      entry: './path/to/my/entry/file.js',
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'my-first-webpack.bundle.js'
      },
      module: {
        rules: [
          {test: /\.(js|jsx)$/, use: 'babel-loader'}
        ]
      },
      plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({template: './src/index.html'})
      ]
    };

    module.exports = config;

