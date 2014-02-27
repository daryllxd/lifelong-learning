
`validates_presence_of(*attr_names)`

    class Person < ActiveRecord::Base
      has_one :face
      validates_presence_of :face
    end

