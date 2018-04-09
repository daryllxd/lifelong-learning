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

# What I Learned About Building Serverless Apps
[Reference](https://venturebeat.com/2017/04/30/what-i-learned-about-building-serverless-apps/)

- There is a lot of configuration involved with each Lambda function:
  - Uploading the code
  - Configuring the Lambda function
  - Creating the API endpoint
  - IAM role
  - Config HTTP request and HTTP response
  - Staging endpoint
  - Deploying
  - Same with microservice
- Few documentation.
- Find balance with tight cohesion/loose coupling.
  - Non-serverless: applications were assumed to exist within a larger cohesive application with shared memory and a call stack.
  - Few design patterns.
  - Do not expose every function as a Lambda, slow since every function invocation will be an out-of-process call.
- Workflow.
  - There is no "local" development environment.
  - Each process scope of each Lambda function is isolated, yet the functions exist within the larger context of a larger parent application.
  - Separate directory for the shared code outside the directories containing the code for each Lambda function.
  - Bash script to copy shared code from the parent directory into each of the Lambda function directories.
  - Script also uses the AWS CLI to update the Lambda functions in AWS.
- Automate serverless infrastructure with CloudFormation.
  - This creates the full application stack, including the DynamoDB database and all of the API Gateway and Lambda configurations.
  - You need a CloudFormation resource for each Lambda and its corresponding API Gateway endpoint.
  - Security settings; there are some settings that they use.
- Worth it? It streamlines work AFTER development, not BEFORE. The value is building scalable and highly-available applications with minimal maintenance or operational support.

# Use Cases for AWS Lambda
[Reference](https://www.contino.io/insights/5-killer-use-cases-for-aws-lambda)

- S3 hosted static websites.
  - Host the web front-end on S3.
  - Cloudfront caching.
  - Send request to Lambda functions via API Gateway HTTPS endpoints.
  - Fixed cost = the database service.
- Log analysis.
  - Use it to check log files from Cloudtrail or Cloudwatch, then send out notifications via SNS.
- Automated backups.
- Process uploaded S3 objects (making thumbnails).
- Filtering and transforming data on the fly (moving from S3, Redshift, Kinesis, database).
- Limitations:
  - For the runtime, disk space is limited to 512 MB.
  - Request body: 128KB, response payload: 6MB.

# The hidden costs of serverless
[Reference](https://medium.com/@amiram_26122/the-hidden-costs-of-serverless-6ced7844780b)

- Serverless is more than pay-per-trigger.
  - API Gateway, CloudWatch = costs.
- Code maintenance: more lines of code.
- Cold starts.
- An AWS Lambda function with 512 MB of memory costs $0.030024 compared to an On-Demand server with the same stats costing $0.0059. So when your CPU is being fully utilized all the time, running on Serverless may not be cost-efficient for your workload.
- API Gateway = huge chunk of Serverless costs when you connect to a lot of APIs.
- Other vendors: IBM OpenWhisk, Azure Functions, GCP Functions.
