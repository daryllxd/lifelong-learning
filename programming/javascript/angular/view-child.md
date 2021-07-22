# How can I select an element in a component template?
[Reference](https://stackoverflow.com/questions/32693061/how-can-i-select-an-element-in-a-component-template)

- `@ViewChild` supports directive or component type as parameter, or the name of a template variable.
- `@ViewChildren` also supports a list of names as comma separated list.
- `@ContentChild()` and `@ContentChildren()` do the same but in the light DOM.
- If there are a component and directives, the `read` parameter allows to specify which instance should be returned.
# Working with Angular 5 Template Reference Variables

[Reference](https://itnext.io/working-with-angular-5-template-reference-variable-e5aa59fb9af)

- A reference to a DOM element within a template. That means you can access the variable anywhere in the template.
- Reference variable can only be accessed inside the template. `ViewChild` decorator is used to reference it inside your component.
- `ng-template` - has `let-fullname`?
