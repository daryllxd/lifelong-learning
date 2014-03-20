# Cascadia Ruby 2012 - Therapeutic Refactoring Large 

Random acts of refactoring: Small careful steps that improve the readability of the code. Tests are implied.

    def self.xyz_filename(target)
      # File format:
      # [day of month zero-padded][three-letter prefix]\
      # [kind][age_if_kind_personal],[target.id]\
      # [8 random chars]_[10 first chars of title].jpg
      filename = "#{target.publish_on.strftime("%d")}"
      filename << "#{target.xyz_category_prefix}"
      filename << "#{target.kind.gsub(". ","")}"
      filename << "_%03d" % (target.age || 0 ) if target.personal?
      filename << "#{target.id.to_s}"
      filename << "#{Digest::SHA1.hexdigest(random(10000).to_s)[0,8]}"
      truncated_title = target.title.gsub(/[^\\[a-z\]]/i, '').downcase
      length = trunctated_title.length
      truncate_to = length > 9 ? 9 : length
      filename << "#{truncated_title[0..(truncate_to)]}"
      filename << ".jpg"
      return filename
    end

"A kitten dies every time this code is run." No tests, no documentation.

The comment is bad, and its wrong. Basically information is being shrugged onto a string, but there is a chunk of something (`truncated_title`). There are also low-level shit such as gsub.

Nothing in the lower level of abstraction make sense. The thing with big ugly code is to break it down to small ugly code.

To start testing, just try to put stuff in anyway. expect anything. First error, no `publish_on` at line 6. We can stub out EVERYTHING to make the object "work".

First failure will look like this:

    let(:target) do
      messages = {
        :publish_on => Date.new(2012, 3, 14),
        :xyz_category_prefix => 'abc', 
        :kind => 'unicorn',
        :personal? => false,
        :id => 1337,
        :title => 'magic & superglue'
      }
      stub(:target, messages)
    end

We got this thingie from just seeing all the methods being called on the thing.

To pass, use a regex for the random part. Fix low-level details, and the alternate paths need test cases (conditionals need this).

So we expand from `it works` to...: `it leaves square brackets`, `it personalizes (basedon the personal conditional)`, `it handles nil age (based on the age conditional)`, `it handles short titles (based on the truncate conditional)`. If we pass everything, we have protection against regressions.

Now we have fake assertions to get us inputs to give us outputs to give us assertions. XD

## Refactoring

*replace method with method object*

[TODO]

Extracting stuff: Identifying a piece of code that performs a subtask and giving the code a name.

## Code Junk
1. Lousy comments: States obvious shit.
2. Trailing whitespace. Problem in either code or the git diffs.
3. Commented code. Just delete stuff if it's supposed to be deleted.
4. Random parens.
5. Explicit default parameters.
6. Unnecessary requires: If nothing uses active support, then don't import it.
7. Stringifying strings that are strings already.
8. Duplicated tests. Except if behavior is needed.
9. A combination of different smells

## Therapy
I vaguely recall writing that code. When I panic I write awful code. I love refactoring. If you have better working memory, you are able to remove things in your brain that you didn't want. So refactoring makes you happier. So you get faster classes for things. Fast tests are awesome. It's a huge enabler for flow.

Happiness leads to good design. "Can this be a separate class?" "Do I need a gem?" You optimize for developer happiness by making your tests really fast.


