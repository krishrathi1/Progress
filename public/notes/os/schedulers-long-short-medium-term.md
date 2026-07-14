## Definition

A **scheduler** is an OS component that decides *which* process gets a resource (mainly the CPU or memory) and *when*. Because processes pass through several queues on their way to execution, the OS uses **three types of schedulers**, each acting at a different stage.

## The three schedulers

### 1. Long-term scheduler (Job scheduler)
- Selects processes from the **job pool (disk)** and loads them into the **ready queue** in memory.
- Controls the **degree of multiprogramming** (how many processes are in memory).
- Runs **infrequently** (seconds/minutes), so it can be slower.
- Aims for a good **mix of CPU-bound and I/O-bound** processes.

### 2. Short-term scheduler (CPU scheduler)
- Picks **one** process from the ready queue and assigns the **CPU** to it (dispatch).
- Runs **very frequently** (milliseconds), so it must be **fast**.
- This is the scheduler that implements algorithms like FCFS, SJF, Round Robin, Priority.

### 3. Medium-term scheduler
- Performs **swapping**: temporarily removes (suspends) a process from memory to disk and later brings it back.
- **Reduces the degree of multiprogramming** to relieve memory pressure or improve the process mix.

## Where each scheduler acts

```text
  New processes (disk)
        |
        |  LONG-TERM scheduler (admit to memory)
        v
   [ Ready Queue ] <----------------------+
        |                                 | swap-in
        |  SHORT-TERM scheduler (dispatch)| (MEDIUM-TERM)
        v                                 |
    [ CPU / Running ] ---- swap-out ---> [ Suspended (disk) ]
        |            (MEDIUM-TERM)
        v
    Terminated / I/O wait
```

## Comparison

| Feature | Long-term | Short-term | Medium-term |
|---------|-----------|------------|-------------|
| Also called | Job scheduler | CPU scheduler | Swapper |
| Frequency | Rare | Very frequent | Occasional |
| Speed needed | Slow OK | Must be fast | Medium |
| Controls | Degree of multiprogramming | CPU allocation | Swapping in/out |
| Moves process | Disk → Ready | Ready → Running | Memory ↔ Disk |

## Key points

- **Long-term** = admits jobs into memory, sets the degree of multiprogramming (may be absent in modern time-sharing systems).
- **Short-term** = picks the next process to run on the CPU; runs most often and must be fast.
- **Medium-term** = swaps processes between memory and disk to control load.
- Together they manage a process's journey from disk → ready → running.
- Time-sharing OSes often rely mainly on the **short-term** and **medium-term** schedulers.
