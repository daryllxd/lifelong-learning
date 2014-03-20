## [display](http://css-tricks.com/almanac/properties/d/display/) and [the "display" property](http://learnlayout.com/display.html)

	div {
	  display: inline;        /* Default of all elements, unless UA stylesheet overrides */
	  display: inline-block;  /* Characteristics of block, but sits on a line */
	  display: block;         /* UA stylesheet makes things like <div> and <section> block */
	  display: run-in;        /* Not particularly well supported or common */
	  display: none;          /* Hide */
	}

*Inline:* It's inline, it accepts margin and padding, *but it will only push other elements horizontally away*. It doesn't accept `height` and `width` (ignore foo). Ex: `span`, `a`.

*Inline-block:* Similar to inline, but you can set a `width` and `height`, which will be respected. These are affected by `vertical-align`. You also need to set the width of each column.

*Block:* Block level elements do not sit inline but break past them. They take as much horizonal space as they can. Ex: `p`, `form`, `header`, `footer`, `section`.

*None:* The element is still in the DOM, but is removed visually, can't tab to it, ignored by screen readers. *Difference from `visibility: hidden` is that it will hide the element but the element will still take up the space as thought it was fully visible.*

## [float](http://css-tricks.com/all-about-floats/)

In web design, page elements with the CSS float property applied to them are just like the images in the print layout where the text flows around them.

Floated elements remain a part of the flow of the web page.

An element that has the `clear` property set on it will not move up adjacent to the float like the float desires, but will move itself down past the float. Again an illustration probably does more good than words do.

One of the more bewildering things about working with floats is how they can affect the element that contains them (their "parent" element). *If this parent element contained nothing but floated elements, the height of it would literally collapse to nothing.*

Collapsing almost always needs to be dealt with to prevent strange layout and cross-browser problems. We fix it by clearing the float after the floated elements in the container but before the close of the container.

## [column](http://learnlayout.com/column.html)

	.three-column {
	  padding: 1em;
	  -moz-column-count: 3;
	  -moz-column-gap: 1em;
	  -webkit-column-count: 3;
	  -webkit-column-gap: 1em;
	  column-count: 3;
	  column-gap: 1em;
	}

Very new, won't work with IE9 or in Opera Mini.
