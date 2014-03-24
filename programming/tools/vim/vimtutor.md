:new or :vnew  to open a new window
:new `file_name` (has to include the directory).
:vertical-split

:set splitbelow
:set splitright
c-w = - to make the 2 panes equal

find and replace through whole file: :%s/replacee/replacer/g (add c to have a prompt)
  replace by itself: r then just keep on typing

  cursor movezz
  l – jump to the bottom of the screen (“low”)
  h – jump to the top of the screen (“high”)
m – jump to the middle of the screen (“middle”)

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

  - `p` to put ghe deleted text after the cursor
  - to replace the 

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


  find:help text-objects

  normal search: `/`. then `n` to cycle and `n` to cycle back. incremental search: will progr

  :set incsearch
  :set hlsearch: highlight all matches in the file.
  :set ignorecase
  :set smartcase

  edit search history:
  q:, c-f when you search. to edit, go to insert mode etc.
  :h pattern

# Fugitive.vim

:Git

:Git co -b experimental. 
Aliases in the gitconfig work fine with fugitive.


# keymapping

  keymapping - create a shortcut for combination of keys. 

  * [command] 

  map! <f5> "hello world"<cr> when you go to insert mode, you can do this.
  map <leader>, :<c-u>echo 'helo wrodl'</cr>
  noremap - not recursive.
  noremap works across all modes. to work only in normal mode, we do nnoremap.
  nnoremap <s-v> :<c-u>echo 'use insert mode'<cr> - this will only work in normal mode.

# Vim Register:

System clipboard: "+


# Switch layouts

C-w H to go from horizontal to vertical.
C-w J to go from vertical to horizontal.
C-w r to swap the buffers.
C-w w to move cursor.


# indenting code:

  the leader command to paste: p.

# marks
  ma - set mark "a" at current location
  'a - jump to start of line of mark a
  `a - jump to position (line and col) of mark a
  d'a - delete from current line to line of mark a


  dap - delete inside par
  `
  map <leader>ac :sp app/controllers/application_controller.rb<cr>
  vmap <leader>b :<c-u>!git blame <c-r>=expand("%:p") <cr> \| sed -n <c-r>=line("'<") <cr>,<c-r>=line("'>") <cr>p <cr>
  vmap <leader>bed "td?describe<cr>obed<tab><esc>"tpkdd/end<cr>o<esc>:nohl<cr>
  map <leader>cu :tabularize /\|<cr>
  map <leader>co ggvg"*y
  map <leader>cc :rjcollection client/
  map <leader>cj :rjspec client/
  map <leader>cm :rjmodel client/
  map <leader>ct :rtemplate client/
  map <leader>cv :rjview client/
  map <leader>d odebugger<cr>puts 'debugger'<esc>:w<cr>
  map <leader>gac :gcommit -m -a ""<left>
  map <leader>gc :gcommit -m ""<left>
  map <leader>gs :gstatus<cr>
  map <leader>gw :!git add . && git commit -m 'wip' && git push<cr>
  map <leader>f :call openfactoryfile()<cr>
  map <leader>fix :cnoremap % %<cr>
  map <leader>fa :sp test/factories.rb<cr>
  map <leader>i mmgg=g`m<cr>
  map <leader>j :commandt app/assets/javascripts<cr>client/
  map <leader>l oconsole.log 'debugging'<esc>:w<cr>
  map <leader>m :rmodel 
  map <leader>o :w<cr>:call runcurrentlineintest()<cr>
  map <leader>ra :%s/
  map <leader>rd :!bundle exec rspec % --format documentation<cr>
  map <leader>rf :commandtflush<cr>:commandt<cr>
  map <leader>rs :vsp <c-r>#<cr><c-w>w
  map <leader>rt q:?!ruby<cr><cr>
  map <leader>rw :%s/\s\+$//<cr>:w<cr>
  map <leader>sc :sp db/schema.rb<cr>
  map <leader>sg :sp<cr>:grep 
  map <leader>sj :call openjasminespecinbrowser()<cr>
  map <leader>sm :rsmodel 
  map <leader>sp yss<p>
  map <leader>sn :e ~/.vim/snippets/ruby.snippets<cr>
  map <leader>so :so %<cr>
  map <leader>sq j<c-v>}klllcs<esc>:wq<cr>
  map <leader>ss ds)i <esc>:w<cr>
  map <leader>st :!ruby -itest % -n "//"<left><left>
  map <leader>su :rsunittest 
  map <leader>sv :rsview 
  map <leader>t :w<cr>:call runcurrenttest()<cr>
  map <leader>y :!rspec --drb %<cr>
  map <leader>u :runittest<cr>
  map <leader>vc :rvcontroller<cr>
  map <leader>vf :rvfunctional<cr>
  map <leader>vg :vsp<cr>:grep 
  map <leader>vi :tabe ~/.vimrc<cr>
  map <leader>vu :rvunittest<cr>
  map <leader>vm :rvmodel<cr>
  map <leader>vv :rvview<cr>
  map <leader>w <c-w>w
  map <leader>x :exec getline(".")<cr>

  " edit another file in the same directory as the current file
  " uses expression to extract path from current file's path
  map <leader>e :e <c-r>=expand("%:p:h") . '/'<cr>
  map <leader>s :split <c-r>=expand("%:p:h") . '/'<cr>
  map <leader>v :vnew <c-r>=expand("%:p:h") . '/'<cr>

