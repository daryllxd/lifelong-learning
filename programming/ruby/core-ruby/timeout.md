# Ruby Timeouts
[Reference](https://github.com/ankane/the-ultimate-guide-to-ruby-timeouts)

- PG: Statement timeouts: Prevent single queries from taking up all of your database resources.
  - `database.yml`

``` yml
production:
  variables:
    statement_timeout: 250 # ms
```

- ActiveRecord:: `ActiveRecord::Base.establish_connection`
- ElasticSearch: `Elasticsearch::Client.new(transport_options: {request: {timeout: 1}}, ...)`
- Mongo: `Mongo::Client.new([host], connect_timeout: 1, socket_timeout: 1, server_selection_timeout: 1, ...)`
- Redis: `Redis.new(connect_timeout: 1, timeout: 1, ...)`
- Kafka: `Kafka.new(connect_timeout: 1, socket_timeout: 1)`
- Faraday:

```
Faraday.get(url) do |req|
  req.options.open_timeout = 1
  req.options.timeout = 1
end

Faraday.new(url, request: {open_timeout: 1, timeout: 1}) do |faraday|
  # ...
end
```

- Puma: `# config/puma.rb worker_timeout 15`
- ActionMailer:

``` ruby
ActionMailer::Base.smtp_settings = {
  open_timeout: 1,
  read_timeout: 1
}
```

- AWS:

```
Aws.config = {
  http_open_timeout: 1,
  http_read_timeout: 1
}
```

- `Gibbon`, `geocoder`, `Google-Cloud`, `hipchat`, `koala`, `kubeclient`, mail, `mechanize`, `net-dns`, `stripe`, `twilio-ruby`, `zendesk-api`.
- On rescuing exceptions:
  - `rescue Timeout::Error`
