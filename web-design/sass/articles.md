# Using Sass’s @error, @warn, and @debug Directives
[Reference](https://www.sitepoint.com/using-sass-error-warn-and-debug-directives/)

- Directives that provide feedback to developers: `@error`, `@warn`, `@debug`.
- `@error`: Stop everything. Include/let the developer know that they've done something wrong or entered a value that's entirely incompatible.
- Ex:

```
@function color-variation($color) {
  @if map-has-key($colors, $color) {
    @return map-get($colors, $color);
  }

  @error "Invalid color name: `#{$color}`.";
}
```

- `@warn`: Sends the message to the developer, but doesn't stop. Same with enforcing team code standards.
- `@debug`: Just to see what the contents are.

# Sass: Variables
[Reference](https://sass-lang.com/documentation/variables)

- Difference between Sass and CSS variables:
  - Sass variables are all compiled away by Sass, CSS variables are included in the CSS output.
  - CSS variables can have different values for different element, but Sass variables only have one value at a time.
  - Sass variables are imperative - which means if you use a variable and then change its value, the earlier use will stay the same.
- Fun fact, `font-size` and `font_size` are identical.
- Meta: `variables-exists()` and `global-variable-exists()`.

# Sass: List
[Reference](https://sass-lang.com/documentation/modules/list)

```
list.append($list, $val, $separator: auto)
append($list, $val, $separator: auto) //=> list
```

- `append`: Returns a copy of `$list` with `$val` added to the end.
- If it's space, the returned list is space-separated. If it's auto, the returned list will use the same separator as `$list`.
- Unlike `list.join()`, if `$val` is a list is nested within the returned list rather than having all its elements added to the returned list.
- `list.index`.
- `is-bracketed`.
- `list.join`.
- `list.length`.
- `list.separator.`
- `list.nth`.
- `list.zip`.

# Sass: Map
[Reference](https://sass-lang.com/documentation/modules/map)

- `map-get` or `map.get`.
- `map-has-key`.
- `map-keys. => Gets an array of keys.
- `map-merge` => 2nd map takes preference.
- `map-remove`.
- `map-values` => Return comma-separated list of the values.
