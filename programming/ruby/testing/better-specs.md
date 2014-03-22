#### How to describe your methods.

> Bad
    
    describe "the authenticate method for User" do
    describe "if the user is an admin" do

> Good

    describe ".authenticate" do
    describe "#admin?" do

#### Use contexts (shoulda)

> Bad

    it "has 200 status code if logged in" do
      expect(response).to respond_with 200
    end

> Good

    context "when logged in" do
      it { should respond_with 200 }
    end

#### Keep description short, < 40 chars.

#### Single expectation tests ("each test should make only one assertion").

#### Test all possible cases.

When testing a destroy why not add to see the edge cases.

    context "when resource is found"

    context "when resources is not found" do
      it "responds with 404"
    end

    context "when resources is not owned" do
      it "responds with 404"
    end

#### `expect`  vs `should` Syntax

Configure Rspec to only accept the new syntax on new projects.

    Rspec.configure do |config|
      config.expect_with :rspec do |c|
        c.syntax = :expect
      end
    end

#### Use subject

Named subjects:
  
    subject(:hero) { Hero.first }
    it "carries a sword" do
      expect(hero.equipment).to include "sword"
    end

#### Use let and let!

When you have to assign a variable instead of using a before block to create an instance variable, use let. Using let the variable lazy loads only when it is used the first time in the test and get cached until that specific test is finished.

> Bad

    describe '#type_id' do
      before { @resource = FactoryGirl.create :device }
      before { @type     = Type.find @resource.type_id }

> Good

    describe '#type_id' do
      let(:resource) { FactoryGirl.create :device }
      let(:type)     { Type.find resource.type_id }

Let is actually this:

    # this:
    let(:foo) { Foo.new }

    # is very nearly equivalent to this:
    def foo
      @foo ||= Foo.new
    end

#### Weekly Iteration 14
- We would rather not put the stuff the user has that we don't need into the test, we would rather put it into a factory.
- The problem with `let` is that it might put you to a position that sucks in that you defined things at the top and your test is at the bottom.
- `before` is just used for meta stuff, we would rather not use this.
- If we only have the information we need, the tests become less brittle.

#### Mock or not to mock [TODO]

#### Easy to read matcher 

#### Shared Examples

In our experience, shared examples are used mainly for controllers. Since models are pretty different from each other, they (usually) do not share much logic.

#### Test what you see

Deeply test your models and your application behaviour (integration tests). Do not add useless complexity testing controllers.

#### Stubbing HTTP requests

Sometimes you need to access external services. In these cases you can't rely on the real service but you should stub it with solutions like webmock.

    context "with unauthorized access" do
      let(:uri) { 'http://api.lelylan.com/types' }
      before    { stub_request(:get, uri).to_return(status: 401, body: fixture('401.json')) }
      it "gets a not authorized notification" do
        page.driver.get uri
        expect(page).to have_content 'Access denied'
      end
    end
