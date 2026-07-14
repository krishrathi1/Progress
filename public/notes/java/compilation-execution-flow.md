## Definition

Java is both **compiled and interpreted**. Source code (`.java`) is compiled by `javac` into **bytecode** (`.class`) — a platform-independent intermediate representation. At runtime the **JVM** loads that bytecode and executes it, interpreting it and JIT-compiling hot paths to native code. This two-step model is the basis of Java's *"Write Once, Run Anywhere"* (WORA) promise.

## Step-by-step flow

1. **Write** source code in a `.java` file (class name must match the public class).
2. **Compile**: `javac Hello.java` → produces `Hello.class` (bytecode). Compile-time errors are caught here.
3. **Class loading**: the `ClassLoader` loads `.class` into JVM memory.
4. **Bytecode verification**: the *verifier* checks bytecode for safety (no illegal access, valid types).
5. **Execution**: the *interpreter* runs bytecode; the **JIT compiler** compiles frequently used code to native machine code for speed.
6. **Runtime**: output produced; runtime errors/exceptions may occur here.

```text
Hello.java  --javac-->  Hello.class  --JVM-->  Native execution
 (source)   (compile)   (bytecode)  (load+     (output)
                                     verify+
                                     interpret/JIT)
```

## Commands

```java
// 1. Compile
// > javac Hello.java     (creates Hello.class)
// 2. Run
// > java Hello           (no .class extension)

class Hello {
    public static void main(String[] args) {
        System.out.println("Compiled once, runs anywhere");
    }
}
```

## Compile-time vs Runtime

| Aspect | Compile-time | Runtime |
|--------|-------------|---------|
| Tool | `javac` | `java` (JVM) |
| Output | `.class` bytecode | Program result |
| Errors caught | Syntax, type errors | Exceptions, logic errors |
| Example error | Missing semicolon | `NullPointerException` |

## Key points

- `javac` produces **bytecode**, not native code; the JVM makes it portable.
- The same `.class` runs on any OS that has a compatible JVM (WORA).
- **JIT** compilation gives Java near-native speed for hot code.
- Run with `java ClassName` — omit the `.class` extension.
- Bytecode verification adds a security layer before execution.
