## Definition

The **Working Set Model** is a strategy (by Peter Denning) to control **thrashing** by tracking the set of pages a process is **actively using** and ensuring that set stays resident in memory.

The **working set** `WS(t, Δ)` is the set of **distinct pages referenced in the most recent Δ references** (the *working-set window*), measured at time `t`. Its size is `WSS = |WS|`.

## Key idea

- Δ (delta) = window size measured in references (or a time interval).
- The working set approximates the process's current **locality**.
- Allocate each process **at least WSS frames**; then it faults rarely.

Let `D = Σ WSSᵢ` be the total demand of all processes:

- If **D ≤ m** (available frames) → system is fine.
- If **D > m** → **thrashing**; suspend (swap out) a process to reduce demand.

## Dry run

Reference string with window **Δ = 5**:

```text
Refs:  2 6 1 5 7 | 7 7 5 1 6 | 2 3 4 1 2 ...
                 t1            t2

WS(t1, 5) = {1,2,5,6,7}   WSS = 5
WS(t2, 5) = {1,5,6,7}     WSS = 4   (2 dropped out of window)
```

The window slides; pages leaving the window are candidates for eviction.

## Choosing Δ

| Δ too small | Δ too large | Δ correct |
|-------------|-------------|-----------|
| Misses parts of the locality | Spans several localities, wastes frames | Captures one full locality |
| More faults | Over-allocates memory | Minimal faults, efficient |

## Working set vs Page-Fault Frequency

- **Working set:** directly measures the active page set; harder to implement exactly (needs per-reference tracking, approximated with reference bits + interval timer).
- **PFF:** indirect — adjusts frames based on observed fault rate; easier to implement.

## Key points

- Purpose: **prevent thrashing** by keeping each process's locality resident.
- `D = Σ WSSᵢ`; if `D > m`, suspend a process (**load control**).
- Δ defines the window; correct Δ matches the program's **locality of reference**.
- Approximated in practice using **reference bits** sampled on a timer, since exact tracking is costly.
- Foundation for modern **memory allocation** and thrashing prevention.
