## Why Associations?

With Active Record associations, we can streamline these — and other — operations by declaratively telling Rails that there is a connection between the two models. Here's the revised code for setting up customers and orders:

	class Customer < ActiveRecord::Base
	  has_many :orders, dependent: :destroy
	end
	 
	class Order < ActiveRecord::Base
	  belongs_to :customer
	end

## The Types of Associations

In Rails, an association is a connection between two Active Record models. Associations are implemented using macro-style calls, so that you can declaratively add features to your models. For example, by declaring that one model belongs_to another, you instruct Rails to maintain Primary Key–Foreign Key information between instances of the two models, and you also get a number of utility methods added to your model.

	belongs_to, has_one, has_many, has_many :through, has_one :through, has_and_belongs_to_many

#### belongs_to

A belongs_to association sets up a one-to-one connection with another model, such that each instance of the declaring model "belongs to" one instance of the other model.

For example, if your application includes customers and orders, and each order can be assigned to exactly one customer.

