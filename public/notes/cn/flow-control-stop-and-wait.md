## Definition

**Flow control** ensures a fast sender does not overwhelm a slow receiver. **Stop-and-Wait** is the simplest flow/error control protocol: the sender transmits **one frame**, then halts until it receives an **acknowledgment (ACK)** before sending the next frame.

## How It Works

- Sender sends frame 0, starts a timer, and waits.
- Receiver gets the frame, delivers it, and returns an ACK.
- Only after the ACK arrives does the sender send frame 1.
- If the timer expires (lost frame or lost ACK), the sender **retransmits**.

To handle a lost ACK causing a duplicate, **Stop-and-Wait ARQ** adds a **1-bit sequence number** (0/1) so the receiver can discard duplicates.

```text
Sender                Receiver
  |----- Frame 0 ------->|
  |                      | (process, send ACK)
  |<------ ACK 1 --------|
  |----- Frame 1 ------->|
  |<------ ACK 0 --------|
  |----- Frame 0 ------->|
```

## Efficiency

The link sits idle during the round-trip wait, so utilization is poor on long/fast links:

```text
Efficiency = Tt / (Tt + 2 * Tp)

Tt = transmission time, Tp = propagation time
a  = Tp / Tt   ->   Efficiency = 1 / (1 + 2a)
```

- When `a` is large (long distance, high bandwidth), efficiency collapses.
- Sliding-window protocols fix this by allowing multiple in-flight frames.

## Comparison

| Aspect | Stop-and-Wait |
|--------|---------------|
| Window size | 1 |
| Sequence numbers | 1 bit (0/1) for ARQ |
| Pipelining | No |
| Utilization | Low on high-latency links |
| Complexity | Very simple |

## Key points

- Sender window = receiver window = **1 frame**.
- Requires ACKs, a **timeout timer**, and a **1-bit sequence number** to handle duplicates.
- Throughput bottleneck is the **2·Tp** idle wait per frame.
- Foundation for Go-Back-N and Selective Repeat, which pipeline multiple frames to raise efficiency.
