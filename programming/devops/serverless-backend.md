# Understanding Serverless Architecture Advantages and Limitations
[Reference](https://dzone.com/linkshttps://dzone.com/articles/understanding-serverless-architecture-advantages-a)

- Serverless architecture: your backend logic will run on some third party vendor's server infrastructure which you don't need to worry about.
- `BaaS`: Back-end logic as a service.
- `FasS`: Function-as-a-Service, like AWS Lambda and MS Azure Functions. With FaaS, app devs can implement their own backend logic and run them within the serverless framework. Running, scalability, reliability, security will be taken over by this framework.
- Things to think about:
  - Vendor locking.
  - Higher latency for initial request.
  - If server instances come and go, maintaining state of an app is hard.
  - Not suitable for long-running business processes since these function instances will get destroyed after a fix time duration.
  - Max transactions per second.

# The Benefits of a Serverless API Backend
[Reference](https://nordicapis.com/the-benefits-of-a-serverless-api-backend/)

- This is an event-driven setup without permanent infrastructure.
- Servers are auto-created on a per-need basis to the demands of your app.
- So less time on operations:
  - No more over capacity issues.
  - Servers are autoscaling.
  - You don't pay for idle time.
  - Consistent reliability and availability.
  - No load balancing, no security patches.
- Traditional Web Requests:
  - Apache/NGINX listen for events.
  - Convert this to a web server gateway.
  - Sent to application.
  - Web server sends response back.
  - Back to listening.
- Serverless Web Request:
  - Request comes in through an API gateway.
  - API request is mapped to a dictionary using Velocity Template Language.
  - A server is created.
  - The server then converts the dictionary to a standard Python WSGI and feeds it into the application.
  - The application returns it, and it passes through the API Gateway.
  - The server is destroyed.
- Why serverless?
  - Scalability.
  - Cost savings. Lambda charges $0.0000002 per request. Lambda also offers 1M free requests per month.
  - Good for microservices, APIs, IoT, chatbots.
- Designing Event-Driven Serverless Applications
  - Because code is only going to execute in response to events, what can we define as our event sources?
  - Ex: If someone uploads an image, you can use a serverless architecture to have a thumbnail services execute a response in an asynchronous and non-blocking way.
  - Ex: Support notifications like receiving an email, text, or Facebook message could be interpreted as events. Rather than polling for new emails to come in, an action could be executed specifically in response to these.
  - Ex: Database activity could be used as an event trigger. Treat the API as the primary source of truth in your application!
