## RubyMonk, Pickaxe

"Pure" code is code without side-effects (code that just performs calculations).

	# open the file "new-fd" and create a file descriptor:
	fd = IO.sysopen("new-fd", "w")

	# create a new I/O stream using the file descriptor for "new-fd":
	p IO.new(fd)

There are a bunch of I/O streams that Ruby initializes when the interpreter gets loaded.

	io_streams = Array.new
	ObjectSpace.each_object(IO) { |x| io_streams << x }

	p io_streams # Medyo marami

Ruby defines constants STDOUT, STDIN and STDERR that are IO objects pointing to your program's input, output and error streams that you can use through your terminal, without opening any new files. 

	p STDOUT.class
	p STDOUT.fileno
	  
	p STDIN.class
	p STDIN.fileno

	p STDERR.class 
	p STDERR.fileno

Whenever you call `puts`, the output is sent to the `IO` object that `STDOUT` points to. It is the same for `gets`, where the input is captured by the `IO` object for `STDIN` and the `warn` method which directs to `STDERR`.

The Kernel module provides us with global variables $stdout, $stdin and $stderr as well, which point to the same IO objects that the constants STDOUT, STDIN and STDERR point to. We can see this by checking their object_id.

	p $stdin.object_id is the same as p STDIN.object_id
	p $stdout.object_id is the same as p STDOUT.object_id
	p $stderr.object_id is the same as p STDERR.object_id

Whenever you call `puts`, you're actually calling `Kernel.puts` (methods in `Kernel` are accessible everywhere in Ruby), which in turn calls `$stdout.puts`.


[TODO]


	gets: reads a line from standard input
	file.gets: reads a line from the file object file

Iterators

Spit out exceptions if the files don’t exist.

	File.open("testfile") do |file|
		file.each_byte {|ch| putc ch; print "." }
	end

#### Per line

File.open("testfile") do
      file.each_line {|line|
end

#### Entire file: String, or array of lines

	str = IO.read("testfile")
	str.length → 66
	arr = IO.readlines("testfile")
	arr.length → 4
	Talking to Networks ???
	require 'socket'
	client = TCPSocket.open('127.0.0.1', 'finger')
	client.send("mysql\n", 0) # 0 means standard packet puts client.readlines
	client.close