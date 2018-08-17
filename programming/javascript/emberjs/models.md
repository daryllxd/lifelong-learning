# Introduction
[Reference](https://guides.emberjs.com/release/models/)

- Models: usually persistent, and loaded from a server, and could be stored in IndexedDB.
- Ember Data: integrates tightly with Ember to make it easy to retrieve models from the server as JSON, save updates back to the server, and create new models in the browser.
- Adapter pattern: ED can be configured to work with many different kinds of backends. Can work with streaming servers, can use AJAX to fetch raw JSON.

``` js
import Component from '@ember/component';

export default Component.extend({
  willRender() {
    $.getJSON('/drafts').then(data => {
      this.set('drafts', data);
    });
  }
});

<ul>
  {{#each drafts key="id" as |draft|}}
    <li>{{draft.title}}</li>
  {{/each}}
</ul>
```

- It can happen that you have redundant data fetching when the app has two separate requests for the same information. This is bad because the two values get out-of-sync. Tight coupling between the UI and the network code, so a change in the JSON payload = breaking UI components.
- Ember Data gives you a single store that is the central repository of models in your application. Routes and their corresponding controllers can ask the store for models, and the store is responsible for knowing how to fetch them.
- **It also means that the store can detect that two different components are asking for the same model, allowing your app to only fetch the data from the server once. You can think of the store as a read-through cache for your app's models.** Both routes and their corresponding controllers have access to this shared store; when they need to display or modify a model, they first ask the store for it.
- Convention over configuration: when you use JSON API as a convention, as long as that format is followed, Ember works.

## Models

- In ED, each model is represented by a subclass of `Model` that defines the attributes, relationships, and behavior of the data that you present to the user.
- Models: Don't have data, but they define the attributes, relationships, and behavior of specific instances, called records.
- Record: an instance of a model. This is uniquely identified by its model type and ID. ID can be assigned by server or generated client-side.

``` js
import DS from 'ember-data';

export default DS.Model.extend({
  firstName: DS.attr('string'),
  birthday:  DS.attr('date')
  lineItems: DS.hasMany('line-item')
  order: DS.belongsTo('order')
});
```

## Adapter + Caching

- Something that translates requests from Ember into requests to a server. If the thing doesn't exist in the cache, it asks from the adapter.
- The store will automatically cache records for you. If a record has already been loaded, asking for it a second time will always return the same object instance.
- Identity map: ensures that the changes you make in one part of the UI are propagated to other parts of the UI. You can also ask for a record by ID and not worry about whether other parts of your application have already asked for and loaded it.
- Cache invalidation: ED will make a request in the background each time a cached record is returned from the store. When the new data comes in, the record is updated/template re-rendered.

## Architecture Overview

- When the application asks the store for a record, the store sees that it doesn't have a local copy and requests it from your adapter. While this thing is being waited for, the adapter makes an asynchronous request to the server, and only when that request finishes can the record be created with its backing data.
- The store returns a promise because of asynchronicity. So what really happens: Cloud returns XHR, which the adapter resolves to JSON, then resolves the promise and converts it to an application record.
- When the record is in the cache, you resolve the record promise and get sent it back to the application.

# Models

- `computed` property: combine or transform primitive attributes.

``` js
  fullName: computed('firstName', 'lastName', function() {
    return `${this.get('firstName')} ${this.get('lastName')}`;
  })
```

- Transforms: combine to cast the JSON to something that can be used in the app.

``` js
export default DS.Model.extend({
  name: DS.attr('string'),
  age: DS.attr('number'),
  admin: DS.attr('boolean'),
  birthday: DS.attr('date') // Javascript data object
});
```

- Custom transforms: `ember generate transform dollars`
  - Serialize: to the format a client expects, deserialize: to the format of the persistence layer.

```
export default DS.Transform.extend({
  deserialize(serialized) {
    return serialized / 100; // returns dollars
  },

  serialize(deserialized) {
    return deserialized * 100; // returns cents
  }
});
```

- You can also take a hash of options as a second parameter: `defaultValue`.

# Finding Records

- `this.get('store').findRecord('blog-post', 1).then( function(blogPost) { ... });`
- `peekRecord`: retrieve by type and ID without making a network request. `let blogPost = this.get('store').peekRecord('blog-post', 1);`
- `findAll()`, `peekAll()`.
- `DS.RecordArray` is not a JS array, it's an object that implements `Ember.Enumerable`, which means it accesses its objects by `objectAt(index)`, not by `[]`.
- Query as filter:

``` js
// GET to /persons?filter[name]=Peter
this.get('store').query('person', {
  filter: {
    name: 'Peter'
  }
}).then(function(peters) {
  // Do something with `peters`
});
```
