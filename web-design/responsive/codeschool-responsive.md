## 1: Foundations

- We want to make sure that we work for both the desktop and mobile.
- Fluid layouts + adaptive design + responsive design.
- Every pixel value must become ems
- The standard size

		Html{ font-size: 16px }
		Body{ font-size: 62.5% /*10px*/ }
		Target / context = result.
- So if you want to have a body of 30 px…
H1{ font-size: 3em } //No space inside there!
- Remember that your contexts change always. Do not round up or round down. 6 decimal places.

## 2: Fluid Layouts
- Fluid layouts must scale. A fluid site has a fluid grid and relative values.
- Setting the main site container:
.site{ 90%} //Just test randomly
.sidebar{32.446809%}
- Paragraph: block element so it follows the width of its parent.
- Margins and paddings: When setting flexible margins on an element, your context is the width of your element’s container (940 px).
- When setting flexible padding on an element, the context is the width of the element itself (590 px).

## 3: Adaptive
- Adaptive design: Designing for controlled adaptation
- Things to do: Separate mobile site, adaptive design (styles move from a desktop environment to a mobile device), responsive design
- You need to know: who your user is, how they will use the site, the context of how they use it, and the content they want to go to
Ex: Nautilus Restaurant
- User => Find the restaurant
- Use
- Context =>
- Content => Location, number, menu
AWD
- Adaptive markup: Header body footer
- Break points: Where your design breaks down. Typically the height and width of the target viewport.  Pixel density: Only matters with images.
- Media queries
@media screen and (max-width: 320px){…}
- For a mobile site you usually clear the floats and you can add a background color instead of a background image
- You can inherit the float of the container if you need it to be as big as the main thingie

## 4: Mobile First
- In mobile, you focus on the most important things: Simplify content, prioritize layout, optimize user experience
- Adaptive vs Responsive.
- Adaptive: Selectively optimized for the content
- Responsive: Breakpoints + media queries
- In Responsive design, we define break points.
- If you want to stack things, you do {float: none}
	
- Orientation
@media screen and (orientation:portrait){ }
Context of line-height is based on the font-size itself doe.

## 5: Responsive Media
- We want to save a larger image. Even if the image size is smaller, we use a big-ass image.
Img {max-width: 100%} 
- Do this with: img, em	bed, object, video
- Prior to Windows 7, poor max-width support
- Options: FiText, Lettering.js, Fitvideo.js
Retina Images
 
AMA Responsive Design
Workflow

## 1.	Create your desktop version of your website

## 2.	Set up your media queries you wish to use below your default styles

## 3.	In the smallest media query, copy all your default styles in

## 4.	Remove the unnecessary duplicated styles that you know for a fact won't be changing (link colours etc)

## 5.	Open up Google Chrome developer tools and manipulate the layout design making sure you remove any duplicated styles that aren't changing

## 6.	Click your stylesheet file in the developer tools and copy the entire stylesheet

## 7.	Replace your old stylesheet with the new one

## 8.	Do this for each style, copying from the media query from the previous step.

@media only screen and (min-width : 110px) and (max-width : 319px) { }  @media only screen and (min-width: 320px) and (max-width : 419px) { }  @media only screen and (min-width: 420px) and (max-width : 519px) { }  @media only screen and (min-width: 520px) and (max-width : 619px) { }  @media only screen and (min-width: 620px) and (max-width : 819px) { } 

- Smartphones
- Depending on the font-family, I usually go for 100% font-size on body and 1.05-1.1em for the wrap/content.
- Using JavaScript I scale it down into the standard mobile menu icon (what's that thing called again?) You can see it in action here: http://www.davidpottrell.co.uk scale it down ;)
- 

