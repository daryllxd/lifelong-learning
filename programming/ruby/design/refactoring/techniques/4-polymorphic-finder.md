# 4 - Polymorphic Finder

We have different models for the purchasing models. We have a few different URLs for each:
`new_product_purchase_path(product)`, `new_section_purchase_path(section)`, `new_individual_plan_purchase_path(plan)`, these are all purchasables. We define these in the standard way:

    resources :books do
      resources :purchases
    end

    resources :screencasts do
      resources :purchases
    end

When we get to the purchases controller, you get to the `PurchasesController`, they come in the same controller, but they have different keys, and there is nothing that states what we have.

We have instead of a database ID an SKU here. So we have to figure out what we are purchasing.

    class ApplicationController < ActionController::Base
      def requested_purchaseable
        if product_param
          Product.find(product_param)
        elsif params[:individual_plan_id]
          IndividualPlan.where(sku: params[:individual_plan_id]). first
        elsif params[:team_plan_id]
          TeamPlan.where(sku: paramd[:team_plan_id]).first
        elsif params[:section_id]
          Section.find(params[:section_id]
        else
          raise "Can't find purchaseable object without an ID"
        end
      end

      def product_param
        params[:product_id] || params[:screencast_id] || params[:book_id] || params[:show_id]
      end
    end

*Two of these will actually return `nil` because of the `where` and the `first` combining (bad!)* The code will crash in a weird way later.

## Problems:

- Difficult to test, and the bug was in there twice (2 if statements) and was potentially in every branch of the code.
- `ApplicationController` is a junk drawer.
- The method grew in complexity as we added more purchaseable types. (If we add a type we will add a branch!)
- Common problems could not be implemented in a generic fashion.
- Testing `ApplicationController methods is awkward.`
- Testing the current implementation of the method was repetitious.

## Solution

    class ApplicationController < ActionController::Base
      private
      def requested_purchaseable
        PolymorphicFinder.
          finding(Section, :id, [:section_id]).
          finding(TeamPlan, :sku, [:team_plan_id]).
          finding(IndividualPlan, :sku, [:individual_plan_id]).
          finding(Product, :id, [:product_id, :screencast_id, :book_id, :show_id]).
          find(params)
      end
    end

These are calls to tell the `PolymorphicFinder` to find whatever you need.

## The Builder Pattern

You use this everyday in the AR building of queries, then you pull something out when the query is built: get the first result or all the results. When we have what we want, we ask them to go!

This is an alternative to passing in a hash, or a giant constructor. This is just a nicer way to build things up.
