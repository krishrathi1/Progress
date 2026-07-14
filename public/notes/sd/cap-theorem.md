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
