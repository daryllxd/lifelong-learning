## [Getting Started with Sass](http://alistapart.com/article/getting-started-with-sass)

Original version: No curly braces, and properties were indented with spaces. The new Sass (SCSS) is a metalanguage, which means that valid CSS is also valid SCSS.

Sass breaks shit into partials, just like "include." Partials cannot be compiled into a stylesheet.

Nested rules can have media queries in it.

	.container {
	  width: 940px;  // If the device is narrower than 940px, switch to 
	  // a fluid layout
	  @media screen and (max-width:940px) {
	    width: auto;
	  }
	}


