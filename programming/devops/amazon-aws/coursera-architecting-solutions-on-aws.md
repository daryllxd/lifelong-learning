# Reading list

- Lambda archi and tips - [https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html](https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html)
    
- Before: Lift and shift
    

# Week 1 - Any Company Online

**Summary of the AWS Solution Architecture Discussion**

**Context:**

- Any Company Ecommerce is migrating its order service from on-premises to AWS.
- Previous migrations were mostly "lift-and-shift" with minimal refactoring.
- This time, the company wants to rewrite the order service to be cloud-native and take full advantage of AWS features.

**Current System:**

- Sells cleaning products globally via a website and app (retail and wholesale).
- Orders from all channels are processed by an on-premises order service.
- The order service validates, authenticates, processes, and stores orders in a MySQL database.
- Downstream services (inventory, fulfillment, accounting) are already on AWS.
- Payment processing is handled externally before orders reach backend services.

**Pain Points & Goals:**

- The current order service is monolithic, tightly coupled, and hard to scale.
- Overloads and crashes cause slowdowns, failed orders, and inconsistent data.
- Scaling on-premises is difficult, especially with spiky demand (e.g., during sales).
- Maintaining MySQL for minimal data is time-consuming.
- The company wants:
    - Managed, automatic scaling (especially for spiky workloads)
    - Decoupled architecture for resilience (so one failure doesn’t cascade)
    - Simpler, managed database (less operational overhead)
    - Unified, easy-to-implement logging and monitoring
    - Cost and performance optimization

**Requirements for the New Solution:**

- Serverless/cloud-native architecture where possible
- Web backend and managed database on AWS
- Decoupling of order processing from downstream calls
- Easy, unified logging and monitoring
- Cost-effective and high-performance
- Ability to handle unpredictable, spiky traffic

**Next Steps:**

- AWS Solutions Architect (Morgan) will design a solution based on these requirements, likely incorporating serverless technologies and managed AWS services.
- Further follow-up may be needed for additional details.

---

**In short:**

Any Company Ecommerce wants to migrate and refactor their order service to AWS for better scalability, resilience, and manageability, using cloud-native/serverless solutions, managed databases, and unified monitoring, while optimizing for cost and performance.

---

Answer from Perplexity: [pplx.ai/share](https://www.perplexity.ai/search/pplx.ai/share)

## Compute on AWS

When you use Lambda, you are responsible only for your code, which can make it easier to optimize for operational efficiency and low operational overhead. Lambda manages the compute fleet, which offers a balance of memory, CPU, network, and other resources to run your code. Because Lambda manages these resources, you can’t log in to compute instances or customize the operating system on the provided runtimes.

- AWS Elastic Beanstalk is a service that you can use to deploy and scale applications on Amazon EC2. You retain ownership and full control over the underlying EC2 instances.

## **Amazon API Gateway**

- API Gateway handles all the tasks involved in accepting and processing up to hundreds of thousands of concurrent API calls, including traffic management, CORS support, authorization and access control, throttling, monitoring, and API version management. API Gateway has no minimum fees or startup costs. You pay for the API calls you receive and the amount of data transferred out and, with the API Gateway tiered pricing model, you can reduce your cost as your API usage scales.

## ECS

- Serverless by default with AWS Fargate: Fargate is built into Amazon ECS, and it reduces the time you need to spend on managing servers, handling capacity planning, or figuring out how to isolate container workloads for security. With Fargate, you define your application’s requirements and select Fargate as your launch type in the console or AWS Command Line Interface (AWS CLI). Then, Fargate takes care of all the scaling and infrastructure management that’s needed to run your containers.

## Continue reading - [https://www.coursera.org/learn/architecting-solutions-on-aws/supplement/Gfcpu/databases-on-aws](https://www.coursera.org/learn/architecting-solutions-on-aws/supplement/Gfcpu/databases-on-aws)

## Event-Driven Architectures on AWS

Event-driven architectures have three key components: event producers, event routers, and event consumers. A producer publishes an event to the router, which filters and pushes the events to consumers. Producer services and consumer services are decoupled, which means that they can be scaled, updated, and deployed independently.

![[CleanShot 2025-05-31 at 12.18.35.png]]

- We recommend EventBridge when you want to build an application that reacts to events from software as a service (SaaS) applications or AWS services. EventBridge is the only event-based service that integrates directly with third-party SaaS AWS Partners. EventBridge also automatically ingests events from over 90 AWS services without requiring developers to create any resources in their account.
    - Serverless event bus service
- SNS
    - Simpler to use, clients can subscribe to the topic and receive published messages.
- DynamoDB stream - DynamoDB Streams captures a time-ordered sequence of item-level modifications in any DynamoDB table, and stores this information in a log for up to 24 hours. Applications can access this log and view the data items as they appeared, before and after they were modified, in near-real time.E

## When to Use Amazon SNS

- Broadcasting notifications to multiple subscribers (fan-out)
- Real-time alerts to email, SMS, mobile, or HTTP endpoints
- Simple pub/sub messaging with minimal routing/filtering needs[4](https://www.nops.io/blog/aws-sqs-vs-sns-vs-eventbridge/)[6](https://dev.to/dhoang1905/sns-vs-sqs-vs-eventbridge-choosing-the-right-aws-messaging-service-k6j)

## When to Use Amazon EventBridge

- Complex event routing and filtering
- Integrating AWS services and SaaS providers
- Event-driven workflows, cross-account or cross-service event sharing
- Scenarios requiring event replay, schema registry, or advanced transformation

## Decoupling AWS Solutions

![[CleanShot 2025-05-31 at 12.18.11.png]]

- Right now, we have a synchronous model - where the user submits their order to the order service, the service accepts and validates the order, process the order, stores it in a database, and then calls the downstream services for inventory, fulfillment, and accounting before it responds to the user.
- I'm going to recommend to our customer that they move to an asynchronous architecture, where the request would come in, API Gateway would accept and validate the request, and then, from there, instead of sending the request directly to Lambda, it would send it to storage first. This is following a storage-first pattern, which is used to reduce API latency. This is how it works.
- API Gateway handles tasks like authentication, validation, and payload transformation, reducing backend workload and latency by processing requests closer to the client. It also directly integrates with AWS services such as DynamoDB, SQS, and SNS, enabling operations without needing additional backend code like Lambda functions.
- SQS is a supported event source by AWS Lambda, so this would work pretty seamlessly from an integration standpoint. I think that both of these options seem great. They're both decoupling the API from the backend logic, which would help with this latency issue. Both options also increase resilience, so that if there was a large scaling event, even if Lambda is scaled up to any limits set by our customer, the orders would be stored somewhere waiting to be processed. So, no orders would be dropped at any point. Both options are also serverless, which is important for our customer, who wants to reduce operational overhead and cost, and also wants to optimize for performance efficiency.

## SQS queue

![CleanShot 2025-05-26 at 22.35.39.png](attachment:6a482e88-9fc0-4e6c-87cd-bb41767fe431:CleanShot_2025-05-26_at_22.35.39.png)

- Either Standard or FIFO.
- SNS just gets processed directly.

## Decoupling Solutions on AWS

- Moving from synchronous to asynchronous: order is first stored, and then processed shortly after.

A loosely coupled architecture minimizes the bottlenecks that are caused by synchronous communication, latency, and I/O operations. Amazon Simple Queue Service (Amazon SQS) and AWS Lambda are often used to implement asynchronous communication between different services.You should consider using this pattern if you have the following requirements:

- You want to create loosely coupled architecture.
- All operations don’t need to be completed in a single transaction, and some operations can be asynchronous.
- The downstream system can’t handle the incoming transactions per second (TPS) rate. The messages can be written to the queue and processed based on the availability of resources.

<aside> 💡

**A disadvantage of this pattern is that the actions of business transaction are synchronous.** Even though the calling system receives a response, some part of the transaction might still continue to be processed by downstream systems.

</aside>

### SQS

- Visibility timeout: The length of time that a message received from a queue (by one consumer) won't be visible to the other message consumers.
- Message retention period: The amount of time that Amazon SQS retains messages that remain in the queue. By default, the queue retains messages for 4 days. You can configure a queue to retain messages for up to 14 days.
- Delivery delay: The amount of time that Amazon SQS will delay before it delivers a message that is added to the queue. For more information, see [Amazon SQS delay queues](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-delay-queues.html).
- Maximum message size: The maximum message size for the queue.
- Receive message wait time: The maximum amount of time that Amazon SQS waits for messages to become available after the queue gets a receive request.
- Enable content-based deduplication: Amazon SQS can automatically create deduplication IDs based on the body of the message.
- Enable high throughput FIFO: This feature enables high throughput for messages in the queue. Choosing this option changes the related options (deduplication scope and FIFO throughput limit) to the required settings for enabling high throughput for FIFO queues.
- Redrive allow policy: This policy defines which source queues can use this queue as the dead-letter queue.

<aside> 💡

**When to use:** Use short polling when your application needs immediate responses, such as in time-sensitive or high-throughput scenarios where waiting is not acceptable. This reduces the number of empty responses and API calls, lowering costs and improving efficiency.

**When to use:** Long polling is generally recommended for most SQS use cases, especially when cost optimization and efficient message retrieval are priorities. It is ideal when messages arrive sporadically or when minimizing API requests is important[2](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/best-practices-using-appropriate-polling-mode.html)[3](https://stackoverflow.com/questions/51475944/is-sqs-short-polling-ever-preferable-to-long-polling)[5](https://aws.plainenglish.io/132-short-polling-vs-long-polling-which-one-is-best-for-cost-optimization-and-in-sqs-b6f1d34c354b).

</aside>

## Week Wrap-up

- DAX/DynamoDB Accelerator so it’s microsecond latency.
- You can also remodel your table with the indexes. You can test with DAX and without DAX.
- Lambda - tweaking - you can use AWS Lambda Power Tuning, so you can find the optimal memory and CPU allocation.
- Lambda layers - code reused across multiple lambda functions.
- You can declare objects outside of Lambda.

# Week 2 - Data Analytics

## AWS Data services

- S3 use cases
    - Archive data at the lowest cost - Glacier.
    - Run cloud-native applications: Build fast, powerful, mobile and web-based cloud-native applications that scale automatically in a highly available configuration, such as static websites that use the client side for coding.
    - Build a data lake: Run big data analytics, artificial intelligence (AI), machine learning (ML), and high performance computing (HPC) applications to unlock data insights.
    - Back up and restore critical data: Meet Recovery Time Objectives (RTO), Recovery Point Objectives (RPO), and compliance requirements with the robust replication features of Amazon S3.
- Glacier - The Amazon S3 Glacier storage classes are purpose-built for data archiving. They are designed to provide you with high performance, retrieval flexibility, and low-cost archive storage in the cloud. All S3 Glacier storage classes provide virtually unlimited scalability and are designed for 99.999999999 percent (11 nines) of data durability.
- Lake Formation - AWS Lake Formation is a service that you can use to set up a secure data lake in days. A data lake is a centralized, curated, and secured repository that stores all your data, both in its original form and prepared for analysis. You can use a data lake to break down data silos and combine different types of analytics to gain insights and guide better business decisions.

### Data Analytics

- Amazon Athena is an interactive query service that you can use to analyze data in Amazon S3 by using standard Structured Query Language (SQL). Athena is serverless, so you don’t need to manage infrastructure, and you pay only for the queries that you run.
- EMR
    - Run large-scale data processing and what-if analysis by using statistical algorithms and predictive models to uncover hidden patterns, correlations, market trends, and customer preferences.
    - Extract data from various sources, process it at scale, and make the data available for applications and users.
- **Amazon OpenSearch Service -** You can use Amazon OpenSearch Service to perform interactive log analytics, real-time application monitoring, website search, and more.

### Data Movement

- With Amazon Kinesis, you can collect, process, and analyze real-time, streaming data so that you can get timely insights and react quickly to new information. Amazon Kinesis offers key capabilities to cost-effectively process streaming data at virtually any scale, along with the flexibility to choose the tools that best suit the requirements of your application.
- AWS Glue - AWS Glue is a serverless data integration service that you can use to discover, prepare, and combine data for analytics, machine learning, and application development. AWS Glue provides capabilities that are needed for data integration so that you can start analyzing your data and using your data in minutes instead of months.
- AWS Database Migration Service (AWS DMS) helps you migrate databases to AWS quickly and securely. The source database remains fully operational during the migration, which minimizes downtime to applications that rely on the database. AWS DMS can migrate your data to and from the most widely used commercial and open-source databases.

### **Predictive analytics and machine learning**

- SageMaker can be used for any generic ML solution. You can use it to build, train, and deploy ML models for virtually any use case with fully managed infrastructure, tools, and workflows. SageMaker requires a learning curve to use, but it’s a managed serverless service that many people can use to innovate with ML through a choice of tools—such as integrated development environments (IDEs) for data scientists and no-code interfaces for business analysts.
- With Amazon Rekognition, you can automate image and video analysis by adding pretrained or customizable computer vision API operations to your applications without building ML models and infrastructure from scratch.
- Amazon Comprehend is a natural-language processing (NLP) service that uses ML to uncover valuable insights and connections in text, which is instrumental for a data analytics solution.

## Amazon S3 Cross-Region Replication and Object Lifecycle

- With S3 Cross-Region Replication (CRR), you can replicate objects—and their respective metadata and object tags—into other AWS Regions for reduced latency, compliance, security, disaster recovery, and other use cases.
- Use cases
	- Compliance - Maybe you need to store data at greater distances
	- Latency performance - for people in different geographic zones
	- Regional efficiency - If you have compute clusters in two or more AWS Regions that analyze the same set of objects, you might choose to maintain object copies in all of those AWS Regions.

### S3 Lifecycle
- You can add rules in an S3 Lifecycle configuration to tell Amazon S3 to transition objects to another Amazon S3 storage class. For more information about storage classes, see. Some examples of when you might use S 3 Lifecycle configurations in this way include the following:
	- When you know that objects are infrequently accessed, you might transition them to the S 3 Standard-IA storage class.
	- You might want to archive objects that you don't need to access in real time to the S 3 Glacier Flexible Retrieval storage class.

- **S3 Intelligent tiering** 
	- Designed to deliver automatic storage cost savings when data access patterns change, without performance impact or operational overhead. 
	- S3 Intelligent-Tiering is designed to optimize storage costs by automatically moving data to the most cost-effective access tier when access patterns change.
	- **NOT FREE**, a small monthly object monitoring and automation charge.
![[Pasted image 20250531122949.png]]

### Amazon S3 Glacier storage classes
![[Pasted image 20250531123010.png]]
- S3 Glacier Instant Retrieval delivers the lowest cost storage, up to 68% lower cost (than S3 Standard-Infrequent Access), for long-lived data that is accessed **once per quarter and requires millisecond retrieval.**
	- It is designed for rarely accessed data that still needs immediate access in performance-sensitive use cases like image hosting, online file-sharing applications, medical imaging and health records, news media assets, and satellite and aerial imaging.
	- S3 Glacier Instant Retrieval offers the high durability, high throughput, and similar low latency of S3 Standard-IA, with a lower per-GB storage price and slightly higher per-GB retrieval price. S 3 Glacier Instant Retrieval is designed for 99.999999999% (11 9 s) of data durability and 99.9% availability by redundantly storing data across multiple physically separated AWS Availability Zones in a given year.
- S3 Glacier Flexible Retrieval delivers low-cost storage, up to 10% lower cost (than S3 Glacier Instant Retrieval), for archive data that is accessed **1-2 times per year** and is retrieved asynchronously.
	- S3 Glacier Flexible Retrieval is the ideal storage class for archive data that does not require immediate access but needs the flexibility to retrieve large sets of data at no cost, such as backup or disaster recovery use cases.
	- It is an ideal solution for backup, disaster recovery, offsite data storage needs, and for when some data needs to occasionally retrieved in minutes, and you don’t want to worry about costs. S3 Glacier Flexible Retrieval is designed for 99.999999999% (11 9s) of data durability and 99.99% availability by redundantly storing data across multiple physically separated AWS Availability Zones in a given year.
- S3 Glacier Deep Archive delivers the lowest cost storage, up to 75% lower cost (than S3 Glacier Flexible Retrieval), for long-lived archive data that is accessed less than once per year and is retrieved asynchronously.
	- At just **$0.00099 per GB-month** (or $1 per TB-month), S3 Glacier Deep Archive offers the lowest cost storage in the cloud, at prices significantly lower than storing and maintaining data in on-premises tape or archiving data off-site. S3 Glacier Deep Archive is a cost-effective and easy-to-manage alternative to tape. It is designed for customers — particularly those in the financial services, healthcare, media and entertainment and public sector — that retain data sets for 7-10 years or longer to meet customer needs and regulatory compliance requirements. S3 Glacier Deep Archive is designed for 99.999999999% (11 9s) of data durability and 99.99% availability by redundantly storing data across multiple physically separated AWS Availability Zones in a given year.