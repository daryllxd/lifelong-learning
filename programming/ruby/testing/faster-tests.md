## Tips to improve speed of your test suite
[Reference](https://medium.com/appaloosa-store-engineering/tips-to-improve-speed-of-your-test-suite-8418b485205c)

- `build` vs `build_stubbed` vs `create`.
- Avoid unnecessary `let!`, use `let`.
  - `let` is not invoked when defined, but rather before each example.
  - `let` is lazy-evaluated: it is not evaluated until the first time the method it defines is invoked.
- If your setup is particularly db-heavy, you should consider `before(:all)`.
- `parallel_tests`?
- Factory girl: Suggested to use `traits` for factories. Or you can use `FactoryDoctor`.
- `FactoryProf`. We can change log levels in the config.
