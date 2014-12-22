## Sunspot
[link](http://sunspot.github.io/)

    gem 'sunspot_rails'
    gem 'sunspot_solr' # optional pre-packaged Solr distribution for use in development

    $ rails generate sunspot_rails:install
    $ bundle exec rake sunspot:solr:start
    $ bundle exec rake sunspot:solr:run    # to start in foreground

Add a `searchable` block to the objects you wish to index.

    class Post < ActiveRecord::Base
      searchable do
        text :title, :body
        text :comments do
          comments.map { |comment| comment.body }
        end

        boolean :featured
        integer :blog_id
        integer :author_id
        integer :category_ids, :multiple => true
        double  :average_rating
        time    :published_at
        time    :expired_at

        string  :sort_title do
          title.downcase.gsub(/^(an?|the)/, '')
        end
      end
    end

Searching Objects

    Post.search do
      fulltext 'best pizza'

      with :blog_id, 1
      with(:published_at).less_than Time.now
      order_by :published_at, :desc
      paginate :page => 2, :per_page => 15
      facet :category_ids, :author_id
    end

## Choosing a stand-alone full-text search server: Sphinx of SOLR?
[link](http://stackoverflow.com/questions/1284083/choosing-a-stand-alone-full-text-search-server-sphinx-or-solr)

Differences:

- To use Sphinx in a commercial application, you'll have to buy a commercial license.
- Solr is easily embeddable in Java applications.
- Sphinx integrates more tightly with RDBMSes.
- Sphinx can be integrated with Hadoop to build distributed applications, and Nutch to quickly build a fully-fledged web search engine with crawler.
- Solr can index proprietary formats like Word, PDF.
- Solr has a spell-checker built out of the box.
- Solr has faceting--this breaks up search results into multiple categories, and allows the user to drill down and further restrict their search results based on those facets.

Use Solr if you intend to use it in your web-app. Use Sphinx if you want to search through tons of documents/files real quick. It indexes real fast, too. I would recommend not to use it in an app that involves JSON or parsing XML, use it for direct DB searches.

Sphinx - I can index 1.5 million documents in about a minute on my Mac, and even quicker on the server. I am also using Sphinx to limit searches in places within specific latitudes and longitudes, and it is very fast.

## How do Solr, Lucene, Sphinx, and Searchify Compare?
[link](https://www.quora.com/How-do-Solr-Lucene-Sphinx-and-Searchify-compare?srid=dXqK&share=1)

- Lucene is a Java library for creating and searching through a full text index. To use it, you need Java code that integrates with it. Indexing--Lucene/Solr maintain indexes in segments which need to be updated for new data.
- Solr is a web service built on top of the Lucene library. You can talk to it over HTTP from any programming language. It adds a lot more capabilities in terms of quickly setting up a search server. Better monitoring/quick checking interface.
- Sphinx is a searching engine library which supports real time indexing/database indexing for information retrieval. Sphinx indices occupy more space as compared to Solr/Lucene, but it is faster.
