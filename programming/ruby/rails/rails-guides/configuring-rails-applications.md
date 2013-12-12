## Locations
- `config/application.rb`
- Environment-specific config files
- Initializers
- After-initializers

The configuration file config/application.rb and environment-specific configuration files (such as config/environments/production.rb) allow you to specify the various settings that you want to pass down to all of the components.

This is a setting for Rails itself. If you want to pass settings to individual Rails components, you can do so via the same config object in config/application.rb:

	config.active_record.schema_format = :ruby # for AR only

#### Rails General Configuration [TODO]

