## Definition

`java.util.Scanner` is a **text parser** that breaks input into tokens using a delimiter (whitespace by default) and converts them into primitives or strings. Besides `System.in`, a `Scanner` can read directly from a `File`, making it a convenient way to parse structured text files.

## Constructing a file Scanner

```java
import java.io.File;
import java.util.Scanner;

Scanner sc = new Scanner(new File("data.txt"));   // throws FileNotFoundException
```

You can also pass a `Path`, `InputStream`, or `String`. Optionally set a charset: `new Scanner(file, "UTF-8")`.

## Common methods

| Method | Returns |
|--------|---------|
| `hasNext()` / `next()` | token exists / next token (String) |
| `hasNextLine()` / `nextLine()` | line exists / rest of current line |
| `hasNextInt()` / `nextInt()` | next int available / parsed int |
| `nextDouble()`, `nextLong()` | typed token parsing |
| `useDelimiter(regex)` | change the token separator |

## Reading a whole file line by line

```java
try (Scanner sc = new Scanner(new File("data.txt"))) {
    while (sc.hasNextLine()) {
        String line = sc.nextLine();
        System.out.println(line);
    }
} catch (FileNotFoundException e) {
    e.printStackTrace();
}
```

## Reading mixed tokens

```java
// File: "Alice 30 5.5"
try (Scanner sc = new Scanner(new File("person.txt"))) {
    String name = sc.next();     // Alice
    int age     = sc.nextInt();  // 30
    double h    = sc.nextDouble();// 5.5
}
```

## The nextInt()/nextLine() pitfall

```text
nextInt() consumes "30" but leaves the trailing newline in the buffer.
A following nextLine() then returns "" (the empty leftover).
Fix: call sc.nextLine() once to discard the newline.
```

## Key points

- Constructor throws **checked** `FileNotFoundException` — handle or declare it.
- **Close the Scanner** (try-with-resources) to release the file handle.
- Scanner is convenient but **slower** than `BufferedReader` due to regex tokenizing; prefer `BufferedReader` for large files or performance-critical code.
- Watch the classic `nextInt()` then `nextLine()` leftover-newline bug.
- Use `hasNextXxx()` guards to avoid `NoSuchElementException` / `InputMismatchException`.
- `useDelimiter(",")` lets Scanner parse CSV-style data.
