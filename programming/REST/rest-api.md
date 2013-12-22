## [Best Practices for Designing a Pragmatic RESTful API](http://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api)
- The key principles of REST involve separating your API into logical resources. These are manipulated using HTTP requests where the method has specific meaning.
- The great thing about REST is that you leverage existing HTTP methods to implement significant functionality on a single /tickets endpoint.
- Keep the URL format consistent and use a plural. Make things easier to pluralize.
- For relations, you can logically map the tickets as this
GET /tickets/12/messages: messages for ticket 12
GET /tickets/12/messages/5: retrieves message 5 for ticket 12
POST tickets/12/messages: creates a message for ticket 12
- Always use SSL.
- Limit fields like this:
GET /tickets?fields=id, subject,customer_name,updated_at&state=open&sort=-updated_at
- In case of a POST that resulted in a creation, use an HTTP 201 status code and include a Location header that points to the URL of the new resource.
- No more XML, just use JSON.
- JavaScript coding standard is camelCase but most popular JSON APIs use snake_case.
- GET requests should not change data on the server!
- Errors: API should provide a useful error message in a known consumable format.

		200 OK: Successful GET, PUT, PATCH, DELETE, POST with no creation.
		201 Created: POST that results in a creation.
		204 No Content: Successful request that won’t return a body (DELETE)
		400 Bad Request: Request is malformed
		401 Unauthorized
		403 Forbidden: 
		404 Non-existent resource is requested

## [API Anti-Patterns: How to Avoid Common REST Mistakes](http://blog.programmableweb.com/2010/08/13/api-anti-patterns-how-to-avoid-common-rest-mistakes/)
- Don’t tunnel everything throught GET.
- Don’t ignore response codes.
- Don’t ignore caching.
- Don’t ignore hypermedia.
- Don’t ignore MIME types.
