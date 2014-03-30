Exhuberant CTAGS FTW: C-]
. - repeat last typed thingie

Terminal shortcuts
- C-U - clear entire line
- C-K - delete from cursor to end of line
- C-W delete word before cursor
- C-R search history
find and replace through whole file: :%s/replacee/replacer/g (add c to have a prompt)
  replace by itself: r then just keep on typing

f - find INCLUSIVE
t - find EXCLUSIVE

Macro - qa { Keybind } then end macro recording with q. then access the register `a` by @a.

  indent: v to visual, motion to higlight, = to indent, >>.

  . - repeat command

  .... c-n in insert mode: autocomplete bitches

  d/thingie -> delete until thingie
  / -> pattern matching
  * - lookf for the next occurence of the word
  % - find matching braces
  gd - jumo from the user of a vairable to its local declaration.

  find and replace:
  :%s/\s\+$//

  % - apply to entire file
  s - substitute
  /\s\+$/ - regex for "all whitespace, till the end of file"
  // - regex for "empty string"

  macros - to define, q, then a. the nrecord, then to exit, q. then you have @a as the "saved macro". 

  m - mark.
  ` - move to mark with a.
  ' - move to mark with a.

  external commands
  :w test - create a file
  :!rm test - delete a file
  =vimcasts netrw.vim 

# Vimcasts  - Rails

  moving across definitiojns
  ]m, [m -forward and backward methods. they are positioned on the `def` keywords.
  f( to move to the first param
      end method: ]m. this is good to change the return value via ]mo.
      [[ and ]] to move through the .
      % to move to matching things using matchit./
      these are in vim-ruby.

      text objects make you select stuff to match thingies.  thingies

      combination of shit to select a method: /end v %

      vim-textobj-rubyblock. so we can do var to select around ruby block, or vir to select inside ruby block. vam to select method. vam/vim to select classes/modules.

      since they are text methods we can do v to select, d to del, c to change, y to yank. so `cir` to change inside the ruby block. we can use `vam` etc and `dam`.

      yim to get everything inside the def, then ]] to jump to other class, then paste via p. boommmmmmm.

      nerdtree
      t to open file in new tab but stay on the saem thingie tab.

      - c-p open ctrlp in find file mode. tab to autocomplete dirs.
      inside: c-u to delete input field. c-w to delete word. c-p to find last

  normal search: `/`. then `n` to cycle and `n` to cycle back. incremental search: will progr

  :set incsearch
  :set hlsearch: highlight all matches in the file.
  :set ignorecase
  :set smartcase

  edit search history:
  q:, c-f when you search. to edit, go to insert mode etc.
  :h pattern

# keymapping

  keymapping - create a shortcut for combination of keys. 

  * [command] 

  map! <f5> "hello world"<cr> when you go to insert mode, you can do this.
  map <leader>, :<c-u>echo 'helo wrodl'</cr>
  noremap - not recursive.
  noremap works across all modes. to work only in normal mode, we do nnoremap.
  nnoremap <s-v> :<c-u>echo 'use insert mode'<cr> - this will only work in normal mode.

# Switch layouts

C-w H to go from horizontal to vertical.
C-w J to go from vertical to horizontal.
C-w r to swap the buffers.
C-w w to move cursor.

# marks
  ma - set mark "a" at current location
  'a - jump to start of line of mark a
  `a - jump to position (line and col) of mark a
  d'a - delete from current line to line of mark a

Sort properties in CSS: Select the lines and type `:sort`

Inserting a line break: Just do r-Enter.

# Insert mode

C-h - delete one char
C-w - delete one word
C-u - delete to start of line
C-k - delete forward to end of line

To run normal mode commands across a range, we can visually select them then run `:normal A;` to do an append semicolon at the land. Helpful when you need to edit something across lines.
Same with doing across the entire file, just do :%normal A;

http://dalibornasevic.com/posts/43-12-vim-tips

Spell checking - ]s, [s in normal mode

Swap chars: Xp in normal mode


