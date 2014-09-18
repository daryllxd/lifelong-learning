# Let's Not
[link](http://robots.thoughtbot.com/lets-not)

    describe FactoryGirl::EvaluatorClassDefiner do
      let(:simple_attribute) {
        stub("simple attribute", name: :simple, to_proc: -> { 1 })
      }
      let(:relative_attribute) {
        stub("relative attribute", name: :relative, to_proc: -> { simple + 1 })
      }
      let(:attribute_that_raises_a_second_time) {
        stub(
          "attribute that would raise without a cache",
          name: :raises_without_proper_cache,
          to_proc: -> { raise "failed" if @run; @run = true; nil }
        )
      }
      let(:attributes) {
        [
          simple_attribute,
          relative_attribute,
          attribute_that_raises_a_second_time
        ]
      }
      let(:class_definer) {
        FactoryGirl::EvaluatorClassDefiner.new(
          attributes,
          FactoryGirl::Evaluator
        )
      }
      let(:evaluator) {
        class_definer.evaluator_class.new(
          stub("build strategy", add_observer: true)
        )
      }

      it "adds each attribute to the evaluator" do
        evaluator.simple.should eq 1
      end

      it "evaluates the block in the context of the evaluator" do
        evaluator.relative.should eq 2
      end

      # More tests
    end

Problems:

- A General Fixture is declared, reused, and augmented by each test to create the necessary setup.
- The examples don't declare any test setup; they reference relevant portions of the existing fixture.
- There is a Mystery Guest in each test.
- It causes Fragile tests by creating a complicated fixture that is difficult to maintain.

The reader is not able to see the cause and effect between fixture and verification logic because part of it is done outside the Test Method.

    it "evaluates the block in the context of the evaluator" do
      evaluator.relative.should eq 2
    end

Without context, the reader has no idea of what's happening in this test, and the example description can't really help. By parsing out the large fixture above, the reader can determine what's going on, but correlating the fixture and test is slow and error-prone.

What we can do is to inline the examples and setup logic. When we have duplication, we can extract that to a few factory methods.

