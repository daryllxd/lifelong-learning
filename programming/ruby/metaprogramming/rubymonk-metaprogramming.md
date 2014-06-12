# RubyMonk

Almost every major language construct in Ruby--most notably classes and methods--can be changed at runtime. You can add methods to classes, remove them or redefine them.

    # Defining the #words method in a string.
    class String
      def words
        self.split(" ")
      end
    end


