## A Cloud Guru

- New exam:
  - Design resilient architectures.
  - Define performant architectures.
  - Specify secure applications and architectures.
  - Design cost-optimized architectures.
  - Define operationally-excellent architectures.
  - 80 questions, results within 3 months, $75, valid for 2 years.
- Focus: AWS white papers.

### History of AWS

- 2003: Paper on what Amazon's internal infrastructure should look like,
- 2004: SQS.
- 2006: AWS.
- 2007: 180K developers on the platform.
- 2010: All of amazon moved over.
- 2013: Certification launched.
- 2015: Revenue: $6B USD.
- 2017: AI/VR services.

### AWS: The 10K Foot Overview.

- AWS Global Infrastructure
  - 16 regions, 44 availability zones. 6 more regions/17 more AZ's for 2018.
  - You will never be tested on numbers, etc. No rote learning.
  - Region: geographical area.
  - Availability zone: data center. They can survive natural disasters. At least 2 per region.
  - NA: US E (N Virginia), US W (Oregon)...
  - Edge locations: endpoints for AWS which are used to caching content. Typically, this consists of CloudFront. These are cached from physical locations close to the request.
- Compute:
  - EC2: Virtual machines in the AWS platform.
  - EC2 container services: where you manage Docker containers at scale.
  - Elastic Beanstalk: These provisions scalers, load balancers, etc, so focus just on the code.
  - Lambda: You upload and you wait for it to execute. Nothing to manage. All you worry about is your code.
  - Lightsail: Amazon's VPS service. Provision you a server, a fixed IP address you can log in the server from, and it will give you SSH access/admin panel.
  - Batch: Batch computing in the cloud.
- Storage:
  - S3: Simple Storage Service, object-based, you have buckets, upload these in the cloud.
  - EFS: Elastic File System, network attached storage. We can put files in EFS and mount them onto virtual machines.
  - Glacier: Data archival.
  - Snowball: a way to bring a large amount of data into the data center. Like literally a physical box.
  - Storage gateway: Virtual machines that can replicate themselves onto the AWS cloud.
- Databases:
  - RDS: Relational database service. Anything.
  - DynamoDB: Non-relational database.
  - Elasticache: Caching. Stuff like "top 10 products".
  - Red Shift: Data warehousing/business intelligence. Complex queries.
- Migration
  - AWS Migration Hub: Tracking service.
  - Application Discovery Service: What app you have and what dependencies you need.
  - Database Migration Service: Easy way to migrate data.
  - Server Migration Service: Moves your physical servers to the cloud.
  - Snowball.
- Network/Content Delivery
  - VPC: A virtual data center. You can configure out things like firewalls, etc.
  - CloudFront: CDN.
  - Route 53: DNS service.
  - API Gateway: A way to create your own APIs for.
  - Direct Connect: Running a direct line from your data center to Amazon's VPC.
- Developer Tools
  - CodeStar: Project management/continuous delivery.
  - CodeCommit: Source control.
  - CodeBuild: CI?
  - CodeDeploy: Deployment service to EC2 or Lambda.
  - CodePipeline: CD service/automate.
  - X-Ray: Debugging service.
  - Cloud9: IDE to develop code in the AWS console.
- Management Tools:
  - CloudWatch.
  - CloudFormation. A way to script infrastructure. Turning a template and turning it to code. (Ansible?)
  - CloudTrail: A way to log every single change to the AWS environment. On by default, and stores records for one week.
  - Config: Monitors the configuration of the AWS environment.
  - OpsWorks: Like EBS, uses Chef and Puppet.
  - Service Catalog: A way of managing IT services (individual OSes, disks, etc.) Used for compliance. (Not in exam)
  - Systems Manager. Used for managing resources. If you want to roll patches across instances, you can use this. (Not in exam)
  - Trusted Advisor. Advisor: gives across multiple disciplines. Tells you if you aren't using AWS as much as you can.
  - Managed Services: Someone to manage the cloud.
- Media Services
  - Elastic Transcoder: Takes the video and resizes it to look good at all devices.
  - MediaConvert, MediaLive, MediaPackage, MediaStore (on-demand video contnet), MediaTailor.
- Machine Learning
  - SageMaker: Deep learning.
  - Amazon Comprehend: Sentiment analysis.
  - DeepLens: An aware camera. Doing it on the camera itself, not an AWS instance.
  - Lex: Powers the Alexa service.
  - Machine Learning: Throw a data set and analyzes results.
  - Polly: Takes text and turns it into speech.
  - Rekognition: Upload a file and it tells you what's in the file.
  - Amazon Translate: Just like Google Translate.
  - Amazon Transcribe: Speech recognition.
- Analytics
  - Athena: Can run an SQL query in your S3 buckets?
  - Elastic Map-Reduce: Used for processing services.
  - CloudSearch
  - ElasticSearch
  - Kinesis: Ingesting large amounts of data into AWS.
  - Kinesis Video Streams.
  - QuickSight: BI tool.
  - Data Pipeline.
  - Glue: Used for ETL (Extract, Transform, Load).
- Security/Identity/Compliance
  - IAM: Identity Access Management.
  - Cognito: A way to do device authentication. Then you can use the service to request temporary access for mobile devices.
  - GuardDuty: Monitors malicious activity in your account.
  - Inspector: An agent on the EC2 machine and you can run tests with it.
  - Macie: Scans S3 buckets and looks for weird shit.
  - Certificate Manager: Manages SSL keys.
  - CloudHSM: (Hardware security model) Dedicated bits of hardware where you can store keys to access EC2 instances.
  - Directory Service. Integrates MS service with AWS service.
  - WAF (web application firewall): A layer 7 firewall, stops things like XSS, SQL injection.
  - Shield: DDOS mitigation.
  - AWS artifact: For audit/compliance, PCI reports.
- Mobile services:
  - Mobile Hub: Management console.
  - Pinpoint: A way of using targeted push notifications.
  - AWS AppSync: Updates for desktop/mobile/users when they reconnect.
  - Device Farm: A way of testing the app on real device.
  - Mobile analytics.
- AR/VR:
  - Sumerian: the language to write things down. Uses a common set of tools.
- Application Integration
  - Step Functions: A way to manage your lambda functions.
  - Amazon MQ: Message queues.
  - SNS (notification service)/SQS (decoupling infrastructure, creates a queue for things/requests)/SWF (workflow job, can have human beings as a component in it).
- Business Productivity
  - Alexa for Business.
  - Chime: recording for business.
  - Work docs: Dropbox for AWS.
  - WorkMail: Like Gmail.
- Desktop & App Streaming
  - Workspaces: Stream to device.
  - AppStream: Actual streaming the app but going to the device.
- Internet of Things
  - Device Management.
  - FreeRTOS: Operating system for micro-controllers.
  - Greengrass.
- Game Development
  - GameLift: Way to launch games?

### Don't Freak Out

- For SA (Solutions Architect) Associate: Infra, compute, storage, database, migration, CDN, management tools, analytics, security/compliance, app integration, desktop/app streaming.
- Developer Associate: Same, but deeper section.

EBS: Designed to run a developer's code on an infrastructure automatically provisioned to host that code.

### IAM/Identity Access Management

- Allows you to manage users and their level of access to the AWS console.
- What does IAM give you?
  - Centralized control of your AWS account.
  - Shared access to your AWS account.
  - Granular Permissions.
  - Identity Federation (including Active Directory, Facebook (whut? Haha), LinkedIn)
  - Multi-factor Authentication.
  - Provide temporary access.
  - Setting up password rotation policy.
  - Integrates with many AWS services.
  - Supports PCI/DSS Compliance.
- Terms:
  - Users/End Users
  - Groups: A collection of users under one set of permissions.
  - Roles. Create them and then assign them to AWS resources.
  - Policies: A document that defines one or more permissions.
- Regions: Some things like Glacier might not be available.
  - So you have a root credential, and a non-root credential.
  - When I go to `daryllxd.signin.aws.amazon.com/console`, I can either sign in as someone with an IAM thingie, or as myself/the root user.
- The access keys you create will only be seen once.

- IAM
  - Root account: The email you used to sign up for AWS.
  - Administrator Access: Same as root.
  - You'll only see the access keys when you start.
  - Example of other access: Just S3 read-only access, Glacier Read Only.
  - You can also create access for specific users or for groups.
  - Things to do:
    - Delete root access keys.
    - Activate MFA on the root account.
    - Create individual IAM users.
    - Use groups to assign permissions.
    - Apply an IAM password policy.
  - Roles:
    - Creating a role so that EC2 can access S3.
- Creating a Billing Alarm
  - CloudWatch, Billing, then set your region to N. Virginia (add notification for all regions), then you can check the email, after confirmation.
- IAM Summary
  - Users, groups, roles, policy documents (these are universal, and are JSON).
  - IAM is universal, it does not apply to regions at this time. The "root account" is simply the account created when you first set up your AWS account. It has complete Admin access.
  - New Users have NO permissions when they are first created.
  - New Users are assigned Access Key & Secret Access Keys. These are not interchangeable.
  - Set up MFA on your root account.
  - Create and customize your own password rotation policies.
- Quiz Questions
  - Power user: all AWS services, except management of groups/users within IAM.
  - Root has: Administrator Access.
  - Users and Policy Documents are configured globally.
  - Setting up an account requires an email address.
  - To secure IAM for both root and new users: Implement MFA for all accounts.

### S3

- S3 is object based-storage (for flat files). (vs blocked based, where you put your operating systems).
- 0 bytes to 5TB. There is unlimited storage.
- Files are stored in Buckets (folders).
- Names must be unique globally.
- URL: It's the `<REGION>.amazonaws.com/<NAME OF BUCKET>`.
- When you upload a file to S3, you will receive an HTTP CODE 200 if the upload was successful.
- Date Consistency Model for S3
  - Read after Write Consistency for PUTS of new Objects. (You get immediate consistency when you write).
  - Eventual consistency for overwrite PUTS and DELETES. (You don't get that when you UPDATE and DELETE).
- Object-based:
  - Key (Literally the name of the object.)
    - If things are stored with the same file names, you can add a salt so the files are stored in different places.
  - Value (Data, made up of a sequence of bytes).
  - Version
  - Metadata.
  - Sub-resources: Access control lists. Torrent.
- 99.9(% availability for S3.
- 99.999999999% durability (11 9's).
- Tiered storage available.
  - Normal (99.99% availability). Designed to sustain the loss of 2 facilities concurrently.
  - S3 - IA (Infrequently Accessed): For Data that is accessed less frequently, but requires rapid access when needed. Lower fee than S3, but you are charged a retrieval fee. Payslips, etc.
  - Reduced Redundancy Storage: Just 99.99% durability and 99% availability of objects. Can be used for thumbnails.
  - Glacier: Very cheap, but used for archival only. 3-5 hours to restore. $0.01 per gigabyte per month.
- Charges
  - Storage
  - Requests
  - Storage Management Pricing.
  - Data transfer (replication)
  - Transfer acceleration: Users upload to edge. Check it out on Google.
- Lifecycle management. Let's say after 30 days, change storage tier of the data.
- Versioning.
- Encryption
- Securing your data using Access Control Lists and Bucket Policies.
- **Read the S3 FAQ before taking the exam.**

- When creating a bucket.
  - By default, objects don't have public access.
  - You can add encryption.
  - You can tag objects in addition to the buckets.
  - Controlling:
    - Stuff.
    - AWS Policy generator (?)
  - Management:
- S3 Buckets
  - Buckets are a universal name space.
  - Uploading an object to S3 receives an HTTP 200 Code.
  - Tiers: S3, S3 - IA (Infrequently accessed), S3 Reduced Redundancy Storage.
  - Encryption
    - Client Side Encryption
    - Server Side Encryption
      - With Amazon S3 Managed Keys
      - With KMS
      - With Customer Provided Keys.
    - Control access to buckets with either a bucket ACL (Access Control List) or Bucket Policies.

- Versioning
  - Can't disable it, you can only suspend it. So storage costs can change often.
  - If you overwrite the object (same name), you can see versions and restore it. You can delete the object, download? You can delete the object, download?
  - Every time a file changes, both versions would be in S3.
  - Version control can be a bad use case for big files.
  - MFA delete: Meaning that people can't accidentally delete tings.
- Exam Tips
  - Stores all versions of an object.
  - Great backup tool.
  - Once enabled, versioning cannot be disabled, only suspended.
  - Integrates with Lifecycle rules.
  - Versioning MFA's Delete capability.

- Cross Region Replication
  - You need versioning to be present on both buckets (source and destination, possible to be in another region).
  - Regions must be unique. (Can't replicate to own region.)
  - If you are using things as a backup, then you can use S3 IA.
  - It's only new objects that can be replicated. You need to use a CLI. They can have just programmatic access, not sign in access.
  - You cannot replicate to multiple buckets or use daisy chain (triplicate?)
  - If this works, you can do `$ aws s3 ls` and `$ aws s3 cp --recursive s3://SOURCE s3:DESTINATION`.
  - Changing public settings: gets replicated.
  - Deleting: the deletion marker is replicated, but if you delete the deletion marker, it won't be replicated.

- Lifecycle management, IA S3, & Glacier Lab
  - Glacier is not available in SG and in Sao Paulo.
  - Actions: Moving to IA, Glacier, and Expire. You can choose the number of days before those happen.
    - IA requires 128KB and 30 days after creation.
    - Glacier: 30 days after IA, if relevant.
    - Permanently Delete.
  - Different action on current version, previous versions, and incomplete multipart uploads.
  - Glacier: Requires 90 days inside before you can actually delete things inside.

---

### Auto-scaling 101

- Load balancer: In the EC2 instance part.
- `service httpd start` to start Apache.

```
#!/bin/bash
yum install httpd -y
yum update -y
aws s3 cp s3://YOURBUCKETNAMEHERE/index.html /var/www/html/
service httpd start
chkconfig httpd on
```

- Auto Scaling Group
- Subnets: It will show your availability zones. AWS will spread the instances across your AZs.
- Health check type: ELB instead of EC2.
- Use scaling policies: when the average of CPU is greater than 90% for 5 minutes, I want to add 1 instance...
- The autoscaler will create a new instance by itself (he terminated the instance and another one came up).
- Delete the auto-scaling group to delete the instances.

### EC2 Placement Groups
[Reference](https://awsinsider.net/articles/2017/06/12/ec2-placement-groups.aspx)
[Reference](https://community.teradata.com/t5/Teradata-Database-on-AWS/What-is-a-Placement-Group/td-p/14827)

- Sometimes, communications between servers are sensitive to latency.
- Placement group members are able to communicate with one another in a way that provides low latency and high throughput.
- When you create a placement group, what you're really doing is creating a capacity reservation for EC2 instances within an availability zone.
- Low-latency, high-throughput communications between placement group members can only occur across the private interfaces, using the private IP addresses.
- Limitations:
  - Not all instances can be launched into a placement group.
  - You can't merge placement groups, and you can't move an instance into a placement groups.

- A logical grouping of instances within a single AZ. Using placement groups enables applications to participate in a low-latency, 10 Gbps network. Placement groups are recommended for applications that benefit from low network latency, high network throughput, or both.
- Can't span across multiple AZs.
- Must be unique name within your AWS account.
- Only certain types of instances can be launched in a placement group (Compute Optimized, GPU, Memory Optimized, Storage Optimized).

### EFS
[Reference](https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html)

- This is simple, scalable file storage for use with Amazon EC2. Storage capacity is elastic.

- Amazon Elastic File System (Amazon EFS) is a file storage service for EC2 instances. EFS is easy to use and provides a simple interface that allows you to create and configure file systems quickly and easily.
- With EFS, storage capacity is elastic, growing and shrinking automatically as you add and remove files, so your applications have the storage they need, when they need it.
- Features
  - Only pay for the storage you use (can reach petabytes).
  - Can support thousands of concurrent NFS (Network File System) connections.
  - Stored across multiple AZ's within a region.
  - Block-based storage, not object-based storage.
- Instances need to be in the same security group as the EFS.
- What he did: provision and install Apache.
- What he did: to go to the mount the EFS to both instances with a script.
- The Load Balancer has its own public IP address?

### AWS Lambda

- Before, you ordered servers. IaaS -> PaaS -> Containerization (Docker, still needed to scale) -> Serverless.
- Literally, all you have to worry is your code, just have event thingies.
- "AWS Lambda is a compute service where you can upload your code and create a Lambda function. AWS Lambda takes care of provisioning and managing the servers that you use to run the code."
  - Event-driven compute service where AWS Lambda runs your code in response to events.
  - Compute service to run your code in response to HTTP requests using Amazon API Gateway or API calls made using AWS SDKs.
  - Ex: Lambda event to save a photo to S3, replicate across S3.
- N Virginia = usually in when stored.
  - Triggers: API Gateway, AWS IOT, Alexa Skills, CloudFront, CloudWatch Events, CodeCommit, S3...
  - User -> API Gateway -> Lambda functions/response.
- Languages supported: Node, Python, C#, and Java.
- Lambda costs: First 1 million requests are free, $0.2 per 1 million of requests.
- Duration: From the time your code begins executing until it returns or otherwise terminates. Max threshold: 5 minutes, so break up those functions.
- Advantages: No servers, continuously scaling, super cheap.
- Amazon Echo: This is Lambda speaking back to you.
- You can actually use this to back up S3 to other buckets.

### Building a Serverless Webpage with API Gateway & Lambda

- A Cloud Guru stack: Angular, API Gateway/Lambda, S3, CloudFront. This is why our courses are cheap.
- Creating:
  - Runtime, Role, Role Name.
  - Then you can create the actual function.
  - Role: AWS Lambda executing and AWS microservice role.
- Polly and Serverless:
  - Client -> Amazon S3 -> Amazon API Gateway -> Lambda function, "New Post", -> Amazon SNS -> Lambda function, "Convert to Audio" -> Amazon Polly, save to S3 bucket, DynamoDB to store the thing, then API Gateway to update the GET Post.
