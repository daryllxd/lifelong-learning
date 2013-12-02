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