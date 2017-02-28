# Faker::Address

```ruby
Faker::Address.city #=> "Imogeneborough"

Faker::Address.street_name #=> "Larkin Fork"

Faker::Address.street_address #=> "282 Kevin Brook"

Faker::Address.secondary_address #=> "Apt. 672"

Faker::Address.building_number #=> "7304"

Faker::Address.zip_code #=> "58517" or "23285-4905"

Faker::Address.zip #=> "58517" or "66259-8212"

Faker::Address.postcode #=> "76032-4907" or "58517"

Faker::Address.time_zone #=> "Asia/Yakutsk"

Faker::Address.street_suffix #=> "Street"

Faker::Address.city_suffix #=> "fort"

Faker::Address.city_prefix #=> "Lake"

Faker::Address.state #=> "California"

Faker::Address.state_abbr #=> "AP"

Faker::Address.country #=> "French Guiana"

Faker::Address.country_code #=> "IT"

Faker::Address.latitude #=> "-58.17256227443719"

Faker::Address.longitude #=> "-156.65548382095133"

```

# Faker::Name

```ruby
Faker::Name.name             #=> "Tyshawn Johns Sr."

Faker::Name.name_with_middle #=> "Aditya Elton Douglas"

Faker::Name.first_name       #=> "Kaci"

Faker::Name.last_name        #=> "Ernser"

Faker::Name.prefix           #=> "Mr."

Faker::Name.suffix           #=> "IV"

Faker::Name.title            #=> "Legacy Creative Director"
```

# Faker::PhoneNumber

Phone numbers may be in any of the following formats:

* 333-333-3333
* (333) 333-3333
* 1-333-333-3333

* 333.333.3333
* 333-333-3333
* 333-333-3333 x3333
* (333) 333-3333 x3333
* 1-333-333-3333 x3333
* 333.333.3333 x3333

(Don't let the example output below fool you - any format can be returned at random.)

```ruby
Faker::PhoneNumber.phone_number #=> "397.693.1309"

Faker::PhoneNumber.cell_phone #=> "(186)285-7925"

# NOTE NOTE NOTE NOTE
# For the 'US only' methods below, first you must do the following:
Faker::Config.locale = 'en-US'

# US only
Faker::PhoneNumber.area_code #=> "201"

# US only
Faker::PhoneNumber.exchange_code #=> "208"

# Optional parameter: length=4
Faker::PhoneNumber.subscriber_number #=> "3873"

Faker::PhoneNumber.subscriber_number(2) #=> "39"

Faker::PhoneNumber.extension #=> "3764"
```

# Faker::Crypto

```ruby
Faker::Crypto.md5 #=> "6b5ed240042e8a65c55ddb826c3408e6"

Faker::Crypto.sha1 #=> "4e99e31c51eef8b2d290e709f757f92e558a503f"

Faker::Crypto.sha256 #=> "51e4dbb424cd9db1ec5fb989514f2a35652ececef33f21c8dd1fd61bb8e3929d"
```
