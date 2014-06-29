New awesomesauce!!

    d/Same # Delete until you match "Same"

Vanilla Vim

Make directories

    :! mkdir -p spec/models
    :E spec/models/user_spec.rb

    vsplit.
    hsplit.
    Ve
    Se

gU(motion) - capitalize
gu(motion) - lower case

# Terminal shortcut

    C-h - delete one char
    C-w - delete one word
    C-u - delete to start of line
    C-k - delete forward to end of line
    - C-W delete word before cursor
    - C-R search history

; , - Repeat last f, F, t, T

_ Black hole register. `"_d` to delete and not override current register.

RSpec let - gary bernhardt

C-o on insert mode to execute one normal mode command before going back to insert mode.

  gd - jump from the user of a variable to its local declaration.

  m - mark.
  ` - move to mark with a.
  ' - move to mark with a.

# Vimcasts  - Rails

Under the hood, Rails.vim's :Econtroller, :Emodel use the :find command from Vim.

Opening vim:

  vim -u (load your own vimrc)

# Quick pasting
yiw
vep to copy over the word and paste in on the register
go back and vep to copy over the first one.

The `gf` by default looks for something with the full expension.

:setpath = to find what directories Vim searches for the path.

  moving across definitions
      end method: ]m. this is good to change the return value via ]mo.
      [[ and ]] to move through the .
      % to move to matching things using matchit./
      these are in vim-ruby.

      text objects make you select stuff to match thingies.  thingies

combination of shit to select a method: /end v %

      vim-textobj-rubyblock. so we can do var to select around ruby block, or vir to select inside ruby block. vam to select method. vam/vim to select classes/modules.

      since they are text methods we can do v to select, d to del, c to change, y to yank. so `cir` to change inside the ruby block. we can use `vam` etc and `dam`.

      yim to get everything inside the def, then ]] to jump to other class, then paste via p. boommmmmmm.

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

  map! <f5> "hello world"<cr> when you go to insert mode, you can do this.
  map <leader>, :<c-u>echo 'helo wrodl'</cr>
  noremap - not recursive.
  noremap works across all modes. to work only in normal mode, we do nnoremap.
  nnoremap <s-v> :<c-u>echo 'use insert mode'<cr> - this will only work in normal mode.

# Switch layouts

C-w r to swap the buffers.
C-w w to move cursor.

To run normal mode commands across a range, we can visually select them then run `:normal A;` to do an append semicolon at the land. Helpful when you need to edit something across lines.
Same with doing across the entire file, just do :%normal A;

http://dalibornasevic.com/posts/43-12-vim-tips

