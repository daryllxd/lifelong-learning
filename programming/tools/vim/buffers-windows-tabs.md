# Buffers, windows, tabs
[link][http://blog.sanctum.geek.nz/buffers-windows-tabs/]

Buffers - A buffer is an "open instance" of a file. When you open a single
file, that file gets put into a buffer. If you open another file with `:edit`,
that buffer goes into the background and you start working with the new file.
The previous buffer only goes away whe n you explicitly delete it with `:quit`
or `:bdelete`.

Window - Is a viewport onto a single buffer. When you open a new window with
`:split` or `:vsplit`, *you open a file in a new buffer, and then opens a new
window as a view onto it.* A buffer can be viewed in multiple windows within a
single Vim session.

Tab - _A tab is a collection of one or more windows._ So it enables you to group windows usefully.
