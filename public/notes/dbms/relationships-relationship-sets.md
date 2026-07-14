## Definition

In the ER model, a **relationship** is an **association among two or more entities**. A **relationship set** is a collection of relationships of the same type — the set of all associations of that kind between the participating entity sets.

- **Relationship:** *Student 12 enrolls in Course CS101*.
- **Relationship set:** `ENROLLS` — all (student, course) enrollment associations.

Relationships map to **foreign keys** or **junction tables** in the relational model.

## ER Diagram Notation

```text
 ┌─────────┐        ◇────────◇        ┌────────┐
 │ STUDENT │───────< ENROLLS >────────│ COURSE │
 └─────────┘        ◇────────◇        └────────┘
  entity set        relationship        entity set
                    set (diamond)

Diamond = relationship set
Line    = participation of an entity set
```

## Degree of a Relationship
The **degree** is the number of entity sets that participate.

| Degree | Name | Example |
|--------|------|---------|
| 2 | Binary | STUDENT enrolls COURSE |
| 3 | Ternary | DOCTOR prescribes DRUG to PATIENT |
| n | n-ary | involves n entity sets |

## Cardinality (Mapping Constraints)
Cardinality states how many entities of one set relate to entities of another.

| Type | Meaning | Example |
|------|---------|---------|
| One-to-One (1:1) | Each A ↔ one B | PERSON — PASSPORT |
| One-to-Many (1:N) | One A ↔ many B | DEPARTMENT — EMPLOYEES |
| Many-to-One (N:1) | Many A ↔ one B | EMPLOYEES — DEPARTMENT |
| Many-to-Many (M:N) | Many A ↔ many B | STUDENT — COURSE |

## Participation Constraints
- **Total participation** (double line): every entity **must** participate (e.g., every LOAN must belong to a CUSTOMER).
- **Partial participation** (single line): participation is optional.

## Descriptive Attributes & Mapping

A relationship set can have its own attributes. `ENROLLS` may carry a `grade` attribute (belongs to the pair, not to student or course alone).

```sql
-- M:N relationship becomes a junction table with descriptive attribute
CREATE TABLE enrolls (
  student_id INT,
  course_id  INT,
  grade      CHAR(2),
  PRIMARY KEY (student_id, course_id),
  FOREIGN KEY (student_id) REFERENCES student(id),
  FOREIGN KEY (course_id)  REFERENCES course(id)
);
```

## Key points
- **Relationship** = association among entities; **relationship set** = all associations of the same type (drawn as a **diamond**).
- **Degree** = number of participating entity sets (binary, ternary, n-ary).
- **Cardinality** (1:1, 1:N, M:N) and **participation** (total/partial) are the mapping constraints.
- **M:N** relationships and relationships with **descriptive attributes** become **separate junction tables**.
