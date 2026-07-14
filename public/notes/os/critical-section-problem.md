## Definition

A **critical section** is a segment of code where a process/thread accesses **shared resources** (variables, files, data structures). The **critical-section problem** is to design a protocol so that when one process is executing in its critical section, **no other** process is allowed in its own critical section simultaneously.

## Structure of a process

```text
do {
    entry section      // request permission to enter
        CRITICAL SECTION   // access shared data
    exit section       // release permission
        remainder section  // other work
} while (true);
```

## Three requirements for a correct solution

1. **Mutual Exclusion** — if a process is in its critical section, no other process may be in theirs.
2. **Progress** — if no process is in the critical section and some want to enter, only those not in their remainder section participate in deciding who enters, and the choice cannot be postponed indefinitely.
3. **Bounded Waiting** — there is a limit on how many times other processes can enter their critical sections after a process has requested entry and before that request is granted (no starvation).

## Comparison of solution types

| Solution | Level | Notes |
|----------|-------|-------|
| Peterson's solution | Software | Two processes, uses flags + turn |
| Mutex locks | Software/HW | Simple lock/unlock, may busy-wait |
| Semaphores | OS primitive | wait()/signal(), counting or binary |
| Test-and-Set / Compare-and-Swap | Hardware | Atomic instructions |
| Disabling interrupts | Hardware | Only viable on uniprocessors |

## Why it matters

Without protection, concurrent access causes **race conditions** where the final result depends on scheduling order, producing inconsistent data.

## Key points

- Critical section = code accessing shared resources.
- A valid solution must satisfy mutual exclusion, progress, and bounded waiting.
- Entry/exit sections wrap the critical section as a protocol.
- Solutions range from software (Peterson) to hardware atomics (TAS, CAS) to OS semaphores/mutexes.
- Disabling interrupts works only on single-processor systems.
