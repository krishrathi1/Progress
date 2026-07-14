## Definition

Threads can be managed in two places:

- **User-level threads (ULT)** are created and scheduled by a **thread library** in user space; the kernel is unaware of them and sees only the single process.
- **Kernel-level threads (KLT)** are created, scheduled, and managed directly by the **operating system kernel**, which is aware of every thread.

## How they map

```text
User-level threads              Kernel-level threads
  T1 T2 T3 (library)              T1 T2 T3
     \ | /                          |  |  |
   [one kernel thread]           [K1][K2][K3]  <- kernel schedules each
        |                            \  |  /
      [CPU]                            [CPUs]
```

## Comparison

| Feature | User-level threads | Kernel-level threads |
|---------|-------------------|----------------------|
| Managed by | User thread library | OS kernel |
| Kernel awareness | No | Yes |
| Context switch | Fast (no mode switch) | Slower (needs system call) |
| Blocking call | One blocking thread blocks whole process | Only that thread blocks |
| Multiprocessor use | Cannot run threads on multiple cores | Can run truly in parallel |
| Scheduling | Custom, application-specific | OS scheduler |
| Portability | High (library-based) | OS-dependent |

## The blocking problem

With **pure user-level threads**, if one thread makes a blocking system call (e.g., disk I/O), the kernel blocks the entire process because it sees only one schedulable entity. Kernel threads avoid this since the kernel can schedule another thread of the same process.

## Trade-off summary

- ULT: cheap and fast to manage, but no true parallelism and poor with blocking I/O.
- KLT: true parallelism and independent blocking, but higher management overhead (each operation may need a mode switch to the kernel).
- Real systems use **hybrid (many-to-many)** models to get the best of both.

## Key points

- ULT are invisible to the kernel; KLT are scheduled by the kernel.
- ULT context switches are faster (no kernel/mode switch).
- A blocking ULT stalls the whole process; a blocking KLT does not.
- Only KLT exploit multiple CPU cores in true parallel.
- Modern OSes combine both via the many-to-many model.
