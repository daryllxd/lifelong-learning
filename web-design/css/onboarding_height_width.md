## [height](http://css-tricks.com/almanac/properties/h/height/)

`Height` defines the content height (padding + border + margin). Height does not apply to non-replaced `inline` elements, including table and columns and column groups.

	.wrap {
	  height: auto;    /* auto keyword */

	  height: 120px;   /* length values */
	  height: 10em;
	  height: 0;       /* unit-less length is OK for zero */

	  height: 75%;     /* percentage value */

	  height: inherit; /* inherited value from parent element */
	}

__If the height of the containing block is not specified explicitly, and the element is not absolutely positioned, the value of its height computes to auto (it will be as tall as the content inside it is, or zero if there is no content).__

If the elements content portion requires more vertical space than available from the value assigned, the elements behavior is defined by the `overflow` property.

When using the keyword auto, height is calculated based on the elements content area unless explicitly specified. 

## [width](http://css-tricks.com/almanac/properties/w/width/)

The `width` property in CSS specifies the width of the elements content1 area. This "content" area is the portion inside the padding, border, and margin of an element (the box model).

When using percentage for width, authors must be aware that the percentage is based on the elements parent, or in other words, the width of the containing block.

## Max and Min

`max-width` and `max-height` override `width` and `height`, but `min-width` and `min-height` override them both, too.