Typeplate is a "typographic starter kit."

- Base type
- Typographic scale, from h1 to h6 (giga, mega)
- Default body and heading colors (#444, #222)
- Wordwrap mixin.
- Indent thingie.
- Smallcaps mixin.
- Drop capitals.
- Unicode ampersands.
- Icon font helper.
- Small print.
- Code, figures, blockquotes.
- Pull quotes via aside.
- Footnotes.
- Definition lists (has inline and dictionary option).



YAML::load(File.open('config/database.yml'))[$env].symbolize_keys.each do |key, value|
    set key, value
  end
