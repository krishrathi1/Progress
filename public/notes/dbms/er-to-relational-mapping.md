## Definition

**ER-to-relational mapping** is the process of converting a conceptual ER diagram into a set of relational tables (schemas) so it can be implemented in an RDBMS. It follows a fixed set of rules for entities, attributes, and relationships.

## Mapping Rules

### 1. Strong entity
Create a table with all simple attributes; the entity's primary key becomes the table's primary key.
```sql
CREATE TABLE Student (
  StudentID INT PRIMARY KEY,
  name      VARCHAR(50)
);
```

### 2. Weak entity
Create a table including the owner's primary key as a **foreign key**; the primary key = owner PK + partial key.
```sql
CREATE TABLE Dependent (
  EmpID INT, name VARCHAR(50), age INT,
  PRIMARY KEY (EmpID, name),
  FOREIGN KEY (EmpID) REFERENCES Employee(EmpID)
);
```

### 3. Relationships

| Cardinality | Mapping strategy |
|-------------|------------------|
| **1:1** | Add FK to either side (prefer the total-participation side). |
| **1:N** | Add the "1" side's PK as a **FK on the "N" side** table. |
| **M:N** | Create a **new junction table** with both PKs as a composite key. |

```sql
-- M:N: Student enrolls in Course
CREATE TABLE Enrolls (
  StudentID INT, CourseID INT, grade CHAR(2),
  PRIMARY KEY (StudentID, CourseID),
  FOREIGN KEY (StudentID) REFERENCES Student(StudentID),
  FOREIGN KEY (CourseID)  REFERENCES Course(CourseID)
);
```

### 4. Attributes
- **Composite** → store each leaf as a separate column.
- **Multivalued** → create a **separate table** with the entity's PK + the value.
- **Derived** → usually not stored (computed on query).

```text
1:N   Dept(1) ── Emp(N)   =>  Emp gets DeptID FK
M:N   Student ── Course    =>  new Enrolls table
Multivalued phone          =>  Phone(EmpID, phone)
```

## Key points

- Each **strong entity** and **M:N relationship** becomes its own table.
- **1:N** relationships need **no new table** — put the FK on the many side.
- **Multivalued attributes** always require a separate table.
- Weak entities embed the owner's PK as a **foreign key + part of the composite key**.
- Goal: preserve all constraints while minimizing redundancy.
