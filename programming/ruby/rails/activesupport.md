## ActiveSupport

AS does not load anything by default.

#### All Objects

- `blank?` and `present?`: Blank = `nil`, false, strings of whitespace, empty arrays and hashes, any other object that responds to `empty?`.
- `presence`: Returns its receiver if `present?`, and `nil` otherwise.
- `duplicable?`: Returns true if not singleton.
- `deep_dup`: Creates a deep copy of an object.
- `try`: Calling a method on an object only if it is not `nil`

    unless @number.nil?
      @number.next
    end

    @number.try(:next)
    @person.try { |p| "#{p.first_name}" } # Will be executed if the object is not nil

- `class_eval`
- `acts_like?`: Queries for duck-type behavior.
- `to_param`: `[0, true, String].to_param #=> "/0/true/String"`
- `to_query`: Except for hashes, given an unescaped key, this method constructs the part of a query string that would map such a key to what `to_param` returns.
- `with_options`: Given a default options hash, `with_options` yields a proxy object to a block.

    class Account < ActiveRecord::Base
      has_many :customers, dependent: :destroy
      has_many :products,  dependent: :destroy
      has_many :invoices,  dependent: :destroy
      has_many :expenses,  dependent: :destroy
    end

    class Account < ActiveRecord::Base
      with_options dependent: :destroy do |assoc|
        assoc.has_many :customers
        assoc.has_many :products
        assoc.has_many :invoices
        assoc.has_many :expenses
      end
    end

- `instance_values`: Returns a hash that maps instance variable names without `@` to their corresponding values.
- `instance_variable_names`: Returns an array, includes `@`.
- `silence_warnings`
- `in?`: Tests if an object is included in another object.
