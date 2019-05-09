# Introduction

- Routing: vue-router
- State management: `vuex`
- RxJS: `vue-rx`
- Loader for `webpack`: `vue-loader`
- Server-rendering: `vue-server-renderer`
- TypeScript decorators: `vue-rx`.
- Tools extension: `vue-devtools`

- Core library: view layer only.
- Declarative rendering.
- `v-bind` are special attributes provided by Vue.
- Handling user input:
  - `v-on` to attach event listeners
  - `v-model` directive to make two-way binding between form input and app state easy
- Component - a Vue instance with pre-defined options

# The Vue Instance

- Vue is not `MVVM`, but it was inspired by it.
- So we use `vm` to refer to the instance.
- A Vue application consists of a root Vue instance created with `new Vue`, organized into a tree of nested, reusable components.
- When a Vue instance is created, it adds all the properties found in its `data` object to its reactivity system.
- Properties in `data` are only reactive if they existed when the instance was created.
- Cool shit methods: Prefaced with `$`, stuff like `$data`, `$el` to get the element...

# Lifecycle

- `beforeCreate`
- `created`
- If template exists, compile into render function, if not, compile the `outerHTML` as template.
- `beforeMount` -> Create `vm.$el` and replace `el` with it.
- `mounted`
- `beforeUpdate` and `updated` => Virtual DOM re-render and patch
- `beforeDestroy` => Tear down watchers, child components, event listeners
- `destroyed`.

# Single File Components

- Single file components = `vue` extension, made possible with Webpack and friends.
- We get syntax highlighting, CommonJS modules, component-scoped CSS.
- Then we can also put stuff like Pug, Babel, Stylus for cleaner and more feature-rich components.
- Separation of concerns: **Separation of concerns is not equal to separation of file types.** Instead of dividing the codebase into three huge layers that interweave with one another, it makes much more sense to divide them into loosely-coupled components and compose them.
- A component's template, logic, and styles are inherently coupled, and collocating them actually makes the component more cohesive and maintainable.
- You can also split them using hot-reloading/pre-compilation by separating your JS and CSS into separate files!

# Scaling

- Vuex: Elm-inspired state management solution that integrates deeply into Vue.
- Vue's companion libraries for state management are officially supported and kept up-to-date with the core library.
- CLI project generator.

# Vs AngularJS

- Simple than AngularJS.
- Vue is more flexible/modular.
- Vue CLI aims to be standard tooling baseline for the Vue ecosystem.
- One-way data flow = easier to reason about.
- **Directives = DOM manipulations only**. Components = self-contained units that have their own view and data logic.
- Dirty checking: AngularJS becomes slow when there are a lot of watchers.

# Vs Angular

- TypeScript?
- Less opinionated than Angular.
