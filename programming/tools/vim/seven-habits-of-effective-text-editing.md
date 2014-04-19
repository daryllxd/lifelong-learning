# Part 1: Edit a File

## 1. Move around quickly.

Most time is spent reading, checking for errors and looking for the right place to work on, rather than inserting new text or changing it.

Three basic steps:

1. Keep an eye for actions you repeat and/or spend quite a bit of time on.
2. Find if there is an editor command that will do this action quicker.
3. Train using the command. Do this until your fingers type it without thinking.

Ex: When using C you need to find where a function is defined. You can use the `*` command, but you discover ctags. You learn `C-]` and you save time.

"I want to get the work done, I don't have time to look through the documentation" is a horrible way of thinking.

Don't overdo it. If you always try to find the perfect command for every little thing you do, your mind will have no time left to think about the work you were actually doing.

## 2. Don't type it twice.

The `.` command repeats the last change. If you organize your editing around it, many changes will become am atter of hitting just that `.` key.

Vim has Macros: `qa` to start recording into register `a`. Better to use text objects, btw.

## 3. Fix it when it's wrong.

DO this: `:abbr accross across` to avoid the common misspellings.

# Part 2: Edit more files

## 4. A file seldom comes alone.

Use `ctags` and `:grep`. Search using `:cn` to take you to the next match.

## 5. Let's work together.

## 6. Text is structured.

# Part 3: sharpen the saw

## 7. Make it a habit

Most people only need to learn 10-20% of the commands for their work, but it's a different set of commands for everybody. It requires you check if this is a repetitive task that could be automated.

The essential basic step is the last one. You need to repeat the task until your finger does it automatically. Only then will you reach the efficiency you need. Write tricks down so you can look them up later.
