## Definition

**NoSQL ("Not Only SQL")** databases are non-relational data stores designed for **large-scale, distributed, high-throughput** applications. They relax the rigid table/schema model of relational databases to gain **horizontal scalability, flexible schemas, and high availability**, making them popular for big data and real-time web apps.

## Why NoSQL?

- Relational DBs scale **vertically** (bigger server) and enforce fixed schemas — hard for massive, rapidly changing, or semi-structured data.
- NoSQL scales **horizontally** (add commodity nodes) and stores flexible, schema-less documents.

## Types of NoSQL Databases

| Type | Data Model | Example | Best For |
|------|-----------|---------|----------|
| **Document** | JSON/BSON documents | MongoDB, CouchDB | Content mgmt, catalogs, flexible records |
| **Key-Value** | key -> value pairs | Redis, DynamoDB | Caching, sessions, fast lookups |
| **Column-family** | Rows with dynamic columns | Cassandra, HBase | Time-series, write-heavy analytics |
| **Graph** | Nodes + edges | Neo4j, Amazon Neptune | Social networks, recommendations |

```text
Document (MongoDB):
{ "_id": 1, "name": "Asha", "tags": ["a","b"] }

Key-Value (Redis):
"user:1" -> "Asha"

Column-family:
RowKey=1 | name:Asha | age:22 | city:Pune

Graph:
(Asha) -[FOLLOWS]-> (Ravi)
```

## SQL vs NoSQL

| Aspect | SQL (Relational) | NoSQL |
|--------|------------------|-------|
| Schema | Fixed, predefined | Dynamic / flexible |
| Scaling | Vertical | Horizontal |
| Structure | Tables, rows | Documents, KV, columns, graphs |
| Transactions | Strong ACID | Often BASE / eventual consistency |
| Query language | SQL | Varies per DB |
| Best fit | Structured data, complex joins | Big/semi-structured data, high scale |

## CAP Theorem & BASE

- **CAP theorem**: a distributed store can guarantee only **two** of **Consistency, Availability, Partition tolerance**. NoSQL systems often trade strong consistency for availability.
- **BASE** (vs ACID): **B**asically **A**vailable, **S**oft state, **E**ventual consistency.

## Key points

- NoSQL = non-relational, schema-flexible, horizontally scalable stores.
- Four families: **document, key-value, column-family, graph**.
- Favors **BASE / eventual consistency** and the **CAP** trade-off over strict ACID.
- Choose SQL for structured data needing joins and strong consistency; choose NoSQL for scale, flexibility, and semi-structured/big data.
