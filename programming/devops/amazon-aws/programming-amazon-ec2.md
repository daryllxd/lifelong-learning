## Programming Amazon EC2

- S3: Simple Storage Service.
- SQS: Simple Queue Service.
- EC2: Elastic Compute Cloud.

If your system gets too big, the easiest solution is to break it up into smaller pieces that have as few dependencies on each other as possible. CORBA: Component-based software engineering.

Message passing--if you break up a big system into smaller components, they probably still need to exchange some information. They can pass messages to each other, and the order in which these messages are passed in often important.

SQS: Developers can move data between distributed components of their applications that perform different tasks, without losing messages or requiring each component to be always available.

S3: Allows you to store objects up to 5TB, is designed to provider 99.999% durability and 99% availability of objects over a given year.

EC2: AWS used XEN virtualization to create a whole new cloud category, Infrastructure as a Service. This was the first time you can buy one hour of computing power in the form of Linux.

By offering computing capacity per hour, AWS created elasticity of infrastructures from the point of view of the application developer. Event-driven websites can scaled up just before and during the event and can run at low capacity the rest of the time.

SimpleDB/NoSQL: No table joins, but it's faster to get all the information of a single user.

Elastic Load Balancing/ELB: When the workload is too much for one instance, you can start some more. Auto scaling--you can define rules for growing and shrinking a group of instances.

Elastic IP addresses: If the instance dies or you replace it, you can reassign the IP address.

Elastic Block Store: You can "carry around" your disks from instance to instance.

Image: A read-only copy of the initial state of your instance. Ex: Ubuntu + Apache + Ruby + your web application.

CloudFront:
