## [position](http://css-tricks.com/almanac/properties/p/position/)

	div {
	  position: static; /* Default, no need to set unless forcing back into this state. */
	}
	div {
	  position: relative; 
	}
	div {
	  position: absolute; 
	}
	div {
	  position: fixed;
	}
	div {
	  position: inherit; /* Take value from parent */
	}

__Static:__ Default position. It resides in the normal page flow. LRTB, z-index have no effect.

__Relative:__ LRTB, z-index now work. They nudge the element from the original position.

__Absolute:__ Element is removed from the flow of the document. All other positionals work on it. Essentially, you are able to declare the exact position you want the element to appear. Without a width set, element will stretch only as wide as the content it contains, and you can set both a left and right value and the element will stretch to touch both points.

__Fixed:__ Element is removed from the flow of the document, like absolute positioned elements.