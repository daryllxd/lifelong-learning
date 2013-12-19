## [Active Record Query Interface](http://guides.rubyonrails.org/active_record_querying.html)

#### Models

	class Client < ActiveRecord::Base
	  has_one :address
	  has_many :orders
	  has_and_belongs_to_many :roles
	end

	class Address < ActiveRecord::Base
	  belongs_to :client
	end

	class Order < ActiveRecord::Base
	  belongs_to :client, counter_cache: true
	end

	class Role < ActiveRecord::Base
	  has_and_belongs_to_many :clients
	end

#### 1.1 Retrieving a Single Object

	client = Client.find(10)			# Find the client with primary key (id) 10.
	client = Client.take 				# SELECT * FROM clients LIMIT 1
	client = Client.first 				# SELECT * FROM clients ORDER BY clients.id ASC LIMIT 1
	client = Client.last
	Client.find_by first_name: 'Lifo' 	# Client.where(first_name: 'Lifo').take

	client = Client.take!				# raises ActiveRecord::RecordNotFound if no matching record is found.
	client = Client.first!				# raises ActiveRecord::RecordNotFound if no matching record is found.
	client = Client.last!				# raises ActiveRecord::RecordNotFound if no matching record is found.

#### 1.2 Retrieving Multiple Objects

	Model.find(array_of_primary_key)	# Find the clients with primary keys 1 and 10.
	Client.take(2)						# SELECT * FROM clients LIMIT 2
	Client.first(2)						# SELECT * FROM clients ORDER BY id ASC LIMIT 2
	Client.last(2)						# SELECT * FROM clients ORDER BY id DESC LIMIT 2

#### 1.3 Retrieving Multiple Objects in Batches

	User.all.each do |user|				# This is very inefficient
	  NewsLetter.weekly_deliver(user)
	end

User.all.each instructs Active Record to fetch the entire table in a single pass, build a model object per row, and then keep the entire array of model objects in memory.

The find_each and find_in_batches methods are intended for use in the batch processing of a large number of records that wouldn't fit in memory all at once. If you just need to loop over a thousand records the regular find methods are the preferred option.

	User.find_each do |user|
	  NewsLetter.weekly_deliver(user)
	end

`find_each` will retrieve 1000 records (the current default for both find_each and find_in_batches) and then yield each record individually to the block as a model.

	User.find_each(batch_size: 5000)
	User.find_each(start: 2000, batch_size: 5000)

`find_in_batches` yields batches to the block as an array of models, instead of individually.

	Invoice.find_in_batches(include: :invoice_lines)
	# :include option allows you to name associations that should be loaded alongside with the models.

## 2 Conditions

	Client.where("orders_count = '2'")			# Pure String Condition. SQL injectionable.
	Client.where("orders_count = ?", params[:orders])
	Client.where("orders_count = ? AND locked = ?", params[:orders], false)
	Client.where("created_at >= :start_date AND created_at <= :end_date", 
		{start_date: params[:start_date], end_date: params[:end_date]})

## 2.3 Hash Conditions

Only equality, range and subset checking are possible with Hash conditions.

	Client.where(locked: true)
	Client.where('locked' => true)				# Field name can be a string
	Post.where(author: author)
	Author.joins(:posts).where(posts: {author: author})
	Client.where(created_at: (Time.now.midnight - 1.day)..Time.now.midnight)
	Client.where(orders_count: [1,3,5])
	Post.where.not(author: author)

## 3 Ordering

	Client.order(created_at: :desc)
	Client.order(created_at: :asc)
	Client.order(orders_count: :asc, created_at: :desc)

## 4 Selecting Specific Fields

	Client.select("viewable_by, locked")		# SELECT viewable_by, locked FROM clients
	Client.select(:name).distinct				# SELECT DISTINCT name FROM clients
	query.distinct(false)

## 5 Limit and Offset

	Client.limit(5)
	Client.limit(5).offset(30)

## 6 Group

	Order.select("date(created_at) as ordered_date, sum(price) as total_price").group("date(created_at)")

## 7 Having

	Order.select("date(created_at) as ordered_date, sum(price) as total_price").group("date(created_at)").having("sum(	price) > ?", 100)

## 8 Overriding Conditions

	Post.where('id > 10').limit(20).order('id asc').except(:order)
		# SELECT * FROM posts WHERE id > 10 LIMIT 20
	Post.order('id DESC').limit(20).unscope(:order) = Post.limit(20)
	Post.order('id DESC').limit(20).unscope(:order, :limit) = Post.all
	Post.where('id > 10').limit(20).order('id desc').only(:order, :where)
	Post.find(10).comments.reorder('name')
		# SELECT * FROM posts WHERE id = 10 ORDER BY name
	Client.where("orders_count > 10").order(:name).reverse_order

## 9 Null Relation

The none method returns a chainable relation with no records. Any subsequent conditions chained to the returned relation will continue generating empty relations. This is useful in scenarios where you need a chainable response to a method or a scope that could return zero results.

	Post.none # returns an empty Relation and fires no queries.

## 10 Readonly Objects

	client = Client.readonly.first

## 11 Locking Records for Update

Locking is helpful for preventing race conditions when updating records in the database and ensuring atomic updates.

#### 11.1 Optimistic Locking

Optimistic locking allows multiple users to access the same record for edits, and assumes a minimum of conflicts with the data. It does this by checking whether another process has made changes to a record since it was opened. An ActiveRecord::StaleObjectError exception is thrown if that has occurred and the update is ignored.

In order to use optimistic locking, the table needs to have a column called lock_version of type integer. Each time the record is updated, Active Record increments the lock_version column. If an update request is made with a lower value in the lock_version field than is currently in the lock_version column in the database, the update request will fail with an ActiveRecord::StaleObjectError. 

You're then responsible for dealing with the conflict by rescuing the exception and either rolling back, merging, or otherwise apply the business logic needed to resolve the conflict.

To override the name of the lock_version column, ActiveRecord::Base provides a class attribute called locking_column:

#### 11.2 Pessimistic Locking

Pessimistic locking uses a locking mechanism provided by the underlying database. Using lock when building a relation obtains an exclusive lock on the selected rows. Relations using lock are usually wrapped inside a transaction for preventing deadlock conditions.

	Item.transaction do
	  i = Item.lock.first
	  i.name = 'Jones'
	  i.save
	end

## 12 Joining Tables

	Client.joins('LEFT OUTER JOIN addresses ON addresses.client_id = clients.id')

Hashes (Example)

	class Category < ActiveRecord::Base
	  has_many :posts
	end
	 
	class Post < ActiveRecord::Base
	  belongs_to :category
	  has_many :comments
	  has_many :tags
	end
	 
	class Comment < ActiveRecord::Base
	  belongs_to :post
	  has_one :guest
	end
	 
	class Guest < ActiveRecord::Base
	  belongs_to :comment
	end
	 
	class Tag < ActiveRecord::Base
	  belongs_to :post
	end

	Category.joins(:posts)				# Single Association
	Post.joins(:category, :comments) 	# Multiple Associations
	Post.joins(comments: :guest)		# Joining Multiple (via)
										# return all posts that have a comment made by a guest
	Category.joins(posts: [{comments: :guest}, :tags])
	SELECT categories.* FROM categories
	  INNER JOIN posts ON posts.category_id = categories.id
	  INNER JOIN comments ON comments.post_id = posts.id
	  INNER JOIN guests ON guests.comment_id = comments.id
	  INNER JOIN tags ON tags.post_id = posts.id
	Client.joins(:orders).where('orders.created_at' => time_range)
		# Conditions

## 13 Eager Loading Associations

Eager loading is the mechanism for loading the associated records of the objects returned by Model.find using as few queries as possible.

Active Record lets you specify in advance all the associations that are going to be loaded. This is possible by specifying the includes method of the Model.find call. With includes, Active Record ensures that all of the specified associations are loaded using the minimum possible number of queries.

	clients = Client.includes(:address).limit(10)
	 
	clients.each do |client|
	  puts client.address.postcode
	end

The above code will execute just 2 queries, as opposed to 11 queries in the previous case:

	SELECT * FROM clients LIMIT 10
	SELECT addresses.* FROM addresses
	  WHERE (addresses.client_id IN (1,2,3,4,5,6,7,8,9,10))

#### 13.1 Eager Loading Multiple Associations

	Post.includes(:category, :comments)
	Category.includes(posts: [{comments: :guest}, :tags]).find(1)
	Post.includes(:comments).where("comments.visible" => true)

#### 14 Scopes

Scoping allows you to specify commonly-used queries which can be referenced as method calls on the association objects or models. With these scopes, you can use every method previously covered such as where, joins and includes. All scope methods will return an ActiveRecord::Relation object which will allow for further methods (such as other scopes) to be called on it.

	class Post < ActiveRecord::Base
	  scope :published, -> { where(published: true) }
	end

(Same as)

	class Post < ActiveRecord::Base
	  def self.published
	    where(published: true)
	  end
	end

Chainable

	class Post < ActiveRecord::Base
	  scope :published,               -> { where(published: true) }
	  scope :published_and_commented, -> { published.where("comments_count > 0") }
	end

#### 14.1 Passing in arguments

	class Post < ActiveRecord::Base
	  scope :created_before, ->(time) { where("created_at < ?", time) }
	end

	Post.created_before(Time.zone.now)

(However, this is just duplicating the functionality that would be provided to you by a class method. Using a class method is the preferred way to accept arguments for scopes. These methods will still be accessible on the association objects.)

#### 14.2 Merging of scopes

	class User < ActiveRecord::Base
	  scope :active, -> { where state: 'active' }
	  scope :inactive, -> { where state: 'inactive' }
	end
	 
	User.active.inactive
	# => SELECT "users".* FROM "users" WHERE "users"."state" = 'active' AND "users"."state" = 'inactive'

	User.active.where(state: 'finished')

#### 14.3 Applying a default scope

If we wish for a scope to be applied across all queries to the model we can use the default_scope method within the model itself.

	class Client < ActiveRecord::Base
	  default_scope { where("removed_at IS NULL") }
	end

#### 14.4 Removing All Scoping

	Client.unscoped.all

One important caveat is that default_scope will be overridden by scope and where conditions.

## 15 Dynamic Finders

For every field (also known as an attribute) you define in your table, Active Record provides a finder method. If you have a field called first_name on your Client model for example, you get find_by_first_name for free from Active Record. If you have a locked field on the Client model, you also get find_by_locked and methods.

Add `!` at the end to raise an `ActiveRecord::RecordNotFound` error if they do not return any records (`Client.find_by_name!("Ryan")`).

## 16 Find or Build a New Object

It's common that you need to find a record or create it if it doesn't exist. You can do that with the find_or_create_by and find_or_create_by! methods.

	Client.find_or_create_by(first_name: 'Andy')

find_or_create_by returns either the record that already exists or the new record. In our case, we didn't already have a client named Andy so the record is created and returned.

The new record might not be saved to the database; that depends on whether validations passed or not (just like create).

To set up create conditions, but not in the query (ex: here we want the entry to be locked):

	Client.create_with(locked: false).find_or_create_by(first_name: 'Andy')

	Client.find_or_create_by(first_name: 'Andy') do |c|
	  c.locked = false
	end

! for raising exceptions

	Client.find_or_create_by!(first_name: 'Andy')

#### 16.3 find_or_initialize_by

The find_or_initialize_by method will work just like find_or_create_by but it will call new instead of create.

	Need to nick.save it first.

## 17 Finding by SQL

#### 17.1 select_all

	Client.connection.select_all("SELECT * FROM clients WHERE id = '1'")
	Client.where(active: true).pluck(:id)
		# SELECT id FROM clients WHERE active = 1
	Client.distinct.pluck(:role)
		# SELECT DISTINCT role FROM clients
	Client.pluck(:id, :name)
		# SELECT clients.id, clients.name FROM clients

Unlike select, pluck directly converts a database result into a Ruby Array, without constructing ActiveRecord objects. This can mean better performance for a large or often-running query. However, any model method overrides will not be available. 

#### 17.3 ids

ids can be used to pluck all the IDs for the relation using the table's primary key.

	Person.ids

## 18 Existence of Objects
















	