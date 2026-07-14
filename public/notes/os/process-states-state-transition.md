## Definition

As a process executes, it moves through a series of **states** that reflect what it is currently doing. The OS tracks the current state in the process's PCB and moves it between states as events occur — this movement is called a **state transition**.

## The five-state model

- **New** — the process is being created.
- **Ready** — loaded in memory, waiting for the CPU to be assigned.
- **Running** — instructions are being executed on the CPU.
- **Waiting / Blocked** — waiting for an event (I/O completion, resource, signal).
- **Terminated / Exit** — finished execution; resources being reclaimed.

At any instant, on a single CPU, **only one** process is in the Running state.

## State transition diagram

```text
        admit           dispatch
 New ---------> Ready -------------> Running
                  ^                    |  |
                  |                    |  | exit
   interrupt /    |     I/O or event   |  v
   timeout        |     wait           | Terminated
                  |                    |
                  +-- Ready <---- Waiting
                     (I/O complete)   ^
                                      |
                        Running ------+ (needs I/O / event)
```

## Transitions explained

| Transition | Cause |
|------------|-------|
| New → Ready | Process admitted to the ready queue |
| Ready → Running | Scheduler **dispatches** it (gives CPU) |
| Running → Ready | **Preemption**: time slice expires or higher-priority process arrives |
| Running → Waiting | Requests I/O or waits for an event |
| Waiting → Ready | The awaited event/I/O completes |
| Running → Terminated | Process finishes or is killed |

## Key points

- Common model has **five states**: New, Ready, Running, Waiting, Terminated.
- **Ready → Running** is done by the **scheduler + dispatcher**; only one process runs per CPU.
- **Running → Ready** happens on preemption (timeout or higher priority) — the process is *not* blocked, just paused.
- **Running → Waiting** happens for I/O/events; the process cannot use the CPU until the event completes.
- A blocked process goes to **Ready** (not directly to Running) when its event finishes.
- Some OSes add **suspended** states (swapped out to disk) for a seven-state model.
