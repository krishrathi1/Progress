import type { Subject } from "@/lib/types";

/**
 * CS Core theory subjects — OOP, DBMS, OS, CN.
 * All four tracks share the same GeeksforGeeks search query builder.
 * Source: geeksforgeeks.org.
 */
const gfgSearch = (n: string): string =>
  `https://www.google.com/search?q=${encodeURIComponent(n + " site:geeksforgeeks.org")}`;

/* ---------------- OOP Concepts ---------------- */
export const oopTrack: Subject = {
  id: "oop",
  name: "OOPs Concepts",
  short: "OOP",
  color: "#a855f7",
  kind: "topic",
  desc: "Object-oriented programming principles, relationships, SOLID & patterns.",
  source: "geeksforgeeks.org",
  search: gfgSearch,
  _total: 0,
  sections: [
    { name: "1 · Fundamentals", items: [
      "What is OOP?", "Procedural vs Object-Oriented Programming", "Advantages of OOP",
      "Class and Object", "Objects & real-world modeling", "Message passing",
    ]},
    { name: "2 · Four Pillars", items: [
      "Encapsulation", "Abstraction", "Abstraction vs Encapsulation",
      "Inheritance", "Types of inheritance", "Polymorphism",
      "Compile-time (static) polymorphism", "Runtime (dynamic) polymorphism",
      "Method overloading vs overriding",
    ]},
    { name: "3 · Class Members & Behavior", items: [
      "Constructors", "Destructors", "Access specifiers (public/private/protected)",
      "Static members", "this pointer/reference", "Friend function & friend class (C++)",
      "Virtual functions", "Pure virtual functions & abstract classes", "Interfaces",
      "Operator overloading", "Function overriding & vtable",
    ]},
    { name: "4 · Object Relationships", items: [
      "Association", "Aggregation", "Composition", "Aggregation vs Composition",
      "Dependency", "Coupling", "Cohesion", "Coupling vs Cohesion",
    ]},
    { name: "5 · Design Principles & Patterns", items: [
      "SOLID principles overview", "Single Responsibility Principle", "Open/Closed Principle",
      "Liskov Substitution Principle", "Interface Segregation Principle", "Dependency Inversion Principle",
      "DRY, KISS, YAGNI", "Introduction to design patterns", "Creational patterns (Singleton, Factory, Builder)",
      "Structural patterns (Adapter, Decorator, Proxy)", "Behavioral patterns (Observer, Strategy, Iterator)",
      "Object cloning (shallow vs deep copy)",
    ]},
  ],
};

/* ---------------- DBMS ---------------- */
export const dbmsTrack: Subject = {
  id: "dbms",
  name: "DBMS",
  short: "DBMS",
  color: "#10b981",
  kind: "topic",
  desc: "Database systems — ER model, normalization, transactions, indexing.",
  source: "geeksforgeeks.org",
  search: gfgSearch,
  _total: 0,
  sections: [
    { name: "1 · Introduction", items: [
      "Introduction to DBMS", "DBMS vs File System", "Database architecture (1/2/3-tier)",
      "Data abstraction & three-schema architecture", "Data models", "Schema vs Instance",
      "Data independence (logical & physical)", "Database users & DBA", "DDL, DML, DCL, TCL",
    ]},
    { name: "2 · ER Model", items: [
      "Entity, Entity set & Attributes", "Types of attributes", "Relationships & relationship sets",
      "Cardinality & participation constraints", "Keys in ER model", "Weak entity set",
      "ER diagram notation", "Generalization, Specialization & Aggregation", "ER to relational mapping",
    ]},
    { name: "3 · Relational Model", items: [
      "Relational model concepts", "Keys (super, candidate, primary, foreign, composite, alternate)",
      "Integrity constraints", "Relational Algebra", "Relational Calculus (tuple & domain)",
      "Selection, Projection, Join, Division operations",
    ]},
    { name: "4 · Normalization", items: [
      "Functional dependency", "Armstrong's axioms", "Closure of attribute set",
      "Finding candidate keys", "Anomalies (insert/update/delete)", "First Normal Form (1NF)",
      "Second Normal Form (2NF)", "Third Normal Form (3NF)", "BCNF", "4NF & 5NF",
      "Lossless join decomposition", "Dependency-preserving decomposition", "Minimal / canonical cover",
    ]},
    { name: "5 · Transactions & Concurrency", items: [
      "Transaction & ACID properties", "Transaction states", "Schedules (serial/non-serial)",
      "Serializability (conflict & view)", "Recoverability", "Cascadeless & strict schedules",
      "Concurrency control", "Lock-based protocols", "Two-phase locking (2PL)",
      "Timestamp ordering protocol", "Deadlock in DBMS", "Deadlock prevention & detection",
    ]},
    { name: "6 · Recovery & Indexing", items: [
      "Log-based recovery", "Checkpoints", "Shadow paging", "Deferred & immediate update",
      "Indexing (primary/secondary/clustered)", "Dense vs sparse index", "B-Tree",
      "B+ Tree", "Hashing (static & dynamic)", "File organization",
      "Query processing & optimization (intro)", "NoSQL databases (intro)",
    ]},
  ],
};

/* ---------------- Operating Systems ---------------- */
export const osTrack: Subject = {
  id: "os",
  name: "Operating Systems",
  short: "OS",
  color: "#06b6d4",
  kind: "topic",
  desc: "Processes, scheduling, synchronization, deadlocks, memory & disk management.",
  source: "geeksforgeeks.org",
  search: gfgSearch,
  _total: 0,
  sections: [
    { name: "1 · Introduction", items: [
      "What is an Operating System?", "Functions of an OS", "Types of OS (batch, time-sharing, distributed, RTOS)",
      "System calls", "Types of system calls", "Kernel & its types (monolithic/microkernel)",
      "User mode vs kernel mode", "Booting process",
    ]},
    { name: "2 · Process Management", items: [
      "Process & Process Control Block (PCB)", "Process states & state transition",
      "Process vs Program", "Schedulers (long/short/medium term)", "Context switching",
      "Operations on processes", "Inter-process communication (IPC)",
    ]},
    { name: "3 · CPU Scheduling", items: [
      "CPU scheduling criteria", "Preemptive vs non-preemptive", "First Come First Serve (FCFS)",
      "Shortest Job First (SJF)", "Shortest Remaining Time First (SRTF)", "Priority scheduling",
      "Round Robin", "Multilevel queue scheduling", "Multilevel feedback queue", "Convoy effect",
    ]},
    { name: "4 · Threads & Synchronization", items: [
      "Threads & multithreading", "User-level vs kernel-level threads", "Multithreading models",
      "Critical section problem", "Race condition", "Peterson's solution", "Semaphores",
      "Mutex vs Semaphore", "Producer-Consumer problem", "Reader-Writer problem", "Dining philosophers problem",
    ]},
    { name: "5 · Deadlocks", items: [
      "What is a deadlock?", "Necessary conditions (Coffman)", "Resource allocation graph",
      "Deadlock prevention", "Deadlock avoidance", "Banker's algorithm",
      "Deadlock detection & recovery",
    ]},
    { name: "6 · Memory Management", items: [
      "Memory management basics", "Contiguous allocation", "Fixed & dynamic partitioning",
      "Fragmentation (internal & external)", "Paging", "Page table & TLB", "Segmentation",
      "Segmentation vs Paging",
    ]},
    { name: "7 · Virtual Memory", items: [
      "Virtual memory & demand paging", "Page fault", "Page replacement algorithms (FIFO)",
      "Optimal page replacement", "LRU page replacement", "LFU & MFU",
      "Belady's anomaly", "Thrashing", "Working set model",
    ]},
    { name: "8 · Storage & File System", items: [
      "Disk structure", "Disk scheduling (FCFS, SSTF)", "SCAN, C-SCAN, LOOK, C-LOOK",
      "File concepts & attributes", "File access methods", "Directory structure",
      "File allocation methods (contiguous/linked/indexed)", "Free space management", "I/O systems (intro)",
    ]},
  ],
};

/* ---------------- Computer Networks ---------------- */
export const cnTrack: Subject = {
  id: "cn",
  name: "Computer Networks",
  short: "CN",
  color: "#3b82f6",
  kind: "topic",
  desc: "OSI/TCP-IP models, every layer, addressing, routing & network security.",
  source: "geeksforgeeks.org",
  search: gfgSearch,
  _total: 0,
  sections: [
    { name: "1 · Introduction", items: [
      "Introduction to Computer Networks", "Network types (LAN/MAN/WAN/PAN)", "Network topologies",
      "OSI model (7 layers)", "TCP/IP model", "OSI vs TCP/IP", "Network devices (hub/switch/router/bridge/gateway)",
      "Transmission modes (simplex/half/full duplex)",
    ]},
    { name: "2 · Physical Layer", items: [
      "Transmission media (guided/unguided)", "Digital & analog signals", "Encoding techniques",
      "Multiplexing (FDM/TDM/WDM)", "Switching (circuit/packet/message)", "Bandwidth, throughput & latency",
    ]},
    { name: "3 · Data Link Layer", items: [
      "Framing", "Error detection (parity, checksum)", "Cyclic Redundancy Check (CRC)",
      "Error correction (Hamming code)", "Flow control - Stop and Wait", "Sliding window protocol",
      "Go-Back-N ARQ", "Selective Repeat ARQ", "MAC & sublayers", "ALOHA (pure & slotted)",
      "CSMA / CSMA-CD / CSMA-CA", "Ethernet", "Switching & VLAN (intro)",
    ]},
    { name: "4 · Network Layer", items: [
      "IPv4 addressing", "Classful addressing", "Subnetting", "Classless addressing & CIDR",
      "Supernetting", "IPv6", "ARP & RARP", "ICMP", "NAT",
      "Routing algorithms (intro)", "Distance vector routing", "Link state routing",
      "RIP, OSPF, BGP", "Dijkstra's shortest path",
    ]},
    { name: "5 · Transport Layer", items: [
      "Transport layer services", "TCP", "UDP", "TCP vs UDP", "TCP 3-way handshake",
      "TCP connection termination", "Ports & sockets", "Flow control", "Congestion control",
      "TCP congestion control (slow start etc.)",
    ]},
    { name: "6 · Application Layer", items: [
      "DNS", "HTTP & HTTPS", "FTP", "SMTP", "POP3 & IMAP", "DHCP", "Telnet & SSH",
      "World Wide Web & cookies", "Email working",
    ]},
    { name: "7 · Network Security", items: [
      "Introduction to network security", "Cryptography basics", "Symmetric key cryptography",
      "Asymmetric key cryptography (RSA)", "Digital signature", "Hashing & message digest",
      "Firewalls", "SSL/TLS", "Common attacks (DoS, MITM, phishing)",
    ]},
  ],
};
