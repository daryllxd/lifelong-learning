## Migration Overview

> Migration to create a `products` table, with string `name`, text `description`, and timestamps. Implicitly, `id` will be added.

We define the change that we want to happen moving forward in time. Before the migration is run, there will be no table. After, the table will exist. AR knows how to reverse this migration as well.

`Timestamps` adds `created_at` and `updated_at`. These special columns are automatically managed by AR if they exist.

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

#### Supported Type Modifiers

- `limit` Sets the maximum size of the string/text/binary/integer fields
- `precision` Defines the precision for the decimal fields
- `scale` Defines the scale for the decimal fields
- `polymorphic` Adds a type column for belongs_to associations
- `null` Allows or disallows NULL values in the column.

## Writing a Migration

#### Creating a Table. 

ID is created by default.

    create_table :products do |t|
      t.string :name
    end

#### Creating a Join Table.

This creates a HABTM (has and belongs to many) table.

    create_join_table :products, :categories, table_name: :categorization

By default, `create_join_table` will create two columns with no options, but you can specify these options using the :column_options option.

> Make the columns nullablez

    create_join_table :products, :categories, column_options: {null: true}

> It accepts a block so you can add indices because they aren't there by default.

    create_join_table :products, :categories do |t|
      t.index :product_id
      t.index :category_id
    end

#### Changing Tables

> This removes the description and name columns, creates a part_number string column and adds an index on it. Finally it renames the upccode column.

    change_table :products do |t|
      t.remove :description, :name
      t.string :part_number
      t.index :part_number
      t.rename :upccode, :upc_code
    end

#### Manual SQL

    Products.connection.execute('UPDATE `products` SET `price`=`free` WHERE 1')

## Running Migrations

    $ rake db:migrate
    $ rake db:rollback # Revert
    $ rake db:rollback STEP =3 # Revert 3
    $ rake db:migrate:redo STEP=3 # Revert 3 then migrate again.
    $ rake db:reset # Drop db and recreate the current schema again.
    $ rake db:migrate:up VERSION=20080906120000 # Run up method on version
    $ rake db:migrate RAILS_ENV=test # Run on test env

## Active Record and Referential Integrity

The Active Record way claims that intelligence belongs in your models, not in the database. As such, features such as triggers or foreign key constraints, which push some of that intelligence back into the database, are not heavily used.