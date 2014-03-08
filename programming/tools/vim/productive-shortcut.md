## What is your most productive shortcut with Vim?

- Use left and right hands alternating.
- Never touch the mouse. It takes ages of you to go to mouse.

`yy` to copy one line
`[number] yy` to copy number lines to buffer.

## Your problem with Vim is that you don't grok vi.

Programmers often want to work on whole lines anyway. `yy` is only one of many ways to yank text into the anonymous copy buffer/register.

The "Zen" of vi is you're speaking a language. The initial `y` is a verb. `yy` is a synonym for `y_`.

`dd P`: Delete the current line.
