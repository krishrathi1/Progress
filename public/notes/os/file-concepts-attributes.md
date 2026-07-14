## Definition

A **file** is a named, logical collection of related information stored on secondary storage (disk, SSD). It is the OS's abstraction over raw blocks — the user sees a continuous stream of bytes or records, while the file system maps it to scattered physical blocks. Files are the smallest unit of logical storage a user directly names and manipulates.

## File attributes (metadata)

Every file carries metadata, typically stored in a directory entry or an **inode**:

| Attribute      | Meaning                                             |
|----------------|-----------------------------------------------------|
| **Name**       | Human-readable identifier                            |
| **Identifier** | Unique tag (e.g., inode number) inside the FS        |
| **Type**       | Format/category (text, binary, executable, .pdf)     |
| **Location**   | Pointer to the device and blocks holding the data    |
| **Size**       | Current size in bytes (and possibly max size)        |
| **Protection** | Access-control bits (read/write/execute per user)    |
| **Timestamps** | Created / last modified / last accessed times        |
| **Owner/User** | User and group IDs owning the file                   |

## File operations

The OS exposes system calls to act on files:

- **Create** — allocate space and a directory entry.
- **Open / Close** — set up (and tear down) an entry in the per-process open-file table.
- **Read / Write** — transfer data at the current file-position pointer.
- **Seek (reposition)** — move the file pointer without I/O.
- **Delete / Truncate** — free blocks; truncate keeps attributes but discards contents.

```text
Directory entry / inode
+------------------------------------------+
| name: report.txt                         |
| id (inode): 20431                         |
| type: text                                |
| size: 4096 bytes                          |
| owner: krish   perms: rw-r--r--           |
| blocks -> [ 12, 13, 27, 40 ]              |
| created / modified / accessed timestamps  |
+------------------------------------------+
```

## Key points

- A file = data (contents) + metadata (attributes); attributes are stored separately from contents, usually in an inode/directory entry.
- **Open-file table:** the OS keeps open files in memory with a file pointer, access rights, and a reference count to avoid re-reading metadata on every operation.
- File **type** may be encoded via extension, magic number, or a stored attribute.
- Metadata like timestamps and permissions are central to security, backups, and scheduling.
