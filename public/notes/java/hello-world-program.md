## The Program

The classic first Java program prints a line of text. It demonstrates Java's mandatory **class structure** and the special **`main`** entry point.

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

## Compile and Run

Save the file as **`HelloWorld.java`** — the filename **must match** the public class name.

```bash
javac HelloWorld.java   # compiles -> produces HelloWorld.class (bytecode)
java HelloWorld         # runs the bytecode on the JVM (no .class extension)
```

Output:

```text
Hello, World!
```

## Anatomy of Each Part

| Token | Meaning |
|-------|---------|
| `public class HelloWorld` | Declares a class; file name must be `HelloWorld.java` |
| `public` | Accessible from anywhere; JVM must reach `main` |
| `static` | Runs without creating an object of the class |
| `void` | `main` returns nothing |
| `main` | JVM's fixed entry-point method name |
| `String[] args` | Command-line arguments passed to the program |
| `System.out.println` | Prints text + newline to standard output |

## What Happens Under the Hood

```text
HelloWorld.java
     | javac  (compile)
     v
HelloWorld.class  (bytecode)
     | java   (JVM loads class)
     v
JVM finds  public static void main(String[])
     v
executes System.out.println  ->  "Hello, World!"
```

## Common Mistakes

- File name not matching the **public** class name → compile error.
- Wrong `main` signature (e.g., missing `String[] args`) → *"Main method not found"* at runtime.
- Running with `java HelloWorld.class` instead of `java HelloWorld`.

## Key points

- Every Java program lives inside a **class**; execution starts at **`public static void main(String[] args)`**.
- **`javac`** compiles `.java` → `.class` **bytecode**; **`java`** runs it on the JVM.
- The file name must match the **public class** name exactly (case-sensitive).
- `static` lets the JVM call `main` without instantiating the class.
- Run with the class name only, **without** the `.class` extension.
