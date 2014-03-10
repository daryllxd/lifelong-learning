## Active Record Associations

When code such as `has_many` and `belongs_to` are executed, Rails uses some metaprogramming magic to dynamically add code to your models.

The relationships won't work unless the foreign keys are there. So you have to bring the accompanying migrations, too.

Automatically add indices for the foreign keys. `add_index :timesheets, :user_id`.


