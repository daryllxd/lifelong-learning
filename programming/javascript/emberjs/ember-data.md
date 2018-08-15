# Ember Data
[Reference](https://github.com/emberjs/data)

- Designed to be agnostic to the underlying persistence mechanism, so it works just as well with JSON APIs over HTTP as it does with streaming WebSockets or local IndexedDB storage.
- Instantiating the Store: every time you need a model or a collection of models, ask the store for it. To create a store, you don't need to do anything, by loading the Ember Data library, all of the routes/controllers in your app will get a new `store` property. This is an instance of `DS.Store` that will be shared across all of the routes and controllers in your app.

```
// app/models/blog-post.js
import DS from 'ember-data';

const { attr, hasMany } = DS;

export default DS.Model.extend({
  title: attr('string'),
  createdAt: attr('date'),

  comments: hasMany('comment')
});

// app/models/comment.js
import DS from 'ember-data';

const { attr, belongsTo } = DS;

export default DS.Model.extend({
  body: attr('string'),
  username: attr('string'),

  post: belongsTo('blog-post')
});
```

- ED uses adapters to know how to talk to your server. An adapter is an object that knows how to translate requests from Ember Data into requests on your server.
- `this.store.findAll('blog-post')`: returns a promise that resolves to the collection of records.
- `this.store.findRecord('blog-post', 123)`: Returns a promise that resolves to the requested record. If the record can't be found, the promise will be rejected.
