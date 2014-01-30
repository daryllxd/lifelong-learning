## [Organising SASS Assets in Rails](https://coderwall.com/p/bqxhxg)

My basic starter setup normally looks something like this:

	app/assets/stylesheets/
	  application.css
	  style.css.scss

	lib/assets/stylesheets/
	  normalize.css

With this setup I'm showing a distinction between our library code (the normalize css) and our application code.

First off I'll normally do some global layout styles like html, body, header, footer. I also make sure I store standard colours and measurements up the top of the style file as variables. I use measurements to make sure I keep everything aligned to a vertical and horizontal grid at all times. I won't start ranting about grids here, but look into it. At this point I only have one file.

When I start getting into styling the application I like to break down my CSS based on what sort of UI element it is. I've seen people break it down by controller, or section of the app, but this is folly. If you need special cases for a single section of the app that's fine. But you're aiming for a global style sheet, not a series of special cases.

	app/assets/stylesheets/
	  application.css
	  style.css.scss
	  layout.css.scss
	  buttons.css.scss
	  forms.css.scss
	  media.css.scss
	  comments.css.scss

	lib/assets/stylesheets/
	  normalize.css
	  player.css
	  editor.css

You shouldn't use the asset pipeline to include all your sass files. Instead you should be using SASS itself to do that, the asset pipeline is simply concatenating everything post compilation, whereas SASS will resolve dependencies during compilation. So my application.css would have:

	/* 
	 *= require_self
	 *= require reset
	 *= require player
	 *= require editor
	 *= require style
	 */