## Yarn: A new package manager for JavaScript
[Reference](https://code.facebook.com/posts/1840075619545360)

- `npm` problems: Consistency, security, and performance.
- Before, it was `package.json` only committed. This was just slow.
- If we check in all of `node_modules`, simple operations become difficult. Merging changes to `node_module` would take engineers an entire day.
- Last: Zip `node_modules` and upload to an internal CDN.
- *Package manager: installs some package from a global registry into an engineer's local environment. A project can have tens, hundreds, or even thousands of packages within its tree of dependencies.*
- How Yarn works:
  - Resolution. Yarns starts resolving dependencies by making requests to the registry.
  - Fetching. Yarn looks in a global cache directory to see if the package needed has already been downloaded. If not, fetch tarball.
  - Linking. Yarn links everything together by copying all the files needed from the global cache into the local `node_modules`.
- Parallelized operations so multiple running CLIs don't collide and pollute each other.

## Yarn vs npm: Everything You Need to Know
[Reference](https://www.sitepoint.com/yarn-vs-npm/)

- Problem with npm: Hard to install, security concerns as npm allows packages to run code on installation.
- `package.json`: Version numbers aren't always exact. You can have two machines with the same `package.json` file, having different versions of a package installed.
- `npm shrinkwrap` creates an npm lock file.
- Yarn installs packages in parallel. NPM, sequential.
- Cleaner output.
- `yarn add <something> [-dev]`. Download then add a dependency.

## Yarn Global
[Reference](https://yarnpkg.com/en/docs/cli/global)

- `yarn global create-react-app`: Installs `create-react-app` command to be available locally.
- `yarn global bin` to look where the bins are. This is usually in `/usr/local/bin`.

## Yarn Add
[Reference](https://yarnpkg.com/en/docs/cli/add)

- `yarn add package-name`, `yarn add package-name@1.2.3`, `yarn add package-name@tag`, `yarn add file:/path/to/local/folder`.
