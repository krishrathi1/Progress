## Definition

**Context switching** is the mechanism by which a CPU saves the state (context) of a currently running process (or thread) and loads the saved state of another, so that execution can be resumed later exactly where it left off. It is what makes **multiprogramming** and **time-sharing** possible on a single CPU.

The saved "context" lives in the process's **PCB (Process Control Block)**.

## What Gets Saved

- **Program counter (PC)** — next instruction to execute
- **CPU registers** — general-purpose, index, stack pointer
- **Process state** (ready / running / waiting)
- **Memory-management info** — page tables, base/limit registers
- **Accounting & I/O status** — open files, pending signals

## When a Context Switch Occurs

- **Interrupt** (e.g. timer/clock interrupt in preemptive scheduling)
- **System call** that blocks (I/O request)
- **Higher-priority process** becomes ready (preemption)
- Process **terminates** or voluntarily yields

## Steps

```text
P1 running                          P2 running
   |                                    ^
   |  1. interrupt/trap                 |
   v                                    |
[Save P1 context -> PCB1]               |
[Scheduler picks P2]                    |
[Load P2 context <- PCB2] --------------+

Time spent here = pure OVERHEAD (no useful work)
```

## Key Characteristics

| Aspect | Detail |
|--------|--------|
| Overhead | Yes — CPU does no useful work during switch |
| Typical cost | A few microseconds (register save/restore, cache/TLB flush) |
| Triggered by | Interrupts, system calls, scheduling decisions |
| Thread switch | Cheaper than process switch (shared address space, no TLB flush) |

## Context Switch vs Mode Switch

- **Mode switch**: user mode ↔ kernel mode (during a syscall/interrupt) — same process, cheaper.
- **Context switch**: switch to a *different* process — always involves a mode switch plus saving/restoring full context.

## Key Points

- Context switching enables concurrency but is **pure overhead**; too-frequent switching causes **thrashing of the CPU** and hurts throughput.
- State is preserved in the **PCB**, allowing seamless resumption.
- **Thread** context switches are cheaper than **process** switches because threads share memory and page tables.
- Modern CPUs reduce cost with hardware register banks and tagged TLBs.
