# Snapshot Testing
[Reference](https://jestjs.io/docs/en/snapshot-testing)

- Makes sure your UI does not change unexpectedly.
- Render a UI component, take a snapshot, then compare to reference snapshot file stored alongside the test.
- Normally, you would need to render the graphical UI. You can use a test renderer to quickly generate a **serializable value** for the tree.
- Should b e committed alongside code-changes, and reviewed in code review process.
- If need to update snapshot artifacts: `jest --updateSnapshot` or `jest -u`.
- Inline snapshots: These behave identically to external snapshots, except the snapshot values are written automatically back into the source code.
- Best practices
  - Treat snapshots as code: commit snapshots and review them as part of the regular code review process.
  - Deterministic: running the same test multiple times should produce the same results every time.
  - Descriptive names.
  - This is not visual regression, this is snapshot testing.
- In some ways, snapshot testing might mean you don't need unit testing for a certain part.
- *Snapshots help to figure out whether the output of the modules covered by tests is changed, rather than giving guidance to design the code in the first place.*
- Why snapshot testing?
  - No flakiness: Test runner doesn't have to wait for builds, spawn browsers, load a page and drive the UI to get a component into the expected state which tends to be flaky.
  - Fast iteration speed: Faster tests = more tests.
  - Debugging: Much faster to step into the code of an integration test.
