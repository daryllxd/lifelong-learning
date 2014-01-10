## Creating Themes

	color: lighten(#336699, 20%);					# lighten/darken
	color: saturate($main_color, 30%); 				# saturate/desaturate
	adjust-hue($main_color, 180);					# rotation
	adjust-hue(desaturate($main_color, 10%), 90);
	grayscale(#336699)								# desaturate 100%
	mix(#336699, #993266);							# mixes colors as best as we can guess

## Importing
	
If you don’t want a Sass file to generate a corresponding CSS file, just start the filename with an underscore.

## Keeping It Semantic: @extend

@extend clones the attributes from one class or ID and adds them to another. What @extend does is merge all the properties and values from both selectors, with a list of selectors merged before the declaration block.

## Interpolating

Interpolation basically means “put this there.” Imagine we want to write a mixin that has a dynamic property or selector. And we don’t mean a dynamic property value—that’s easy stuff that we’ve already done. We mean if the very name of a property or selector could be dynamically generated. 

	@mixin car_make($car_make, $car_color) {
	// Set the $car_make with "_make" at the end as a class .car.#{$car_make}_make {
	       color: $car_color;
	       width: 100px;
	       .image {
	background: url("images/#{$car_make}/#{$car_color}.png"); }
	} }

	@include car_make("volvo", "green"); 
	@include car_make("corvette", "red" );

#### Each

	@each $member in thom, jonny, colin, phil { 
		.#{$member}_picture {
		background-image: url("/image/#{$member}.jpg"); 
		} 
	}

	.thom_picture { background-image: url("/image/thom.jpg"); }
	.jonny_picture { background-image: url("/image/jonny.jpg"); }

#### If

	@mixin country_color($country) {
		@if $country == france { 
			color: blue; 
		}
		@else if $country == spain {
			color: yellow; 
		}
		@else if $country == italy {
			color: green; 
		} @else {
	       color: red; 
		} 
	}

Check out sass-script :)


















