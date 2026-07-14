## Definition

**Multithreading models** describe how **user-level threads (ULT)** are mapped onto **kernel-level threads (KLT)** for scheduling. There are three classic models: **Many-to-One**, **One-to-One**, and **Many-to-Many**.

## The three models

```text
Many-to-One        One-to-One         Many-to-Many
 U U U              U   U   U           U U U U
  \|/               |   |   |            \ | | /
   K                K   K   K            K   K   K
```

### 1. Many-to-One

Many user threads map to a single kernel thread.

- Thread management is done in user space -> efficient.
- **Drawback:** one blocking system call blocks the whole process; no true multicore parallelism.
- Example: early Green Threads.

### 2. One-to-One

Each user thread maps to its own kernel thread.

- True parallelism; a blocking thread does not block others.
- **Drawback:** creating a user thread creates a kernel thread -> overhead limits the number of threads.
- Examples: Windows, modern Linux (NPTL).

### 3. Many-to-Many

Many user threads are multiplexed onto a smaller-or-equal number of kernel threads.

- Combines flexibility of ULT with parallelism of KLT.
- The OS can schedule multiple threads in parallel and blocking is handled gracefully.
- A variant is the **two-level model**, which also allows a user thread to bind to a specific kernel thread.

## Comparison

| Model | Parallelism | Blocking issue | Overhead |
|-------|-------------|----------------|----------|
| Many-to-One | No | Blocks whole process | Low |
| One-to-One | Yes | Only that thread | High (kernel thread per user thread) |
| Many-to-Many | Yes | Handled well | Balanced |

## Key points

- Models define the ULT-to-KLT mapping.
- Many-to-One: efficient but no true parallelism, blocking stalls all.
- One-to-One: real concurrency but per-thread kernel overhead.
- Many-to-Many: best balance; kernel count can be tuned.
- Most modern OSes (Linux, Windows) use One-to-One in practice.
