## Ruby API, Pickaxe Book, RubyMonk

## Tipz 
[Link](http://blog.8thcolor.com/en/2014/03/7-daily-use-cases-of-ruby-hash/)

1. JSON -> Hash: `JSON.parse(data)`
2. Hash -> JSON: `require json; .to_json()`
3. Set default value: `contacts['Jane'][:email] = "jane@doe.com"`. Your default value for `[:`

        contacts.default_proc = Proc.new do |hsh, key|
                hsh[key] = {
                name: key,
                email: ''
            }
        end

4. Merging two nested Hashes: Use `deep_merge` from ActiveSupport.
5. Filtering out some keys using ActiveSupport: `SOME_ARRAY.except(:saturday, :sunday)`
6. Sorting: `sort_by`.
7. Finding the differences between two Hashes: `new_entries = updated_entries.reject{|k, _| entries.include? k}`.
    


#### API

- Hashes enumerate their values in the order that the corresponding keys were inserted. 
- We can create hashes via strings and via symbols. `grades = { "Jane Doe" => 10, "Jim Doe" => 6 }` or `options = { :font_size => 10, :font_family => "Arial" }`.
- Hashes also have a default value, declared on `grades = Hash.new(0)`. This is accessible via the `grades.default` method.

__Equality method__

	def ==(other)
		self.class === other and
	    other.author == @author and
		other.title == @title
	end

__Instance Methods__

	h = {"colors"  => ["red", "blue", "green"], "letters" => ["a", "b", "c" ]}

    h.assoc("letters")  							#=> ["letters", ["a", "b", "c"]]
    h.clear            								#=> {}
    h.default 										#=> {}
    h.default = 5									#=> 5
    h.default_proc Hash.new{|h,k| h[k] = k * k}		#=> #Proc If Hash::new was invoked with a block, return that block.
    h.delete("colors")								#=> ["red", "blue", "green"]
    H.delete("dqdq"){|e1| "#{e1} not found"}		#=> "dqdq not found" # return block if key doesn't exist
    h.delete_if{|k, v| k >= "b"}					#=> delete all where block evaluates to true

    h.each{|k,v| block}
    h.each_pair{|k, v| block}
    h.each											#=> an_enumerator
    h.each_pair										#=> an_enumerator

    h.each_key{|k| block}							#=> calls block once for each key in hsh, passing the key as param
    h.each_pair{|k, v| block}
    h.each_value{|v| block}							#=> calls block once for each key, passing in value
    h.empty?
    h.equal?										#=> same content
	h.fetch(key, [, default])						#=> ret default if not exist
	h.flatten

`each_with_index` awesomeness
	
	hash.each_with_index{|(k, v), index}

#### Initialization

	# Unorthodox
	
	chuck_norris = Hash[:punch, 99, :kick, 98, :stops_bullets_with_hands, true]
	def artax
	  a = [:punch, 0]
	  b = [:kick, 72]
	  c = [:stops_bullets_with_hands, false]
	  key_value_pairs = a, b, c
	  Hash[key_value_pairs]
	end

`each` has to be done in-place...

	restaurant_menu = { "Ramen" => 3, "Dal Makhani" => 4, "Coffee" => 2 }
	restaurant_menu.each do |item, price|
	  restaurant_menu[item] = price + (price * 0.1)
	end

NOT
	restaurant_menu = { "Ramen" => 3, "Dal Makhani" => 4, "Coffee" => 2 }
	restaurant_menu.each do |item, price|
	  price = price + (price * 0.1)
	end


Also known as associative arrays, maps, dictionaries, and are similar to arrays in that they are indexed collections of object references.

You can use any object as an index, but their elements are not ordered, so you cannot easily use a hash as a stack or a queue.

You can’t have multiple keys with the same value.

For the song list, we can define the [] method, to get the songs inside.
class SongList(index)
	def [](index)
		@songs[index]
	end
end
Iterators
def with_title(title)
	songs.find {|song| title == song.name}
end

Each vs. collect: Collect takes each element from the collection and passes it to the block. The results returned by the block are used to construct a new array.

  Inject: Set sum’s initial value, and iterate over the array using the inject.
  [1, 3, 5, 7].inject(0) {|sum, element| sum + element}
  [1, 3, 5, 7].inject(1) {|product, element| product * element}

Blocks as code blocks

    songlist = SongList.new
    class JukeboxButton < Button
        def initialize(label, &action)
            super(label) 
            @action = action
        end
        def button_pressed
            @action.call(self)
        end
    end

start_button = JukeboxButton.new("Start") { songlist.start } pause_button = JukeboxButton.new("Pause") { songlist.pause }

You can essentially pass a closure or a function inside. When using an ampersand, you are telling Ruby to look for a code block whenever that method is called.

restaurant_menu = { "Ramen" => 3, "Dal Makhani" => 4, "Coffee" => 2 }
restaurant_menu.each do |item, price|
  restaurant_menu[item] = price + (price * 0.1)
end
