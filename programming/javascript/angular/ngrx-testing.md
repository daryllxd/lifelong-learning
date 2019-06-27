# The Complete Guide to NgRx Testing
[Reference](https://christianlydemann.com/the-complete-guide-to-ngrx-testing/)

- Testing reducers: given the provided inputs, get the right state afterwards.
  - First case: call the reducer with a `noop` action, an action that doesn't match any reducers.
  - Other cases: Ensure that the state changes in the way you want.
- Testing actions: Do not contain biz logic, so provides less value to test.
  - Can wrap the dispatching logic in a service, which makes it simpler to use:

```
@Injectable({ providedIn: 'root' })
export class TodoListActions {
  constructor(private store: Store<TodoListState>) {}

  public loadTodoList(): void {
    this.store.dispatch(new LoadTodoList());
  }

  public deleteTodo(id: string) {
    this.store.dispatch(new TodoItemDeleted(id));
  }

  public todoItemUpdated(id: string) {
    this.store.dispatch(new TodoItemDeleted(id));
  }

  public todoItemCompleted(id: string) {
    this.store.dispatch(new TodoItemCompleted(id));
  }
}
```

- Dispatching the correct action via Spy

```
  describe('loadTodoList', () => {
    it('should dispatch load todolist action', () => {
      const expectedAction = new LoadTodoList();
      const store = jasmine.createSpyObj<Store<TodoListState>>('store', ['dispatch']);

      const todoListActions = new TodoListActions(store);
      todoListActions.loadTodoList();

      expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    });
  });
```

- Testing Effects
  - You need to assert a `reactive result` as well as trigger an effect.
  - To assert that an effect returns the right observable stream, we can use `Rx Marbles`.
  - This is done with `Jasmine-marbles`.
- Rx Marbles:
  - Cold or hot observable with `cold` and `hot`.
  - `-` is 10 frames, for indicating time has passed.
  - `|` means completed observable.
  - `#` means error, you can specify the error by setting it as the third argument to `cold` or `hot`.
  - `()` can wrap a couple of events that should happen on the same time frame.
  - `[a-z0-9]` all are variables, can be set with second argument in `cold` or `hot`.


```
@Injectable()
export class TodoListEffects {
  constructor(private actions$: Actions, private todoListService: TodoListService) {}

  @Effect()
  loadTodoList$ = this.actions$.pipe(
    ofType(TodoListActionTypes.LoadTodoList),
    exhaustMap(() => this.todoListService.getTodos()),
    map((todoList) => new TodoItemsLoaded(todoList)),
    catchError((error: Error) => of(new TodoItemsLoadFailed(error)))
  );
}
```

Testing success:

```
it('should return a stream with todo list loaded action', () => {
  const todoList: TODOItem[] = [{ title: '', id: '1', description: '' }];
  const action = new LoadTodoList();
  const outcome = new TodoItemsLoaded(todoList);

  // Specify that this is a hot observable that is waiting for 10 frames, and then emitting the action. Used to trigger the effect under test.
  actions = hot('-a', { a: action });

  // Specify the getTodos as a cold observable because it should only run when the test is calling it. Waiting for 10 frames, returning `TodoList` and then completing.
  const response = cold('-a|', { a: todoList });
  todoListService.getTodos.and.returnValue(response);

  // We are expecting that it is waiting for 20 frames, then return a stream with the `TodoItemsLoaded` action.
  const expected = cold('--b', { b: outcome });
  expect(effects.loadTodoList$).toBeObservable(expected);
});
```

Testing failed:

```
it('should fail and return an action with the error', () => {
  const action = new LoadTodoList();
  const error = new Error('some error') as any;
  const outcome = new TodoItemsLoadFailed(error);

  // Same as before
  actions = hot('-a', { a: action });

  // Throw an error, then return
  const response = cold('-#|', {}, error);
  todoListService.getTodos.and.returnValue(response);

  // The `of` operator (see non-test code) means it completes instantaneously
  const expected = cold('--(b|)', { b: outcome });
  expect(effects.loadTodoList$).toBeObservable(expected);
});
```

Testing selectors

- For ensuring type-safety selection of the store, you should not use the store directly in your feature services, but instead reference the store's selector file, which acts as a facade to the store.
- **Note: We are already type-safe because we are using Typescript, and it is interacting closely with the NgRx framework which is already covered in tests.**
