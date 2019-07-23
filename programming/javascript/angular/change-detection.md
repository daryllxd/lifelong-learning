# A gentle introduction into change detection in Angular
[Reference](https://blog.angularindepth.com/a-gentle-introduction-into-change-detection-in-angular-33f9ffff6f10)

- `ExpressionChangedAfterItHasBeenCheckedError`:
- Two blocks of change detection in Angular:
  - A component view
  - The associated bindings
  - As the compiler analyzes the template, it identifies properties of the DOM elements that may need to be updated during change detection. For each such property, the compiler creates a binding.
- ***When Angular checks a view, it runs over all bindings generated for a view by the compiler. It evaluates expressions and compares their result to the values stored in the `oldValues` array on the view.*** If it detects the difference, it updates the DOM property relevant to the binding, then puts the new value into the old values array on the view.
- Now, after each CDC, Angular runs SYNCHRONOUSLY another check to ensure that same values are produced. Not part of the original CDC. This time, as Angular detects the difference, it doesn't update the DOM. Instead, it throws `ExpressionChangedAfterItHasBeenCheckedError`.
  - Why does this error happen? Just so it can't endlessly check if changes are applied. We can end up in an infinite loop of CDCs.
- Unidirectional data flow: after this check and the expression change, you can no longer update the properties of the component that are used in expressions for bindings.
- All timing events, like `setInterval`, trigger change detection in Angular. That means that with this implementation, we could end up with a ton of CDCs. We will want a way to run `setInterval` and not trigger change detection.
- ***As opposed to React, CD in Angular can be triggered completely automatically as a result of any async even in a browser.***
  - This is made possible by using `zone.js`. Zones are not part of the CD mechanism in Angular. With Zone, we can interpret async events and notify Angular about them.
- `ngZone`: The zone that Angular runs in. Angular only gets notifications about events that occur inside this zone.
  - So, you can use `zone.js` to run code in a zone outside of Angular, Angular is not notified, and no change detection. `runOutsideAngular`.
  - You can use `NgZone` to run code outside of Angular to avoid triggering CD as an optimisation technique.
- Order of operations:
  - Because of unidirectional data flow restriction, you can't change some properties of a component during CD after this component has been checked.
  - You can still inject a parent component into a child component and update the parent state in a lifecycle hook.

```
@Component({
    selector: 'my-app',
    template: `
        <div [textContent]="text"></div>
        <child-comp></child-comp>
    `
})
export class AppComponent {
    text = 'Original text in parent component';
}

@Component({
    selector: 'child-comp',
    template: `<span>I am child component</span>`
})
export class ChildComponent {
    constructor(private parent: AppComponent) {}

    ngAfterViewChecked() {
        this.parent.text = 'Updated text in parent component';
    }
}
```

- Actually, Angular also triggers lifecycle hooks as part of change detection. *Some hooks are called before the rendering part when Angular processes bindings, and some are called after that.*

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

