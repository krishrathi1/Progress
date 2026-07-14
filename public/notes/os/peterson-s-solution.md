## Definition

**Peterson's solution** is a classic **software** algorithm that solves the critical-section problem for **two processes**. It uses only shared memory (no special hardware instructions) and guarantees **mutual exclusion, progress, and bounded waiting**.

## Shared variables

- `boolean flag[2]` — `flag[i] = true` means process `i` wants to enter.
- `int turn` — whose turn it is to enter when both want in.

## Algorithm (for process i, where j = 1 - i)

```c
// Entry section
flag[i] = true;      // I want to enter
turn = j;            // give priority to the other
while (flag[j] && turn == j)
    ;                // busy wait

    // CRITICAL SECTION

// Exit section
flag[i] = false;     // I'm done
```

## How it works

```text
Both set flag = true.
Then each sets turn to the OTHER process.
The LAST writer of turn loses the tie and waits.
--> Only one process passes the while loop at a time.
```

- If only P0 wants in, `flag[1]` is false -> P0 enters immediately.
- If both want in, `turn` decides; the process that wrote `turn` last waits.

## Why it satisfies the three conditions

| Requirement | Reason |
|-------------|--------|
| Mutual exclusion | A process enters only if `flag[j]` is false OR `turn == i`; both cannot hold for both simultaneously. |
| Progress | If P1 does not want in (`flag[1]=false`), P0 is not blocked. |
| Bounded waiting | After a process exits, it sets `turn` to the other, so the waiting process gets its turn next. |

## Limitations

- Works for **only two processes** (generalizations are complex).
- Uses **busy waiting** (spinlock), wasting CPU.
- Can fail on modern CPUs due to **instruction reordering** unless memory barriers are used, since it assumes sequential memory consistency.

## Key points

- Software solution for the 2-process critical-section problem.
- Uses `flag[]` (intent) and `turn` (tie-breaker).
- The `turn = j` self-yielding step is what breaks ties.
- Satisfies mutual exclusion, progress, and bounded waiting.
- Drawbacks: busy waiting, two processes only, needs memory barriers on reordering CPUs.
