# Design Patterns: PubSub Explained
[Reference](https://abdulapopoola.com/2013/03/12/design-patterns-pub-sub-explained/)

- Advantages:
  - Loose coupling: no need to know about number of subscribers, what topics a subscriber is listening to, or how subscribers work.
  - Scalable
  - Cleaner design, cause you think about the components will interact
  - Flexible: Just make sure they agree to one contract
  - Easy testing (Just test if you get the right or wrong messages)
- Disadvantages:
  - Middleman might not notify system of message delivery status
  - No knowledge of the status of the subscriber, vice-versa
  - More messages = more instabilities
  - Intruders/malicious publishers can invade
  - Need for middleman, message specification, participant rules
