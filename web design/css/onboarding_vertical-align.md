## [vertical-align](http://css-tricks.com/almanac/properties/v/vertical-align/)

__The `vertical-align` property in CSS controls how elements set next to each other on a line are lined up.__

	img {
	  vertical-align: middle;
	}

In order for this to work, the elements need to be set alone a baseline. As in, inline or inline-block elements.

- `baseline` - This is the default value.
- `top` - Align the top of the element and its descendants with the top of the entire line.
- `bottom` - Align the bottom of the element and its descendants with the bottom of the entire line.
- `middle` - Aligns the middle of the element with the middle of lowercase letters in the parent.
- `text-top` - Aligns the top of the element with the top of the parent element's font
- `text-bottom` - Aligns the bottom of the element with the bottom of the parent element's font.
- `sub` - Aligns the baseline of the element with the subscript-baseline of its parent. Like where a `sub` would sit.
- `super` - Aligns the baseline of the element with the superscript-baseline of its parent. Like where a `sup` would sit.
- `length` - Aligns the baseline of the element at the given length above the baseline of its parent. (e.g. px, %, em, rem, etc.)

This can be used on table-cell elements as well, aligning the content within them.