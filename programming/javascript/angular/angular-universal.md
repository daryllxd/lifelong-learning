# Server Side Rendering with Angular Universal
[Reference](https://alligator.io/angular/angular-universal/)

- Single-page Apps (SPA) are aptly named - there is literally only on single HTML document that is served initially to a client. Any new views that are required in the app are generated solely on the client via JS.
- SSR: You lose the ability for web crawlers to traverse  your app, and there is slower performance while the app is loading.
- ***Angular Universal let's you run your Angular app on the server. This enables you to serve static HTML to the client.*** With Angular Universal, the server will pre-render pages and show your users something, while the client-side app loads in the background. Then, once everything is ready client-side, it will seamlessly switch from showing the server-rendered pages to the client-side app.
- SSR with Angular Universal requires changes in both the client application and the server stack to work. For this article, we'll assume this is a brand new Angular application.
- Just about any server technology can run a Universal app, but it has to be able to call a special function, `renderModuleFactory()`, provided by Angular Universal, which is itself a Node package, so Node makes most sense.

## Adding Universal to the App:

- `$ ng add @nguniversal/express-engine --clientProject {{ name of your project }}`

- `angular.json`: `projects.{{project-name}}.architect.build.options.outputPath` has changes to `dist/browser`, and a new `projects.{{project-name}}.architect` is added, called `server`. This lets the Angular CLI know about our server/Universal version of the Angular application.
- `package.json`: Some new scrips: `compile:server`, `server:ssr`, `build:ssr`, `build:client-and-server-bundles`.
- `server.ts`: The NodeJS Express server.
- `main.ts`: Modified so that the browser version of the app won't start bootstrapping until the Universal-rendered pages have been fully loaded.
- `main.server.ts`: `AppServerModule`, which is the entry point of the Universal version of the application.
- `tsconfig.server.json`: Where to find the entry module.
- `app.module.ts`: Modified to execute static method `withServerTransition` on the imported `BrowserModule`. This tells the browser version of the application that the client will be transitioning in from the server version at some point.
- `app.server.module.ts`: The root module for the server version only.
- Starting: `npm run build:ssr && npm run serve:ssr`
