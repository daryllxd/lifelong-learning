## andrewvos.com: Writing better Cucumber features
[Link](http://andrewvos.com/2011/06/15/writing-better-cucumber-features/)

*Scenarios should not automate the UI.*

> Bad

    Scenario: Invalid email address
    When I fill in "Username" with "Username"
    And I fill in "Password" with "password123"
    And I fill in "Confirm Password" with "password123"
    And I fill in "Email Address" with "invalid email address"
    And click "Create User"
    Then I should see "Please enter a valid email address"

> Good

    Scenario: Invalid email address
    When I fill in an invalid email address
    And click "Create User"
    Then I should see "Please enter a valid email address"

*Features should only contain information that the user sees*

Element ids, CSS and XPath is only relevant to developers and should be kept in the step definitions or removed entirely.

*Scenarios should not be dependant on other scenarios*

*Use Background for setup when there's more than one scenario*

*Feature names are features not processes*

Feature names should describe actual features. An example of a bad feature name is "A user registers an account". This feature should probably be called "Registration" or "User Registration".

*Don't use multiple 'thens'*

Instead of multiple Thens use one Then and follow it up with Ands.
