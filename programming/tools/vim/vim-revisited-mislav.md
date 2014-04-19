# Vim: Revisited
[link](http://mislav.uniqpath.com/2011/12/vim-revisited/)

Starting point:

    set nocompatible                " choose no compatibility with legacy vi
    syntax enable
    set encoding=utf-8
    set showcmd                     " display incomplete commands
    filetype plugin indent on       " load file type plugins + indentation

    "" Whitespace
    set nowrap                      " don't wrap lines
    set tabstop=2 shiftwidth=2      " a tab is two spaces (or set this to 4)
    set expandtab                   " use spaces, not tabs (optional)
    set backspace=indent,eol,start  " backspace through everything in insert mode

    "" Searching
    set hlsearch                    " highlight matches
    set incsearch                   " incremental searching
    set ignorecase                  " searches are case insensitive...
    set smartcase                   " ... unless they contain at least one capital letter

## Yanking

    "aY # yank current line into register "a"
    "ap # paste from register "a"
    "*Y # yank line into special register "*", system clipboard
    "*p # paste from register "*", system clipboard
    "_D # use black hole register (don't override the default register)
