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
