## Definition

A **process** is a program in execution — an active entity with its own code, data, stack, heap, and current activity (the program counter). The OS represents and tracks each process using a data structure called the **Process Control Block (PCB)**, also known as the *task control block*.

The PCB stores everything the OS needs to manage a process and to **resume** it exactly where it left off after a context switch. All PCBs together form the OS process table.

## Memory layout of a process

```text
 High address
  +---------------+
  |    Stack      |  <- function calls, local vars (grows down)
  |      |        |
  |      v        |
  |               |
  |      ^        |
  |      |        |
  |    Heap       |  <- dynamic memory (malloc/new, grows up)
  +---------------+
  |  Data (BSS)   |  <- global/static variables
  +---------------+
  |    Text       |  <- program code (read-only)
  +---------------+
 Low address
```

## Contents of a PCB

| Field | Purpose |
|-------|---------|
| Process ID (PID) | Unique identifier |
| Process state | New, Ready, Running, Waiting, Terminated |
| Program counter | Address of the next instruction |
| CPU registers | Saved register contents for resume |
| Scheduling info | Priority, queue pointers |
| Memory management | Base/limit registers, page/segment tables |
| Accounting info | CPU time used, time limits |
| I/O status | Open files, allocated I/O devices |

## Role in context switching

When the OS switches from process P1 to P2:

1. Save P1's CPU registers and PC into **P1's PCB**.
2. Load P2's saved state from **P2's PCB** into the CPU.
3. Resume P2. Later, P1 is restored the same way.

This save/restore via the PCB is what makes multitasking possible.

## Key points

- A **process** = program in execution (active); a program is passive.
- The **PCB** is the OS's per-process bookkeeping structure — one per process.
- Key PCB fields: **PID, state, program counter, registers, memory & scheduling info**.
- The PCB enables **context switching**: saved state lets a process resume correctly.
- PCBs are kept in kernel space so user processes cannot tamper with them.
