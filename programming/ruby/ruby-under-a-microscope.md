## Ruby Under a Microscope

#### Tokenization and Parsing

- Ruby reads/transforms your code 3 times before running it.
- Tokenizing: Converts the text characters and converts them into tokens, the words used in the Ruby language.
- Parsing: Groups the tokens into meaningful Ruby statements.
- Compile to low-level instructions that it can execute later using a VM.
- MRI = Matz's Ruby interpreter.
- `parse.y`: A grammar rule file that contains the series of rules for the Ruby parser engine.

``` ruby
10.times do |n|
```

- Iteration: When seeing a number it waits for the next non-numeric.
- If it finds a `.` it actually considers the period to be numeric since it might be a part of a float.
- Since `t` is a non-numeric, the period is part of a separate token, and converts the numerics into a n integer.
- Then, create an identifier for `times`. Identifier = variable, method, class name.
- Then, create a reserved word token for `do`. Reserved = can't be used as normal identifiers, though you can use them as method names, global variable names.

#### `Parser_yylex`

- `parse.y` is a grammar rule file, one that contains a set of rules for the Ruby parser engine.
- The `parser_yylex` function contains the code that actually tokenizes your code.

#### Ripper

``` ruby
require 'ripper'
require 'pp'
code = '10.times do |x| puts n end'
puts Ripper.lex(code)
```

- This shows what tokens Ruby creates for different code files.
- It snips the code apart and creates an array of tokens (and if they are identifiers, operators, integers, etc.)
- Ruby is smart enough to distinguish between `<<` and `<`.
- Doesn't check if valid Ruby, just makes tokens.

#### Parsing

- Parsing: Grouping the things together (order of operations, methods, blocks.)
- Bison generates the parser code (`parse.c`) from the grammar rule file (`parse.y`).
- LALR: Look-Ahead Left Reversed Rightmost Derivation.
- Sort of Wutface here I can't understand! -Daryll

### Compilation

- 1.8: no compiler. 1.9 and 2.0: Yet Another Ruby Virtual Machine (YARV).
- Ruby -> Tokens -> AST nodes -> YARV instructions -> (Interpret) -> C -> Machine language.
