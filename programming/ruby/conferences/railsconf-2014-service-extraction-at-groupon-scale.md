# RailsConf 2014 - Service Extraction at Groupon Scale by Jason Sisk & Abhishek Pillai
[link](https://www.youtube.com/watch?v=13SV7MjJugo)

Early, Groupon had a problem with site outages due to Rails scaling.

Rails is agile-friendly, and that's awesome. We can iterate a product quickly. We have a single test suite and a single deploy process. Integrating components is really easy with the convention over configuration.

One of the biggest things that kept us from extracting services early was as the code grew, you had a lot of natural convention coupling that was happening in the models.

Ex:

    class User < AR::Base
      def deal_titles
        orders.map{ |o| o.deal.title } # This couples your components between each other.
      end
    end

This also creates an unneeded query to the Users table.

## Service Extraction

So we decided to take services more seriously. We decided to extract the Order Service out, because we knew it would be a long-lived service. With Rails callbacks and model associations, it was hard to see where coupling took place.

We made a services directory.
