## [5 Common Rails Mistakes](http://www.mikeperham.com/2012/05/05/five-common-rails-mistakes/)

- Migrations with no schema specifics. Add `:null`, `:limit`.
- OOP. Add OOP thingies if you need to, don't stick plainly to MVC. Introduce facades for any 3rd-party services.
- Concatenating HTML in helpers: this is XSS attack fodder.

		content_tag :li, :class => 'vehicle_list' do
	  		link_to("#{vehicle.title.upcase} Sale", show_all_styles_path(vehicle.id, vehicle.url_title))
		end
	

- Giant queries, use find_each rather than each, to pull in 1000 records at a time, as opposed to everything. Or you can use raw SQL.

		User.has_purchased(true).find_each do |customer|
	  		customer.grant_role(:customer)
		end

- Code review. Test first.

## [21 Ruby Tricks You Should Be Using In Your Code](http://www.rubyinside.com/21-ruby-tricks-902.html)

1. Extract Regex matches quickly: Instead of `email.match`, try `email[]`.

2. Shortcut for Array#join: When given a string as an argument, Array#* does a join! `#w{this is a test} * ", "`

3. Format decimal amounts quickly: Use a formatting interpolation (`"$.2f" % money`).

4. Fast interpolate

		x = %w{p hello p}
		"<%s\>%s</%s\>" % x => "<p\>hello</p\>"

5. Use 'and' and 'or' to group operators.

		queue = []
		%w{hello x world}.each do |word|
		  queue << word and puts "Added to queue" unless word.length <  2
		end


6. Quick mass assignments: `a, b, c, d = 1, 2, 3, 4`. Or you can put method arguments together:

		def my_method(*args)
			a, b, c, d = args
		end

7. Ranges, not comparisons

			year = 1972
				puts  case year
		    	when 1970..1979: "Seventies"
		    	when 1980..1989: "Eighties"
				when 1990..1999: "Nineties"
	     	end

8. Enum to cut down repetitive code: `%w{rubygems daemons eventmachine}.each {|x| require x}

9. Allow both single items and arrays to be enumerated:

			# [*items] converts a single object into an array with that single object
			# of converts an array back into, well, an array again
			[*items].each do |item|
			  # ...
			end

Check if current path (for links)

	 def current?(path='/')
	   request.path_info==path ? "current": nil
	 end

	$:.unshift File.dirname(__FILE__) to add shit to the load path

	YAML::load(File.open('config/database.yml'))[$env].symbolize_keys.each do |key, value|
		set key, value
	end

## [Creating Websites Faster](http://faster-websites.herokuapp.com/)

Speed: <0.1s = fast, 0.1s - not snappy, >1s sluggish

Latency: Tools.pingdom.com

#### Tipz

1. CDN, or use Rack::Cache
2. Expires header. Static content: a future Expires, dynamic: Cache-Control.
3. Gzip the shits. (use `Rack::Deflater`)
4. CSS: Avoid @import, avoid complex child selectors that affect performance.
5. Reduce DNS lookup, reduce the number of unique hostnames that they cx need to find.























