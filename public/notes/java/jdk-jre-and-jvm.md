## Definition

These three form the layered Java platform:

- **JVM (Java Virtual Machine)** – the abstract engine that **loads, verifies, and executes bytecode**. It is platform-specific and provides portability.
- **JRE (Java Runtime Environment)** – the **runtime** to *run* Java programs: **JVM + core libraries** (`java.lang`, `java.util`, etc.) + supporting files. It cannot compile code.
- **JDK (Java Development Kit)** – the full **development** kit to *build and run* Java: **JRE + development tools** like `javac` (compiler), `jar`, `javadoc`, `jdb` (debugger).

## Containment Relationship

```text
+-------------------------------------------+
|  JDK  (develop + run)                      |
|   +-----------------------------------+    |
|   |  JRE  (run only)                  |    |
|   |    +-------------------------+    |    |
|   |    |  JVM (execute bytecode) |    |    |
|   |    +-------------------------+    |    |
|   |    + core class libraries    |    |    |
|   +-----------------------------------+    |
|   + javac, jar, javadoc, jdb ...           |
+-------------------------------------------+
```

**JDK ⊃ JRE ⊃ JVM**

## Comparison

| Aspect | JVM | JRE | JDK |
|--------|-----|-----|-----|
| Purpose | Execute bytecode | Run Java apps | Develop + run |
| Contains | Execution engine | JVM + libraries | JRE + dev tools |
| Compiler (`javac`)? | No | No | **Yes** |
| Platform dependent? | Yes | Yes | Yes |
| Who needs it | (internal) | End users | Developers |

## In Practice

```text
Write code   ->  need JDK   (javac MyApp.java)
Only run     ->  need JRE   (java MyApp)
Execute      ->  JVM does the actual work
```

Since Java 11, Oracle no longer ships a standalone JRE download — you typically install the **JDK**, which bundles everything.

## Key points

- **JVM** executes bytecode and is **platform-specific** — the source of portability.
- **JRE = JVM + libraries**; enough to **run** but not compile.
- **JDK = JRE + tools** (`javac`, `jar`, `javadoc`); needed to **develop**.
- Containment: **JDK ⊃ JRE ⊃ JVM**.
- Developers install the **JDK**; only running a program needs the **JRE**.
