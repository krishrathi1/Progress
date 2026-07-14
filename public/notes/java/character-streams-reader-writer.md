## Definition

**Character streams** read and write data as **16-bit Unicode characters** rather than raw bytes. They automatically handle **character encoding/decoding** (e.g. UTF-8), making them the correct choice for **text data**. They are rooted at two abstract classes in `java.io`:

- **`Reader`** — superclass of all character input streams.
- **`Writer`** — superclass of all character output streams.

## Class hierarchy

```text
Reader (abstract)                  Writer (abstract)
  ├─ InputStreamReader               ├─ OutputStreamWriter
  │    └─ FileReader                 │    └─ FileWriter
  ├─ BufferedReader                  ├─ BufferedWriter
  └─ CharArrayReader                 └─ PrintWriter
```

`InputStreamReader`/`OutputStreamWriter` are **bridges** that convert bytes to characters using a charset.

## Core methods

| Reader | Writer |
|--------|--------|
| `int read()` — one char (-1 at EOF) | `void write(int c)` — one char |
| `int read(char[] buf)` | `void write(String s)` |
| `String readLine()` *(BufferedReader)* | `void newLine()` *(BufferedWriter)* |
| `void close()` | `void flush()` / `void close()` |

## Reading text

```java
import java.io.*;

public class ReadText {
    public static void main(String[] args) throws IOException {
        try (BufferedReader br = new BufferedReader(new FileReader("poem.txt"))) {
            String line;
            while ((line = br.readLine()) != null) {
                System.out.println(line);
            }
        }
    }
}
```

## Writing text

```java
try (BufferedWriter bw = new BufferedWriter(new FileWriter("out.txt"))) {
    bw.write("Hello, world");
    bw.newLine();
    bw.write("Second line");
}
```

Specifying an explicit encoding (recommended):

```java
Reader r = new InputStreamReader(new FileInputStream("f.txt"), "UTF-8");
```

```text
Bytes on disk ──(charset decode)──► Reader ──► char / String  (text in memory)
char / String ──► Writer ──(charset encode)──► Bytes on disk
```

## Byte streams vs character streams

| Aspect | Byte streams | Character streams |
|--------|--------------|-------------------|
| Unit | 8-bit byte | 16-bit char |
| Base classes | InputStream/OutputStream | Reader/Writer |
| Best for | Binary (images, audio) | Text |
| Encoding | None (raw) | Automatic (charset) |

## Key points

- Use character streams for **text**; they correctly decode/encode Unicode.
- `BufferedReader.readLine()` is the standard, efficient way to read text line by line; it returns **null at end of file**.
- Wrap streams in `Buffered*` classes for performance; always `close()` (use try-with-resources).
- Specify an explicit charset (e.g. UTF-8) to avoid platform-default surprises.
- `FileReader`/`FileWriter` use the default encoding — for control, use `InputStreamReader`/`OutputStreamWriter`.
