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

## [Background Bleed](http://tumble.sneak.co.nz/post/928998513/fixing-the-background-bleed)

Issue in Safari wehre the background color of an element `bleeds` through the corner when applying both borders and a border-radius. To fix, use 

	-webkit-background-clip: padding-box;

## [CSS Architecture](http://engineering.appfolio.com/2012/11/16/css-architecture/)

We want to be: predicatble (rules behave as you expect), reusable (decoupled enough so you can build new components quickly from existing parts), maintainable (easy to add shit), scalable (can be used by more than one person).

#### Bad Practices

- __Modifying components based on who their parents are.__ If the widget gets redesigned, you need to update it in serveral places in the CSS. Remember: _Software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification._

- __Overly complicated selectors.__ Not reusable, unpredictable if the HTML will change, and not maintainable.

- __Making a rule do too much.__ This is not reusable in different contexts.

#### Best Practices

- __Separation of concerns:__ CSS components should be modular. Components should either define how the look, not their layout or position. Background, color, and font should be in different rules from position, width, height, margin.

- __Namespace your classes:__ As opposed to `.widget {} .widget .title{}`, do `.widget{} .widget-title{}`.

- __Extend components with modifier classes.__ Easier to interpret this.

- __Name your classes with a logical structure.__ Instead of `.button-group`, `.button-primary`, `.button-icon`, `.header`, try making it like `%template-name`, `.component-name .component-name--modifier-name .component-name__sub-object`...






















