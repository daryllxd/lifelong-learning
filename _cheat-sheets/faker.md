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

# Faker::Number

```ruby
# Required parameter: digits
Faker::Number.number(10) #=> "1968353479"

# Required parameter: l_digits
Faker::Number.decimal(2) #=> "11.88"

Faker::Number.decimal(2, 3) #=> "18.843"

# Required parameters: mean, standard_deviation
Faker::Number.normal(50, 3.5) #=> 47.14669604069156

# Required parameter: digits
Faker::Number.hexadecimal(3) #=> "e74"

Faker::Number.between(1, 10) #=> 7

Faker::Number.positive #=> 235.59238499107653

Faker::Number.negative #=> -4480.042585669558

Faker::Number.digit #=> "1"
```

# Faker::Internet

```ruby
# Optional argument name=nil
Faker::Internet.email #=> "eliza@mann.net"

Faker::Internet.email('Nancy') #=> "nancy@terry.biz"

# Optional argument name=nil
Faker::Internet.free_email #=> "freddy@gmail.com"

Faker::Internet.free_email('Nancy') #=> "nancy@yahoo.com"

# Optional argument name=nil
Faker::Internet.safe_email #=> "christelle@example.org"

Faker::Internet.safe_email('Nancy') #=> "nancy@example.net"

# Optional arguments specifier=nil, separators=%w(. _)
Faker::Internet.user_name #=> "alexie"

Faker::Internet.user_name('Nancy') #=> "nancy"

Faker::Internet.user_name('Nancy Johnson', %w(. _ -)) #=> "johnson-nancy"

# Optional arguments: min_length=5, max_length=8
Faker::Internet.user_name(5..8)

# Optional arguments: min_length=8, max_length=16
Faker::Internet.password #=> "vg5msvy1uerg7"

Faker::Internet.password(8) #=> "yfgjik0hgzdqs0"

Faker::Internet.password(10, 20) #=> "eoc9shwd1hwq4vbgfw"

Faker::Internet.password(10, 20, true) #=> "3k5qS15aNmG"

Faker::Internet.password(10, 20, true, true) #=> "*%NkOnJsH4"

Faker::Internet.domain_name #=> "effertz.info"

Faker::Internet.fix_umlauts('äöüß') #=> "aeoeuess"

Faker::Internet.domain_word #=> "haleyziemann"

Faker::Internet.domain_suffix #=> "info"

Faker::Internet.ip_v4_address #=> "24.29.18.175"

# Private IP range according to RFC 1918 and 127.0.0.0/8 and 169.254.0.0/16.
Faker::Internet.private_ip_v4_address #=> "10.0.0.1"

# Guaranteed not to be in the ip range from the private_ip_v4_address method.
Faker::Internet.public_ip_v4_address #=> "24.29.18.175"

Faker::Internet.ip_v4_cidr #=> "24.29.18.175/21"

Faker::Internet.ip_v6_address #=> "ac5f:d696:3807:1d72:2eb5:4e81:7d2b:e1df"

Faker::Internet.ip_v6_cidr #=> "ac5f:d696:3807:1d72:2eb5:4e81:7d2b:e1df/78"

# Optional argument prefix=''
Faker::Internet.mac_address #=> "e6:0d:00:11:ed:4f"
Faker::Internet.mac_address('55:44:33') #=> "55:44:33:02:1d:9b"

# Optional arguments: host=domain_name, path="/#{user_name}"
Faker::Internet.url #=> "http://thiel.com/chauncey_simonis"
Faker::Internet.url('example.com') #=> "http://example.com/clotilde.swift"
Faker::Internet.url('example.com', '/foobar.html') #=> "http://example.com/foobar.html"

# Optional arguments: words=nil, glue=nil
Faker::Internet.slug #=> "pariatur_laudantium"
Faker::Internet.slug('foo bar') #=> "foo.bar"
Faker::Internet.slug('foo bar', '-') #=> "foo-bar"
```
# Faker::Lorem

```ruby
Faker::Lorem.word #=> "repellendus"

# Optional arguments: num=3, supplemental=false (words from a supplementary list of Lorem-like words)
Faker::Lorem.words #=> ["dolores", "adipisci", "nesciunt"]
Faker::Lorem.words(4) #=> ["culpa", "recusandae", "aut", "omnis"]
Faker::Lorem.words(4, true) #=> ["colloco", "qui", "vergo", "deporto"]

# Optional arguments: char_count=255
Faker::Lorem.characters #=> "uw1ep04lhs0c4d931n1jmrspprf5wrj85fefue0y7y6m56b6omquh7br7dhqijwlawejpl765nb1716idmp3xnfo85v349pzy2o9rir23y2qhflwr71c1585fnynguiphkjm8p0vktwitcsm16lny7jzp9t4drwav3qmhz4yjq4k04x14gl6p148hulyqioo72tf8nwrxxcclfypz2lc58lsibgfe5w5p0xv95peafjjmm2frkhdc6duoky0aha"
Faker::Lorem.characters(10) #=> "ang9cbhoa8"

# Optional arguments: word_count=4, supplemental=false, random_words_to_add=6
# The 'random_words_to_add' argument increases the sentence's word count by a random value within (0..random_words_to_add).
# To specify an exact word count for a sentence, set word_count to the number you want and random_words_to_add equal to 0.
# By default, sentences will have a random number of words within the range (4..10).
Faker::Lorem.sentence #=> "Dolore illum animi et neque accusantium."
Faker::Lorem.sentence(3) #=> "Commodi qui minus deserunt sed vero quia."
Faker::Lorem.sentence(3, true) #=> "Inflammatio denego necessitatibus caelestis autus illum."
Faker::Lorem.sentence(3, false, 4) #=> "Aut voluptatem illum fugit ut sit."
Faker::Lorem.sentence(3, true, 4) #=> "Accusantium tantillus dolorem timor."

# Optional arguments: sentence_count=3, supplemental=false
Faker::Lorem.sentences #=> ["Vero earum commodi soluta.", "Quaerat fuga cumque et vero eveniet omnis ut.", "Cumque sit dolor ut est consequuntur."]
Faker::Lorem.sentences(1) #=> ["Ut perspiciatis explicabo possimus doloribus enim quia."]
Faker::Lorem.sentences(1, true) #=> ["Quis capillus curo ager veritatis voro et ipsum."]

# Optional arguments: sentence_count=3, supplemental=false, random_sentences_to_add=3
# The 'random_sentences_to_add' argument increases the paragraph's sentence count by a random value within (0..random_sentences_to_add).
# To specify an exact sentence count for a paragraph, set sentence_count to the number you want and random_sentences_to_add equal to 0.
# By default, sentences will have a random number of words within the range (3..6).
Faker::Lorem.paragraph #=> "Neque dicta enim quasi. Qui corrupti est quisquam. Facere animi quod aut. Qui nulla consequuntur consectetur sapiente."
Faker::Lorem.paragraph(2) #=> "Illo qui voluptas. Id sit quaerat enim aut cupiditate voluptates dolorum. Porro necessitatibus numquam dolor quia earum."
Faker::Lorem.paragraph(2, true) #=> "Cedo vero adipisci. Theatrum crustulum coaegresco tonsor crastinus stabilis. Aliqua crur consequatur amor una tolero sum."
Faker::Lorem.paragraph(2, false, 4) #=> "Neque aut et nemo aut incidunt voluptates. Dolore cum est sint est. Vitae assumenda porro odio dolores fugiat. Est voluptatum quia rerum."
Faker::Lorem.paragraph(2, true, 4) #=> "Vomito unde uxor annus. Et patior utilis sursum."

# Optional arguments: paragraph_count=3, supplemental=false
Faker::Lorem.paragraphs #=> ["Dolores quis quia ad quo voluptates. Maxime delectus totam numquam. Necessitatibus vel atque qui dolore.", "Id neque nemo. Dolores iusto facere est ad. Accusamus ipsa dolor ut.", "Et officiis ut hic. Sunt asperiores minus distinctio debitis ipsa dolor. Minima eos deleniti."]
Faker::Lorem.paragraphs(1) #=> ["Labore voluptas sequi. Ratione nulla eaque quia molestiae fugit. At quam laboriosam aut ut dignissimos."]
Faker::Lorem.paragraphs(1, true) #=> ["Depulso animi cunctatio amicitia adficio. Vester viduo qui despirmatio voluptas. Validus laudantium adopto ut agnitio venustas. Aer arcus odio esse."]
```
