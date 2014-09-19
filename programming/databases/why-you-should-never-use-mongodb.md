# Why You Should Never Use MongoDB
[link](http://www.sarahmei.com/blog/2013/11/11/why-you-should-never-use-mongodb/)

The received wisdom has been that social data is not relational, and that if your store it in a relational database, you're doing it wrong.

A TV show with 12000 seasons spread over 50+ episodes: PostgreSQL takes about a minute to get denormalized data for 12000 episodes, while retrieval in MongoDB takes a fraction of a second.

With V shows, each box in the relationship (show, season, episode, actor) is a different type. With social data, the relationships are of the same type (users, friends, likers). The type duplication makes it way harder to denormalize an activity stream into a single document.

Duplication? When Jane posts an update, her node updates and her friend Joe's node also updates. The problem is that there would be inconsistent data and mysterious errors, particularly when dealing with deletions.

Another strategy is to store a user's ID in place like this:

    {id: 1, name: Joe, friends: [{user: 2}, {user: 3}}

The problem is that since we've moved some data out of the activity streams, we can no longer construct an activity stream from a single document (!). Now we have to retrieve the first document and all documents after. MongoDB doesn't do this, so you have to do the mashup in your application code, instead.

Denormalized data? This works for a TV show because everything inside a document can be self-contained. On a social network, nothing is that self-contained.

*Whether you’re duplicating critical data (ugh), or using references and doing joins in your application code (double ugh), when you have links between documents, you’ve outgrown MongoDB. When the MongoDB folks say “documents,” in many ways, they mean things you can print out on a piece of paper and hold. A document may have internal structure — headings and subheadings and paragraphs and footers — but it doesn’t link to other documents. It’s a self-contained piece of semi-structured data.*

If your data looks like that, you've got documents. Congratulations! It's a good use case for Mongo. But if there's value in the links between documents, then you don't actually have documents.

## Cache Invalidation As A Service

It is fast to see projects cache denormalized activity stream data into a document database like MongoDB, but the only problem they have is cache invalidation.

Cache invalidation is knowing when a piece of your cached data is out of data, and needs to be updated or replaced. In web applications, this means we have a backing store (PostgreSQL or MySQL), and in front of that we have a caching layer (Memcached or Redis). Requests to read a user's activity stream go to the cache rather than the database directly, which makes them very fast.

Writes are more complicated. When a user with two followers writes a new post, what happens is the post data is copied to the backing store, and then a background job appends that post to the cached activity stream of both the users who follow the author.

When the author changes an existing post, the update process is essentially the same as for a create, except instead of appending to the cache, it updates an item that's already there.

The problem with MongoDB is that if there is no backing store, you just have a "cache" with no backing store behind it. There is no way to regenerate your data in a consistent state.

## Epilogue

About 3 months into the TV show app, the client wanted a feature wherein when looking at the actors in an episode of a show, they wanted to be able to click on an actor's name and see that person's entire television career. Since a show is a document, if an actor appeared in two different episodes, even of the same show, their information was stored in both places. There was no way to tell if these were the same person. We changed from MongoDB to PostgreSQL.

The only thing MongoDB is good at is storing arbitrary pieces of JSON. Arbitrary means you don't care at all what's inside the JSON. Each document is just a blog whose interior you make absolutely no assumptions about.

## Comments

- Databases like MongoDB, CouchDB etc. often have a place in high velocity, or high variability data pipelines as a way in or out of the RDBMS. In essence you can use these as a buffer for information pending processing, which can then be processed and inserted into a relational DB for more flexibility. You can also use it as a caching layer on the way out, and one that you can share between processes if you need to.
- All data can be described in relational terms, and the analytical process of normalising data can be am extremely enlightening. However, the implementation choice could still be document-centric, key-value, RDBMS, graph based or others. All have their advantages and disadvantages, and the more we are open about the limitations of the tools we use (and this article is a great example of that) the better implementation choices we can make as result.
- I gone in ‘hybrid’ direction where any unstructured data – before processing, where you are not worried about what it is – placed in the document store and then the processed structured data stored/mapped in the relational tables with references to the document.
- It's easy to model hierarchical data in a relational database and you don't do so by using separate tables for each of the levels in the hierarchy. It's too inflexible. Hierarchical data within relational databases exists in every major (and most not-so-major) organization in the world. All that customer analytic stuff. Hierarchical and in vast quantities.
- Where I work, there is a lot of interest in the NoSQL technologies. Most of our data is geospatial in nature. From what I have seen, a lot of the 40 years of progress made with RDBMS has been ported to the NoSQL world. For geospatial, the available technologies still have some limitations. For point data used for situations like a cell phone user wanting to find all Starbucks within a 5 mile radius, MongoDB (and Solr) are great. It is easier to decide how to shard point data than it is to shard lines and polygons that cover varying geographic extents. Such division of data is best done after all of the data has been ingested, and redone after more data is added, typically against an off-line data store that can later be hot-swapped as the master.
- Don't underestimate the years and years of development that went into query optimization for relational databases. If you think your Ruby script mashing up the data is going to outgun a seven-table join just get off your high horse. You are competing with millions of man-hours that have gone into the development of the current relational databases as they stand now. There is no way you are going to outgun this.
- Normalization is not a curse. It is a way to atomize the data into its basic constituents. Reassembling the data into the form you want with a join is perhaps inefficient at run time but it also means that your queries do not suffer from the Tyranny of the Dominant Decomposition.
- You can never reliably anticipate all possible future value that may be discovered even within a pie of JSON that seemingly has no external value in its relationships. How can you know that you won't encounter a client request that they rightly perceive as trivial, only to discover that your use of a document database has rendered it a Manhattan project to make it happen?
- *One thing I've learned: the data will outlive the application. That's the main reason why you want it to be organized independently of how it happens to be useful for the first application. In other words, you want it normalized (as you discovered) because at some point someone will want to query /update it in a totally different way than you've organized it initially.*
- I really believe that for live counters, score boards etc it's just perfect. But not to store normalized data.
- RDBMS make writing consistent data their top priority and sacrifice read performance to do that. Still 90% of the time you wanna just read from your database, so that should be your main concern, if you can guarantee that the data will be eventually consistent. Once you can do that, NoSQL like MongoDB starts looking pretty good again.
- Having a loose schema database is absolutely fantastic for applications. You want to store more fields, new kinds of data you just enrich your models and then cope with previous data that does not have the new points. You could either not care, or you could update existing documents to have something.
- Creating relationships in your software is one of the furthest reaching design decisions you make. This is why I loathe RDBMS, it makes the assumption that everything is a relationship which is wrong.
- This referential data problem in MongoDB always confounded me and I wondered how these types of situations were handled (or not). This bothered me to the point that I almost chased down someone with a MongoDB backpack on in the airport to ask them :). I guess the paradigm is fast reads, slower writes.
- This serves as a good lessons-learned article on document design. Document design is a completely different skill compared to relational schema design. Ask 10 relational DBAs to give you a schema design for an online book shop and they will all give you pretty much the same thing, ask 10 NoSQL programmers to design a schema and each will come back completely different. Good document design depends on the actual usage of that data rather than just the storage. Its also much newer, people aren't as experienced and there aren't as many article details how to do it well and common patterns. In both examples used here I think poor document schemas were used in the very beginning. I understand de-normalising and redundancy in document stores, but really? To this level? Actors continually duplicated like that especially when pages about actors seems a VERY logical progression and actor data is likely to change, what did you plan on doing if someone got married?
- Storing relational data in a document store is not a bad thing. One collection for TV shows, one collection for actors. Easy. IDs can be stored to relate them, heck, MongoDB has conventions for this and some drivers offer support. Document stores are designed to be incredibly quick, designed in such a way that where you would make one query in a relational database you now make many to retrieve many documents, it requires more effort at the application layer but couple any relational database with an ORM and you've got that anyway. This isn't a bad thing, its just different.
- Choosing a document store for data that is, even under the most cursory examination, heavily relational is poor a design decision. While you did mention that it was a bad design decision, this is minimized by your twisting the argument around in to tool bashing.
- In my mind there will always be one database for connecting human data together: graph databases, while they are many and esoteric each they happen to best represent the crazy structure that connected human data represents. I've built systems that handled billions of rows of human data and as long as I didn't have to connect each human and their interactions together I loved having it in a relational database. Graph databases take it to a whole new level though, giving you really fast response times for really fast interconnected questions.
- I remember listening to a MongoDB presentation at MySQL meetup, and walking away thinking – this is a great log parser, but that's about it. Agree that random JSON documents is what it is best at.

## Data Conversion Process (Likes)

1. Export. Dump all of the like data to JSON (one JSON hash per like).
2. Convert. Convert the JSON to a CSV file, one row per like.
3. Normalize. Create a likes table in your relational store with: `id`, `post_bson_id` and `user_bson_id`, the two IDs you got from Mongo, and `post_id` and `user_id`, initially blank, which will eventually contain the foreign keys into those tables that don't actually exist yet.
4. Import 4a. Repeat. LOAD DATA INFILE. Repeat with Posts.
5. Process. `UPDATE likes, posts SET likes.post_id = posts.id WHERE posts.bson_id = likes.post_bson_id; ALTER TABLE likes DROP COLUMN post_bson_id; ALTER TABLE likes MODIFY post_id INT NOT NULL;`.
