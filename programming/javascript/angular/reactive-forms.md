# How to Handle Angular Reactive Forms
[Reference](https://www.gistia.com/angular-reactive-forms/)
# Reactive Forms vs Template Forms
[Reference](https://stackoverflow.com/questions/44557477/angular-2-reactive-forms-vs-template-forms)

- Template-driven forms:
  - Writing the form using only directives in your template.
  - Good for simple forms with not much validation
  - Provides a way to create forms while writing as little JS as possible
  - Similar to AngularJS forms
  - Implicitly creates `FormControl` using directives
  - Source of truth: template
  - Two-way data binding, minimal component code
  - Input element state
  - Async

- Code-driven:
  - Write a description of the form in your component, then using directives to bind the form to the inputs, `textareas`, and selects in your template.
  - More verbose, but also more powerful
  - Avoids directives
  - Explicitly need to create `FormControl`
  - Source of truth: component class
  - Reactive transformations means can have `DebounceTime` or `DistinctUntilChanged`
  - Easy to add input elements dynamically
  - Sync

- Fundamentals
  - Make use of an explicit and immutable approach to manage the state of a form at a given point in time
  - Changes to the form state return a new state
  - Reactive forms make use of reactive programming and are built around observable streams.

``` html
<form novalidate (ngSubmit)="submitForm(user)" [formGroup]="user">
  <label>
    <span>User name</span>
    <input type="text" placeholder="Enter your username" formControlName="username">
  </label>
  <div class="error" *ngIf="user.get('username').touched && user.get('username').hasError('required')">
    The user name is required
  </div>
  <div class="error" *ngIf="user.get('username').touched && user.get('username').hasError('minlength')">
    Minimum of 2 characters.
  </div>
  <label>
    <span>Email address</span>
    <input type="email" placeholder="Enter your email address" formControlName="email">
  </label>
  <div class="error"
    *ngIf="user.get('email').hasError('required') && user.get('email').touched">
    The email is required.
  </div>
  <div class="error"
    *ngIf="user.get('email').hasError('pattern') && user.get('email').touched">
    The email is not valid.
  </div>
  <label>
    <span>Password</span>
    <input type="password" placeholder="Enter your password" formControlName="password">
  </label>
  <div class="error"
    *ngIf="user.get('password').hasError('required') && user.get('password').touched">
    The password is required.
  </div>
  <div class="error"
    *ngIf="user.get('password').hasError('pattern') && user.get('password').touched">
    The password  must be at least 8 characters long and contain lowercase, uppercase letters, numbers and special characters.
  </div>
  <button type="submit" [disabled]="user.invalid">Register</button>
</form>
```

``` ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from './../user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  user: FormGroup;
  constructor(private formBuilder: FormBuilder) {}
  ngOnInit() {
    this.user = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
    });
  }

  submitForm({ formValue, valid }: { formValue: User; valid: boolean }) {
    //console log the formValue and if it is valid
    console.log(formValue, valid);
    //Save the user info...
  }
}
```

# Reactive Forms
[Reference](https://angular.io/guide/reactive-forms)

- Reactive forms: explicit and immutable approach to managing the state of a form at a given point in time.
- Each change to the form state returns a new state, which maintains the integrity of the model between changes. Reactive forms are built around observable streams, where form inputs and values are provided as streams of input values, which can be accessed synchronously.
  - Because of its reactive nature, then it can be tested more easily, and other consumers of the form input streams have access to manipulate that data safely.
- Compared to template forms:
  - Synchronous access to the data model
  - Immutability with observable operators
  - Change tracking through observable streams
  - Template forms use directives + mutable data to track changes asynchronously. So you would use that if you need to directly access to modify data in your template.

