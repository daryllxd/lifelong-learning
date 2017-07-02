``` ruby
# Use AR without Rails

db_config = YAML.safe_load(File.open('./config/database.yml'))['development']
ActiveRecord::Base.establish_connection(db_config)
```
