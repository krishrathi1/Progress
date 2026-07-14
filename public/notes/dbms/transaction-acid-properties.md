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
