## Definition

**Association** is a relationship between two independent classes where objects of one are connected to objects of another. It models a **"uses-a" / "knows-a"** link. Both objects have **independent lifecycles** — neither owns the other, and destroying one does not destroy the other. It is the most general of the object relationships; **aggregation** and **composition** are specialized (stronger) forms of it.

## Characteristics

- Represents *how objects interact* or refer to each other.
- Objects can exist independently before and after the relationship.
- Has a **multiplicity** (cardinality): one-to-one, one-to-many, many-to-many.
- Can be **unidirectional** (A knows B) or **bidirectional** (A knows B and B knows A).

```java
class Teacher {
    String name;
    Teacher(String n) { name = n; }
}
class Student {
    String name;
    Student(String n) { name = n; }
}

// Association: a Teacher teaches many Students; both live on their own
class School {
    void assign(Teacher t, Student s) {
        System.out.println(t.name + " teaches " + s.name);
    }
}
// Teacher and Student are created and destroyed independently
```

## Diagram

```text
   Teacher  ───────────►  Student        (uses-a / knows-a)
     1                      *              multiplicity: one-to-many

   Independent lifecycles:
   deleting the Teacher does NOT delete the Students.
```

## Association vs Aggregation vs Composition

| Relationship | Meaning | Ownership | Lifecycle tie |
|--------------|---------|-----------|---------------|
| Association | uses-a / knows-a | None | Independent |
| Aggregation | has-a (weak) | Weak (shared) | Independent |
| Composition | part-of (strong) | Strong (exclusive) | Part dies with whole |

## Key points

- Association = a general link between two independent objects; no ownership implied.
- Note the **multiplicity**: 1↔1, 1↔many, many↔many (e.g. Doctor ↔ Patients).
- Direction can be one-way or two-way.
- Aggregation and composition are just stronger, ownership-carrying kinds of association.
- Typical exam example: a `Teacher` and a `Student` — related, but each exists on its own.
