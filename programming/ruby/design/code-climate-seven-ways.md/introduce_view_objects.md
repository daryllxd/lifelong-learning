## 5. Introduce View Objects

If logic is needed purely for display purposes, it does not belong in the model.

> Ask yourself, “If I was implementing an alternative interface to this application, like a voice-activated UI, would I need this?”. If not, consider putting it in a helper or (often better) a View object.

For example, the donut charts in Code Climate break down class ratings based on a snapshot of the codebase (e.g. Rails on Code Climate) and are encapsulated as a View:
    
    class DonutChart
      def initialize(snapshot)
        @snapshot = snapshot
      end

      def cache_key
        @snapshot.id.to_s
      end

      def data
        # pull data from @snapshot and turn it into a JSON structure
      end
    end

I often find a one-to-one relationship between Views and ERB (or Haml/Slim) templates. This has led me to start investigating implementations of the Two Step View pattern that can be used with Rails, but I don’t have a clear solution yet.

Note: The term “Presenter” has caught on in the Ruby community, but I avoid it for its baggage and conflicting use. The “Presenter” term was introduced by Jay Fields to describe what I refer to above as “Form Objects”. Also, Rails unfortunately uses the term “view” to describe what are otherwise known as “templates”. To avoid ambiguity, I sometimes refer to these View objects as “View Models”.
