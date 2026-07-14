/**
 * Learning notes for the theory tracks, nested by subjectId -> slug(topicName).
 * Markdown uses ~~~ fences (no backticks) so it is safe inside template literals.
 */
export const theoryNotes: Record<string, Record<string, string>> = {
  java: {
    "hashmap-internal-working": `
## What is a HashMap?
A **HashMap** stores key→value pairs and gives average **O(1)** get/put by turning the key into an array index via a hash function.

## Internal structure
An array of **buckets** (Node[] table). Each bucket holds a linked list (or a balanced tree when it gets large).

~~~
index = (n - 1) & hash(key)      // n = table size (power of 2)

table
 0 -> null
 1 -> (k1,v1) -> (k5,v5)         // collision chain
 2 -> null
 3 -> (k2,v2)
~~~

## put(key, value) — step by step
1. Compute **hash(key)** (Java also spreads high bits: h ^ (h >>> 16)).
2. Find bucket index with **(n-1) & hash**.
3. If bucket empty → insert node.
4. Else walk the chain: if a key **equals()** an existing one → overwrite value; otherwise append.
5. If size > capacity × **load factor (0.75)** → **resize** (double capacity, rehash).

## Collisions & treeification
- Multiple keys landing in one bucket form a chain (O(k)).
- Since Java 8, a chain longer than **8** (with table ≥ 64) becomes a **red-black tree**, so worst case is **O(log n)** instead of O(n).

## Key points
- **equals()** and **hashCode()** must be consistent — unequal hashCodes for equal objects breaks lookups.
- Iteration order is **not** guaranteed (use LinkedHashMap for insertion order, TreeMap for sorted).
- Not thread-safe → use ConcurrentHashMap for concurrency.
`,
  },

  oop: {
    polymorphism: `
## Definition
**Polymorphism** = "many forms": the same interface/call behaves differently depending on the underlying object or arguments.

## Two kinds

### 1. Compile-time (static) — Method Overloading
Same method name, different parameter lists. Resolved by the compiler.
~~~java
int add(int a, int b)          { return a + b; }
double add(double a, double b) { return a + b; }
int add(int a, int b, int c)   { return a + b + c; }
~~~

### 2. Run-time (dynamic) — Method Overriding
A subclass redefines a superclass method; the **actual object** decides which runs (dynamic dispatch via the vtable).
~~~java
class Animal { void sound() { System.out.println("..."); } }
class Dog extends Animal { void sound() { System.out.println("Woof"); } }
class Cat extends Animal { void sound() { System.out.println("Meow"); } }

Animal a = new Dog();
a.sound();   // "Woof"  — decided at runtime
~~~

## Overloading vs Overriding

| | Overloading | Overriding |
|---|---|---|
| Bound at | Compile time | Run time |
| Signature | Must differ | Must match |
| Inheritance | Not required | Required |

## Why it matters
Lets you write code against a **base type** (Animal) and plug in new subclasses without changing the caller — the heart of the Open/Closed Principle.
`,
  },

  dbms: {
    "transaction-acid-properties": `
## Transaction
A **transaction** is a single logical unit of work — a group of operations that must all succeed or all fail (e.g., transferring money = debit + credit).

## ACID properties

- **A — Atomicity:** all operations happen or none do. A failure rolls back partial work. (Debit without credit must never persist.)
- **C — Consistency:** a transaction moves the DB from one valid state to another, preserving all constraints/invariants.
- **I — Isolation:** concurrent transactions don't interfere; the result equals some serial order. Controlled by isolation levels.
- **D — Durability:** once committed, changes survive crashes (written to non-volatile storage / write-ahead log).

## Example: bank transfer of ₹100
~~~
BEGIN
  UPDATE acct SET bal = bal - 100 WHERE id = A;   -- debit
  UPDATE acct SET bal = bal + 100 WHERE id = B;   -- credit
COMMIT
~~~
If the system crashes after the debit, **Atomicity** rolls it back; after COMMIT, **Durability** guarantees both updates persist.

## Isolation anomalies (why Isolation matters)
- **Dirty read:** reading uncommitted data.
- **Non-repeatable read:** same row read twice gives different values.
- **Phantom read:** a re-run query returns new rows.

Isolation levels (Read Uncommitted → Read Committed → Repeatable Read → Serializable) trade concurrency for safety.
`,
  },

  os: {
    "round-robin": `
## Round Robin (RR) scheduling
A **preemptive** CPU-scheduling algorithm designed for time-sharing. Each process runs for at most a fixed **time quantum**, then goes to the back of the ready queue.

## How it works
1. Ready queue is FIFO.
2. Give the front process the CPU for one **quantum (q)**.
3. If it finishes early → leave. If not → preempt and enqueue at the back.

## Example (quantum = 2)
~~~
Process  Burst
  P1       5
  P2       3
  P3       1

Gantt: | P1 | P2 | P3 | P1 | P2 | P1 |
        0    2    4    5    7    8    9
~~~

## Properties
- **Fair:** every process gets the CPU regularly → good response time.
- **No starvation.**
- Higher **context-switch** overhead than FCFS.

## Choosing the quantum
- Too large → behaves like **FCFS** (poor responsiveness).
- Too small → too many context switches (overhead dominates).
- Rule of thumb: 80% of CPU bursts should be shorter than the quantum.

## Key point
RR optimises **response time**, not average waiting/turnaround time (SJF is optimal for those).
`,
  },

  cn: {
    "osi-model-7-layers": `
## OSI Model
A 7-layer reference model describing how data moves across a network. Each layer serves the one above and uses the one below. Mnemonic (top→bottom): **All People Seem To Need Data Processing**.

| # | Layer | Job | Examples / PDU |
|---|---|---|---|
| 7 | Application | User-facing services | HTTP, DNS, SMTP |
| 6 | Presentation | Encoding, encryption, compression | TLS, JPEG |
| 5 | Session | Open/manage/close sessions | RPC, sockets |
| 4 | Transport | End-to-end delivery, reliability, ports | TCP, UDP · *Segment* |
| 3 | Network | Logical addressing & routing | IP · *Packet* |
| 2 | Data Link | Node-to-node frames, MAC, error detect | Ethernet · *Frame* |
| 1 | Physical | Bits over the medium | cables, radio · *Bits* |

## Data flow (encapsulation)
~~~
Sender:   Data -> +TCP hdr -> +IP hdr -> +Frame hdr -> bits ->
Receiver: bits -> Frame -> IP -> TCP -> Data   (each layer strips its header)
~~~

## OSI vs TCP/IP
TCP/IP collapses OSI into 4 layers: Application (7-5), Transport (4), Internet (3), Network Access (2-1). OSI is the *teaching* model; TCP/IP is what the Internet actually runs.

## Key point
Remember which **PDU** and **addresses** live where: Layer 2 = MAC/frames, Layer 3 = IP/packets, Layer 4 = ports/segments.
`,
  },

  sd: {
    "cap-theorem": `
## CAP Theorem
In a **distributed** data store, when a **network partition** happens you can only fully guarantee **two** of these three:

- **C — Consistency:** every read sees the most recent write (all nodes agree).
- **A — Availability:** every request gets a (non-error) response.
- **P — Partition tolerance:** the system keeps working despite dropped/lost messages between nodes.

## The real trade-off
Network partitions **will** happen, so **P is mandatory**. The actual choice under a partition is **C vs A**:

~~~
Partition occurs
   |
   +-- CP: reject/blocks writes to stay consistent   (e.g. HBase, MongoDB default, RDBMS)
   |
   +-- AP: keep serving, reconcile later (eventual)  (e.g. Cassandra, DynamoDB, Riak)
~~~

## Examples
- **CP:** banking / inventory — a wrong balance is worse than a brief outage.
- **AP:** social feeds / shopping carts — showing slightly stale data beats being down.

## Beyond CAP — PACELC
Extends CAP: *if Partition then A vs C, Else (normal operation) Latency vs Consistency.* Explains why some systems trade consistency for speed even without a partition.

## Key point
CAP is about behaviour **during a partition**, not a permanent label — many systems are tunable per-request (e.g., quorum reads/writes).
`,
  },

  aws: {
    "ec2-introduction": `
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
`,
  },

  docker: {
    "containers-vs-virtual-machines": `
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
`,
  },

  sql: {
    "inner-join": `
## INNER JOIN
Combines rows from two tables where the **join condition matches** in both. Non-matching rows are dropped.

~~~sql
SELECT e.name, d.dept_name
FROM employees e
INNER JOIN departments d
  ON e.dept_id = d.id;
~~~

## Visual (set intersection)
~~~
employees        departments        INNER JOIN keeps only
   A (d=1)          1 Sales          rows present in BOTH
   B (d=2)          2 Eng            -> A-Sales, B-Eng
   C (d=9)          3 HR             (C dropped: no dept 9,
                                       HR dropped: no employee)
~~~

## The JOIN family

| Join | Keeps |
|---|---|
| INNER | only matching rows in both |
| LEFT | all left rows + matches (NULLs on right) |
| RIGHT | all right rows + matches (NULLs on left) |
| FULL OUTER | all rows from both sides |
| CROSS | every combination (Cartesian product) |

## Tips
- Always qualify columns (**e.id** vs **d.id**) to avoid ambiguity.
- Join on **indexed** keys (usually PK ↔ FK) for performance.
- INNER JOIN is commutative: the table order doesn't change the result set.

## Key point
Use **LEFT JOIN** when you must keep unmatched left rows (e.g., "employees even if they have no department"); INNER silently discards them.
`,
  },
};
