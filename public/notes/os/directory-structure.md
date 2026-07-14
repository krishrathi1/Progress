## Definition

A **directory** is a special file that maps human-readable file names to their metadata/location (inode numbers). The **directory structure** is the way directories are organized to group files, enabling naming, searching, and grouping. Different structures trade off simplicity, isolation, and sharing.

## Types of directory structures

- **Single-level:** One directory holds all files for all users.
  - Simple, but **naming collisions** (no two files can share a name) and no grouping. Impractical beyond tiny systems.
- **Two-level:** A separate directory per user, under a Master File Directory (MFD).
  - Solves name collisions across users; users are isolated. Sharing between users is awkward.
- **Tree-structured:** A hierarchy of directories and subdirectories (a rooted tree). The standard model.
  - Supports grouping, absolute/relative paths, and a current working directory. Each file has a **unique path**; no cycles.
- **Acyclic-graph:** Allows **shared** subdirectories/files via links (hard/symbolic), so one file appears in multiple directories — but no cycles.
  - Enables collaboration; complicates deletion (needs reference counts).
- **General graph:** Permits cycles too.
  - Most flexible but needs **garbage collection** and cycle detection to reclaim space and avoid infinite traversal.

```text
Tree-structured directory
                root(/)
              /    |     \
           home   bin     etc
          /    \           \
       krish   guest       passwd
       /   \
   a.txt  projects
             \
            main.c
```

## Comparison

| Structure     | Name collisions | Grouping | Sharing | Complexity |
|---------------|-----------------|----------|---------|------------|
| Single-level  | Yes (bad)       | No       | No      | Very low   |
| Two-level     | Avoided         | Per user | Poor    | Low        |
| Tree          | Avoided         | Yes      | Limited | Medium     |
| Acyclic graph | Avoided         | Yes      | Yes     | High       |
| General graph | Avoided         | Yes      | Yes     | Highest    |

## Key points

- Directory operations: create, delete, search, list, rename files, traverse the filesystem.
- **Absolute path** starts from root `/`; **relative path** starts from the current working directory.
- Acyclic-graph structures use **links** for sharing and **reference counts** so a file's blocks are freed only when the last link is removed.
- General graphs require cycle handling and garbage collection to avoid leaks.
