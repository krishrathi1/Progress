## Definition

Modern CPUs support at least two privilege levels of execution. The **operating system** runs in a trusted, all-powerful mode; **user applications** run in a restricted mode. This hardware-enforced separation protects the system from buggy or malicious programs.

- **Kernel mode** (supervisor / privileged mode): code can execute *any* CPU instruction, access all memory, and directly control hardware (I/O, interrupts, MMU).
- **User mode**: code runs with restricted privileges. Privileged instructions and direct hardware/memory access are forbidden; attempting them traps to the kernel.

A CPU status bit (the **mode bit**, 0 = kernel, 1 = user on many designs) tells the hardware which mode is active. On x86 these are the four "rings" (Ring 0 = kernel, Ring 3 = user).

## How a program switches modes

A user program cannot flip the mode bit itself. It requests OS services through a **system call**, which raises a software interrupt / trap. The trap safely transfers control to a fixed kernel entry point.

```text
 USER MODE                      KERNEL MODE
 ---------                      -----------
 app runs  --- read() --->  system call / trap
                                 |  mode bit: user -> kernel
                                 |  run kernel handler (disk I/O)
 app resumes <--- return ----  mode bit: kernel -> user
```

Transitions to kernel mode happen on: system calls, hardware interrupts, and exceptions (e.g., divide-by-zero, page fault).

## Comparison

| Aspect | User mode | Kernel mode |
|--------|-----------|-------------|
| Privilege | Restricted | Full |
| Instructions | Non-privileged only | All (privileged included) |
| Memory access | Own address space | Entire memory |
| On fault | Process killed | System may crash (panic/BSOD) |
| Runs | Applications | OS core, drivers |
| Ring (x86) | Ring 3 | Ring 0 |

## Key points

- Two modes provide **protection** and **isolation** between processes and the OS.
- The **mode bit** is set by hardware; only traps/interrupts switch to kernel mode.
- **System calls** are the controlled gateway from user to kernel mode.
- Mode switch (user↔kernel) is **not** the same as a context switch; it is cheaper.
- A crash in kernel mode can bring down the whole system; a user-mode crash only kills that process.
