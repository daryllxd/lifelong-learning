# [Mocks Aren't Stubs](http://martinfowler.com/articles/mocksArentStubs.html)

    public class OrderStateTester extends TestCase {
      private static String TALISKER = "Talisker";
      private static String HIGHLAND_PARK = "Highland Park";
      private Warehouse warehouse = new WarehouseImpl();

      protected void setUp() throws Exception {
        warehouse.add(TALISKER, 50);
        warehouse.add(HIGHLAND_PARK, 25);
      }

      public void testOrderIsFilledIfEnoughInWarehouse() {
        Order order = new Order(TALISKER, 50);
        order.fill(warehouse);
        assertTrue(order.isFilled());
        assertEquals(0, warehouse.getInventory(TALISKER));
      }

      public void testOrderDoesNotRemoveIfNotEnough() {
        Order order = new Order(TALISKER, 51);
        order.fill(warehouse);
        assertFalse(order.isFilled());
        assertEquals(50, warehouse.getInventory(TALISKER));
      } 
    }

We set up the test using `setUp`. Execute the thing (`order.fill`). Check results (`assert`). Teardown = in this case is the Java garbage collector.

Order is the class we are testing, but in this case we also need an instance of Warehouse.

For this test I need the system under test (`Order`) and a collaborator (`warehouse`). Warehouse is needed to get the tested behavior to work, and I also need it for verification.

## Tests with Mock Objects

Same thing but using mock objects:

    public class OrderInteractionTester extends MockObjectTestCase {
      private static String TALISKER = "Talisker";

      public void testFillingRemovesInventoryIfInStock() {
        //setup - data
        Order order = new Order(TALISKER, 50);
        Mock warehouseMock = new Mock(Warehouse.class);

        //setup - expectations
        warehouseMock.expects(once()).method("hasInventory")
          .with(eq(TALISKER),eq(50))
          .will(returnValue(true));
        warehouseMock.expects(once()).method("remove")
          .with(eq(TALISKER), eq(50))
          .after("hasInventory");

        //exercise
        order.fill((Warehouse) warehouseMock.proxy());

        //verify
        warehouseMock.verify();
        assertTrue(order.isFilled());
      }

## Explanation

The setup phase is different: It's divided into two parts, data and expectations. Data creates the real `Order` class, but the warehouse object is a mock warehouse.

Second part: Create expectations on the mock objects. Indicate which methods should be called on the mocks when the SUT is exercised.

Then, run asserts on the SUT. Mocks use behavior verification -- we instead check to see if the order made the correct calls on the database.

We check to see if the order made the correct calls on the warehouse (we ask the mock to verify itself during verification).


      public void testOrderIsFilledIfEnoughInWarehouse() {
        Order order = new Order(TALISKER, 50);
        order.fill(warehouse);
        assertTrue(order.isFilled());
        assertEquals(0, warehouse.getInventory(TALISKER));
      }

      public void testFillingDoesNotRemoveIfNotEnoughInStock() {
        Order order = new Order(TALISKER, 51);
        Mock warehouse = mock(Warehouse.class);

        warehouse.expects(once()).method("hasInventory")
          .withAnyArguments()
          .will(returnValue(false));

        order.fill((Warehouse) warehouse.proxy());

        assertFalse(order.isFilled());
      }

## The Difference Between Mocks and Stubs

When you're doing testing like this, you're focusing on one element of the software at a time. The problem is that to make a single unit work, you often need other units.

The second case used a mock warehouse.

Test Double -- generic term for any kind of pretend object used in place of a real object for testing purposes.

- Dummy -- passed around but never actually used. They are just used to fill parameter lists.
- Fake -- have working implementations, but have shortcuts so not suitable for production
- *Stubs -- provide canned answers to calls made during the test, usually not responding at all to anything outside what's programmed in the tests. Stubs may also record information about calls (ex: an email gateway stub that remembers the messages it 'sent').*
- *Mocks -- objects pre-programmed with expectations which form a specification of the calls they are expected to receive.*

Only mocks insist on behavior verification (the rest use state verification). Mocks behave like other doubles during the exercise phase, as they need to make the SUT believe it's talking with its real collaborators.

## Example -- Mailer

We stub/mock out an email sender so we don't send email messages out to the customers during testing. So we create a test double of the email system.

**Stub**

    class MailServiceStub
      list messages = []

      def send(message)
        messages << messsage
      end

      def number_of_messages_sent
        messages.count
      end
    end

**State verification**

    it 'order sends mail if unfilled' do
      order = Order.new(TALISKER, 51)
      mailer = MailServiceStub.new
      order.set_mailer(mailer)
      order.fill(warehouse)
      expect(mailer.number_of_messages_sent).to eq 1
    end

(BTW we just test that a message has been sent. We don't test that it was sent to the right person, or with the right contents.)

**Mocks**

(Horrible "implementation" of RSpec, don't know how to do his part yet)
    it 'order sends mail if unfulfilled' do
      order = Order.new(TALISKER, 51)
      warehouse = instance_double(Warehouse.class)
      mailer = instance_double(MailService.class)
      order.setMailer(MailService(mailer.proxy))

      mailer.expects(once).method("send")
      warehouse.exepcts(once()).method("send")
      warehouse.expects(once).mehotd("has_inventory").withAnyArguments().will(returnValue(false))
    end

*Stub uses state verification while mock uses behavior verification (did this happen, did this method get called).*

## Classical and Mockist Testing

Classical -- Use real objects if possible and a double if it's awkward to use the real thing. A classical TDDer would use a real warehouse and a double for the mock service.

Mockist -- Will always use a mock for any object with interesting behavior, in this case for both the warehouse and the mail service.

## Choosing Between the Differences

Easy collaboration (order/warehouse), or awkward one (order/mail service)? As it turns out the characteristics of state and behavior verification do affect that discussion, and that's where I'll focus most of my energy.

Edge case: Caching -- this is a case where behavior verification would be the wise choice for even a classic TDDer.

*Need-driven development: You begin developing a user story by writing your first test for the outside of the system.*

1. Program UI using mock layers underneath.
2. Write tests for the lower layer, stepping through the system one layer at a time.

Classic TDD: Similar stepping using stubbed methods - you can hard-code exactly the response the test requires to make the SUT work.

Middle-out: You take a feature and decide what you need in the domain for this feature to work. Get domain objects to do what you need and then you layer the UI on top.

## Test Isolation

If you introduce a bug to a system with mockist testing, it will cause only tests whose SUT contains the bug to fail. WIth the classic approach, any tests of client objects can also fail, which leads to failures where the buggy object is used as a collaborator in another object's test.

In essence, classic unit tests are not just unit tests, but also mini-integration tests. As a result, many people like the fact taht clients tests may catch errors that the main tests for an object may have missed, particularly probing areas where classes interact.

Mockist tests = you test the outbound calls of the SUT. Classic tests only care about the final state and not how the state was derived. Problem with mockist testing, you think about the implementation of the behavior.

Coupling to the implementation also interferes with refactoring, since the implementation changes are much more likely to break tests than with classic testing.

## Design Style

Mockist testing supports an outside-in approach while developers who prefer a domain model out style tend to prefer classic testing.

Mockist testers tend to easy away from methods that return values in favor of methods that act upon a collecting object.

"Tell Don't Ask" -- tell an object to do something rather than rip data out of an object to do it in client code. *Mockists say taht using mockist testing helps promote this and avoid the getter confetti that pervades too much of code these days.*

Problem with state-based verification: You create a lot of query methods only for tests/to support verification. We don't just want to add tests to an object's API purely for testing--using behavior verification avoids that problem.

## Classicist or Mockist?

I'm a classicist. I'm concerned about the consequences of coupling tests to implementation. A mockist is constantly thinking about how the SUT is going to be implemented in order to write the expectations. This feels really unnatural to me.

