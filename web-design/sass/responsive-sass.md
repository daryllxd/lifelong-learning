## [Responsive Web Design in Sass: Using Media Queries in Sass 3.2](http://thesassway.com/intermediate/responsive-web-design-in-sass-using-media-queries-in-sass-32)

#### Variables as full query

	$information-phone: "only screen and (max-width : 320px)";

	@media #{$information-phone} {
	  background: red;
	}

Compiles to

	@media only screen and (max-width : 320px) {
	  background: red;
	}

#### Variables on either side of the colon in a query are valid.

	$width-name: max-device-width;
	$target-width: 320px;

	@media screen and ($width-name : $target-width) {
	  background: red;
	}

	@media screen and ($width-name : $target-width + 1) {
	  background: red;
	}

#### Mixin for responsive stuff and scalability thingies.

	$break-small: 320px;
	$break-large: 1024px;

	@mixin respond-to($media) {
	  @if $media == handhelds {
	    @media only screen and (max-width: $break-small) { @content; }
	  }
	  @else if $media == medium-screens {
	    @media only screen and (min-width: $break-small + 1) and (max-width: $break-large - 1) { @content; }
	  }
	  @else if $media == wide-screens {
	    @media only screen and (min-width: $break-large) { @content; }
	  }
	}

	.profile-pic {
	  float: left;
	  width: 250px;
	  @include respond-to(handhelds) { width: 100% ;}
	  @include respond-to(medium-screens) { width: 125px; }
	  @include respond-to(wide-screens) { float: none; }
	}

#### Weird stuffies

- @extend within @media
- Combining @media Queries on Compile



























