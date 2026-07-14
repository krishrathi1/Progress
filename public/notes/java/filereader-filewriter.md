## Definition

**`FileReader`** and **`FileWriter`** are convenience **character-stream** classes in `java.io` for reading from and writing to **text files**. They extend `InputStreamReader`/`OutputStreamWriter` and read/write data as characters, handling the default platform encoding automatically.

- `FileReader` — reads characters from a file.
- `FileWriter` — writes characters to a file.

## FileWriter — writing text

```java
import java.io.*;

public class WriteDemo {
    public static void main(String[] args) throws IOException {
        try (FileWriter fw = new FileWriter("notes.txt")) {   // overwrites by default
            fw.write("Line one\n");
            fw.write("Line two\n");
        }
    }
}
```

**Append mode** — pass `true` as the second argument so existing content is kept:

```java
FileWriter fw = new FileWriter("notes.txt", true); // append instead of overwrite
```

## FileReader — reading text

```java
import java.io.*;

public class ReadDemo {
    public static void main(String[] args) throws IOException {
        try (FileReader fr = new FileReader("notes.txt")) {
            int c;
            while ((c = fr.read()) != -1) {   // read() returns -1 at end of file
                System.out.print((char) c);
            }
        }
    }
}
```

## Reading efficiently with BufferedReader

`FileReader` reads one character at a time, which is slow. Wrap it in a `BufferedReader` to read whole lines:

```java
try (BufferedReader br = new BufferedReader(new FileReader("notes.txt"))) {
    String line;
    while ((line = br.readLine()) != null) {
        System.out.println(line);
    }
}
```

```text
FileWriter.write(text)  ──► notes.txt on disk
notes.txt on disk       ──► FileReader.read()  ──► chars
      wrap in BufferedReader ──► readLine()  (fast, line-by-line)
```

## Constructor options

| Constructor | Behavior |
|-------------|----------|
| `new FileWriter("f.txt")` | Create/overwrite file |
| `new FileWriter("f.txt", true)` | Append to file |
| `new FileReader("f.txt")` | Open file for reading |

## Key points

- `FileReader`/`FileWriter` are for **text files**; use `FileInputStream`/`FileOutputStream` for binary.
- `FileWriter` **overwrites** by default — pass `true` for **append** mode.
- Always **close** the stream (use try-with-resources); closing flushes buffered output to disk.
- Wrap in `BufferedReader`/`BufferedWriter` for speed and line-based I/O.
- They use the **default charset**; for explicit encoding use `InputStreamReader`/`OutputStreamWriter`.
