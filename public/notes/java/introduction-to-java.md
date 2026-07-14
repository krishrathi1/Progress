## Definition

**Java** is a high-level, class-based, **object-oriented** programming language developed by Sun Microsystems (1995), now owned by Oracle. Its defining promise is **WORA — "Write Once, Run Anywhere"**: source code is compiled to platform-independent **bytecode** that runs on any device with a **Java Virtual Machine (JVM)**.

## Key Characteristics

- **Platform independent** – bytecode runs on any JVM, regardless of OS/hardware.
- **Object-oriented** – everything (except primitives) is modeled as objects.
- **Simple & robust** – no explicit pointers; automatic **garbage collection** prevents most memory leaks.
- **Secure** – code runs inside the JVM sandbox with a bytecode verifier.
- **Multithreaded** – built-in support for concurrent execution.
- **Compiled + Interpreted** – compiled to bytecode, then interpreted/JIT-compiled at runtime.
- **Statically typed** – variable types are checked at compile time.

## How Java Achieves Portability

```text
  MyApp.java  --javac-->  MyApp.class (bytecode)
                                |
             +------------------+------------------+
             |                  |                  |
         JVM (Windows)     JVM (Linux)        JVM (macOS)
             |                  |                  |
        runs natively     runs natively      runs natively
```

The **same `.class` file** works everywhere; only the JVM differs per platform.

## Where Java Is Used

| Domain | Examples |
|--------|----------|
| Enterprise / backend | Spring, banking systems |
| Android apps | Android SDK (Java/Kotlin) |
| Big data | Hadoop, Kafka, Spark |
| Web servers | Tomcat, Jetty |
| Desktop GUI | Swing, JavaFX |

## Minimal Example

```java
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}
```

## Key points

- Java = **high-level, OOP, platform-independent** language following **WORA**.
- Source `.java` → **bytecode** `.class` → executed by the **JVM**.
- Portability comes from bytecode + a platform-specific JVM.
- Features: object-oriented, secure, robust, multithreaded, automatic GC.
- Widely used for enterprise backends, Android, and big-data systems.
