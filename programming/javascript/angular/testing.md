# Angular — A Comprehensive guide to unit-testing with Angular and Best Practices
[Reference](https://medium.com/bb-tutorials-and-thoughts/angular-a-comprehensive-guide-to-unit-testing-with-angular-and-best-practices-e1f9ef752e4e)

- `TestBed`: A dynamically constructed test module which emulates an Angular `NgModule`. The metadata that goes into `TestBed.configureTestingModule()` and `@NgModule` are pretty similar, and this is where we actually configure the spec file.
- `compileComponents()` method: This is async because we read these files from the file system before we even create a component, and this is asynchronous (why it's placed inside an async function).
- This is also why we have two `beforeEach` functions, one to asynchronously get everything, and one that is run after the first block which is when we create the actual specs.
- `NO_ERRORS_SCHEMA`: Causes us to just ignore the non-recognized elements in the test.
- Best practices:
  - Testing services: spy from jasmine.
  - When subscribing to observables, have both success and failure callbacks.
  - When testing components with service dependencies, use mock services instead of real services.
  - Access components with `debugElement`, not `nativeElement` as that is an abstraction for the underlying runtime environment.
  - `By.css` instead of `queryselector` if running the app on the server: because `queryselector` works only in the browser.
  - `fixture.detectChanges()` vs `ComponentFixtureAutoDetect`.
  - `compileComponents()` if running the tests in the non-CLI environment.
  - `PageObject` model for reusable functions across components.
  - Can use component stubs instead of `NO_ERRORS_SCHEMA` to interact with both components if necessary.

# Angular Testing: `async` and `fakeAsync`
[Reference](https://alligator.io/angular/testing-async-fakeasync/)

- `async` tells Angular to run the code in a dedicated test zone that intercepts promises.
- `whenStable`: this allows us to wait until all promises have been resolved to run our expectations.

```
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  template: `<h1<{{ title }}</h1>

  <button (click)="setTitle()" class="set-title">
    set title
  </button>
  `
})
export class AppComponent {
  title: string;

  setTitle() {
    new Promise(resolve => {
      resolve('One crazy app!');
    }).then((val: string) => {
      this.title = val;
    });
  }
}
```

- When the button is clicked, the title property is set using a promise. And to test the functionality using `async` and `whenStable`:

```
describe('AppComponent', () => {
  it('should display title', async(() => {
    debugElement
      .query(By.css('.set-title'))
      .triggerEventHandler('click', null);

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const value = debugElement.query(By.css('h1')).nativeElement.innerText;
      expect(value).toEqual('One crazy app!');
    });
  }));
});
```

- `fakeAsync`: this makes things faster in the tests.
- `tick` is inside a `fakeAsync` block to simulate the passage of time.
- `flush`: Simulates the passage of time until the macrotask queue is empty. `Macrotask` includes things like `setTimeouts` , `setIntervals`, and `requestAnimationFrame`.

```
  it('should increment in template after 5 seconds', fakeAsync(() => {
      debugElement
        .query(By.css('button.increment'))
        .triggerEventHandler('click', null);

      tick(2000);
      fixture.detectChanges();
      let value = debugElement.query(By.css('h1')).nativeElement.innerText;
      expect(value).toEqual('0'); // value should still be 0 after 2 seconds

      tick(3000);
      fixture.detectChanges();

      const value = debugElement.query(By.css('h1')).nativeElement.innerText;
      expect(value).toEqual('1'); // 3 seconds later, our value should now be 1
    }));
```

# RxJS in Angular: When To Subscribe? (Rarely)
[Reference](https://medium.com/angular-in-depth/when-to-subscribe-a83332ae053)

- In Services: Never subscribe. They exist to provide data to other entities. A component or directive needs some data, it asks a service, and that service returns an Observable that will eventually supply that data. There's no reason for the service itself to subscribe.
