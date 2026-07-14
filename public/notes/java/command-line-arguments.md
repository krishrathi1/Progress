## Definition

**Command-line arguments** are values passed to a Java program when it is launched from the terminal. They arrive in the `main` method's `String[] args` parameter, letting you configure a program's behaviour without changing its code.

```java
public static void main(String[] args) { ... }
```

- `args[0]` is the **first** argument (not the program name, unlike C).
- `args.length` gives the number of arguments passed.
- Every argument is a `String`; convert as needed.

## How they flow

```text
$ java Sum 10 20 30
        │   └──┬──┘
        │      └── args = ["10", "20", "30"]
        └── class name (NOT in args)

args[0]="10"  args[1]="20"  args[2]="30"  args.length=3
```

## Code example

```java
public class Sum {
    public static void main(String[] args) {
        if (args.length == 0) {
            System.out.println("Usage: java Sum n1 n2 ...");
            return;
        }
        int total = 0;
        for (String a : args) {
            total += Integer.parseInt(a);   // String -> int
        }
        System.out.println("Sum = " + total);
    }
}
```

Run:

```text
$ javac Sum.java
$ java Sum 10 20 30
Sum = 60
```

## Handling quotes and conversion

- Arguments with spaces must be quoted: `java Greet "John Doe"` → `args[0]` = `"John Doe"`.
- Numeric parsing: `Integer.parseInt`, `Double.parseDouble` (throws `NumberFormatException` on bad input).
- Always validate `args.length` before indexing to avoid `ArrayIndexOutOfBoundsException`.

## Key points

- Arguments are received as `String[] args`; there is **no** program-name element at `args[0]`.
- Use `args.length` to check how many were passed before accessing indices.
- Convert strings to numbers explicitly with wrapper parse methods.
- Enclose multi-word arguments in quotes so they count as one element.
- For complex CLIs, prefer a library (e.g. picocli, Apache Commons CLI) over manual parsing.
- Command-line args differ from `Scanner` input: they are fixed at launch, not read interactively.
