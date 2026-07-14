## Definition

**CRUD** stands for **Create, Read, Update, Delete** — the four basic operations on database rows, mapped to SQL `INSERT`, `SELECT`, `UPDATE`, `DELETE`. In JDBC these run through a `Statement` or, preferably, a `PreparedStatement`.

## Statement vs PreparedStatement

| Feature | `Statement` | `PreparedStatement` |
|---------|-------------|---------------------|
| SQL | Built by string concatenation | Precompiled with `?` placeholders |
| SQL injection | Vulnerable | Safe (parameters bound) |
| Performance | Recompiled each time | Reused / cached plan |
| Use for | Static, one-off SQL | Parameterized, repeated SQL |

Two execution methods:
- **`executeQuery()`** → returns a `ResultSet` (for `SELECT`).
- **`executeUpdate()`** → returns an `int` row count (for `INSERT`/`UPDATE`/`DELETE`).

## Full CRUD example

```java
import java.sql.*;

public class Crud {
    static final String URL = "jdbc:mysql://localhost:3306/school";

    public static void main(String[] args) throws SQLException {
        try (Connection con = DriverManager.getConnection(URL, "root", "secret")) {

            // CREATE (INSERT)
            try (PreparedStatement ps = con.prepareStatement(
                    "INSERT INTO students(id, name, marks) VALUES(?,?,?)")) {
                ps.setInt(1, 1);
                ps.setString(2, "Asha");
                ps.setInt(3, 88);
                System.out.println("Inserted rows: " + ps.executeUpdate());
            }

            // READ (SELECT)
            try (PreparedStatement ps = con.prepareStatement(
                    "SELECT id, name, marks FROM students WHERE marks > ?")) {
                ps.setInt(1, 50);
                try (ResultSet rs = ps.executeQuery()) {
                    while (rs.next()) {
                        System.out.printf("%d %s %d%n",
                            rs.getInt("id"), rs.getString("name"), rs.getInt("marks"));
                    }
                }
            }

            // UPDATE
            try (PreparedStatement ps = con.prepareStatement(
                    "UPDATE students SET marks = ? WHERE id = ?")) {
                ps.setInt(1, 95);
                ps.setInt(2, 1);
                System.out.println("Updated: " + ps.executeUpdate());
            }

            // DELETE
            try (PreparedStatement ps = con.prepareStatement(
                    "DELETE FROM students WHERE id = ?")) {
                ps.setInt(1, 1);
                System.out.println("Deleted: " + ps.executeUpdate());
            }
        }
    }
}
```

## ResultSet iteration

```text
rs.next() moves cursor row-by-row:
 cursor→ [ before first ]
         [ id=2, name=Ravi ]  ← rs.next() == true
         [ id=3, name=Sita ]  ← rs.next() == true
         [ after last  ]      ← rs.next() == false → loop ends
```

## Key points

- Prefer **`PreparedStatement`** — prevents SQL injection and is faster on reuse.
- `executeQuery` → `ResultSet`; `executeUpdate` → affected-row count.
- Read `ResultSet` columns by name (`getString("name")`) or 1-based index (`getString(2)`).
- For multiple writes as a unit, disable auto-commit and use **transactions** (`con.setAutoCommit(false)`, `commit()`, `rollback()`); batch inserts with `addBatch()`/`executeBatch()`.
- Always close resources — try-with-resources closes `ResultSet`, `PreparedStatement`, and `Connection` in reverse order.
