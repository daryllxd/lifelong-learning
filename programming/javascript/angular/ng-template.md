# Angular `ng-template`, `ng-container` and `ngTemplateOutlet` - The Complete Guide To Angular Templates
[Reference](https://blog.angular-university.io/angular-ng-template-ng-container-ngtemplateoutlet/)

- These three are designed to be used together.
- `ng-template` means that the content of this tag will contain part of a template that can be composed together with other templates in order to form the final component template.

``` html
      <ng-template>
          <button class="tab-button"
                  (click)="login()">{{loginText}}</button>
          <button class="tab-button"
                  (click)="signUp()">{{signUpText}}</button>
      </ng-template>
```

- This actually doesn't render anything, because we are just defining a template, but we are not using it yet. If we want to render an output, then we can do `ngIf`.
- Implicitly, when we do this:

``` html
<div class="lessons-list" *ngIf="lessons else loading">
  ...
</div>

<ng-template #loading>
    <div>Loading...</div>
</ng-template>
```

- We are creating 2 implicit angular templates:

`<div class="lessons-list" *ngIf="lessons" [ngIfElse]="loading">`

- Cannot have two structural directives to the same element. In order to do so, we have to split them out

``` html
<div *ngIf="lessons">
    <div class="lesson" *ngFor="let lesson of lessons">
        <div class="lesson-detail">
            {{lesson | json}}
        </div>
    </div>
</div>
```

- Then we use the `ng-container` structural directive to not create that extra `divs`.
- `ngTemplateOutlet`:
  - This allows us to point template references to other directives such as an `ngIf`.
  - This is done by the `ngTemplateOutlet` directive: `<ng-container *ngTemplateOutlet="loading"></ng-container>`.
- Template Context: What is visible inside them?
  - *Inside the `ng-template` tag body, we have access to the same context variables that are visible in the outer template.*
  - Within the template, it can define its own set of input variables:
  - Input variable is called `lessonsCounter`, defined with prefix `let-`, and visible inside the `ng-template`, but not outside.
  - Content of this variable is determined by the expression that is assigned to the property `let-lessonsCounter`.
  - That expression is then linked to the context object, passed to the `ngTemplateOutlet`, together with the template, to instantiate.
  - This context object must then have a property named `estimate`.
  - The context object is passed to `ngTemplateOutlet` via the context property, that can receive any expression that evaluates to an object.

```
<ng-template #estimateTemplate let-lessonsCounter="estimate">
    <div> Approximately {{lessonsCounter}} lessons ...</div>
</ng-template>
<ng-container
   *ngTemplateOutlet="estimateTemplate;context:ctx">
</ng-container>
`})
export class AppComponent {

    totalEstimate = 10;
    ctx = {estimate: this.totalEstimate};

}
```

- `ViewChild`: Passing the template as an input parameter.

WIP
