## JSON API Website
[link](http://jsonapi.org/format/)

Clients built around JSON APIs are able to take advantage of its features around efficiently caching responses and sometimes eliminating network requests entirely.

JSON API server: Supports fetching of resources through the HTTP method GET, in order to support CUD, it must use POST, PUT, DELETE.

Top level has: `meta`, meta-information about a resource, such as pagination. `links`, or URL templates to be used for expanding resources' relationship URLs, or `linked`, a collection of resource objects, grouped by type, that are linked to the primary resource and/or each other.

#### Individual Resource Representations: Single object.

    {
      "posts": {
        "id": "1",
        // ... attributes of this post
      }
    }

####  Resource Collection Representations: Should be represented as an array of resource objects or IDs, or as a single "collection object".

    {
      "posts": [{
        "id": "1"
        // ... attributes of this post
      }, {
        "id": "2"
        // ... attributes of this post
      }]
    }

Single "collection" object:

    {
      "comments": {
        "href": "http://example.com/comments/5,12,17,20",
        "ids": [ "5", "12", "17", "20" ],
        "type": "comments"
      }
    }

Reserved keys in resource objects:

- `"id"`
- `"type"`
- `"href"`
- `"links"`

Every other key in a resource object represents an "attribute".

#### Resource Relationships/Links:

The value of the `"links"` key is a JSON object that represents linked resources, keyed by the name of each association.

    {
      "id": "1",
      "title": "Rails is Omakase",
      "links": {
        "author": "9",
        "comments": [ "5", "12", "17", "20" ]
      }
    }

#### To-One Relationships

To-one relationships must be represented with one of the formats for individual resources.

      {
        "id": "1",
        "title": "Rails is Omakase",
        "links": {
          "author": {
            "href": "http://example.com/people/17",
            "id": "17",
            "type": "people"
          }
        }
      }

Blank `has_one` relationship: `null` value.

    {
      "id": "1",
      "title": "Rails is Omakase",
      "links": {
        "author": null
      }
    }

#### To-Many Relationships

They must be represented with one of the formats for resource collections described above.

  {
    "id": "1",
    "title": "Rails is Omakase",
    "links": {
      "comments": [ "5", "12", "17", "20" ]
    }
  }

Blank has-many relationship SHOULD be represented with an array value.

#### CRUD

A request to create an individual resource MUST include a single primary resource object. For a request to create multiple resources, they should include a collection of primary resource objects.

Update--must include a single top-level resource object. Updating multiple--send a PUT request to the URL that represents the multiple individual resources.
