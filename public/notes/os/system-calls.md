## Definition

A **system call** is the programmatic interface through which a user-mode program requests a service from the OS **kernel** (e.g., reading a file, creating a process, allocating memory). It is the controlled entry point that switches the CPU from **user mode** to **kernel mode**.

## Why they are needed

- User programs run with **restricted privileges** and cannot touch hardware directly.
- System calls provide a **safe, well-defined boundary** so the kernel can validate requests and enforce protection.

## How a system call works

```text
User program            Kernel
------------            ------
printf()  --> write()  --> [trap / software interrupt]
                              |  switch to kernel mode
                              v
                        validate args, do I/O
                              |  switch back to user mode
   <-------- return value ----+
```

Steps:
1. Program calls a **library wrapper** (e.g., `write()` in libc).
2. Arguments are placed in registers/stack; a **trap instruction** (software interrupt / `syscall`) is executed.
3. CPU switches to **kernel mode** and jumps to the system-call handler via the **system-call table** (indexed by a syscall number).
4. Kernel validates and performs the operation, then returns to user mode with a result.

## API vs system call

- Programmers usually call an **API** (e.g., POSIX `read()`, Win32 `ReadFile()`), which internally invokes the actual system call.
- Advantages of the wrapper: portability and simpler interface.

## Example (Linux C)

```c
#include <unistd.h>
#include <fcntl.h>

int main() {
    int fd = open("data.txt", O_RDONLY);   // system call
    char buf[100];
    ssize_t n = read(fd, buf, 100);         // system call
    write(1, buf, n);                        // write to stdout
    close(fd);                               // system call
    return 0;
}
```

## Passing parameters to the OS

- **Registers**: fastest, limited number.
- **Block/table in memory**: address passed in a register (used when many params).
- **Stack**: pushed by program, popped by kernel.

## Key points

- A system call is the **only legal way** for user code to enter the kernel.
- It triggers a **mode switch** (user -> kernel) via a trap/software interrupt.
- Programs typically use higher-level **APIs** that wrap the raw syscall.
- Overhead exists (mode switch), so minimizing syscalls improves performance.
