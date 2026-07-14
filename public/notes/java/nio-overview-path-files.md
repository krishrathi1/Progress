## Definition

**NIO.2** (`java.nio.file`, added in Java 7) is a modern file-system API that replaces much of the legacy `java.io.File`. Its two central types are:

- **`Path`** — an immutable, abstract representation of a file/directory location.
- **`Files`** — a utility class of **static methods** for creating, reading, writing, copying, moving, and deleting files.

## Creating a Path

```java
import java.nio.file.*;

Path p = Paths.get("data", "users.txt");   // relative path
Path abs = Path.of("/home/user/log.txt");  // Java 11+ factory
System.out.println(p.getFileName());        // users.txt
System.out.println(p.toAbsolutePath());
```

`Path` methods: `getParent()`, `getFileName()`, `resolve()`, `normalize()`, `relativize()`.

## Reading and writing whole files

```java
// Write
Files.writeString(p, "hello", StandardCharsets.UTF_8);   // Java 11+
Files.write(p, List.of("line1", "line2"), StandardOpenOption.APPEND);

// Read
String text        = Files.readString(p);     // Java 11+
List<String> lines = Files.readAllLines(p);
```

## Streaming large files

```java
try (Stream<String> s = Files.lines(p)) {      // lazy, memory-friendly
    s.filter(l -> l.contains("ERROR")).forEach(System.out::println);
}
```

## Common Files operations

| Operation | Method |
|-----------|--------|
| Exists? | `Files.exists(p)` |
| Create file/dir | `Files.createFile(p)` / `createDirectories(p)` |
| Copy / move | `Files.copy(a,b)` / `Files.move(a,b)` |
| Delete | `Files.delete(p)` / `deleteIfExists(p)` |
| Metadata | `Files.size(p)`, `Files.isDirectory(p)` |

## NIO vs legacy File

```text
 java.io.File            java.nio.file
 ------------            -------------
 method on File obj  ->  static Files.xxx(Path)
 boolean on failure  ->  throws detailed IOException
 no symbolic links   ->  link-aware, attribute views
 blocking only       ->  channels + async support
```

## Key points

- Prefer **`Path` + `Files`** over the old `File` class for new code.
- Legacy methods returned `false` on failure; NIO **throws `IOException`** with a real reason.
- `Files.lines()` returns a lazy `Stream` — use try-with-resources to close it.
- `readString`/`writeString` (Java 11+) simplify small-file I/O.
- `Path.resolve()` joins paths; `normalize()` removes `.` / `..`.
- NIO supports symbolic links, file attributes, directory walking (`Files.walk`), and channels for high-performance I/O.
