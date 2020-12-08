# Making Accessible Links: 15 Golden Rules For Developers
[Reference](https://www.sitepoint.com/15-rules-making-accessible-links/)

- Don't use the word "link" in your links.
- Don't capitalize links.
- Avoid ASCII characters. If you must use emoticons, mark them up with ARIA. Even dashes, you can change them. 16-17 years should be "16 to 17 years".
- Avoid using link URLs as link text.
- Keep link text concise - maximum of 100 characters.
- Restrict the number of text links on a page.
- Don't link directly to downloads.
- Alert the user when opening new windows. "This will open in a new window".
- Be aware of pagination and alphabetized links. There should be contextual information before the list of links.
  - Color should not be the only thing being used in pagination or alphabetised links to indicate the current link. This violates 1.4.1 Use of Color.
  - You should also add CSS padding around the link to increase the clickable area.
- Anchor links - need to say if you're navigating around in the same page.
- Underline links, or contrast them with the surrounding background. Underline, bold, italic, increase in font-size.
- Design with keyboard-only users in mind.
- No `onclick` on random elements, have to be links.
