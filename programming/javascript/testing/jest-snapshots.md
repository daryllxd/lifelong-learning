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
  - No flakiness: Test runner doesn't have to wait for builds, spawn browsers, load a page and drive the UI to get a component into the expected state which tends to be flaky.  - Fast iteration speed: Faster tests = more tests.
  - Debugging: Much faster to step into the code of an integration test.

# What’s wrong with snapshot tests
[Reference](https://blog.usejournal.com/whats-wrong-with-snapshot-tests-37fbe20dfe8e)

- Can commit bugs in the snapshot, too, anyway
- Snapshots, if you don't use shallow rendering, often break on changes in low level components.
- They just verify that the component renders.

```
test('show a success message after submission', () => {
  const { getByText } = render(<Form />);
  expect(wrapper).toMatchSnapshot();
  fireEvent.click(getByText('Send an owl'));
  expect(wrapper).toMatchSnapshot();
});
```

- When to use snapshot - if clear intent, like class names or error messages.
- You can use `inline snapshots` (`toMatchInlinSnapshot`) to make snapshots visible inside the test file and to help you to keep them small.
- Use snapshot property matchers to avoid storing generated values:

```
expect(user).toMatchSnapshot({
  createdAt: expect.any(Date),
  id: expect.any(Number)
});
```

- Don't snapshot file paths, and don't snapshot dates/times.

# Effective Snapshot Testing
[Reference](https://kentcdodds.com/blog/effective-snapshot-testing)

- Snapshots are an assertion. They are just like `expect toBe`.
- Good in:
  - Error messages, logs. Instead of regex, you just snapshot it.
  - `babel-plugin-tester`.
- Avoid:
  - HUGE snapshots - remember, tests are all about giving you confidence that you won't ship things that are broken.
  - No one reviews snapshots that are just so long.
- Custom serializers: `jest-glamore-react`.
- `snapshot-diff`: If many tests look the same, try to make their differences stand out. This makes it easier for people to know what the important pieces are.
