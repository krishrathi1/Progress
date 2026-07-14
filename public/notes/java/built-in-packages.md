## Definition

**Built-in packages** are the ready-made libraries bundled with the JDK (the **Java API**). They provide thousands of tested classes for common tasks — data structures, I/O, networking, math, dates — so you don't reinvent them. They live under the `java.*` and `javax.*` namespaces.

## Core packages

| Package | Purpose | Common classes |
|---------|---------|----------------|
| `java.lang` | Core language types (auto-imported) | `Object`, `String`, `Math`, `System`, `Integer`, `Thread` |
| `java.util` | Collections & utilities | `ArrayList`, `HashMap`, `Scanner`, `Random`, `Arrays` |
| `java.io` | Input/output streams | `File`, `BufferedReader`, `InputStream`, `PrintWriter` |
| `java.nio` | Non-blocking / buffer-based I/O | `Path`, `Files`, `ByteBuffer` |
| `java.net` | Networking | `Socket`, `URL`, `HttpURLConnection` |
| `java.time` | Modern date & time (Java 8+) | `LocalDate`, `LocalDateTime`, `Duration` |
| `java.sql` | Database access (JDBC) | `Connection`, `Statement`, `ResultSet` |
| `javax.swing` | GUI components | `JFrame`, `JButton`, `JPanel` |

## Example

```java
import java.util.ArrayList;
import java.util.Scanner;

public class Demo {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);        // java.util
        ArrayList<Integer> nums = new ArrayList<>(); // java.util
        nums.add(sc.nextInt());
        System.out.println(Math.max(10, 20));        // java.lang (auto)
    }
}
```

## Hierarchy

```text
java
├── lang   (auto-imported)
├── util
│    └── concurrent   <- sub-package, needs its own import
├── io
├── net
└── time
```

## Key points

- **`java.lang` is imported automatically** — `String`, `System`, `Math`, wrapper classes need no import.
- Every other built-in package must be **explicitly imported** before use.
- `java.util.*` does **not** include `java.util.concurrent` — sub-packages import separately.
- `javax.*` historically marked "extension" packages (e.g., `javax.swing`); today they are a standard part of the JDK.
- Knowing which package a class lives in speeds up coding and interview recall (e.g., `Scanner` → `java.util`, `File` → `java.io`).
