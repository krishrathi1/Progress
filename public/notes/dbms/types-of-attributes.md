## Definition

An **attribute** is a property that describes an entity in the ER model. Attributes are classified by their structure and value behavior. Knowing these types is essential for ER design and a very common exam question.

## Types of Attributes

| Type | Meaning | Example |
|------|---------|---------|
| **Simple (atomic)** | Cannot be divided further | `age`, `roll_no` |
| **Composite** | Can be broken into sub-parts | `name` → first, middle, last |
| **Single-valued** | Holds exactly one value | `date_of_birth` |
| **Multi-valued** | Can hold many values | `phone_numbers`, `emails` |
| **Derived** | Computed from other attributes | `age` from `DOB` |
| **Stored** | Physically stored, used to derive others | `DOB` |
| **Key** | Uniquely identifies an entity | `roll_no` |
| **Complex** | Composite + multivalued combined | multiple addresses each with parts |
| **NULL** | Value unknown / not applicable | `middle_name` = NULL |

## ER Diagram Notation

```text
Ellipse            → simple attribute      ( name )
Underlined ellipse → key attribute         ( _id_ )
Double ellipse     → multivalued attribute (( phone ))
Dashed ellipse     → derived attribute     ( age ) with dashes
Ellipse w/ sub-    → composite attribute
  ellipses            ( name )──( first )
                              └─( last )
```

## Detailed Examples

- **Composite:** `address` → { street, city, state, pincode }. Composite attributes let applications access the whole value or its parts.
- **Multivalued:** a person may have several `phone_numbers`. In relational mapping this becomes a **separate table** (person_id, phone).
- **Derived vs Stored:** `age` is **derived** from the **stored** `date_of_birth` — storing age would risk becoming stale, so it is computed on demand.

```sql
-- Multivalued attribute mapped to its own table
CREATE TABLE person_phone (
  person_id INT,
  phone     VARCHAR(15),
  PRIMARY KEY (person_id, phone),
  FOREIGN KEY (person_id) REFERENCES person(id)
);
```

## Key points
- **Simple vs Composite** = divisibility; **Single- vs Multi-valued** = number of values.
- **Derived** attributes are computed from **stored** ones (avoid redundancy/staleness).
- **Key** attributes uniquely identify an entity and are underlined in ER diagrams.
- **Multivalued** and **composite** attributes need special handling when mapping ER → relational tables (often a separate table for multivalued).
