## 1:Introduction

Test-Driven Development: Write test for code that does not exist. Then run the test and fail. Now write just enough code to make that test pass, no more.

Behavior-Driven Development: You’re supposed to test what an object does that what an object is (our stakeholders don’t care where the data is, just that it is in a database).

## 2: Hello

    gem install rspec
    rspec [options] [files or directories]

    Local:  name
    Global: $debug
    Instance: @name
    Class: @@total
    Constants: PI

Single statements of if/while: Use the “blab la bla if something < 500

Array of words: can be done with %w

    a = %w{ant bee cat} = [‘ant’, ‘bee’, ‘cat’]

Hash default value: Hash.new(1) (1 is the default value)
 
#### Blocks and Iterators

You can use code blocks to implement callbacks and iterators, and then execute them using yield.

Braces have higher precedence than `do end`.

You can’t pass multiple code blocks, but you can do multiple function passing via lambda.

Function call:

    opportunity ->{ @some_array.empty? }, ->{ @some_other_array.empty? }

and in the method itself:

    def opportunity(lambda1, lambda2)
        if lambda1.()
            @opportunities += 1
        end
        if lambda2.()
            @performances += 1
        end
    end

Usages

    [‘cat’, ‘dog’, ‘horse’].each {|name| print name, “ “}
    5.times { print “*”}
    3.upto(6) {|i| print i}
    (‘a’..’e’).each {|char| print char}

Reading and Witing

    puts = add a newline
    print = doesn’t add a newline
    printf = like C
 

## 3: Classes, Objects, Variables

`Initialize`: constructor.

`:artist` is an expression that returns a Symbol object corresponding to artist. You can think of `:artist` as meaning the name of the variable artist, and plain artist as meaning the value of the variable.

    attr_writer :duration

Whenever possible, try to use the `super` keyword.

Virtual attributes

    Class Song
    def duration_in_minutes
    	@duration/60.0 #force floating point
    	end
    	def duration_in_minutes=(new_duration)
    		@duration = (new_duration * 60).to_i
    	end
    end

This means it looks like there is a holding variable, when in reality there isn’t.

#### Class Variables and Class Methods

    Class SongList
    @@plays = 0 #classes must be initialized before they are used
    	MAX_TIME = 5 * 60 
    	
    	def SongList.is_too_long(song)
    		return song.duration > MAX_TIME
    	end
    end

Singleton

    class MyLogger
    	private_class_method :new
    	@@logger = nil
    	def MyLogger.create
    		@@logger = new unless @@logger
    		@@logger
    	end
    end

Class Method Definitions (These are the same thing)

class Demo
	def Demo.method1
	def self.method2
	class << self
		def method3

Access control

  class Accounts
    def initialize(checking, savings) 
    @checking = checking @savings = savings
    end 

  private

    def debit(account, amount)
              account.balance -= amount
    end 

    def credit(account, amount)
              account.balance += amount
          end

  public

    def transfer_to_savings(amount)
              debit(@checking, amount)
              credit(@savings, amount)
    end

  end

#### Variables

Strings are by reference. But you can duplicate stuff by the dup method.

Person1 = “tim”
Person2 = Person1.dup
Person1[0] = “J”
Person1 -> “Jim”, Person2 -> “Time
Person1.freeze -> prevents other people from modifying the object.
 
## Chapter 4: Containers, Blocks, and Iterators


	

 
Chapter 5: Standard Types
Numbers

Integers are held in binary form and are objects of class Fixnum or Bignum.

Underscores are ignored.

## 123_456: 123456

## 0xaabb: Hexadecimal

## 0377: Octal
-0b10_1010: Binary 

Iterators

## 3.times, 1.upto(5), 99.downto(95), 50.step(80, 5)

Strings are also not automatically converted to integers, you need to use the Integer method to convert the string to an integer.
Strings

Interpolation: You can include statements.


Public Classes
String.new(str="") -> new_str, returns a new string object containing a copy of str.
try_convert(obj) -> attempt conversion back to string or nil if obj cannot be converted for any reason

str * integer -> new_str: returns a new String containing integer copies of the old one.
"Ho! " * 3 => "Ho! Ho! Ho! "
 
 str << integer -> str, str.concat(33): concatenate. int is not automatically converted to string

 string <=> other_string -> -1, 0, +1 or nil
 nil if 2 values are incomparable
 "a" <=> "b" = -1. "a" <=> "a" = 0. "c" <=> "b" = 1.

 str == obj -> true if str <=> obj == 0. same implementation as ===

 str =~ obj -> if obj is regexp, check if matcher or not

 Indexing
 str[index] -> new_str or nil
 str[start, length] -> new_str or nil
 str[range] -> new_str or nil
 str[regexp] -> new_str or nil
 str[regexp, capture]
 str[match_str]

a = "hello there"
a[] => same as slice. .slice! for in-place editing
a[2..3] = "ll"
a[7..-2] = "her"
a[-4..-2] = "her"

bytezize -> returns length of str in bytes
"hello".bytesize = 5

capitalize, capitalize! = first char to upper case

casecmp(other_str): case-insensitive <=>
"abc".cascmp("ABC") = 0

str.chars -> returns char array

str.chomp, str.chomp! -> remove record separators such as newline (at the end of the string)
"hello\n".chomp => "hello"
"hello".chomp("llo") => "he"

str.chop!, chop => last char removed
str.chr => first char of string
str.clear => empty the string
str.codepoints => array of the Integer ordinals of the characters in str

alphabet: ("a".."z").to_a * ""

delete: remove all characters in the intersection of the arugments

alphabet = "abcdefghijklmnopqrstuvwxyz"
alphabet.delete "aeiou" -> removes all vowels
alphabet.delete "a-g" -> removes a-g
alphabet.delete! -> in-place deletion

a.downcase
a.dump all non-printing characters are replaced

a.each_char {|cstr| block} iterate over array
a.each_codepoint {|c| block} iterate over ascii values
a.empty? return true if length 0

end_with?
eql? same length and content

gsub(pattern, replacement)
gsub(pattern, hash)
gsub(pattern), {|match| block}
gsub(pattern) -> enumberator

All occurences of pattern are substituted for the second argument
pwede rin: gsub! (in-place)

"hello".gsub(/[aeiou]/, '*')                  #=> "h*ll*"
"hello".gsub(/([aeiou])/, '<\1>')             #=> "h<e>ll<o>"
"hello".gsub(/./) {|s| s.ord.to_s + ' '}      #=> "104 101 108 108 111 "
"hello".gsub(/(?<foo>[aeiou])/, '{\k<foo>}')  #=> "h{e}ll{o}"
'hello'.gsub(/[eo]/, 'e' => 3, 'o' => '*')    #=> "h3ll*"

include? check if it's there
index(substring, offset), index(regexp, offset)
replace => complete replacement

insert(index, other_str), modifies str
inspect
intern -> becomes a symbol
str.lines(separator = $/) -> an array

ljust(int, padstr ='')
"hello".ljust(4)            #=> "hello"
"hello".ljust(20)           #=> "hello               "
"hello".ljust(20, '1234')   #=> "hello123412341234123"

str.lstrip -> remove the leading whitespace
str.match(regexp, pos)
str.succ, str.next => "abc" becomes "abd", etc
str.oct => treat as octical
str.ord => convert to Integer

str.partition(sep), str.partition(regexp) => [head, sep, tail]

"hello".partition("l")         #=> ["he", "l", "lo"]
"hello".partition("x")         #=> ["hello", "", ""]
"hello".partition(/.l/)        #=> ["h", "el", "lo"]

str.prepend => in-place editing and adding before
str.reverse => yun
str.rindex => return last occurence
str.rjust => justify right
str.rpartition => start from right yung looking for first occur
str.rstrip
str.scan(pattern), str.scan(pattern){|match| block} => str

a = "cruel world"
a.scan(/\w+/)        #=> ["cruel", "world"]
a.scan(/.../)        #=> ["cru", "el ", "wor"]
a.scan(/(...)/)      #=> [["cru"], ["el "], ["wor"]]
a.scan(/(..)(..)/)   #=> [["cr", "ue"], ["l ", "wo"]]

str.squeeze([other_str]), str.squeeze! => returns a new string where runs of the same character are replaced by a single character.

"yellow moon".squeeze                  #=> "yelow mon"
"  now   is  the".squeeze(" ")         #=> " now is the"
"putters shoot balls".squeeze("m-z")   #=> "puters shot balls"

str.start_with
str.strip, str.strip!

str.sub(pattern) => replace the first occurence of the pattern 

str.swapcase(!) (change cases)
str.to_c => to complex number
str.to_f => to float
str.to_i(base = 10) => to base
str.to_sym => to symbol

str.tr(!)(from_str, to_str): replace and shit

"hello".tr('el', 'ip')      #=> "hippo"
"hello".tr('aeiou', '*')    #=> "h*ll*"
"hello".tr('aeiou', 'AA*')  #=> "hAll*"
"hello".tr('a-y', 'b-z')    #=> "ifmmp"
"hello".tr('^aeiou', '*')   #=> "*e**o"

str.tr_s(!)(from_str, to_str): drop duplicates

str.upcase(!)

str.upto() => fucking smart.
Ranges
     def <=>(other)
        self.volume <=> other.volume
      end

Ranges as conditions: They act as a toggle switch, and this code prints sets of lines from standard input, where the first line in each set contains the word start and the last line contains the word end.
while line = gets 
puts line if line =~ /start/ .. line =~ /end/
end

Ranges as intervals: We use this by using the === operator.
(1..10) === 5 => true
(1..10) === 15 => false
Regular Expressions
a = Regexp.new('^\s*[a-z]')
b = /^\s*[a-z]/
c = %r[^\s*[a-z]]

Matching: =~ operator
name = "Fats"
name =~ /a/ -> 1
name =~ /z/ -> nil
/a/ =~ name -> 1

When something matches, you get to set three things:
$& receives the part that matches
$` receives the part before
$’ receives the part after

def show_regexp(a, re)
      if a =~ re
        "#{$`}<<#{$&}>>#{$'}"
      else
        "no match"
      end
end 

show_regexp('very interesting', /t/) → very in<<t>>eresting

Anchor front: ^, anchor back: $
Read this shit later.

## Chapter 6: More about Methods

?: for querying

!: dangerous, or modify the receiver.

Variable length argument lists have *
def varargs(arg1, *rest)
	“Got #{arg1} and #{rest.join(‘, ‘)}”
end

If the last parameter in a method definition is prefixed with an ampersand, any associated block is converted to a Proc, and that object is assigned to the parameter.

  class TaxCalculator
    def initialize(name, &block)
      @name, @block = name, block 
    end

    def get_tax(amount) 
      "#@name on #{amount} = #{ @block.call(amount) }"
    end 
  end

tc = TaxCalculator.new("Sales tax") {|amt| amt * 0.075 } tc.get_tax(100) → "Sales tax on 100 = 7.5"
tc.get_tax(250) → "Sales tax on 250 = 18.75"

Possible to return multiple parameters
def meth_three
     100.times do |num|
       square = num*num
return num, square if square > 1000 
end
end 
meth_three → [32, 1024]
num, square = meth_three 
num → 32 square → 1024

Expanding arrays, possible using the * operator
five(1, 2, 3, *[‘a’, ‘b’]) -> “1 2 3 a b”

Lambda arguments to make the code cleaner
print "(t)imes or (p)lus: "
times = gets
print "number: "
number = Integer(gets)
if times =~ /^t/
calc = lambda {|n| n*number }
else
      	calc = lambda {|n| n+number }
end 
puts((1..10).collect(&calc).join(", "))
Chapter 7: Expressions

Modify indexing operator:
class Song
def [](from_time, to_time) result = Song.new(self.title + " [extract]",
                          self.artist,
                          to_time - from_time)
        result.set_start_time(from_time)
result end
end
Assignment

An assignment sets the value of the variable or the attribute on the left to refer to the variable or the attribute to the right.
a=b=1+2+3 
a→6 b→6 
a = (b = 1 + 2) + 3 a→6 b→3

If assigning to a variable or constant, no worries.

If assigning to an object or element reference, the forms are special because they are methods, and they can be overridden.
class Amplifier
      def volume=(new_volume)
self.left_channel = self.right_channel = new_volume 
end
end

Ruby assignments are effectively performed in parallel, so the values assigned are not affected by the assignment itself.
a, b = b, a

The values on the right are evaluated first in the order by which they appear.
x=0 →0 
a,b,c = x,(x+=1),(x+=1) → [0,1,2]
 
 

No auto-increment and auto-decrement operators!
Booleans and If-then

Any value that is not nil or false is true. The number zero, or a zero-length string, is not interpreted as false!

Last value is returned, but there are rules
nil and true → nil
false and true → false

## 99 and false → false

## 99 and nil → nil

## 99 and "cat" → “cat”

If and case statements can be super terse:
if song.artist == "Gillespie": handle = "Dizzy"

leap = case
       when year % 400 == 0: true
       when year % 100 == 0: false
       else year % 4   == 0: true
	 else			     false
       end

Range can be a boolean: exp1..exp2 evaluates as false until exp1 becomes true.
Writing If
if song.artist == "Gillespie"
      handle = "Dizzy"
    elsif song.artist == "Parker"
      handle = "Bird"
    else
      handle = "unknown"
end

if song.artist == "Gillespie" then handle = "Dizzy"
 elsif song.artist == "Parker" then handle = "Bird"
 else handle = "unknown" 
end

if song.artist == "Gillespie": handle = "Dizzy" 
elsif song.artist == "Parker": handle = "Bird" else 
handle = "unknown"
end


Case Expressions

Tests are done as: comparison === target.
leap = case
 when year % 400 == 0: true
 when year % 100 == 0: false
 else year%4 ==0
end

kind = case year
       when 1850..1889 then "Blues"
 when 1890..1909 then "Ragtime"
 when 1910..1929 then "New Orleans Jazz"
 when 1930..1939 then "Swing"
 when 1940..1950 then "Bebop"
 else "Jazz"
end

case 	shape #Polymorphism
when Square, Rectangle # ...
when Circle # ...
when Triangle # ... 
else # ...
end
Loops
a =1 
a *= 2 while a<100 
a -= 10 until a < 100 
a → 98

Ex: A file has 10 ordinal numbers but prints only the lines starting with the one thatm matches “thirds” and ending with the one that matches “fifth”.
file = File.open("ordinal")
while line = file.gets
puts(line) if line =~ /third/ .. line =~ /fifth/
end

Syntactic sugar:
For song in songlist
	song.play
end # translates to each

As long as you have an each method that makes sense, you can use a for loop to traverse its objects.
class Periods
      def each
        yield "Classical"
        yield "Jazz"
        yield "Rock"
end 
end

periods = Periods.new
    for genre in periods
      print genre, " "
    end
Examples

## 3.times {print “Ho!”}

## 0.upto(9) {|x| print x, “ “}

## 0.step(12, 3) {|x| print x, “ “}
[1, 1, 2, 3, 5].each {|val| print val, “ “}
#break terminates the immediately enclosing loop
#redo = repeats the loop from the start
#next skips to the end of the loop, starting the next iteration
Variable Scope, Loops, Blocks

Normally, the local variables created in these blocks are not accessible outside the block.

If at the time the block executes a local variable already exists with the same name as that of a variable in the block, the existing local variable will be used in the block. The Ruby interpreter just needs to have seen it.
if false 
a=1
end
    3.times {|i| a = i }
a→2
 

## 8.1: Exceptions, Catch and Throw





 

## 9.1: Modules
Namespaces

Modules define a namespace, a sandbox in which your methods and constants can play without having to worry about being stepped on by other methods and constants.
module Trig
      PI = 3.141592654
      def Trig.sin(x)
# .. end
      def Trig.cos(x)
       # ..
end end

If another program wants to use these modules, it can simply load the two files using the Ruby require statement.
require 'trig'
require 'moral'
y = Trig.sin(Trig::PI/4)
wrongdoing = Moral.sin(Moral::VERY_BAD)
Mixins

By including a module inside a class, the module’s instance methods are suddenly available as methods in the class as well. They get mixed in.
module Debug
def who_am_i?
"#{self.class.name} (\##{self.id}): #{self.to_s}" 
end
end

class Phonograph
include Debug

class EightTrack
      include Debug

ph = Phonograph.new("West End Blues") 
et = EightTrack.new("Surrealistic Pillow")
ph.who_am_i? → "Phonograph (#935520): West End Blues" 
et.who_am_i? → "EightTrack (#935500): Surrealistic Pillow"


Include has nothing to do with files, you use the require command for separate files.

Enumerable inject
[1,2,3,4,5].inject{|v,n|v+n} → 15
( 'a'..'m').inject {|v,n| v+n } → "abcdefghijklm"

class VowelFinder
include Enumerable

def initialize(string)
        @string = string
end

def each @string.scan(/[aeiou]/) do |vowel|
          yield vowel
end
end 
vf = VowelFinder.new("the quick brown fox jumped") 
vf.inject {|v,n| v+n } → "euiooue"
Including Other Files

Load: Includes the named Ruby source file every time the method is executed.
load ‘filename.rb’

Require loads any given file only once.
require ‘filename’

Local variables in a loaded or required file are not propagated to the scope that loads or requires them.

Require is an executable statement: it could be inside an if or it could include a string you just built.
 

## 10: Reading and Writing Files

 

## 11: Threads and Processes
 

## 12: Unit Testing
Structuring Tests

High-level: Test cases.

Low-level: Test methods.

Have a test/ directory where you place all your test source files.

Don’t require necessary files for testing because everything will be loaded.

## 13: When Trouble Strikes

Run your scripts with warnings enabled (-w).

Need to put self when setting an instance variable.
class Incorrect
attr_accessor :one, :two
def initialize
one = 1
self.two = 2
end
end

obj = Incorrect.new 
obj.one → nil
obj.two → 2

Objects that don’t appear to be properly set up> Incorrectly spelled initialize  or variable names.

Output written to a terminal may be buffered: always used nonbuffered I/O (set sync = true) for debug messages.

Text from file is a string, and has to be converted to a number via the Integer(num1) method or via map.

Benchmark, profiler.
 

## 14: Ruby and Its World
ruby –w “Hello World”
ruby –C directory #changes working directory to directory before executing
ruby –c #checks syntax only
ruby –d #sets debug and verbose to true
Command-line arguments: ARGV
ARGV.each { |arg| p arg }
Ruby –w test.rb “Hello World” a1 1.6180
$0 #Name of current program
Environment Variables
ENV[‘SHELL’]

## 15: Interactive Ruby Shell
~/.irbrc
irb –r load_module

Autocomplete: tab-tab
Exit, quit, irb_exit, irb_quit

## 16: Documenting Ruby
 

## 17: Package Management with RubyGems

WTF IS IT: A standardized package format and a central repository for hosting packages in this format.

Installation and management of multiple, simultaneously installed versions of the same library

End-user tools for querying, installing, uninstalling, and otherwise manipulating these packages.

Installing

    Gem install –r rake
    Gem install –r rake –v “< -0.4.3”

Each install of an application effectively overwrites the previous one.

    Gem install Program –t #runs the program’s tests first

## 18: Ruby and the Web

erb and eruby

    <% ruby code %>
    <%= ruby expression %>
    <%# ruby code %> #the Ruby code between the delimiters is ignored
    % line of ruby code

Cookies and Sessions

    require ‘cgi’
    cgi = CGI.new
    cookie = CGI::Cookie.new(COOKIE_NAME, Time.now.to_s)
    cookie.expires = Time.noew + 30*24*3600 # 30 days
    cgi.out(“cookie” => cookie) { msg } # sending to browser

    require ‘cgi’
    require ‘cgi/session’

    cgi = C

