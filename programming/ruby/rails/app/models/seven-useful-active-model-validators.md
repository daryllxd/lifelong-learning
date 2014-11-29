## Seven Useful ActiveModel Validators
[link](http://viget.com/extend/seven-useful-activemodel-validators)

To implement, we need a Ruby class that inherits form `ActiveModel::EachValidator` and implements a `validate_each` method that takes three arguments: record, attribute, and value.

#### Simple URI Validator

We parse using Ruby's URI module.

    class UriValidator < ActiveModel::EachValidator
      def validate_each(record, attribute, value)
        unless valid_uri?(value)
          record.errors[attribute] << (options[:message] || 'is not a valid URI')
        end
      end
      private
      def valid_uri?(uri)
        URI.parse(uri)
        true
      rescue URI::InvalidURIError
        false
      end
    end

#### Full URL Validator

    class FullUrlValidator < ActiveModel::EachValidator
      VALID_SCHEMES = %w(http https)

      def validate_each(record, attribute, value)
        unless value =~ URI::regexp(VALID_SCHEMES)
          record.errors[attribute] << (options[:message] || 'is not a valid URL')
        end
      end
    end

#### Email Validator

    class EmailValidator < ActiveModel::EachValidator

      def validate_each(record, attribute, value)
        unless value =~ /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i
          record.errors[attribute] << (options[:message] || "is not a valid e-mail address")
        end
      end
    end

Email validator based on DNS:

    require 'resolv'

    class EmailValidator < ActiveModel::EachValidator
      def validate_each(record, attribute, value)
        if Resolv::DNS.new.getresources(value.split("@").last, Resolv::DNS::Resource::IN::MX).empty?
          record.errors[attribute] << (options[:message] ||  "does not have a valid domain")
        end
      rescue Resolv::ResolvError, Resolv::ResolvTimeout
        record.errors[attribute] << (options[:message] ||  "does not have a valid domain")
      end
    end

#### Secure Password Validator

Checks if match is in bad passwords.

    class SecurePasswordValidator < ActiveModel::EachValidator
      WORDS = YAML.load_file("config/bad_passwords.yml")
      def validate_each(record, attribute, value)
        if value.in?(WORDS)
          record.errors.add(attribute, "is a common password. Choose another.")
        end
      end
    end

#### Twitter Handle Validator

    class TwitterHandleValidator < ActiveModel::EachValidator
      def validate_each(record, attribute, value)
        unless value =~ /^[A-Za-z0-9_]{1,15}$/
          record.errors[attribute] << (options[:message] || "is not a valid Twitter handle")
        end
      end
    end

#### Hex Color

    class HexColorValidator < ActiveModel::EachValidator
      def validate_each(record, attribute, value)
        unless value =~ /\A([a-f0-9]{3}){,2}\z/i
          record.errors[attribute] << (options[:message] || 'is not a valid hex color value')
        end
      end
    end

#### Must be a Regex

    class RegexpValidator < ActiveModel::EachValidator
      def validate_each(record, attribute, value)
        unless valid_regexp?(value)
          record.errors[attribute] << (options[:message] || 'is not a valid regular expression')
        end
      end
      private
      def valid_regexp?(value)
        Regexp.compile(value)
        true
      rescue RegexpError
        false
      end
    end
