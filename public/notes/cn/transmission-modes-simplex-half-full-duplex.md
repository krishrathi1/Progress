## Definition

A **transmission mode** (or communication mode) defines the **direction of signal flow** between two connected devices — whether data can travel one way, both ways alternately, or both ways at once.

## The Three Modes

- **Simplex** — one-directional only. One device transmits, the other only receives. The channel capacity is used entirely in one direction.
- **Half-Duplex** — both directions, but **one at a time**. A device must finish sending before it can receive. The full channel is used in whichever direction is active.
- **Full-Duplex** — both directions **simultaneously**. The channel capacity is shared or split so send and receive happen at the same time.

## Diagram

```text
Simplex:      A ───────────►  B      (only A → B)

Half-Duplex:  A ───────────►  B      (A → B, then...)
              A  ◄───────────  B      ...B → A, never both

Full-Duplex:  A ═══════════►  B      (both directions
              A  ◄═══════════  B       at the same time)
```

## Comparison

| Feature | Simplex | Half-Duplex | Full-Duplex |
|---------|---------|-------------|-------------|
| Direction | One-way | Two-way, alternating | Two-way, simultaneous |
| Performance | Lowest | Medium | Highest |
| Channel use | Full, one way | Full, one dir at a time | Split / shared both ways |
| Example | Keyboard→CPU, TV broadcast, monitor | Walkie-talkie, CB radio | Telephone, modern Ethernet (switched) |

## Key points

- **Simplex** = strictly one direction (think: keyboard, mouse, TV/radio broadcast).
- **Half-duplex** = two-way but takes turns (think: walkie-talkie — "over").
- **Full-duplex** = two-way simultaneously (think: phone call — both can talk).
- Full-duplex gives the best throughput because no time is lost switching direction.
- Modern switched Ethernet runs full-duplex; older hub-based shared Ethernet was half-duplex (hence collisions/CSMA-CD).
