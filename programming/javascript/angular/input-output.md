# Sharing data between child and parent directives and components
[Reference](https://angular.io/guide/inputs-outputs)

- To watch out changes for `@Input`, can use `OnChanges`.
- `Output`: The doorway through which data can travel from child to parent.
  - `EventEmitter` - the class that you use to emit custom events.
  - `new EventEmitter<string>` - create an EE and that the data it emits is of type string.
-

