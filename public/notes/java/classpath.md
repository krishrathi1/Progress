## Definition

The **CLASSPATH** is the parameter that tells the JVM and the Java compiler **where to look for user-defined classes and packages** (`.class` files, `.jar` archives, and directories). When you reference a class, the class loader searches every entry on the classpath, in order, until it finds a matching `.class` file.

## Why it matters

- Without a correct classpath you get `ClassNotFoundException` (at runtime) or `NoClassDefFoundError`, or a `cannot find symbol` error at compile time.
- It lets you keep source, compiled output, and third-party libraries in separate locations.

## Ways to set the classpath

| Method | Scope | Example |
|--------|-------|---------|
| `-cp` / `-classpath` flag | Per command (best) | `java -cp bin;lib/x.jar App` |
| `CLASSPATH` env variable | All commands in shell | `set CLASSPATH=bin;lib/*` |
| Default | Current dir `.` | Used only if nothing else set |
| `Class-Path` in JAR manifest | For a specific jar | `Class-Path: lib/x.jar` |

- On **Windows** entries are separated by `;`; on **Linux/macOS** by `:`.
- `lib/*` includes every `.jar` in `lib` (not subfolders).

## Example

```text
project/
  src/com/app/Main.java
  bin/                <- compiled classes go here
  lib/gson.jar
```

```java
// src/com/app/Main.java
package com.app;
public class Main {
    public static void main(String[] args) {
        System.out.println("Classpath demo");
    }
}
```

```text
# Compile: put output in bin, reference the jar
javac -d bin -cp lib/gson.jar src/com/app/Main.java

# Run: bin holds our classes, jar is a dependency
java -cp "bin;lib/gson.jar" com.app.Main   (Windows)
java -cp "bin:lib/gson.jar" com.app.Main   (Linux/macOS)
```

## How the search works

```text
Reference to com.app.Main
        |
        v
 Class loader scans classpath entries left to right:
   bin/  -> looks for bin/com/app/Main.class  -> FOUND -> load
   (if not found in any entry -> ClassNotFoundException)
```

## Key points

- Classpath ≠ **PATH**: PATH locates executables (`java`, `javac`); CLASSPATH locates `.class`/`.jar` files.
- Prefer the **`-cp` flag** over the environment variable — it is explicit and per-project.
- Setting `CLASSPATH` env var **overrides** the default `.` (current directory); include `.` yourself if you still need it.
- Package names map to folder structure relative to a classpath root (`com.app.Main` -> `<root>/com/app/Main.class`).
