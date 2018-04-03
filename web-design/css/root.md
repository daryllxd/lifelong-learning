# Root
[Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/:root)

- `:root` represents the `<html>` element, but its specificity is higher.

# Using CSS custom properties (variables)
[Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables)

``` css
:root {
  --main-bg-color: brown;
}

.one {
  color: white;
  background-color: var(--main-bg-color);

// inheritance

.two {
  --test: 10px;
}

.three {
  --test: 2em;
}

// for .four, test is 10px
<div class="two">
  <div class="three"></div>
  <div class="four"></div>
</div>

.two {
  color: var(--my-var, red); /* Red if --my-var is not defined */
}

.three {
  background-color: var(--my-var, var(--my-background, pink)); /* pink if my-var and --my-background are not defined */
}
```


