import type { Subject } from "@/lib/types";

/**
 * System Design + DevOps track — SD, AWS, Docker, SQL.
 * All four tracks share the same GeeksforGeeks search query builder.
 * Source: geeksforgeeks.org.
 */
const gfgSearch = (n: string): string =>
  `https://www.google.com/search?q=${encodeURIComponent(n + " site:geeksforgeeks.org")}`;

/* ---------------- System Design ---------------- */
export const sdTrack: Subject = {
  id: "sd",
  name: "System Design",
  short: "SysD",
  color: "#ec4899",
  kind: "topic",
  desc: "HLD + LLD — building blocks, scaling, distributed systems & case studies.",
  source: "geeksforgeeks.org",
  search: gfgSearch,
  _total: 0,
  sections: [
    { name: "1 · Fundamentals", items: [
      "What is System Design?", "HLD vs LLD", "Scalability", "Latency vs Throughput",
      "Availability & reliability", "Performance vs scalability", "Back-of-the-envelope estimation",
      "How to approach a system design interview",
    ]},
    { name: "2 · Building Blocks", items: [
      "Load balancing", "Load balancing algorithms", "Caching", "Cache eviction policies",
      "Cache strategies (write-through/back/around)", "Content Delivery Network (CDN)",
      "Proxy (forward & reverse)", "Message queues", "Kafka / RabbitMQ (intro)",
      "Databases (SQL vs NoSQL)", "Blob / object storage",
    ]},
    { name: "3 · Scaling & Data", items: [
      "Vertical vs horizontal scaling", "Database replication", "Database sharding",
      "Data partitioning", "Federation", "Denormalization", "Indexing for scale",
      "Consistent hashing", "Rate limiting",
    ]},
    { name: "4 · Distributed Systems", items: [
      "CAP theorem", "PACELC theorem", "Consistency patterns", "Availability patterns",
      "Leader election", "Heartbeat & failure detection", "Gossip protocol", "Quorum",
      "Distributed transactions", "Two-phase commit (2PC)", "Saga pattern",
      "Bloom filters", "Idempotency",
    ]},
    { name: "5 · Communication & APIs", items: [
      "Client-server model", "REST API design", "GraphQL", "gRPC", "API Gateway",
      "Microservices vs Monolith", "Synchronous vs asynchronous communication",
      "WebSockets", "Long polling vs SSE", "Service discovery",
    ]},
    { name: "6 · HLD Case Studies", items: [
      "Design a URL shortener (TinyURL)", "Design a rate limiter", "Design Twitter",
      "Design Instagram", "Design WhatsApp / chat system", "Design a news feed",
      "Design Netflix / YouTube", "Design Uber", "Design a notification system",
      "Design a web crawler", "Design search autocomplete (typeahead)",
      "Design Dropbox / Google Drive", "Design Pastebin", "Design BookMyShow / Ticketmaster",
      "Design a distributed cache", "Design a key-value store", "Design a payment system",
    ]},
    { name: "7 · Low-Level Design (LLD)", items: [
      "Object-oriented design basics", "UML diagrams", "Design patterns for LLD",
      "Design a parking lot", "Design an elevator system", "Design a vending machine",
      "Design an ATM", "Design Splitwise", "Design Snake & Ladder", "Design Tic-Tac-Toe",
      "Design an LRU cache", "Design a logging framework", "Design a library management system",
    ]},
  ],
};

/* ---------------- AWS ---------------- */
export const awsTrack: Subject = {
  id: "aws",
  name: "AWS Basics",
  short: "AWS",
  color: "#f97316",
  kind: "topic",
  desc: "Cloud fundamentals + core AWS services: EC2, S3, IAM, VPC, RDS, Lambda.",
  source: "geeksforgeeks.org",
  search: gfgSearch,
  _total: 0,
  sections: [
    { name: "1 · Cloud & AWS Intro", items: [
      "What is cloud computing?", "IaaS, PaaS, SaaS", "Public/Private/Hybrid cloud",
      "Advantages of cloud", "What is AWS?", "AWS global infrastructure (Regions, AZs, Edge)",
      "AWS Free Tier & console overview", "AWS pricing models",
    ]},
    { name: "2 · IAM & Security", items: [
      "IAM introduction", "IAM users, groups & roles", "IAM policies", "Multi-factor authentication (MFA)",
      "AWS KMS", "AWS Shield & WAF", "AWS Cognito", "Shared responsibility model",
    ]},
    { name: "3 · Compute", items: [
      "EC2 introduction", "EC2 instance types", "Amazon Machine Image (AMI)", "EBS volumes",
      "Auto Scaling", "Elastic Load Balancer (ELB)", "AWS Lambda (serverless)",
      "Elastic Beanstalk", "ECS & EKS (containers)",
    ]},
    { name: "4 · Storage", items: [
      "Amazon S3", "S3 buckets & objects", "S3 storage classes", "S3 versioning & lifecycle",
      "Amazon Glacier", "Amazon EFS", "Storage Gateway", "Instance store vs EBS",
    ]},
    { name: "5 · Networking", items: [
      "Amazon VPC", "Subnets (public/private)", "Route tables", "Internet Gateway & NAT",
      "Security Groups vs NACL", "Elastic IP", "Route 53 (DNS)", "CloudFront (CDN)", "Direct Connect",
    ]},
    { name: "6 · Databases & Integration", items: [
      "Amazon RDS", "Amazon DynamoDB", "Amazon Aurora", "Amazon Redshift", "ElastiCache",
      "Amazon SNS", "Amazon SQS", "CloudWatch (monitoring)", "CloudTrail", "CloudFormation (IaC)",
      "Well-Architected Framework",
    ]},
  ],
};

/* ---------------- Docker ---------------- */
export const dockerTrack: Subject = {
  id: "docker",
  name: "Docker",
  short: "Docker",
  color: "#0ea5e9",
  kind: "topic",
  desc: "Containers from zero — images, Dockerfile, volumes, networking, Compose.",
  source: "geeksforgeeks.org",
  search: gfgSearch,
  _total: 0,
  sections: [
    { name: "1 · Introduction", items: [
      "What is Docker?", "Containers vs Virtual Machines", "Why use Docker?",
      "Docker architecture", "Docker Engine, daemon & client", "Installing Docker",
      "Docker Desktop overview",
    ]},
    { name: "2 · Images & Dockerfile", items: [
      "Docker images", "Docker Hub & registries", "Pulling & pushing images", "Dockerfile basics",
      "Dockerfile instructions (FROM, RUN, COPY, CMD, ENTRYPOINT)", "Image layers & caching",
      "Building images", "Tagging images", ".dockerignore", "Multi-stage builds",
    ]},
    { name: "3 · Containers", items: [
      "Running containers", "Container lifecycle", "docker run flags", "Listing & inspecting containers",
      "Starting/stopping/removing containers", "docker exec & attach", "Container logs",
      "Environment variables", "Port mapping",
    ]},
    { name: "4 · Storage & Networking", items: [
      "Docker volumes", "Bind mounts vs volumes", "tmpfs mounts", "Persisting data",
      "Docker networking overview", "Bridge network", "Host network", "None network",
      "Overlay network", "Container-to-container communication",
    ]},
    { name: "5 · Compose & Orchestration", items: [
      "Docker Compose introduction", "docker-compose.yml structure", "Multi-container apps with Compose",
      "Compose networking & volumes", "Docker Swarm (intro)", "Services & scaling in Swarm",
      "Docker vs Kubernetes", "Docker best practices", "Docker security basics",
    ]},
  ],
};

/* ---------------- SQL ---------------- */
export const sqlTrack: Subject = {
  id: "sql",
  name: "SQL",
  short: "SQL",
  color: "#22c55e",
  kind: "topic",
  desc: "Query language mastery — from SELECT to window functions & CTEs.",
  source: "geeksforgeeks.org",
  search: gfgSearch,
  _total: 0,
  sections: [
    { name: "1 · Introduction", items: [
      "What is SQL?", "SQL vs NoSQL", "RDBMS concepts", "SQL data types",
      "SQL command categories (DDL/DML/DQL/DCL/TCL)", "SQL syntax basics",
    ]},
    { name: "2 · DDL & DML", items: [
      "CREATE TABLE", "ALTER TABLE", "DROP & TRUNCATE", "RENAME",
      "INSERT", "UPDATE", "DELETE", "DELETE vs TRUNCATE vs DROP",
    ]},
    { name: "3 · Querying Data", items: [
      "SELECT statement", "WHERE clause", "DISTINCT", "ORDER BY", "LIMIT & OFFSET",
      "Comparison & logical operators", "BETWEEN, IN, LIKE & wildcards", "NULL handling (IS NULL)",
      "CASE expression", "Aliases",
    ]},
    { name: "4 · Aggregation & Grouping", items: [
      "Aggregate functions (COUNT/SUM/AVG/MIN/MAX)", "GROUP BY", "HAVING",
      "GROUP BY vs HAVING", "ROLLUP & CUBE",
    ]},
    { name: "5 · Joins & Set Operations", items: [
      "INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN", "CROSS JOIN",
      "SELF JOIN", "NATURAL JOIN", "UNION & UNION ALL", "INTERSECT", "EXCEPT / MINUS",
    ]},
    { name: "6 · Subqueries & Advanced", items: [
      "Subqueries", "Correlated subqueries", "Nested subqueries", "EXISTS operator",
      "Common Table Expressions (CTE / WITH)", "Recursive CTE",
      "Window functions (ROW_NUMBER/RANK/DENSE_RANK)", "LEAD & LAG", "NTILE & running totals",
    ]},
    { name: "7 · Constraints, Views & Programmability", items: [
      "PRIMARY KEY & FOREIGN KEY", "UNIQUE, NOT NULL, CHECK, DEFAULT", "Indexes",
      "Views", "Stored procedures", "Functions", "Triggers",
      "Transactions (COMMIT/ROLLBACK/SAVEPOINT)", "DCL (GRANT/REVOKE)",
      "String & date functions", "Practice: Nth highest salary & find duplicates",
    ]},
  ],
};
