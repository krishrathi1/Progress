## Definition

**JDBC (Java Database Connectivity)** is a standard Java API (`java.sql` / `javax.sql`) that lets Java programs connect to and execute queries against relational databases in a database-independent way. Your code talks to interfaces; a vendor-supplied **JDBC driver** implements them for a specific database (MySQL, PostgreSQL, Oracle, etc.).

## Core interfaces

| Interface | Role |
|-----------|------|
| `DriverManager` | Factory that returns a `Connection` for a given URL |
| `DataSource` | Preferred, poolable alternative to `DriverManager` |
| `Connection` | An open session with the database |
| `Statement` / `PreparedStatement` | Sends SQL to the DB |
| `ResultSet` | Table of rows returned by a query |

## Steps to connect

- **Add the driver** to the classpath (e.g. `mysql-connector-j.jar` / Maven dependency). Since JDBC 4.0, drivers are auto-loaded via SPI, so `Class.forName(...)` is usually optional.
- **Build the JDBC URL**: `jdbc:<subprotocol>://<host>:<port>/<database>`.
- **Open a `Connection`** with `DriverManager.getConnection(url, user, password)`.
- **Use** the connection (statements, queries).
- **Close** it — best done with try-with-resources so it closes automatically.

```text
Java App → DriverManager → JDBC Driver → Database
   (java.sql interfaces)   (vendor impl)   (MySQL/…)
```

## Example

```java
import java.sql.*;

public class ConnectDemo {
    public static void main(String[] args) {
        String url  = "jdbc:mysql://localhost:3306/school";
        String user = "root";
        String pass = "secret";

        // try-with-resources auto-closes the connection
        try (Connection con = DriverManager.getConnection(url, user, pass)) {
            System.out.println("Connected: " + !con.isClosed());
            DatabaseMetaData md = con.getMetaData();
            System.out.println("DB: " + md.getDatabaseProductName());
        } catch (SQLException e) {
            e.printStackTrace(); // handle connection failures
        }
    }
}
```

## Key points

- JDBC is an **abstraction**: same API, different drivers per database.
- `Class.forName("com.mysql.cj.jdbc.Driver")` is legacy; auto-registration works since JDBC 4.0.
- Always **close** `Connection`, `Statement`, `ResultSet` (use try-with-resources) to avoid resource leaks.
- In real apps use a **connection pool** (HikariCP) via `DataSource` instead of opening a raw connection each time.
- `getConnection` throws checked `SQLException` — must be handled or declared.
