## CSS Rules

1. Base: 

		html, body, form { margin: 0; padding: 0; }, input[type=text] { border: 1px solid #999; }, a { color: #039; }, a:hover { color: #03C; }

2. Layout: Divide the page into sections.
3. Module: Reusable, modular parts of our design. Callouts, sidebars
4. State: Stuff to describe when hidden or expanded etc.
5. Theme: How modules or layouts should look.

#### Naming

	Layout: l-
	Grid: g-
	State: is- (is-hidden, is-collapsed)
	Modules: The bulk of the project, use the name of the module itself (.example, .callout, .callout.is-collapsed)

#### Base Rules

Base styles include setting heading sizes, default link styles, default font styles, and body backgrounds. There should be no need to use !important in a Base style.

#### Module Rules

- Only include a selector that has semantics (no generic `span` or `div`).
- Battle against specificity.
- State can be combined (.callout.is-collapsed).

#### Theme Rules

- Define theme-specific cases: Keep the theming to specific regions of the page.
- Applies also to typography.

## Changing States

- Class name change: Happens with JavaScript.
- Pseudo-class change: Done via any number of pseudo-classes.
- Media queries: Describe how things should be styled under defined criteria, such as different viewports.

You want to apply to the source itself, not the parent or the sibling. Ex: Dropdown active style applies to the button and not the toolbar.

	.btn { color: #333; }
	.btn-pressed { color: #000; }
	.btn-disabled { opacity: .5; pointer-events: none; }

Pseudo-classes can be combined with the shits

	.btn, .btn:focus, .btn:focus, .btn.is-pressed, .btn.is-pressed:hover

Media queries

#### Depth of Applicability

We hate things like this. They depend on the underlying HTML structure.

	#sidebar div
	#sidebar div h3
	#sidebar div ul

## Selector Performance 

The style of an element is evaluated on element creation. See `body`, determine styles. See `div`, think it's empty, figure out styles, `div` gets painted.

CSS gets evaluated from right to left.

Inefficient, according to Google:

1. Rules with descendant selectors (`#content h3`)
2. Rules with child or adjacent selectors (`#content > h3`)
3. Rules with overly qualified selectors (`div#content > h3`)
4. Rules that apply `:hover` to non-link elements.

*But what is important to note is that the evaluation of any more than a single element to determine styling is inefficient. This means you should only ever use a single selector in your rules: a class selector, an ID selector, an element selector, and an attribute selector.*

Consider selector performance but honestly the difference is just 50ms... so.

## Drop the base

When making a table, since you may make different types of table in the future just have some kind of "base table" that you can add a module to.

	table{} # base for all tables, such as the border-collapse: collapse thingie
	.comparison{}
	.comparison > tr > td{}
	.comparions > tr > td:nth-child(2n){}
	.info > tr > th{} # Different component for info tables
	.info > tr > td{}

Icons

	.ico {
	    display: inline-block;
	    background: url(/img/sprite.png) no-repeat;
	    line-height: 0;
	    vertical-align: bottom;
	}
	.ico-16 {
	    height: 16px;
	    width: 16px;
	}
	.ico-inbox {
	    background-position: 20px 20px;
	}
	.ico-drafts {
	    background-position: 20px 40px;
	}

(For IE, you can use `zoom:1; display: inline;` for IE to behave like the inline-block elements.)

To optimize images, use Smush.it or ImageOptim.





























