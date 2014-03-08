## What is your most productive shortcut with Vim?
[Link](http://stackoverflow.com/questions/1218390/what-is-your-most-productive-shortcut-with-vim?rq=1)

- Use left and right hands alternating.
- Never touch the mouse. It takes ages of you to go to mouse.

`yy` to copy one line
`[number] yy` to copy number lines to buffer.

## Your problem with Vim is that you don't grok vi.

Programmers often want to work on whole lines anyway. `yy` is only one of many ways to yank text into the anonymous copy buffer/register.

The "Zen" of vi is you're speaking a language. The initial `y` is a verb. `yy` is a synonym for `y_`.

`dd P`: Delete the current line.

The `y` and `d` "verbs" take any movement as their "subject". So `yW` means yank from here to the end of the current next (big) word.

_If you only understand basic up, down, left, and right cursor movements then vi will be no more productive than a copy of "notepad" for you._

A mark is set to any cursor location using `m`. `ma` sets the `a` mark to the current location. You can move to the line containing a mark using the `'` command. You can move to the beginning of the line containing with ```.

We can more describe the range of text without moving our cursor around and dropping mark. `{d}`means go to start of paragraph and delete to end of 1 paragraph.

Delete up to: `d /[REGEX]`
