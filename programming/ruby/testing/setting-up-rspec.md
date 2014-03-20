# How I learned to test my Rails applications, Part 2: Setting up RSpec
[Link](http://everydayrails.com/2012/03/12/testing-series-rspec-setup.html)

`rspec_rails` and `factory_girl_rails` are in the dev gem group because they are also used in generators. (AHHHHH). The other stuff such as Capybara are used only in tests. 

In `c/application.rb`, you set `view_specs, helper_specs, routing_specs` to false, but `controller_specs and request_specs` to true.
