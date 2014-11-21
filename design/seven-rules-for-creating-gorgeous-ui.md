## 7 Rules for Creating Gorgeous UI
[link](https://medium.com/@erikdkennedy/7-rules-for-creating-gorgeous-ui-part-1-559d4e805cda)

In the end, I learned the aesthetics of apps the same way I've learned any creative endeavor: cold, hard, analysis. And shameless copying of what works. *If I'm good at designing UI now, it's because I've analyzed stuff--not because I came out the chute with an intuitive understanding of beauty and balance.*

#### The Rules

1. *Light comes from the sky.* Light comes from the sky so frequently and consistently that for it to come from below actually looks freaky. *Our screens are flat, but we've invested a great amount of art into making just about everything on them appear to be 3-D.*

Details:

- The unpushed button (top) has a dark bottom edge.
- The unpushed button is slightly brighter at the top than at the bottom.
- The unpushed button casts a subtle shadow.
- The pushed button, while still darker at the bottom than at the top, is darker, overall.

Divider notch: Top is darker since angled away from light, and bottom is brighter since it is angled towards the light.

Inset elements: text input fields, pressed buttons, slider tracks, radio button (unselected), checkboxes.

Outset elements: buttons (unpressed), slider buttons, dropdown controls, cards, the button part of a selected radio button, popups.

iOS 7: Literally flat - there are no simulated protrusions or indentations--just lines and shapes of solid color. I love clean and simple as much as the next guy, but I don't think this is a long-term trend here. The subtle simulation of 3-D in our interfaces seems far too natural to give up entirely.

2. *Black and White First.* Constraint: Design mobile first, and design black and white first. Add color last, and even then, only with purpose.

Add color last, and even then, only with purpose.

Designs that have a strong specific attitude--"sporty", "flashy", "cartoony", need a designer who can use color extremely well. But most apps don't have a specific attitude except clean and simple.

To add color: The simplest color is to add one color.

Color codes--RGB is not a good framework for coloring designs. What's better is `HSB/HSV/HSL`. By modifying the saturation and brightness of a single hue, you can generate multiple colors--darks, lights, backgrounds, accents, eye-catchers--but it's not overwhelming on the eye.

Tips:

- Never use black. Totally flat grays almost never appear in the real-world, and saturating your shades of gray adds a visual richness to your designs.
- Dribble search by color.

3. *Double your whitespace.* If you, like me, are used to formatting with CSS, where the default is no whitespace, it's time to untrain of those bad habits. Start thinking of whitespace as the default--everything stats as whitespace, until you take it away by adding a page element.

Starting with a blank page means starting with nothing but whitespace. You think of margins and spacing right from the very beginning. Everything you draw is a conscious whitespace-removing decision.

Put space between your lines. Put space between your elements. Put space between your groups of elements. Analyze what works.

## 7 Rules-Part 2

4. *Learn the methods of overlaying text on images.*

Applying text directly to the image--the image should be dark, and not a lot of contrasting edges. The text has to be white (no counterexamples exist). Test it at every screen/window size to make sure it's legible.

Overlaying the whole image--if the original image isn't dark enough, you can overlay the whole thing with translucent black. This method works great for thumbnails or small images. (Colored overlays can work, too.)

Text-in-a-box. Whip up a mildly-transparent black rectangle and lather on some white text.

Blur the image. Blur part of the underlying image.

Floor fade. You have an image that subtly fades towards black at the bottom, and there's white text written over it. There is a subtle gradient from the middle (0% opacity) to the bottom (black at 20% opacity). The Medium collection thumbnails use a slight text shadow to further increase legibility. As a result, Medium can layer just about any text on any image and have a readable result.

Other: floor blur.

Scrim: A gradiated-opacity box.

5. *Make text pop--and un-pop.* To pop: big, bold, capitalized. To decrease: Small, less contrast, less margin.

*Page titles are the only element to style all-out up-pop. For everything else, you need up- and down-pop.* Numbers = big size, color, aligned as the center, but they are also simultaneously downplayed with a very light font-weight, and lower-contrast color than the dark gray. Small labels below the numbers--are also uppercase and very bold.

Selected and hovered styles: Changing font-size, case, weight change how large of an area the text takes up, which can lead to seizing hover effects. We can have: text color, background-color, shadows, underlining, slight animations. We can also turn the white elements colored and the colored elements white, but darkening the background behind them.

If it doesn't look good, it could if you were better. Let's keep on trying and make ourselves better.

6. *Use Good Fonts.* Ubuntu, Open Sans, Bebas Neue (for all caps), Montserrat, Gotham, Proxima Nova, Raleway, Cabin, Lato, PT Sans, Entypo Social.

7. *Steal like an artist.* Every artist should be a parrot until they're good at mimicking the best.
