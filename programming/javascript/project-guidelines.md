# JS Project Guidelines
[Reference](https://github.com/elsewhencode/project-guidelines)

- Git: Feature branch, `develop` branch, PR to `develop`, update local `develop` branch and do an interactive rebase before pushing your feature and making a PR, delete local and remote feature branches after merging, make sure your feature branch builds successfully.
- Git workflow: Feature-branch workflow with interactive rebase.
  - `git rebase -i --autosquash develop` to squash all commits into a single commit.
- Commit messages: Separate subject from body with a newline, capitalize subject line, do not end with a period, imperative mood.
- [README template.][https://github.com/elsewhencode/project-guidelines/blob/master/README.sample.md]
- Environments: separate development, test, and production environments.
  - `nvm` and `.nvmrc` in the root.
  - `preinstall` script to check node and npm version.
  - Use Docker image if you can.
- Testing: test mode.
  - Naming convention: `*.test.js` or `*.spec.js`.
  - Use a static type checker.
- Structure and naming: organize your files around product features, not roles.
- Code style:
  - ESLint as linter.
  - AirBNB JS Style guide.
  - `prettier` and `.editorConfig`.
- Code style checker to remove console logs in production. Use logging libraries (`winston`, `node-bunyan`).
