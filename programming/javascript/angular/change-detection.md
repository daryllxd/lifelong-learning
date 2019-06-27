# A Comprehensive Guide to Angular `onPush` Change Detection Strategy
[Reference](https://netbasal.com/a-comprehensive-guide-to-angular-onpush-change-detection-strategy-5bac493074a4)

- By default, A uses the `ChangeDetectionStrategy.Default` change detection strategy.
  - Doesn't assume anything about the app - so ***every time something changes in our application, as a result of various stuff, this will run on all components.***
  - Every time you click the button, A runs a change detection cycle.
  - Dirty checking: A needs to check the new value, compare it with the old one, and make the decision on whether the view should be updated.
- `ChangeDetectionStrategy.OnPush`
  - We want to make A work with immutable objects.
  - To trigger a change detection in the component, we need to trigger the actual object reference, not the key (just check the article):

```
Good
onClick() {
  this.config = {
    position: 'bottom'
  }
}

Bad
onClick() {
  this.config.position = 'bottom';
}
```

- Running change detection explicitly:
  - `detectChanges()`: run change detection on the component and its children.
  - `ApplicationRef.tick()`, telling Angular to run change detection for the whole application.
  - `markForCheck()`: does not trigger change detection, instead it marks all `onPush` ancestors as to be checked once.

