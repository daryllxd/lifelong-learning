## `$http`

    $http.get('/someUrl')
      .success (data, status, headers, config)
      .error (data, status, headers, config)

Unit tests:

    $httpBackend.expectGET()...

Headers:

    $httpProvider.defaults.headers.common
    $httpProvider.defaults.headers.post
    $httpProvider.defaults.headers.put

Transforming Requests and Responses:

    $httpProvider and $http expose defaults.transformRequest and defaults.transformResponse properties.

Caching: set the request configuration `cache` property to true (to use the default cache) or to a custom cache object built with `$cacheFactory`. When the cache is enabled, `$http` stores the response from the server in the specified cache. The next time the same request is made, the response is served from the cache without sending a request to the server.

