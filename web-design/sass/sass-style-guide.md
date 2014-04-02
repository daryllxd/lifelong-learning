## [Sass Style Guide](http://css-tricks.com/sass-style-guide/)

#### List `@extend` First, Regular, `@includes`, Nested

  .weather {
    @extends %module; 
    background: LightCyan;
    @include transition(all 0.3s ease);
    > h3 {
      border-bottom: 1px solid white;
      @include transform(rotate(90deg));
    }
  }

- All Vendor Prefixes Use `@mixins`
- List Vendor/Global Dependencies First, Then Author Dependencies, Then Patterns, Then Parts

    /* Vendor Dependencies */
    @import "compass";

    /* Authored Dependencies */
    @import "global/colors";
    @import "global/mixins";

    /* Patterns */
    @import "global/tabs";
    @import "global/modals";

    /* Sections */
    @import "global/header";
    @import "global/footer";

- Break Into As Many Small Files As Makes Sense: There is no penalty to splitting into many small files. Do it as much as feels good to the project.
- Locally, compile compressed. Deployment, compile compressed.
- Don't even commit .css files.
- Be generous on comments.
- Variablize all numbers and colors.
- Shame (quick fixes) last.

    @import "compass"

    ...

    @import "shame"
