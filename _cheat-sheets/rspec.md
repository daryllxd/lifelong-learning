
``` ruby
be rspec example_spec.rb --format progress --format documentation --out rspec.txt

Test db indices: described_class.connection.index_exists?(:match_participants, [:match_id, :participant_id], unique: true)
```
