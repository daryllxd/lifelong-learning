## Ruby API, Pickaxe Book, RubyMonk

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