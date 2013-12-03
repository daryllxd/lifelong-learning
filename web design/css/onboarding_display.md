## [display](http://css-tricks.com/almanac/properties/d/display/) and [the "display" property](http://learnlayout.com/display.html)

	div {
	  display: inline;        /* Default of all elements, unless UA stylesheet overrides */
	  display: inline-block;  /* Characteristics of block, but sits on a line */
	  display: block;         /* UA stylesheet makes things like <div> and <section> block */
	  display: run-in;        /* Not particularly well supported or common */
	  display: none;          /* Hide */
	}

__Inline:__ It's inline, it accepts margin and padding, __but it will only push other elements horizontally away__. It doesn't accept `height` and `width` (ignore foo). Ex: `span`, `a`.

__Inline-block:__ Similar to inline, but you can set a `width` and `height`, which will be respected.

__Block:__ Block level elements do not sit inline but break past them. They take as much horizonal space as they can. Ex: `p`, `form`, `header`, `footer`, `section`.

__None:__ The element is still in the DOM, but is removed visually, can't tab to it, ignored by screen readers. __Difference from `visibility: hidden` is that it will hide the element but the element will still take up the space as thought it was fully visible.__