## Definition

`BufferedReader` and `BufferedWriter` are **character-stream wrapper classes** in `java.io`. They add an in-memory buffer around another `Reader`/`Writer`, so data is transferred in large chunks instead of one character at a time. This drastically cuts the number of expensive I/O system calls.

- `BufferedReader` wraps a `Reader` (e.g. `FileReader`, `InputStreamReader`).
- `BufferedWriter` wraps a `Writer` (e.g. `FileWriter`, `OutputStreamWriter`).

## Why buffering matters

```text
Without buffer:  read() -> disk, read() -> disk, ...   (1 syscall per char)
With buffer:     [........8192 chars........] -> 1 disk read, served from RAM
```

The default buffer is **8192 characters**; a custom size can be passed to the constructor.

## Key methods

| Class | Method | Purpose |
|-------|--------|---------|
| BufferedReader | `readLine()` | Reads one line, returns `null` at end of stream |
| BufferedReader | `read()` / `read(char[])` | Reads a char / block |
| BufferedWriter | `write(String)` | Writes text to buffer |
| BufferedWriter | `newLine()` | Writes platform line separator |
| BufferedWriter | `flush()` | Forces buffer to the underlying stream |

## Reading a file line by line

```java
try (BufferedReader br = new BufferedReader(new FileReader("in.txt"))) {
    String line;
    while ((line = br.readLine()) != null) {
        System.out.println(line);
    }
}
```

## Writing with a buffer

```java
try (BufferedWriter bw = new BufferedWriter(new FileWriter("out.txt"))) {
    bw.write("Hello");
    bw.newLine();           // portable line break
    bw.write("World");
}   // try-with-resources auto-flushes & closes
```

## Fast console input

```java
BufferedReader in = new BufferedReader(new InputStreamReader(System.in));
int n = Integer.parseInt(in.readLine().trim());
```

`BufferedReader` is preferred over `Scanner` in competitive programming because it is significantly faster (no regex parsing/tokenizing).

## Key points

- **Always wrap** a raw reader/writer to reduce system calls.
- `readLine()` returning `null` signals end of stream (not an empty string).
- `newLine()` writes the OS-specific separator, unlike a hardcoded `"\n"`.
- **Flush/close** the writer or buffered data may be lost; try-with-resources handles this automatically.
- `BufferedReader` gives `readLine()`, which raw `FileReader` lacks.
- Buffering is orthogonal to encoding — wrap `InputStreamReader` to control charset.
