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

*Problem with Factory Method: This requires a separate subclass for each specific type of object that needs to be manufactured. We have a `DuckWaterLilyPond` and a `FrogAlgaePond`, but we could also have a `DuckAlgaePond` and a FrogWaterLilyPond`. If we add a few more animals and plants, the number of possible classes becomes scary.*

We can remove the subclassing by storing the classes of the objects that we want to create in instance variables:

    class Pond
      def initialize(number_plants, animal_class, number_plants, plant_class) # Define which class you will create
        @animal_class = animal_class
        @plant_class = plant_class

        @animals = []
        number_animals.times do |i|
          animal = new_organism(:animal, "Animal#{i}")
          @animals << animal
        end

If we add something like a Jungle which has Tigers, then we can copy the same pattern, but then we can create stuff like `Habitat.new(Tiger, Waterlily)` wherein they are not compatible but they get created anyway. *Instead of passing the inidivudal plant and animal classes to `Habitat`, we can pass a single object that knows how to create a consistent set of products. Thie object will create either frogs/lily pads or tigers/trees.*

#### Abstract Factory

    class PondOrganismFactory                           # The PondOrganism factory knows how to create animals and plants
      def new_animal(name)
        Frog.new(name)
      end

      def new_plant(name)
        Algae.new(name)
      end
    end

    class JungleOrganismFactory                         # Same with the JungleOrganismFactory
      def new_animal(name)
        Tiger.new(name)
      end

      def new_plant(name)
        Tree.new(name)
      end
    end

    class Habitat
      def initialize(number_animals, number_plants, organism_factory) # You pass in the factory inside and tell it to produce animals and plants
        @organism_factory = organism_factory
        @animals = []
        number_animals.times do |i|
          animal = @organism_factory.new_animal("Animal#{i}")
          @animals << animal
        end

        @plants = []
        number_plants.times do |i|
          plant = @organism_factory.new_plant("Plant#{i}")
          @plants << plant
        end
      end

    jungle = Habitat.new(1, 4, JungleOrganismFactory.new) # Create a jungle with tigers and trees
    pond = Habitat.new( 2, 4, PondOrganismFactory.new)    # Create a pond with frogs and LPs

*Another example of a class-based abstract factory: Instead of having several different abstract factory classes, one class for each set of things that the factory needs to product, we can just have one factory class that stores the class objects of the things that it needs to produce:*

    class OrganismFactory
      def initialize(plant_class, animal_class)
        @plant_class = plant_class
        @animal_class = animal_class
      end

      def new_animal(name)
        @animal_class.new(name)
      end

      def new_plant(name)
        @plant_class.new(name)
      end
    end

    jungle_organism_factory = OrganismFactory.new(Tree, Tiger)
    pond_organism_factory = OrganismFactory.new(WaterLily, Frog)
