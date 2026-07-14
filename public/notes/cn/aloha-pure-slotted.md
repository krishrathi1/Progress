## Definition

**ALOHA** is a random-access (contention-based) Medium Access Control (MAC) protocol that lets multiple stations share a single broadcast channel. A station transmits whenever it has data; if two frames overlap in time, they **collide** and are retransmitted after a random back-off. It was developed at the University of Hawaii (1970s).

## Pure ALOHA

- A station transmits a frame **as soon as** it is ready — no coordination.
- The sender waits for an acknowledgement. If none arrives within a timeout, it assumes a collision and retransmits after a **random** delay (to avoid repeated collisions).
- **Vulnerable period = 2 × Tt** (frame transmission time). A frame is destroyed if any other frame starts within one frame-time before or after it.

```text
Vulnerable period for pure ALOHA (frame X sent at t0)
  t0-Tt        t0        t0+Tt
    |----------|----------|
    ^ any transmission starting in this 2Tt window collides with X
```

## Slotted ALOHA

- Time is divided into discrete **slots** of length equal to one frame time (Tt).
- A station may transmit **only at the start of a slot**, so frames either overlap completely or not at all.
- This halves the vulnerable period to **Tt**, doubling maximum efficiency.

## Throughput (efficiency)

Let **G** = average number of frames generated per frame-time (offered load).

| Protocol | Throughput S | Max efficiency | At load G |
|----------|--------------|----------------|-----------|
| Pure ALOHA | S = G·e^(−2G) | **18.4%** | G = 0.5 |
| Slotted ALOHA | S = G·e^(−G) | **36.8%** | G = 1 |

## Key points

- ALOHA needs no carrier sensing — simple but low efficiency due to collisions.
- **Slotted ALOHA doubles throughput** (36.8% vs 18.4%) by aligning transmissions to slots.
- Vulnerable period: **2Tt** (pure) vs **Tt** (slotted).
- Random back-off after collision prevents synchronized repeated collisions.
- Foundational idea behind later CSMA protocols and Ethernet.
