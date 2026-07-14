## Definition

The **kernel** is the core component of an OS that always resides in memory and runs in **privileged (kernel) mode**. It directly manages hardware and provides essential services: process scheduling, memory management, device drivers, file systems, and system calls.

## Kernel vs shell

- **Kernel**: heart of the OS, interacts with hardware, manages resources.
- **Shell**: outer layer / interface (CLI or GUI) through which users talk to the kernel.

## Types of kernels

### 1. Monolithic kernel
- **All** OS services (scheduler, memory, drivers, file system, IPC) run in a single kernel-mode address space.
- **Pros**: fast (direct function calls, no message passing overhead).
- **Cons**: large, less modular; a bug/driver crash can bring down the whole system.
- Examples: **Linux, traditional Unix, MS-DOS**.

### 2. Microkernel
- Keeps only the **bare minimum** in kernel mode (IPC, basic scheduling, low-level memory). Services like drivers, file systems, and networking run as **user-space servers**.
- **Pros**: modular, more reliable/secure (a crashed service can restart without taking down the kernel), easier to extend.
- **Cons**: slower due to frequent **user<->kernel message passing** (context switches).
- Examples: **Minix, QNX, L4, Mach**.

### 3. Hybrid kernel
- Combines both: microkernel-like structure but performance-critical services run in kernel space.
- Examples: **Windows NT, macOS (XNU)**.

## Diagram

```text
Monolithic                 Microkernel
-----------                -----------
+-----------------+        User space: [FS][Driver][Net] (servers)
| FS Driver Sched |        ---------------------------------------
| Memory  IPC     |        Kernel: [ IPC | basic sched | mem ]
+-----------------+
   (all in kernel)         (minimal kernel; services in user mode)
```

## Comparison

| Aspect | Monolithic | Microkernel |
|--------|-----------|-------------|
| Services location | All in kernel space | Minimal kernel; rest in user space |
| Performance | Faster | Slower (IPC overhead) |
| Reliability | Lower (one crash affects all) | Higher (isolated servers) |
| Size / modularity | Large, less modular | Small, highly modular |
| Examples | Linux, Unix | QNX, Minix, L4 |

## Key points

- Kernel = privileged core managing CPU, memory, I/O, and system calls.
- **Monolithic** = everything in kernel space -> fast but less robust.
- **Microkernel** = minimal core + user-space servers -> robust/modular but slower.
- **Hybrid** (Windows NT, macOS) blends both for balance.
