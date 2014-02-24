# Information Dashboard Design

## Chapter 1

* Everyone wants a dashboard, but often for the wrong reasons. Most dashboards fail to communicate effectively because of poorly designed implementations.
* In a genuine attempt to please their customers, software engineers focus on checking all the items off of lists of requested features.
A dashboard is a visual display of the most important information needed to achieve one or more objectives; consolidated and arranged on a single screen so the information can be monitored at a glance.
* A BI dashboard should serve a similar purpose as a car, whether you're using it to make strategic decisions or  perform tasks that involve no one but yourself.
* Dashboards are graphical not because it is cute but because graphics communicate better than text alone.
* Display the information needed to achieve specific objectives.
* Fit on a single computer screen. No scrolling around.
* If constant monitoring, then you must immediately be informed when something is wrong.
* Must monitor information at a glance. You have to quickly point out that something deserves your attention.
* Insisting on sexy displays similar to those found in a car when other mechanisms would work better is counterproductive.

## Chapter 2: Variations in Dashboard Use and Data

* Variations in timing: This year to date, this week to date, this quarter to date, yesterday…
* Enrichment through comparison: “At this time last year…”, “The current target is…”
* Non-quantitative: Top 10 customers, issues, tasks to do, people to contact.
Chapter 3: Common Mistakes
* Exceeding the boundaries of a single screen: When you need to scroll, we lose some of the other data. We can only hold a few chunks of information at a time.
* Fragmenting data into separate screens: Enabling users to navigate to discrete screens is baddddd. 
* Requiring scrolling: People commonly assume that anything that lies beyond their immediate field of vision and requires scrolling is of less importance than what's immediately visible.
* Supplying inadequate context for the data: Just stating # of sales does little, you need to compare this to something else. Have to indicate if stuff is good, or bad.
* Displaying Excessive Detail or Precision: Sometimes $3,848,305.93 M rather than $3.84 M is too much: it slows viewers down.
* Choosing a Deficient Measure: We must know what units the measure is being expressed. If you need to check budget targets, then check % changes rather than absolute.
* Choosing Inappropriate Display Media: Ex: using a graph when a table of numbers would work better, and vice versa. Pie charts are designed to present parts of a whole (though fuck pie charts). Bars are often better than them, though.
* No to pie, no to radar (circular shapes obscure data that would be clear in a linear display), no to random maps without context.
* Introducing Meaningless Variety: Always select the display that works best, even if that results in a dashboard that is filled with nothing but the same things.
* Using Poorly Designed Display Media.
* Order things by size.
* People should not have to look at the legend as much as possible.
* Too many bright colors produce sensory overkill.
* Colors should be very different from each other.
* In gauges, numbers are supposed to be outside the axis because they get obscured by the needle.
* Gridlines suck, they don't add value usually.
* Don't do 3D effects, data becomes hidden behind other data.
* We should always begin at zero.
* Arranging the Data Poorly
* Don't waste real estate with big logos and shit.
* Least prominent real estate on the screen is the lower-left corner, so don't put random attractive shit there.
* Sometimes over-under can be better than side-by-side arrangement.
* Highlighting Important Data Ineffectively or Not at All: Your eyes should immediately be drawn to the information that is most important.
* Cluttering the Display with Useless Decoration: Every thing you add that doesn't add value is just clutter.

## Chapter 4: Tapping Into Visual Perception

## Chapter 5: Eloquence Through Simplicity

* Ultimate challenge: Squeeze a great deal of useful information into a small amount of space, all the while preserving clarity.
* Summarize: Put sums and averages.
* Non-data ink: Can be in a different color.
* Don't put different colored bars if they don't mean anything.
* Fill colors are often unnecessary, but you can fill colors in alternating rows.
* Navigation: Put them away (bottom-right hand corner and mute them visually).
* Time-focused: No reason to display at same level of detail (past week has a higher priority than past year).
Chapter 6: Effective Dashboard Display Media
* Verbal = serially processed, one word at a time. Everyone processes language serially. If your sole purpose is to communicate year-to-date expenses, then just put a simple display.
* Tables are a good way of looking up precise individual values.
* Just changing font weights (not colors) is enough for people to know that 
something is different (or something is wrong).
* Graphics
* Bullets: Radial gauges waste a lot of space, due to their circular shape. They cannot be arranged in a perfect manner. Thermometers: space is wasted on meaningless realism.
* Bar graphs: They are designed to display multiple instances of one or more key measures. Use them for NOMINAL and ORDINAL data. They can be used for comparison purposes. Must start from zero.
* Stacked bar: Not that good, just arrange the components as individual bars.
* Pareto: Used to see who are the performers.
* Line graphs: Use them for INTERVAL data. Good for seeing trends. Sparklines = good.
* Again, fuck pie charts. They communicate less effectively than other means.
* Area graphs and radar graphs also suck, they suffer from occlusion.
* Icons: Just “alert”, “on”, and “off”.
 
## Chapter 7: Designing Dashboards for Usability

* Organize the information to support its meaning and use (order entry, shipping, budge planning) with entities (departments) or uses of the data.
* Delineate groups using the last visible means using white space (few borders as much as possible).
* Support meaningful comparisons, either by combining items in a single graph or by placing items close to each other.
* Make the viewing experience aesthetically pleasing: design is about communication, not aesthetics (although aesthetics helps).
* Colors: Keep bright colors to a minimum and use less saturated colors such as those that are predominant in nature.
* If the dashboard is a launchpad, allow the viewer to initiate the launch by clicking the data itself.
* Test your design for usability, you will never get everything right on the first try, you have to put it to the text.

## Chapter 8: Sample Sales Dashboard

#### Sample sales dashboard

* Key points: Sales revenue, sales revenue splits, profit, cx satisfaction, top 10 customers, market share.
* Decisions
* At what level of summarization…
* What unit of measure…
* What complementary informations should I use?
* What means of display would best express this measure?
* How important is this measure to a sales manager?
* At what point in the sequence of viewing might a sales manager want to see this measure?
* To what other measures might a sales manager want to compare this measure?
* Key metrics are at upper-left corner of the screen.
* Some measures are presented both graphically and as text (both actual sales amounts, and how well sales is doing compared to the target).
* White space alone has been used to delineate and group data: no background, borders, grid lines.
* No cluttering of instructions that will seldom be needed (they should be “clickable” or something).
* Problem with just text is that people make comparisons.
* Right-justify numbers so they are easier to read.
* Emphasize the current quarter (or current year).