## The core difference
Both isolate applications, but at different layers:

- **VM:** virtualises **hardware**. Each VM ships a full **guest OS** on top of a hypervisor. Heavy (GBs), boots in minutes.
- **Container:** virtualises the **OS**. Containers share the host **kernel** and package just the app + its dependencies. Light (MBs), starts in milliseconds.

~~~
   VIRTUAL MACHINES                CONTAINERS
 +--------+ +--------+           +------+ +------+ +------+
 | App A  | | App B  |           | App  | | App  | | App  |
 | Bins   | | Bins   |           | Bins | | Bins | | Bins |
 | GuestOS| | GuestOS|           +------+ +------+ +------+
 +--------+ +--------+           |   Docker Engine       |
 |   Hypervisor      |           |   Host OS (kernel)    |
 |   Host OS         |           |   Hardware            |
 |   Hardware        |
~~~

## Comparison

| | Virtual Machine | Container |
|---|---|---|
| Isolation | Full (own kernel) | Process-level (shared kernel) |
| Size | GBs | MBs |
| Startup | Minutes | Milliseconds |
| Overhead | High | Low |
| Portability | Lower | High ("build once, run anywhere") |

## When to use which
- **Containers:** microservices, CI/CD, scaling stateless apps, dev/prod parity.
- **VMs:** strong isolation, running a **different** OS/kernel, legacy monoliths.

## Key point
Containers are **not** "lightweight VMs" — they share the host kernel, so you cannot run a Windows container on a Linux kernel (without a VM layer).
