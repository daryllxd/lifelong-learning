# Result Objects: Errors without Exceptions
[Reference](https://www.rubypigeon.com/posts/result-objects-errors-without-exceptions/)

- Resonad gem:
  - Errors are part of the return value, not an exception.
  - Expected errors are available through `result.error`, and unexpected bugs are exceptions.
  - All expected error cases are automatically "caught", without having to guess what they are.

``` ruby
result = register_new_user(params)
if result.success?
  handle_success(result.value)
else
  handle_failure(result.error)
end
```

- When not to use:
  - When the method should always succeed.
  - When there is only a single failure case, just return `nil` or whatever.
  - If you can recover Locally, and you can just return a Null Object.
- Result objects are appropriate:
  - When an operation can fail in multiple different ways.
  - When operations need to be chained together, and each individual operation can fail.
  - When it's important for callers to know that the method can fail.
  - Works with service/interactor/command objects.
- Implementation: `Resonad`, dry-monads, Github::Result, `monadic`, `result-monad`.

# Resilience in Ruby: Handling Failure
[Reference](https://johnnunemaker.com/resilience-in-ruby/)

- Ruby approach to errors: exceptions/ `begin/rescue`.
- Needing to wrap every call with a `begin/rescue` to catch errors feels very verbose. A call that used to be one line and relatively clear is now muddled with 3 extra lines.
- ***Without an extra layer on top, you will end up with a lot of call sites rescuing a lot of exceptions. Each new exception will require updating all of the call sites.***
- Error response object:

``` ruby
require "json"
require "net/http"

class Client
  class NotificationsResponse
    attr_reader :notifications, :error

    def initialize(&block)
      @error = false
      @notifications = begin
        yield
      rescue Errno::ECONNREFUSED => error
        @error = error
        {} # sensible default
      end
    end

    def ok?
      @error == false
    end
  end

  def notifications
    NotificationsResponse.new do
      request = Net::HTTP::Get.new("/")
      http = Net::HTTP.new("localhost", 9999)
      http_response = http.request(request)
      JSON.parse(http_response.body)
    end
  end
end

client = Client.new
response = client.notifications

if response.ok?
  # Do something with notifications like show them as a list...
  else
  # Communicate that things went wrong to the caller or user.
end
```

#### Benefits of Response Object

- Always returning the same object, avoiding nil and retaining duck typing.
- Can add context about the failure since it is a hash.
- Single place to update rescued exceptions if a new one pops up.
- Instrumentation/circuit breakers (?).
- Avoid using `begin` and `rescue` and use conditionals or whatever makes sense.
- Caller has ability to handle different failures differently (connection refused, timeout, rate limited...)
