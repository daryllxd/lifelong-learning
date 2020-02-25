# Implementing Control Value Accessor in Angular
[Reference](https://medium.com/@majdasab/implementing-control-value-accessor-in-angular-1b89f2f84ebf)

- CVA prerequisites:
  - Import `ControlValueAccessor` and `NG_VALUE_ACCESSOR`, as well as `forwardRef`.
  - Then, do the `provider: NG_VALUE_ACCESSOR` syntax in the component decorator.
- Implementing the methods:
  - `onChange`: The callback function to register on UI change.
  - `onTouch`: The callback function to register on element touch.
  - `set value(val: any)`: Sets the value used by the `ngModel` of the element.
  - `writeValue(value: any)`: Will write the value to the view if the value changes occur on the model programmatically.
  - `registerOnChange (fn: any)`: When the value in the UI is changed, this method will invoke a callback function.
  - `registerOnTouch(fn: any)`: When the element is touched, this method will get called.

# Using ControlValueAccessor to Create Custom Form Controls in Angular
[Reference](https://alligator.io/angular/custom-form-control/)

- Starring component:

```
import { Component } from '@angular/core';

@Component({
  selector: 'rating-input',
  template: `
    <span
      *ngFor="let starred of stars; let i = index"
      (click)="rate(i + (starred ? (value > i + 1 ? 1 : 0) : 1))">
      <ng-container *ngIf="starred; else noStar">⭐</ng-container>
      <ng-template #noStar>·</ng-template>
    </span>
  `,
  styles: [`
    span {
      display: inline-block;
      width: 25px;
      line-height: 25px;
      text-align: center;
      cursor: pointer;
    }
  `]
})
export class RatingInputComponent {

  stars: boolean[] = Array(5).fill(false);

  get value(): number {
    return this.stars.reduce((total, starred) => {
      return total + (starred ? 1 : 0);
    }, 0);
  }

  rate(rating: number) {
    this.stars = this.stars.map((_, i) => rating > i);
  }

}
```

- In order to make the `RatingInputComponent` behave as though it were a native input, we need to tell Angular how to do a few things:
  - Write a value to the input: `writeValue`.
  - Register a function to tell Angular when the value of the input changes - `registerOnChange`.
  - Register a function to tell Angular when the input has been touched - `registerOnTouched`.
  - Disable the input: `setDisabledState`.
- These make up the `ControlValueAccessor` interface, the bridge between a form control and a native element or custom input component. ***Once our component implements that interface, we need to tell Angular about it by providing it as an `NG_VALUE_ACCESSOR` so it can be used.***
