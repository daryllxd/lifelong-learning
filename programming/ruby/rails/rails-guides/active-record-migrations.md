## Migration Overview

> Migration to create a `products` table, with string `name`, text `description`, and timestamps. Implicitly, `id` will be added.

    class CreateProducts < ActiveRecord::Migration
      def change
        create_table :products do |t|
          t.string :name
          t.text :description
     
          t.timestamps
        end
      end
    end

We define the change that we want to happen moving forward in time. Before the migration is run, there will be no table. After, the table will exist. AR knows how to reverse this migration as well.

Timestamps adds `created_at` and `updated_at`. These special columns are automatically managed by AR if they exist.

## Creating a Migration

Migrations are stored as files in the db/migrate directory, one for each migration class.

The name of the file is of the form `YYYYMMDDHHMMSS_create_products.rb`, that is to say a UTC timestamp identifying the migration followed by an underscore followed by the name of the migration.

__The name of the migration class (CamelCased version) should match the latter part of the file name.__ For example `20080906120000_create_products.rb` should define class CreateProducts and `20080906120001_add_details_to_products.rb` should define AddDetailsToProducts.

__Add or remove column:__ If the migration name is of the form "AddXXXToYYY" or "RemoveXXXFromYYY" and is followed by a list of column names and types then a migration containing the appropriate `add_column` and `remove_column` statements will be created.

    $ rails generate migration AddPartNumberToProducts part_number:string

    def change
      add_column :products, :part_number, :string
    end

__Create table:__ If the migration name is of the form "CreateXXX" and is followed by a list of column names and types then a migration creating the table XXX with the columns listed will be generated. For example:

    $ rails generate migration CreateProducts name:string part_number:string

    def change
      create_table :products do |t|
        t.string :name
        t.string :part_number
      end
    end

__Add foreign key:__ Also, the generator accepts column type as references(also available as belongs_to). For instance

    $ rails generate migration AddUserRefToProducts user:references

    class AddUserRefToProducts < ActiveRecord::Migration
      def change
        add_reference :products, :user, index: true
      end
    end

__This migration will create a user_id column and appropriate index.__

__Join a table:__ There is also a generator which will produce join tables if JoinTable is part of the name:

    $ rails g migration CreateJoinTableCustomerProduct customer product

    def change
      create_join_table :customers, :products do |t|
        # t.index [:customer_id, :product_id]
        # t.index [:product_id, :customer_id]
      end
    end


