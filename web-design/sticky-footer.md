## [Tips and Tricks - Pure CSS Sticky Footers](http://blog.softlayer.com/2012/tips-and-tricks-pure-css-sticky-footers/)

HTML
	
	<div id="page">
 
      <div id="header"> </div>
 
      <div id="main"> </div>
 
      <div id="footer"> </div>
 
	</div>

CSS

	html, body {
		padding: 0;
		margin: 0;
		height: 100%;
	}

	#page {
		min-height: 100%;
		position:relative;
	}

	#main {
		padding-bottom: 75px;   /* This value is the height of your footer */
	}

	#footer {
		position: absolute;
		width: 100%;
		bottom: 0;
		height: 75px;  /* This value is the height of your footer */
	}

For IE

	#page {
		min-height: 100%;
		height; 100%;
		position:relative;
	}

