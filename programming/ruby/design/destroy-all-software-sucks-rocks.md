# Sucks Rocks

Gemfile - taken from somewhere in the base.
vcr - record playback for calls into the search engine.
wegmock - ????
paste from splat register.
Instead of doing `fill_in` and click stuff which loads Rails, create a class for this. If we want to get something working, we don't need to load the entire controllers, views, etc thing.

So I can do the

    @scores ||= {}
    @scores[term] = RockScore.for_term(term)

So I can TDD this without Rails.

I put RockScore in `app/services`. To do this I add to the `autoload` path in initializers and the rspec test is this:

## Computing Scores

> `spec/services/rock_score_spec.rb`

    require_relative "../../app/services/rock_score"

    describe RockScore do
    end

Three scenarios to test, since the algorithm is `10 * positive / (positive + negative)`

- It returns 0 for unpopular
- It returns 10 for popular terms
- It returns mediocre results for mediocre terms
- Edge case: It does not divide by 0.

Now we have to do some computations. We need new class, and stub it out.

    describe RockScore do
      it "return 0 for unpopular terms" do
        SearchEngine.stub(:count_results).with("apple rocks") { 0 }
        SearchEngine.stub.(:count_results).with("apple sucks") { 1 }
        RockScore.for_term("apple").should == 0.0
      end
    end

For here we can still stick with a `return 0` for the `for_term` method in RockScore. But when we code to generalize the method and actually do stuff, this is what we do:

    class RockScore
      def self.for_term(term)
        positive = SearchEngine.count_results("#{term} rocks")
        negative = SearchEngine.count_results("#{term} sucks")
        10 * positive / (positive + negative)
      end
    end

Now the problem here is that you don't convert to float. But, instead of doing a `returns a float` test, we just make a specific test that returns a float result.

    describe RockScore do
      it "return 0 for unpopular terms" do
        SearchEngine.stub(:count_results).with("apple rocks") { 9 }
        SearchEngine.stub.(:count_results).with("apple sucks") { 11 }
        RockScore.for_term("apple").should == 4.5
      end
    end

So we get 4 here, and we need the `to_f` on the `for_term` method.

*Next, we right the "no score" thing to not be nil.* To do this, I create an object that exists to mark the absence of a score.

    describe RockScore do
      it "does not divide by zero" do
        SearchEngine.stub(:count_results).with("apple rocks") { 0 }
        SearchEngine.stub.(:count_results).with("apple sucks") { 0 }
        RockScore.for_term("apple").should == RockScore::NoScore
      end
    end

We make a class to represent this. Instead of an object, we use a class so we can know what the heck is really happening.

    class RockScore
      NoScore = Class.new

      def self.for_term(term)
        positive = SearchEngine.count_results("#{term} rocks")
        negative = SearchEngine.count_results("#{term} sucks")
        score = 10 * positive / (positive + negative)
        score.nan? ? NoScore : score
      end
    end

So we can see that each case needs to have stuff stubbed in. But this is a data-driven class. It's purpose is to clearly compute something given 2 numbers that are put in. I can try to do something fancy like `inject`.

If we run the cucumber test it still fails, but at least we are able to compute things now. Now I can commit this, and I can integrate with the search engine next.

## The Search Engine

Now I create `SearchEngine` (`app/servics/search_engine`).

    describe SearchEngine do
      it "counts results" do
        SearchEngine.count_results("microsoft").should = 10**11
      end
    end

The problem here is I have to stub out the API call when I really don't want to do that because the 


Exception and Control Flow

## Commits
- rails new
- install rspec and cucumber
- add scripts (script/features, script/test)
- add the RockScore class, it has tests too.
