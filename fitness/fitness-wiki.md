# Getting Started with Fitness
[Reference](https://thefitness.wiki/getting-started-with-fitness/)

- Healthy/sustainable weight loss: 1 pound per week, or 52 pounds per year.
- Muscle building: 20-25 pounds of muscle per year.
- Most important factors:
  - An appropriate amount of exercise at an appropriate intensity
  - A form of progression over time
  - Eating an appropriate amount of calories and protein
  - Getting enough sleep, rest, and recovery time
  - Consistency over time in all of the above

## Improving Your Diet

- **This is a change to your lifestyle. You are basically this new person now. This is why people yo-yo for years.**
- It's all about calories, protein, and generally eating well. Estimate your TDEE in calories, eat 10-20% fewer to lose weight, 10-20% more to gain weight.
- 120g of protein as a minimum, up to 160g for muscle gain per day.
- 0.38g/lb of fat per day.
- Eat like an adult.
- Calories in, calories out: if you are doing strength training, some of your gains will be muscle.

Re new template:
- Pertinent files are at: app/views/partners_layout/kaligo2/hotel_detail.haml and its overrides,
 app/views/whitelabel/jal/hotels/detail/_basic_hotel_information.haml and app/views/whitelabel/visa/hotels/detail/_basic_hotel_information.haml.
- Specifically, this is the partial that shows the hotel photo at the top + reviews/select a room.
- Comparing them side by side, difference is primarily in `hotel-info` and in `rewards-yourself`.
- Now the question is: Do we want to shared_partialize the entire `hotel-info-container`, or do we just want to shared_partialize the difference  (`.hotel-info` and `.reward-yourself`)? Leaning towards latter

Also, minor things found while checking out branch:
- Padding between rating and "Very good", missing "km from city center", map icon beside show on map, "See Room Options" button and "Select" buttons dont have border radius (I think this is 3px)<img width="509" alt="Screen Shot 2019-03-21 at 8 18 20 AM" src="https://user-images.githubusercontent.com/2204029/54727962-d4087a80-4bb5-11e9-8099-9470712c261d.png">
- View more: Change to click to show all rooms as per mockup in XD for that part, base it off of JAL hotel details page <img width="327" alt="Screen Shot 2019-03-21 at 8 41 58 AM" src="https://user-images.githubusercontent.com/2204029/54727963-d4a11100-4bb5-11e9-8762-32bbf2323178.png">
- Nitpick (not sure even if related to PR, but it's there already anyway): Modify search icon not aligned with text <img width="144" alt="Screen Shot 2019-03-21 at 8 43 17 AM" src="https://user-images.githubusercontent.com/2204029/54727964-d4a11100-4bb5-11e9-9b6b-4d6328c22a71.png">
- Super small nitpick: Add margin between arrow and text here <img width="175" alt="Screen Shot 2019-03-21 at 8 44 04 AM" src="https://user-images.githubusercontent.com/2204029/54727967-d539a780-4bb5-11e9-86bd-0030494565bc.png">
- Nitpick: Margin between "See room photos", I think this is 5px. <img width="482" alt="Screen Shot 2019-03-21 at 8 46 05 AM" src="https://user-images.githubusercontent.com/2204029/54727968-d539a780-4bb5-11e9-8a0b-2f423a6a3a8e.png">

---


To engineers:

Issues found:

Homepage

- [ ] I want Qix to be part of the Payment -> Changed to use the PA tag.
- [ ] Car Hire (Ru) - PA added qix tag
- [ ] Enter city or airport name (Ru) - PA added qix tag
- [ ] Same as pick-up (Ru) - PA added qix tag
- [ ] Search Cars (Ru) - PA added qix tag

Hotel search results

- [ ] Room Options button (Ru) PA added qix tag
- [ ] Room names in (it)

Hotels Checkout

- [ ] I agree to the Cancellation Policy (it/ru)
- [ ] Confirm Hotel Booking - Added `checkout.confirm_hotel_booking` to PA qix tag
- [ ] `salution_mr`, mrs.. (ru) - Add PA qix tag

Hotels Confirmation

- [ ] Missing translation key: 'QIX points have been deducted from your account. For refund, check the cancellation policy.' => Created `wl.qix.points_have_been_deducted` and tagged as `qix`
- [ ] Missing translation key: 'QIX points will be credited to your account within 10 days after the completion of your trip.' => Created `wl.qix.points_will_be_credited` and tagged as Qix
- [ ] ("PAID") => `checkout.paid` already exists, tagging as a QIX one
- [ ] `booking_detail.cancellation_policy.non_refundable_not_permitted` => No (ru) translation, adding to qix tag

Car Search Results

- None

Car Details

- [ ] "Next" => Tag as qix as no trans exists for (ru) and (it)
- [ ] Italian looks good, but Russian lacks need most of the car-related keys. This can be resolved in PA itself since there is a cars tag - we just add (ru) to the languages.
- [ ] "/day" => Converted to "/Day" as that translation exists already.

Cars checkout

- [ ] "will be charged to your card immediately" => original has period at the end, now we remove that from translation then add the period after
- [ ] `cars.agree_terms` => Add for ru => tag as qix

Cars success

- There is a "bug" here - switching languages does not change the translations. This is cause this is rendered via Rails. It's fine because refreshing the page in Italian/Russian renders the new page in that language.

Manage Bookings

- None

Terms and Conditions, Privacy Policy

- [ ] The (it) version just tells you to look for English
- [ ] The (ru) version shows the English version.

Navigation (all added to Qix)

- [ ] `wl.qix.back_to_hotel_home_page`
- [ ] `wl.qix.back_to_travel_home_page`;
- [ ] `Hotel Registration`
- [ ] `cars.booking_confirmation`
- [ ] "Back to hotel details" => "Take `wl.ll.back_to_hotel`, add Qix tag
- [ ] "Back to car details" => "Take `checkout.back_to_car_details`, add Qix tag
- [ ] "Hey ..., you have x points" => Translation exists, it has Qix tag already

Issues found that are more Angular than translations related

- Datepicker placeholders - doesn't change when translation changes.
- Hotel search results - when changing language, the placeholders don't change.
- "checkout.errors.default" => Doesn't change when we change languages.
