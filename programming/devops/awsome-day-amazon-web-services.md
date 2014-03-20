Denny: dennyd@amazon.com

Is our case a good use case for EC2/S3?
When do we know when to ues the scaling, how do we compute this?
Can we use Heroku with this?
Can we use Digital Ocean with this?

@AWSomeDayMNL

S3 - place where you store the files. Glacier - archiving. All of these automations are built in inside the console.

Price: All data info is free. First 10GB of space is free. You only 

Uploading to S3, it is free. The outgoing is where a price is charged.

Used Capacity: $0.09/GB/month, pricing for US East.

Amazon Simple Monthly Calculator.

Singapore: $0.43/10 GB/month. You can see the shit, too.

Reduced redundancy.

Glacier: Low cost storage service that provides secure and durable storage for data archiving and backup. Optimized for data that is not accesssed that much. These take 3-5 hours to get.

Amazon S3: 100 "bucket" limit, no limit in size.

S3 is not EBS (elastic block store).

EBS volume: Used for persistent storage. Off-instance block storage that persists independently. Volmes behave like unformatted block devices for Linux.

EBS pricing: $ 0.10/GB/month for standard EBS volumes. You also pay for the computer.

Amazon EBS: File system, you talk about it. It's a disk drive.

S3: Object store. YOu talk to it from the operating system. Use case: Write once, read many.

AWS Storage Gateway: Connnect an on-premises software appliance with cloud-based storage.

Amazon Import/Expert services: You can literallly transfer your hard drive to Amazon lol.

S3 demonstration: Create a bucket, choose location, then it is literally a hard rive or something. Policies are created via policy. Static web hosting. Enable logging. Life cycle policies on if you move to Glacier or you delete the files after. Version control.

With the API, you choose the platform where you are working on. Developer guide, admin guide, API guide, CLI guide.

EBS volume creation. Snapshot etc.

## Computer Services and Networking

Virtual servers are EC2 instances. Virtual disks are EBS disks.

Elastic Compute Cloud - EC2. They can be off different OS, or different sizes.

Management console -> do the thing.

Facts about Amazon EC2: You choose the capacity, OS, region. Scale capacity, reduce time rquired to obtain and boot new instances, resizable compute capacity.

AMI (Amazon Machine Image) is a pre-configured OS. Patching the OS is still your responsibility. Use Puppet or Chef to update the OS. You also choose where to launch this server. This is like the image of the server. But you can have your own private images for the application, the server, etc.

Another feature is the auto-scaling and AMI is important so you know where you scale the server from.

In a VPC (isolated enviornment) you get to choose where you launch the subnet.Q

EC2 instance is charged by the hour.

"How much memory do I need, and how much OS do I need?"

- Compute Units: 1 GHz of a Xeon processor.
- Memory: GB.

- Micro instnace: 2Ghz, 1GB.
- Standard: 2Ghz-32Ghz, 2GB-32GB.
- We have memory intensive, we have CPU intensive.
- Cluster instance, high-IO instance (SSD).

Intel: HUGI (Hurry Up and Go Idle). Intel AES-NI: Intel procesors with encryption.

AVX: Parallel/CPU intensive.

Reserved instances: Get on a contract, and say "I'm going to use this instance for the next X years." Cheaper XD. Predictable workload = reserved instance.

Spot instance: Some cheap compute thingie for a short amount of time. Used for big data, simulations, etc...

#### Tiers

Reserved instance: 1-3 terms, light/medium/heavy, pay low up-front free, receive significant hourly discount, helps ensure compute capacity is available when needed.

On-demand:

Spot:

*Free tier ready! XD*

For reliability's sake, you have to store the image on S3.

Internet gateway, you can choose to connect your EC2 to the Internet via a gateway or not.

Public EC2: Inbound only, TCP, UDP, ICMP only, assigned at launch, modify anytime.

Virtual cloud: Inbound and outbound rules, any type of protocol, it can be assigned or removed at anytime, and it can be modified anytime.

Elastic MapReduce: Hosted Hadoop environment. YOu can spin up a cluster of servers to analyze your big data.

Auto-scaling: It helps you to add more servers based on certain metrics, load balancing, etc. They know automatically when to add or remove servers depending on the demand. This has a GUI hehehe. It can also launch servers in multiple availability zones. Lastly, you can configure actions.

It's connected, cloudwatch to watch for auto scaling, then there is a elastic load balance.

Security group = security around the EC2 instance. Second level: NACLs. Third: VPC (private isolated space).

#### Other services:
- Virtual private servers (TLDR)
- DNS servers (Route 53) (TLDR)
- Elastic load balancing services: ELB can be put in front of the web tier and distribute traffic. It can also do a health check on the servers.
- Sticky sessions: when a user connects to a web server, it will always stay on that server.
- Security-wise, it can also be a line of defense to block shit.

## AWS Managed Services & Databases

#### Relational Database Services
- Easy to set up, operate, and scale. These can also be done from an API.
- RDS is a database, but it's managed for you.
- Redshift: Creating a cluster of stuff.

#### DynamoDB (Did not listen).

#### Caching
- Either `redis` or `memcached`.

#### Other stuff
- Kinesis: Real-time analytics.
- Workspaces: "I want a desktop on the cloud."
- Appstream service: Streams apps from the cloud.
- Cloud trail: Helps you collect logs from different sources.

## AWS Identity and Access Management
- Create and manage AWS users and groups and user permissiosn to allows and deny their permissions to AWS resources.

## Amazon Elastic Beanstalk
- You don't know how popular the application is going to be. The Elastic Beanstalk will.

## Cloud Formation
- There are samples online. The templates are JSON-based. So you are able to make your application online already.
- Curiosity's image processing service runs on AWS simple workflow services.
