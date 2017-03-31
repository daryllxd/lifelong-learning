# Jekyll & Liquid Cheatsheet
[Reference](https://gist.github.com/smutnyleszek/9803727)

A list of the most common functionalities in Jekyll (Liquid). You can use [Jekyll](http://jekyllrb.com/) with [GitHub Pages](https://pages.github.com/), just make sure you are using [the proper version](https://pages.github.com/versions/).


## Running

Running a local server for testing purposes:

```
jekyll serve
jekyll serve --watch --baseurl ''
```

Creating a final outcome (or for testing on a server):

```
jekyll build
jekyll build -w
```

The `-w` or `--watch` flag is for enabling auto-regeneration, the `--baseurl ''` one is useful for server testing.


### Troubleshooting

On Windows you can get this error when building/serving:

```
Liquid Exception: incompatible character encodings: UTF-8 and IBM437 in index.html
```

You need to set the code-page first:

```
chcp 65001
```


## Liquid


### Output

Simple example of Output:

``` liquid
Hello {{name}}
Hello {{user.name}}
Hello {{ 'leszek' }}
```

Filtering output:

``` liquid
Word hello has {{ 'hello' | size }} letters!
Todat is {{ 'now' | date: "%Y %h" }}
```

Useful `where` filter example of getting single item from `_data`:

```
{% assign currentItem = site.data.foo | where:"slug","bar" %}
{{ newArray[0].name }}
```

Most common filters:

- `where` -- select elements from array with given property value: `{{ site.posts | where:"category","foo" }}`
- `group_by` -- group elements from array by given property: `{{ site.posts | group_by:"category" }}`
- `markdownify` -- convert markdown to HTML
- `jsonify` -- convert data to JSON: `{{ site.data.dinosaurs | jsonify }}`
- `date` -- reformat a date (syntax reference)
- `capitalize` -- capitalize words in the input sentence
- `downcase` -- convert an input string to lowercase
- `upcase` -- convert an input string to uppercase
- `first` -- get the first element of the passed in array
- `last` -- get the last element of the passed in array
- `join` -- join elements of the array with certain character between them
- `sort` -- sort elements of the array: `{{ site.posts | sort: 'author' }}`
- `size` -- return the size of an array or string
- `strip_newlines` -- strip all newlines (`\n`) from string
- `replace` -- replace each occurrence: `{{ 'foofoo' | replace:'foo','bar' }}`
- `replace_first` -- replace the first occurrence: `{{ 'barbar' | replace_first:'bar','foo' }}`
- `remove` -- remove each occurrence: `{{ 'foobarfoobar' | remove:'foo' }}`
- `remove_first` -- remove the first occurrence: `{{ 'barbar' | remove_first:'bar' }}`
- `truncate` -- truncate a string down to x characters
- `truncatewords` -- truncate a string down to x words
- `prepend` -- prepend a string: `{{ 'bar' | prepend:'foo' }}`
- `append` -- append a string: `{{ 'foo' | append:'bar' }}`
- `minus`, `plus`, `times`, `divided_by`, `modulo` -- working with numbers: `{{ 4 | plus:2 }}`
- `split` -- split a string on a matching pattern: `{{ "a~b" | split:~ }}`


### Tags

Tags are used for the logic in your template.


#### Comments

For swallowing content.

```
We made 1 million dollars {% comment %} in losses {% endcomment %} this year
```


#### Raw

Disables tag processing.

```
{% raw %}
    In Handlebars, {{ this }} will be HTML-escaped, but {{{ that }}} will not.
{% endraw %}
```

#### If / Else

Simple expression with if/unless, elsif [sic!] and else.

```
{% if user %}
    Hello {{ user.name }}
{% elsif user.name == "The Dude" %}
    Are you employed, sir?
{% else %}
    Who are you?
{% endif %}
```

```
{% unless user.name == "leszek" and user.race == "human" %}
    Hello non-human non-leszek
{% endunless %}
```

```
# array: [1,2,3]
{% if array contains 2 %}
    array includes 2
{% endif %}
```


#### Case

For more conditions.

```
{% case condition %}
    {% when 1 %}
        hit 1
    {% when 2 or 3 %}
        hit 2 or 3
    {% else %}
        don't hit
{% endcase %}
```


#### For loop

Simple loop over a collection:

```
{% for item in array %}
    {{ item }}
{% endfor %}
```

Simple loop with iteration:

```
{% for i in (1..10) %}
    {{ i }}
{% endfor %}
```

There are helper variables for special occasions:

- `forloop.length` -- length of the entire for loop
- `forloop.index` -- index of the current iteration
- `forloop.index0` -- index of the current iteration (zero based)
- `forloop.rindex` -- how many items are still left?
- `forloop.rindex0` -- how many items are still left? (zero based)
- `forloop.first` -- is this the first iteration?
- `forloop.last` -- is this the last iteration?

Limit and offset starting collection:

```
# array: [1,2,3,4,5,6]
{% for item in array limit:2 offset:2 %}
    {{ item }}
{% endfor %}
```

You can also reverse the loop:

```
{% for item in array reversed %}
...
```

#### Storing variables

Storing data in variables:

```
{% assign name = 'leszek' %}
```

Combining multiple strings into one variable:

```
{% capture full-name %}{{ name }} {{ surname }}{% endcapture %}
```


### Permalinks

Permalinks are constructed with a template:

```
/:categories/:year/:month/:day/:title.html
```

These variables are available:

- `year` -- year from the filename
- `short_year` -- same as above but without the century
- `month` -- month from the filename
- `i_month` -- same as above but without leading zeros
- `day` -- day from the filename
- `i_day` -- same as above but without leading zeros
- `title` -- title from the filename
- `categories`-- specified categories for the post
