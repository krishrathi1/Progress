## Definition

An **Operating System (OS)** is system software that acts as an intermediary between the **user/application programs** and the **computer hardware**. It manages hardware resources (CPU, memory, I/O, storage) and provides a convenient, safe environment in which programs can run.

- **Resource manager**: allocates CPU time, memory, and devices among competing processes.
- **Extended (virtual) machine**: hides messy hardware details behind clean abstractions (files, processes, sockets).
- **Control program**: prevents errors and improper use of the computer.

## Where the OS sits

```text
+-----------------------------+
|      User / Applications    |   (browser, compiler, games)
+-----------------------------+
|      System Programs         |  (shell, utilities)
+-----------------------------+
|     Operating System        |  <- kernel: manages resources
+-----------------------------+
|         Hardware            |  (CPU, RAM, disk, I/O)
+-----------------------------+
```

## Why we need an OS

- **Abstraction**: programs use `open()`/`read()` instead of talking to raw disk controllers.
- **Multiplexing**: many programs share one CPU and one memory safely.
- **Protection & isolation**: one buggy program cannot crash others or the whole machine.
- **Convenience & efficiency**: maximizes throughput and hardware utilization while being easy to use.

## Dual mode of operation

The OS relies on hardware support for **two modes** to stay protected:

| Mode | Runs | Privileges |
|------|------|-----------|
| **User mode** | Application code | Restricted; cannot execute privileged instructions |
| **Kernel mode** | OS/kernel code | Full access to hardware and all instructions |

A **system call** switches from user mode to kernel mode to request OS services.

## Common examples

- **Desktop/server**: Windows, Linux, macOS.
- **Mobile**: Android (Linux-based), iOS.
- **Embedded/RTOS**: FreeRTOS, VxWorks.

## Key points

- OS = software layer between hardware and applications; the core is the **kernel**.
- Two main roles: **resource manager** and **provider of abstractions (extended machine)**.
- Dual-mode (user/kernel) plus system calls give protection and controlled hardware access.
- Goals: convenience, efficiency, isolation, and fair resource sharing.
