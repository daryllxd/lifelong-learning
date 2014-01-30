## [padding](http://css-tricks.com/almanac/properties/p/padding/)

The `padding` property in CSS defines the innermost portion of the box model, creating space around an element's content.

Padding values are set using lengths or percentages and cannot accept negative values.

- 2 values: top-bottom left-right.
- 3 values: top left-right bottom.
- 4 values: top right bottom left.

The padding is added to the width of the thing. To cancel this, use `box-sizing: border-box`.

## [border](http://css-tricks.com/almanac/properties/b/border/)

Shorthand: width || style || color

## [margin](http://css-tricks.com/almanac/properties/m/margin/)

The `margin` property defines the outermost portion of the box model, creating space around an element, outside of any defined borders.

__To center something, you have to specify a `width` and set the left and right margins to `auto`.__

Centering Stuff
* You know the size of the parent
position: absolute; top: 50%; margin-top: -(half of size of element)px; left: 50%; margin-left: -(half of size of element)px;
* Absolute positioning
left = (x-y)/2 //x = parent width, y = element width
* Fluid width: Percentage on left value, then negative margin of half the width of the child element
