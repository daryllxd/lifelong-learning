```ruby
# Active Support::Concern

module M
  def self.included(base)
    base.extend ClassMethods
    base.class_eval do
      scope :disabled, -> { where(disabled: true) }
    end
  end

  module ClassMethods
    def join_users(match_id:)
    end
  end
end
```
