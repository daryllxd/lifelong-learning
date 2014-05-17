# Cascadia Ruby 2012 - Therapeutic Refactoring Large

Random acts of refactoring: Small careful steps that improve the readability of the code without changing the behavior. Tests are implied.

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

Nothing in the lower level of abstraction is being named/make sense. The thing with big ugly code is to break it down to small ugly code.

## First Middle: Tests

We don't know what the heck happens anyway, so we just try to run something, anything. `expect to see something`. First error, no `publish_on` at line 6. We can stub out EVERYTHING to make the object "work".

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

We got all of the types of the values from just seeing all the methods being called on the thing.

To pass, use a regex for the random part. Fix low-level details, and the alternate paths need test cases (conditionals need this).

At every conditional, we have to make another case.

So we expand from `it works` to...: `it leaves square brackets`, `it personalizes (basedon the personal conditional)`, `it handles nil age (based on the age conditional)`, `it handles short titles (based on the truncate conditional)`. If we pass everything, we have protection against regressions.

Now we have fake assertions to get us inputs to give us outputs to give us assertions. XD

## Refactoring (Second Middle)

*Replace method with method object.* We convert everything to a new object and make the previous params constructor arguments.

    module XYZService
      def self.xyz_filename(target)
        XYZFile.new(target) # New class.
      end

To extract, create an empty method and name it *by what it does, not by how it does it*. We find out that we can ditch the temporary variable. (BTW ternary statement can be [0..9].

    def truncated_title
      target.title.downcase.gsub(/[^\[a-z\]/, '')[0..9]
    end

Once we clean it up we can extract it to its own method.

    def noise ... end

After we perform extractions we get this:

    def name
      filename = "#{publication_day}"
      filename << "#{category}"
      filename << "#{kind}"
      filename << "#{age}" if target.personal?
      ...
    end

    def publication_day
    def category
    def kind
    def age
    def noise
    def truncated_title

We can chop the method into something like this:

    def name
      filename = ""  # Better to have it in this form.
      filename << publication_day
      filename << category
      filename << kind
      filename << "_#{age}" if target.personal?
      filename << "_#{target.id}"
      filename << "_#{noise}"

Then we can remove the interpolations and join them like this:

      filename << age if target.personal?
      filename << target.id
      filename << noise
      "#{filename.join("_")}.jpg"

First we quarantine the method and then we extract stuff. Extracting stuff: Identifying a piece of code that performs a subtask and giving the code a name.

Code smells: large method, 2 levels of abstraction, unnamed abstraction. Extracting methods addressed the issues. So we removed it and got out the pointless cruft.

## Code Junk (the pointless cruft)

1. Lousy comments: States obvious shit.

    # Takes modulus 100
    def say_it_again(number)
      number % 100
    end

2. Trailing whitespace. Problem in either code or the git diffs.
3. Commented code. Just delete stuff if it's supposed to be deleted. What are you saving it for?
4. Random parens.
5. Explicit default parameters.
6. Unnecessary requires: If nothing uses active support, then don't import it.
7. Stringifying strings that are strings already.
8. Duplicated tests. Except if behavior is needed. Ex: Tests to make sure that something "gets rid of spaces" in addition to "gets rid of special characters".
9. A combination of different smells.

## Therapy

I vaguely recall writing that code. When I panic I write awful code. Other people do yoga or white water rafting, but I love refactoring. Science proves why using working memory. If you have better working memory, you are able to remove things in your brain that you didn't want. So refactoring makes you smarter, because you offload things you don't need. So you get faster classes for things. Fast tests are awesome. It's a huge enabler for flow.

Selfishly isolating code to improve  my own happiness turned out to be good for the code as well. I began asking myself, "can this be it's own class" or "can this be it's own gem"?

In summary, refactoring makes you smarter by giving you an exit ramp, it is preventative and curative with respect to panic, and if you optimize for developer happiness by making your tests really fast, you get loosely coupled code that adheres to SRP.

