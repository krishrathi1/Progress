## Amazon EC2 (Elastic Compute Cloud)
Resizable **virtual servers** ("instances") in the AWS cloud. You pick CPU/RAM/OS, launch in minutes, and pay for what you use — no physical hardware.

## Core concepts
- **AMI (Amazon Machine Image):** the template (OS + software) an instance boots from.
- **Instance type:** the hardware profile (e.g. t3.micro = burstable, m5 = general, c5 = compute, r5 = memory).
- **EBS volume:** durable network-attached disk for the instance.
- **Security Group:** a stateful virtual firewall (which ports/IPs may connect).
- **Key pair:** SSH public/private keys for login.
- **Elastic IP:** a static public IPv4 you can remap between instances.

## Lifecycle
~~~
Launch (from AMI) -> Running -> Stop/Start -> Terminate
                        |
                  Auto Scaling adds/removes instances by demand
                  Load Balancer spreads traffic across them
~~~

## Pricing models
- **On-Demand:** pay per second, no commitment (spiky workloads).
- **Reserved / Savings Plans:** 1–3 yr commit for big discounts (steady workloads).
- **Spot:** spare capacity up to ~90% off, can be reclaimed (fault-tolerant/batch).

## Key point
EC2 is **IaaS** — you manage the OS and up. For "just run my code" use **Lambda** (serverless); for containers use **ECS/EKS**.
