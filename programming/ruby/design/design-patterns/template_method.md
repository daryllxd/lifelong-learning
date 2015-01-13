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

## Design Patterns in Ruby -- Template

No matter what format is involved--whether plain text or HTML or PostScript, the basic flow of `Report` remains the same:

1. Output header information.
2. Output the title.
3. Output each line of the actual report.
4. Output any trailing stuff required by the format.

*Define an abstract base class with a master method that performs the basic steps listed above, but leaves the details of each step to a subclass. We have one subclass for each output format.*

    class Report
      def initialize
        @title = 'Monthly Report'
        @text =  ['Things are going', 'really, really well.']
      end

      def output_report
        output_start
        output_head
        output_body_start
        output_body
        output_body_end
        output_end
      end

      def output_body
        @text.each do |line|
          output_line(line)
        end
      end

      def output_start
        raise 'Called abstract method: output_start'
      end

      def output_head
        raise 'Called abstract method: output_head'
      end

Ruby does not support abstract methods/classes, so the closest we can come is to raise exceptions should anyone try to call one of our abstract methods.

(Examples)

*The general idea of the Template Method pattern is to build an abstract base class with a skeletal method. This drives the bit of the processing that needs to vary, but it does so by making calls to abstract methods, which are then supplied by the concrete subclasses.*

If we engineer all of these tasks correctly, we will end up separating the stuff that stays the same (the basic algorithm expressed in the template method) from the stuff that changes (the details supplied by the subclasses).

#### Hook methods

    def output_start
    end

    def output_end
    end

Non-abstract methods that can be overridden in the concrete classes of the Template Method pattern are called hook methods. Hook methods permit the concrete classes to choose (1) to override the base implementation and do something different or (2) to simply accept the default implementation. Frequently, the base class will define hook methods solely to let the concrete subclass know what is going on.

The worst mistake you can make is to overdo things in an effort to cover every conceivable possibility. The Template Method pattern is at its best when it is at its leanest—that is, when every abstract method and hook is there for a reason. Try to avoid creating a template class that requires each subclass to over- ride a huge number of obscure methods just to cover every conceivable possibility.

*If you want to vary an algorithm, one way to do so is to code the invariant part in a base class and to encapsulate the variable parts in methods that are defined by a number of subclasses.* The base class can simply leave the methods completely undefined—in that case, the subclasses must supply the methods.
