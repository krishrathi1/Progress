## Definition

`java.io.File` is an **abstract representation of a file or directory pathname**. A `File` object describes a path in the file system — it does **not** contain the file's data. Creating a `File` object does not create a physical file; it only models the path, which may or may not exist on disk.

## Creating a File object

```java
File f1 = new File("data.txt");              // relative path
File f2 = new File("C:/reports/july.csv");   // absolute path
File f3 = new File("C:/reports", "july.csv"); // parent + child
```

## Common methods

| Method | Returns | Purpose |
|--------|---------|---------|
| `exists()` | boolean | Whether the path exists |
| `createNewFile()` | boolean | Create empty file if absent |
| `mkdir()` / `mkdirs()` | boolean | Create dir / dirs incl. parents |
| `delete()` | boolean | Delete file or empty dir |
| `isFile()` / `isDirectory()` | boolean | Type check |
| `getName()` | String | File name only |
| `getAbsolutePath()` | String | Full path |
| `length()` | long | Size in bytes |
| `canRead()` / `canWrite()` | boolean | Permissions |
| `list()` / `listFiles()` | String[] / File[] | Directory contents |
| `renameTo(File)` | boolean | Rename/move |

## Example

```java
import java.io.File;
import java.io.IOException;

public class FileDemo {
    public static void main(String[] args) throws IOException {
        File file = new File("notes.txt");

        if (file.createNewFile())
            System.out.println("Created: " + file.getName());
        else
            System.out.println("Already exists");

        System.out.println("Path : " + file.getAbsolutePath());
        System.out.println("Size : " + file.length() + " bytes");
        System.out.println("Writable? " + file.canWrite());
    }
}
```

## Listing a directory

```java
File dir = new File("C:/reports");
if (dir.isDirectory()) {
    for (File child : dir.listFiles())
        System.out.println(child.getName());
}
```

```text
File object  ── models ──►  "C:/reports/july.csv"  (a pathname)
                              │
        exists()? isFile()? length()?  ── query metadata
        createNewFile() / delete()     ── modify existence
```

## Key points

- A `File` object is just a **path handle**; it holds no file contents.
- Use byte/character streams (`FileReader`, `FileInputStream`) to read/write data.
- Methods like `delete()` and `createNewFile()` return a **boolean** rather than throwing — always check the result.
- `mkdirs()` creates missing parent directories; `mkdir()` does not.
- The modern alternative is **`java.nio.file.Path` + `Files`**, which throws detailed exceptions instead of returning booleans.
