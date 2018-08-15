# Ember Best Practices: Actions Down, Data Up... Wait what?
[Reference](https://dockyard.com/blog/2015/10/14/best-practices-data-down-actions-up)

- Two-way data binding: data changes that affect the model are immediately propagated to the corresponding template, and changes in the UI are reflected in the underlying model.
- In larger applications: two-way data binding can become a headache, because you have to figure out where to mutate your data.
- Data-down, actions up: define the method to do/action in the controller, pass it down to the components inside, then tell the components inside to call the action that was passed down. (Something that is like what React does?)
