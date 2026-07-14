## Definition

**Byte streams** read and write data **8 bits (one byte) at a time**, making them suitable for **binary data** such as images, audio, video, PDFs, or any raw bytes. They are rooted at two abstract classes in `java.io`:

- **`InputStream`** — superclass of all byte input streams (reading).
- **`OutputStream`** — superclass of all byte output streams (writing).

Use byte streams for binary; use **character streams** (`Reader`/`Writer`) for text.

## Class hierarchy

```text
InputStream (abstract)              OutputStream (abstract)
  ├─ FileInputStream                  ├─ FileOutputStream
  ├─ ByteArrayInputStream             ├─ ByteArrayOutputStream
  ├─ BufferedInputStream              ├─ BufferedOutputStream
  └─ DataInputStream                  └─ DataOutputStream
```

## Core methods

| InputStream | OutputStream |
|-------------|--------------|
| `int read()` — one byte (-1 at EOF) | `void write(int b)` — one byte |
| `int read(byte[] b)` — into buffer | `void write(byte[] b)` — buffer |
| `int available()` | `void flush()` |
| `void close()` | `void close()` |

## Copying a file byte by byte

```java
import java.io.*;

public class ByteCopy {
    public static void main(String[] args) throws IOException {
        try (FileInputStream in  = new FileInputStream("in.jpg");
             FileOutputStream out = new FileOutputStream("out.jpg")) {

            byte[] buffer = new byte[4096];
            int bytesRead;
            while ((bytesRead = in.read(buffer)) != -1) {
                out.write(buffer, 0, bytesRead);
            }
        } // streams auto-closed by try-with-resources
    }
}
```

Reading a single byte at a time (simpler but slower):

```java
int b;
while ((b = in.read()) != -1) {
    out.write(b);
}
```

```text
Source file ─► [ FileInputStream ] ─byte[]─► [ FileOutputStream ] ─► Dest file
                     read()                        write()
   read() returns -1  ==  end of file reached
```

## Buffering for performance

Wrap raw streams in `BufferedInputStream` / `BufferedOutputStream` to reduce costly system calls:

```java
try (var in  = new BufferedInputStream(new FileInputStream("in.dat"));
     var out = new BufferedOutputStream(new FileOutputStream("out.dat"))) {
    int b;
    while ((b = in.read()) != -1) out.write(b);
}
```

## Key points

- Byte streams handle **raw binary data**; a single-byte `read()` returns **-1 at end of stream**.
- Always **close** streams — use **try-with-resources** so they close automatically.
- `flush()` forces buffered bytes out; closing a stream flushes it too.
- Use a **byte[] buffer** or a `Buffered*Stream` for efficiency instead of byte-by-byte I/O.
- For text data, prefer character streams to handle encoding correctly.
