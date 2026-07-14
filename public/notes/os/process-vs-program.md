## Definition

- A **program** is a *passive* entity: a set of instructions stored on disk (an executable file). It does nothing until it is run.
- A **process** is an *active* entity: a program **in execution**, loaded into memory with its own resources — CPU registers, program counter, stack, heap, and a PCB tracked by the OS.

In short: a program is the recipe; a process is the act of cooking it. One program can spawn **many** processes (e.g., opening several windows of the same browser).

## Illustration

```text
   PROGRAM (on disk)                 PROCESS (in memory)
   ----------------                  -------------------
   chrome.exe   ---- run --->  Process 1 (PID 1201) [tab A]
   (one file,                  Process 2 (PID 1202) [tab B]
    passive)                   Process 3 (PID 1203) [tab C]
                               each: own PC, stack, heap, PCB
```

One passive program → multiple independent, active processes.

## Comparison

| Aspect | Program | Process |
|--------|---------|---------|
| Nature | Passive | Active |
| Location | Stored on disk | Loaded in RAM |
| Lifetime | Permanent until deleted | Temporary (exists while running) |
| Resources | None allocated | CPU time, memory, files, I/O |
| PC / registers | None | Has program counter & register state |
| Relationship | One program | Can create many processes |
| Managed by | Programmer/compiler | Operating system |
| Example | `a.out`, `notepad.exe` | The running instance with a PID |

## Key points

- **Program = passive** code on disk; **Process = active** program in execution.
- A process bundles the program's code with its **execution context** (PC, registers, stack, heap) and OS resources.
- A single program can have **multiple concurrent processes**, each with a unique PID and its own address space.
- The OS creates a **PCB** for every process; programs have no PCB.
- Loading a program into memory and giving it a PCB is what *turns it into* a process.
