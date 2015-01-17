# Gang of Four Design Patterns - Factory

## Design Patterns in Ruby -- Factory

Sometimes the choice of which class to use is a critical decision. Will you be using a `PlainReport` or an `HTMLReport` today?

GOF calls the technique of pushing the "which class" decision down to a subclass the `Factory Method` pattern. Creators: the base and concrete classes that contain the factory methods. Products: the objects that are being created.

Factory Method is not really a new pattern but it is a Template Method pattern applied to creating new objects.

If we need logic to create both plants and animals, we might need to do some type of *parameterized factory method*:

    class Pond
      def initialize(number_animals, number_plants)
        @animals = []
        number_animals.times do |i|
          animal = new_organism(:animal, "Animal#{i}") # Create animals
          @animals << animal
        end

        @plants = []
        number_plants.times do |i|
          plant = new_organism(:plant, "Plant#{i}")    # Create plants
          @plants << plant
        end
    end

    # ... end
    class DuckWaterLilyPond < Pond                    # Each pond has a way of creating animals and plants, but they depend on the firs parameter passed in the new_organism method
      def new_organism(type, name)
        if type == :animal
          Duck.new(name)
        elsif type == :plant
          WaterLily.new(name)

This is easier to extend because if you need to define a new kind of product such as `:fish`, you just modify a single method, as opposed to adding a new method.


