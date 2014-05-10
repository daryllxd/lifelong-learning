# Gang of Design Patterns in Ruby: Template Method
[link](http://vimeo.com/86119078)

Template method is a *behavioral pattern*.

For each different test, you create an instance of the class, and assert on the final value. For each format, you have a class with that format. Each of them have their way of doing things.

Newsletter has 2 formats, HTML and text. You'll add a conditional (`if (params[:html]) elsif params[:markdown]`) which is super ugly.

    module Newsletter
      describe Generator do
        it "generates a newsletter in HTML" do
          # open the file

          Generator.new.render.must_include final_result
        end
      end
    end

## Refactored base class. The "public" method is render, which combines header and content.

    class Newsletter
      def render
        <<EOF
    #{header}

    #{content}
      end

> This is needed if you want these methods to be overrode by the subclasses.

      def header
        raise NotImplementedError
      end

      def content
        raise NotImplementedError
      end

> Test:

    Newsletter::Generator.new.header should raise NotImplementedError
    Newsletter::Generator.new.content should raise NotImplementedError

## HTML Generator

    class HTML < Generator
      def header
        '<h1>Hello</h1>'
      end

      def content
        '<p>yolo</p>'
      end
    end

## Md Generator - same thing but in Markdown.

## Tests

    Newsletter::Generators::HTML.new.render should_eq '<h1>Hello<h1><p>yolo</p>'
    Newsletter::Generators::Markdown.new.render should_eq '# Hello yolo'

