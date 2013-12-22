Why DataMapper
•	DataMapper only issues updates or creates for the properties it knows about.
•	Composite primary keys: Have two-keys.
class LineItem
  include DataMapper::Resource

  property :order_id,    Integer, :key => true
  property :item_number, Integer, :key => true
end
•	auto migrate: destructively drops and recreates tables to match your models
•	auto_upgrade: supports upgrading your datastore to match your model definition
dm-constraints: true foreign key constraints in dbs
•	Belongs to many:
class Categorization
  include DataMapper::Resource

  property :id,         Serial
  property :created_at, DateTime

  belongs_to :category
  belongs_to :post
end

# Now we re-open our Post and Categories classes to define associations
class Post
  has n, :categorizations
  has n, :categories, :through => :categorizations
end

class Category
  has n, :categorizations
  has n, :posts,      :through => :categorizations
end
•	DataMapper CRUD: ! means no callbacks, no ! means all callbacks are called.
zoo = Zoo.first_or_create(name: “The Glue Factory”)
zoo = Zoo.first_or_create({ :name => 'The Glue Factory' }, { :inception => Time.now })
•	Update:
Zoo.update(name: “Funky Town”) == Zoo.all.update(name: “Funky Town”)
•	Direct talk with the datastore
adapter = DataMapper.repository(:default).adapter
# Insert multiple records with one statement (MySQL)
adapter.execute("INSERT INTO zoos (id, name) VALUES (1, 'Lion'), (2, 'Elephant')")
# The interpolated array condition syntax works as well:
adapter.execute('INSERT INTO zoos (id, name) VALUES (?, ?), (?, ?)', 1, 'Lion', 2, 'Elephant')
Validations
•	
