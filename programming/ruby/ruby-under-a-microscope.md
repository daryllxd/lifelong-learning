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
- Then, create an identifier for `times`.
- Then, create a reserved word token for `do`.

#### Ripper

``` ruby
require 'ripper'
require 'pp'
code = '10.times do |x| puts n end'
puts Ripper.lex(code)
```

- This shows what tokens Ruby creates for different code files.
- Ripper does not check if this is valid Ruby, it is the parser's job to check syntax.

#### Parsing

- Parsing: Grouping the things together.
- Bison generates the parser code (`parse.c`) from the grammar rule file (`parse.y`).

