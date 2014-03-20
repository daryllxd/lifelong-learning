## Some Fonts

Open Sans (Proxima Nova is popular but not free), Varela (like Proxima Nova), Source Sans, PT Sans, Droid Sans, Lato, Cabin, Gudea, Droid Serif

Cutive: Typewriter type

Brandon Grotesque, Avenir, Helvetica Neue, Brandon Text,Museo Sans, Trade Gothic, Trend, Style Script, Bombshell Pr

## Hack Design 5.2: Web Design is 95% Typography

*95% of the information on the web is written language.*

Typography has one plain duty before it and that is to convey information in writing.

During the Italian renaissance the typographer had one font to work with, and yet this period produced some of the most beautiful typographical work.

Choosing a typeface is not typography. Anyone can use typefaces; some can choose good typefaces; but only few master typography. A great web designer knows how to work with text not just as content; he treats “text as a user interface”.

Good designers: redesign, great designers: realign.

## [Hack Design 5.3—Choosing the Right Font: A Practical Guide to Typography on the Web](http://webdesign.tutsplus.com/articles/choosing-the-right-font-a-practical-guide-to-typography-on-the-web/)

People overuse Helvetica because it's just so damn good. It fits right in with virtually every design imaginable; it works well in small, as well as huge sizes.

Most chose a larger size like 14px, which is even better for readability. Font-sizing is really quite easy to decide on for body copy, but it's the titles that start to get complicated.

Yes, titles are generally bigger than other elements, but no, this is not the only way to draw attention to them. Color, weight, and placement are all equally important to establishing a clear visual hierarchy to your pages.

Using the CSS line-height property, you can easily assign space between your lines of copy. Generally speaking, for large blocks of text, 1.5 times the size of the text is a good size. Smaller text should have tighter leading, and huge text should have a lot.

## Hack Design 5.4—Interactive Guide to Blog Typography

- Best color scheme: Black text on white background.
- 50-80 characters per line.
- Line height: 1.5-1.6.
- If title, line-height is 150%.
- Remember CSS selector p + p, paragraphs directly following another paragraph.

		p + p {
		text-indent: 2em;
		margin-top: 0;
		}

- Hinting: Use a quality font that is optimized for the pixel grid.
- Font size for body text: at least 16 px.
- *Color: Don't use the darkest black available in your body text. Go for #444, or slightly darker for titles (#222).It makes the text appear slightly softer while still maintaining a good contrast.*
- For abbreviation, use small-caps.

## Hack Design 5.5—Checklist for Better Web Typography

#### Layout - Did you:
- Chunk the content with headers, small paragraphs, bulleted lists, sidebars, indenting an entire a paragraph of text, or pull quotes?
- Limit line length to 350–550 pixels by splitting wide pages into two or more columns?
- Increase leading to improve readability on longer lines of text and to lighten the overall “color” of a page? (line-height)
- Increase spacing between letters or words for emphasis?
- Use either an indent at the beginning of a paragraph, or double spacing between paragraphs, but not both?
- Avoid indenting the first paragraph following a header?
- Use double spacing before headings but single spacing between the heading and the content it introduces?

#### Typefaces and Formatting — Did you:
- Use a non-decorative, screen-optimized typeface at a legible size for body copy? (Droid Sans, Roboto, Helvetica Neue, Segoe, Ubuntu)
- Use looser leading appropriately for longer lines of text, for emphasis, or to lighten the density of the page?
- Use wider letter and word spacing for emphasis?
- Set body copy as justified left, ragged right?
- Make use of CSS to set special capitalization rules (all uppercase, all lowercase, title case) automatically?
- Apply underlining only for links?		
- Test the site in grayscale to make sure that foreground text contrasts sufficiently in value with background text?
- If using light text on a dark background, consider making the text bolder or choosing a typeface with inherently thicker strokes?

#### Content — Did you:

Specify proper typographic characters, including en dash, em dash, curly quotes, true ellipse, and upper and lowercase numerals?

#### Graphic Text — Did you:

Make use of graphic text only when absolutely necessary, to avoid excessive download times?

For very small text, use typefaces designed for a specific size and turn off anti-aliasing?

## 7.1 — Responsive Typography

When we built websites we usually started by defining the body text. The body text definition dictates how wide your main column is, the rest used to follow almost by itself.

Responsive Web Design

Adaptive layouts: adjusting the layout in steps to a limited number of sizes

Liquid layouts: adjusting the layout continuously to every possible width

We believe that adaptive with as few as possible break points is the way to go, because readability is more important than having a layout that is always as wide as the viewport

## Hack Design 7.2 — Contrast Through Scale
 
Start with your base paragraph size. 

The size you choose for your paragraph settings is important for two reasons. Firstly, in most situations, your site will have more <p> elements than any other, so it’s only prudent to start with your most prolific element. In addition, best practice suggests that you determine the size of all other elements based on your P size.

With young audiences, type can afford to be smaller and ignore guidelines that aid legibility. On Moshi Monsters, the use of all caps settings at small sizes, though less inherently legible, push a sense of ‘design’ to the fore.

	body { font-size:100%; }
	h1 { font-size: 2.25em; /* 16 x 2.25 = 36 */ }
	h2 { font-size: 1.5em; /* 16 x 1.5 = 24 */ }
	h3 { font-size: 1.125em; /* 16 x 1.125 = 18 */ }
	h4 { font-size: 0.875em; /* 16 x 0.875 = 14 */ }
	p { font-size: 0.75em; /* 16 x 0.75 = 12 */ }

Or

	body { font-size: 100%; }
	h1 { font-size: 4em; /* 16 x 4 = 64 */ }
	h2 { font-size: 2.5em; /* 16 x 2.5 = 40 */ }
	h3 { font-size: 1.5em; /* 16 x 1.5 = 24 */ }
	p { font-size: 1em; /* 16 x 1 = 16 */ }

Consider ratios

	h1 - 41.886784 x 1.618 = 67.773
	h2 - 25.888 x 1.618     = 41.887
	h3 - 16 x 1.618         = 25.888
	p - 16 x 1	   = 16


## Hack Design 8.1 — The Elements of Typographic Style Applied to the Web

To change the word spacing, you should specify a length in ems. This length is added to the existing word space; that is to say word-spacing does not set the actual space between words, it sets an increment to the existing spacing.

	p {
	word-spacing:0.25em }
	H1 {
	word-spacing:-0.125em }

#### Measure

Characters in a single line of column or text. 45-75 characters (66-characters is regarded as ideal).

From a typographical perspective, the most appropriate method is to set box width in ems (elastic layout) as it ensures the measure is always set to the typographer’s specification. 

	&#8194; en space  
	&#8195; em space  
	&#8196; 3-per-em space  
	&#8197; 4-per-em space  
	&#8198; 6-per-em space  
	&#8199; figure space  
	&#8200; punctuation space  
	&#8201; thin space  
	&#8202; hair space  

Another method would be to apply the white-space:pre property in css to retain the white space formatting. However if you are using white space to format a passage of text, for instance computer code or poetry, then you should enclose the passage in a pre element as this is a more semantic way to preserve the white space pre-formatting.

*Line-height should never be applied using absolute units such as points or pixels.*

Add and delete vertical space in measured intervals

IF text = 12px, line-height = 1.5em (each line is 18px in height), the vertical spacing between blocks must also be 18px.

	p {
		line-height: 1.5;
		margin-top: 1.5em;
		margin-bottom: 1.5em 
	}

On the Web, images in sidebars and within the main body of text are almost always guilty of disrupting the rhythm of text. The same rules should be applied to images as to headings: any image and associated caption should take up multiples of the basic line height.

Sizing images in ems rather than pixels means that they scale up and down with the text size.

If you don't put spacing between paragraphs you can use text-indent:1em;  to indent it.

Ornamented indention;

	p {
		display: inline
	}
	p + p:before { 
		content: "2761"; 
		padding-right: 0.1em;
		padding-left: 0.4em 
	}

Add extra lead before and after block quotations: add a gap between a block quotation and the main text by applying a top and bottom margin to the blockquote. Indent or center them.

	blockquote {
		margin:1.5em 
	}
