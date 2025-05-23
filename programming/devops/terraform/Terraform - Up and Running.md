# Things to do

- [ ]  Try out Atlantis
- [ ]  I want a Rails app with a load balancer there
    
    [Rails app with load balancer](https://www.notion.so/Rails-app-with-load-balancer-1f3d6f968e2380c5bfa5ef7b45b4f103?pvs=21)
    
- [ ]  Nginx for ^ - https://www.perplexity.ai/search/format-terraform-resource-aws-DHQdXi8mRCKcK3KAtypSyw#5
- [ ]  https://www.reddit.com/r/Terraform/comments/1dgm42q/guide_to_pass_terraform_associate_003_exam/

# Chapter 1: Why Terraform

## What Are the Benefits of Infrastructure as Code?

- **Self-service**
    
    Most teams that deploy code manually have a small number of sysadmins (often just one) who are the only ones who know all the magic incantations to make the deployment work and are the only ones with access to production. This becomes a major bottleneck as the company grows. If your infrastructure is defined in code, the entire deployment process can be automated, and developers can kick off their own deployments whenever necessary.
    
- **Speed and safety**
    
    If the deployment process is automated, it will be significantly faster, since a computer can carry out the deployment steps far faster than a person, and safer, given that an automated process will be more consistent, more repeatable, and not prone to manual error.
    
- **Documentation**
    
    If the state of your infrastructure is locked away in a single sysadmin's head, and that sysadmin goes on vacation or leaves the company or gets hit by a bus, you may suddenly realize you can no longer manage your own infrastructure. On the other hand, if your infrastructure is defined as code, then the state of your infrastructure is in source files that anyone can read. In other words, IaC acts as documentation, allowing everyone in the organization to understand how things work-even if the sysadmin goes on vacation.
    
- **Version control**
    
    You can store your IaC source files in version control, which means that the entire history of your infrastructure is now captured in the commit log. This becomes a powerful tool for debugging issues, because any time a problem pops up, your first step will be to check the commit log and find out what changed in your infrastructure, and your second step might be to resolve the problem by simply reverting back to a previous, known-good version of your IaC code.
    
- **Validation**
    
    If the state of your infrastructure is defined in code, for every single change, you can perform a code review, run a suite of automated tests, and pass the code through static analysis tools-all practices that are known to significantly reduce the chance of defects.
    
- **Reuse**
    
    You can package your infrastructure into reusable modules so that instead of doing every deployment for every product in every environment from scratch, you can build on top of known, documented, battle-tested pieces.
    
- **Happiness**
    
    There is one other very important, and often overlooked, reason for why you should use IaC: happiness. Deploying code and managing infrastructure manually is repetitive and tedious. Developers and sysadmins resent this type of work, since it involves no creativity, no challenge, and no recognition. You could deploy code perfectly for months, and no one will take notice-until that one day when you mess it up. That creates a stressful and unpleasant environment. IaC offers a better alternative that allows computers to do what they do best (automation) and developers to do what they do best (coding).
    

## Tradeoffs

### Configuration Management Versus Provisioning

- As you saw earlier, Chef, Puppet, and Ansible are all configuration management
tools, whereas CloudFormation, Terraform, OpenStack Heat, and Pulumi are all
provisioning tools.
- Although the distinction is not entirely clear cut, given that configuration manage‐
ment tools can typically do some degree of provisioning (e.g., you can deploy a
server with Ansible) and that provisioning tools can typically do some degree of
configuration (e.g., you can run configuration scripts on each server you provision
with Terraform), you typically want to pick the tool that’s the best fit for your use
case.

### Mutable Infrastructure Versus Immutable Infrastructure

- Configuration management tools such as Chef, Puppet, and Ansible typically default
to a mutable infrastructure paradigm. **For example, if you instruct Chef to install a new version of OpenSSL, it will run thesoftware update on your existing servers, and the changes will happen in place.**
- If you’re using a provisioning tool such as Terraform to deploy machine images
created by Docker or Packer, most “changes” are actually deployments of a completely
new server. For example, to deploy a new version of OpenSSL, you would use Packer to create a new image with the new version of OpenSSL, deploy that image across a set of new servers, and then terminate the old servers.

### Procedural Language Versus Declarative Language

- Chef and Ansible encourage a procedural style in which you write code that specifies,
step by step, how to achieve some desired end state.
- If you wanted to add 5 servers to your existing 10, Terraform will figure out with `plan` what to do, where in Ansible/Chef, you need to actually specify that you are adding 5, not 15.
- Problem with procedural IAC tools:
    - Procedural code does not fully capture the state of the infrastructure.  You’d also need to know the order in which those templates were applied. Had you applied them in a different order, you might have ended up with different infrastructure, and that’s not something you can see in the codebase itself.
    - Procedural code limits reusability.

### Master Versus Masterless

- By default, Chef and Puppet require that you run a master server for storing the
state of your infrastructure and distributing updates. Every time you want to update
something in your infrastructure, you use a client (e.g., a command-line tool) to issue
new commands to the master server, and the master server either pushes the updates
out to all of the other servers or those servers pull the latest updates down from the
master server on a regular basis

### Agent Versus Agentless

- Chef and Puppet require you to install agent software (e.g., Chef Client, Puppet
Agent) on each server that you want to configure. The agent typically runs in the
background on each server and is responsible for installing the latest configuration
management updates.

## Use of Multiple Tools Together

- Provisioning plus configuration management - Terraform + Ansible?

![CleanShot 2025-05-12 at 20.30.18.png](Terraform%20-%20Up%20and%20Running%201f1d6f968e23806ca90dcabbd8662fa9/CleanShot_2025-05-12_at_20.30.18.png)

- Provisioning plus server templating plus orchestration - Terraform + Packer + Kubernetes.

![CleanShot 2025-05-12 at 20.31.35.png](Terraform%20-%20Up%20and%20Running%201f1d6f968e23806ca90dcabbd8662fa9/CleanShot_2025-05-12_at_20.31.35.png)

- The advantage of this approach is that Docker images build fairly quickly, you can
run and test them on your local computer, and you can take advantage of all of the
built-in functionality of Kubernetes, including various deployment strategies, auto
healing, auto scaling, and so on. The drawback is the added complexity, both in
terms of extra infrastructure to run.

# Chapter 2: Getting Started with Terraform

```bash
$ terraform init
$ terraform plan
$ terraform apply
```

```json

resource "aws_security_group" "instance" {
  name = "terraform-example-instance"

  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "app_server" {
  ami           = "ami-0df7a207adb9748c7"  # Ubuntu AMI
  instance_type = "t2.micro"
  key_name      = var.key_name
  subnet_id     = aws_subnet.public.id

  vpc_security_group_ids = [aws_security_group.instance.id]

  user_data = <<-EOF
    #!/bin/bash
    apt-get update
    apt-get install -y docker.io
    systemctl start docker
    systemctl enable docker
    usermod -aG docker ubuntu
  EOF

  user_data_replace_on_change = true

  tags = {
    Name = "visa-check-app"
  }
}

```

### Declaring Variables

- Terraform has some kind of Type system in it

```jsx
variable "number_example" {
  description = "An example of a number variable in Terraform"
  type = number
  default = 42
}

variable "list_numeric_example" {
  description = "An example of a numeric list in Terraform"
  type = list(number)
  default = [1, 2, 3]
}
```

### Output variables

```jsx
output "public_ip" {
  value = aws_instance.example.public_ip
  sensitive = true
  description = "The public IP address of the web server"
}

$ terraform output public_ip
```

### Cluster of Web Servers

- **ASG** - Auto Scaling Group - this does: monitoring health, replacing failed instances, adjusting the size of the cluster.

### Launch Configuration syntax

```jsx
resource "aws_launch_configuration" "example" {
  image_id = "ami-0fb653ca2d3203ac1"
	instance_type = "t2.micro"
	security_groups = [aws_security_group.instance.id]
	user_data = <<-EOF
							#!/bin/bash
							echo "Hello, World" > index.html
							nohup busybox httpd -f -p ${var.server_port} &
							EOF
}
```

### Autoscaling Group

```jsx
resource "aws_autoscaling_group" "example" {
	launch_configuration = aws_launch_configuration.example.name
	min_size = 2
	max_size = 10
	
	tag {
		key = "Name"
		value = "terraform-asg-example"
		propagate_at_launch = true
	}
	
	lifecycle {
		create_before_destroy = true
	}
}
```

### Subnet IDs

- This parameter specifies to the ASG into which VPC subnets the EC2 Instances should be deployed.

```jsx
data "aws_subnets" "default" {
	filter {
		name = "vpc-id"
		values = [data.aws_vpc.default.id]
	}
}
```

```jsx
resource "aws_autoscaling_group" "example" {
	launch_configuration = aws_launch_configuration.example.name
	vpc_zone_identifier = data.aws_subnets.default.ids
	min_size = 2
	max_size = 10
	
	tag {
		key = "Name"
		value = "terraform-asg-example"
		propagate_at_launch = true
	}
	
	lifecycle {
		create_before_destroy = true
	}
}
```

### Deploying a Load Balancer

- **Application Load Balancer (ALB)**
    - Best suited for load balancing of HTTP and HTTPS traffic.
    - Operates at the application layer (Layer 7) of the Open Systems Interconnection (OSI) model.
- **Network Load Balancer (NLB)**
    - Best suited for load balancing of TCP, UDP, and TLS traffic.
    - Can scale up and down in response to load faster than the ALB (the LB is designed to scale to tens of millions of requests per second).
    - Operates at the transport layer (Layer 4) of the OSI model.
- **Classic Load Balancer (CLB)**
    - This is the "legacy" load balancer that predates both the ALB and NLB.
    - It can handle HTTP, HTTPS, TCP, and TLS traffic but with far fewer features than either the ALB or NLB.
    - Operates at both the application layer (L7) and transport layer (L4) of the OSI model.

### ALB

- Listener - which port
- Listener rule - how to know which match specific paths
- Target groups - A server that receives requrest from the load balancer

```jsx
resource "aws_lb" "example" {
	name = "terraform-asg-example"
	load_balancer_type = "application"
	subnets = data.aws_subnets.default.ids
}
```

### Listener via `aws_lb_listener`

```jsx
resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.example.arn
  port              = 80
  protocol          = "HTTP"

  # By default, return a simple 404 page
  default_action {
    type = "fixed-response"

    fixed_response {
      content_type = "text/plain"
      message_body = "404: page not found"
      status_code  = 404
    }
  }
}

```

### AWS security group to apply

```jsx
resource "aws_security_group" "alb" {
  name = "terraform-example-alb"

  # Allow inbound HTTP requests
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow all outbound requests
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

```

### AWS target group

```jsx
resource "aws_lb_target_group" "asg" {
  name     = "terraform-asg-example"
  port     = var.server_port
  protocol = "HTTP"
  vpc_id   = data.aws_vpc.default.id

  health_check {
    path                = "/"
    protocol            = "HTTP"
    matcher             = "200"
    interval            = 15
    timeout             = 3
    healthy_threshold   = 2
    unhealthy_threshold = 2
  }
}

```

### Lastly, listener rules

```jsx
resource "aws_lb_listener_rule" "asg" {
  listener_arn = aws_lb_listener.http.arn
  priority     = 100

  condition {
    path_pattern {
      values = ["*"]
    }
  }

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.asg.arn
  }
}

```

## Chaper 3 - How to Manage Terraform State

- Every time you run Terraform, it records information about what infrastructure is created in a Terraform state file. It will be in Terraform state. And it would be a custom JSON format that records the mapping from the Terraform resources in your configuration files for the representation of those resources in the real world.
- Storing Terraform state in version control is a bad idea because of manual error, blocking wherein two team members might be running apply at the same time, and secrets. All of the data in the Terraform state files are stored in plain text.
- So, what you would do is that you would store it in a Terraform backend, which could be a remote backend, including Amazon S3, Google Cloud Storage, or HashiCorp's Terraform Cloud and Terraform Enterprise.
- And to enable S3 you want to set up a bucket and create an S3 bucket using the AWS S3 bucket resource.

```jsx
resource "aws_s3_bucket" "terraform_state" {
  bucket = "terraform-up-and-running-state"

  # Prevent accidental deletion of this S3 bucket
  lifecycle {
    prevent_destroy = true
  }
  
  versioning_configuration {
		status = "Enabled"
	}
	
	rule {
		apply_server_side_encryption_by_default {
			sse_algorithm = "AES256"
		}
	}
	
	resource "aws_s3_bucket_public_access_block" "public_access" {
	  bucket                  = aws_s3_bucket.terraform_state.id
	  block_public_acls       = true
	  block_public_policy     = true
	  ignore_public_acls      = true
	  restrict_public_buckets = true
	}
}
```

Next, you need to create a DynamoDB table to use for locking. DynamoDB is Amazon’s distributed key-value store. It supports strongly consistent reads and conditional writes, which are all the ingredients you need for a distributed lock system. Moreover, it’s completely managed, so you don’t have any infrastructure to run yourself, and it’s inexpensive, with most Terraform usage easily fitting into the AWS Free Tier.

```jsx
resource "aws_dynamodb_table" "terraform_locks" {
  name         = "terraform-up-and-running-locks"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }
}

```

## Page 90