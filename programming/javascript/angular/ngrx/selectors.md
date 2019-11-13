# NGRX Store: Understanding State Selectors
[Reference](https://ultimatecourses.com/blog/ngrx-store-understanding-state-selectors)

- Selectors: pure functions that take slices of state as arguments and return some state data that we can pass to our components.
- Visualise state as a tree data structure that can be serialised to JSON. To get data out of the state tree, have to traverse it to find our property of interest, and then return it.
- `this.store.select` can take in a string which is the slice of state, or it can take a function which takes in a slice of the state and return a property from the state. `this.store.select(state => state.pizzas);`
- Just like databases, we can perform data transformation from within the store by composing selectors to just return what we need.
- The `Store` class is a JS object containing a `state` property in it. To access the levels of the property, you can use dot notation.
- To get links in the chain, we can create functions that return whatever, given a state.
- Assuming the store was

```
{
  products: {
    pizzas: {
      entities: {
      }
    }
  }
}
```

- We can use things like this:

```
const getProducts = state => state.products;
const getPizzas = state => state.pizzas;
const getEntities = state => state.entities;

const entities$ = store.select(state =>
  getEntities(getPizzas(getProducts(state)))
);
```

- A selector is a *pure function that grants us direct access to the value of a state tree traversal*. We use selectors to avoid manually traversing the state tree over and over, and we get powerful, declarative, functional programming for our state management.

## Feature State Selectors

- We want to keep our app modular with feature modules and also feature selectors. `createFeatureSelector` allows us to get to a top-level feature state property of the state tree by getting the feature name.
- To slice selectors, we start with `createFeatureSelector`. Then, we walk across it with reducers?

```
// src/products/store/reducers/index.ts
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromPizzas from './pizzas.reducer';
import * as fromToppings from './toppings.reducer';

export interface ProductsState {
  pizzas: fromPizzas.PizzaState;
  toppings: fromToppings.ToppingsState;
}

export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: fromPizzas.reducer,
  toppings: fromToppings.reducer,
};

export const getProductsState = createFeatureSelector<ProductsState>('products');
```

- `createSelector` can take up to eight selector functions as arguments, with each one referencing different slices of state. The last argument is the projector function.
- Entities - represent a way of normalising data structures by using unique IDs as references to them. It makes data look up very easy, fast, and composable.
- Selectors are memoised.

# How I test my NgRx selectors
[Reference](https://blog.angularindepth.com/how-i-test-my-ngrx-selectors-c50b1dc556bc)

- First approach: Calling the selectors with the selected state.
- Second approach: Snapshots. Create a test cases array, then loop over them and invoke the selector with the state, and the output for all the test cases will create the snapshot.
- Third approach: Projector function?
