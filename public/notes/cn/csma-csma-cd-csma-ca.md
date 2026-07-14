## Definition

**CSMA (Carrier Sense Multiple Access)** improves on ALOHA by requiring a station to **listen to the channel before transmitting** ("sense carrier"). If the medium is busy it defers; if idle it may send. This greatly reduces collisions but cannot eliminate them because of **propagation delay** — two stations can both sense idle before either's signal arrives.

## CSMA persistence methods

- **1-persistent**: sense continuously; transmit immediately when idle (probability 1). High collision chance if several stations wait.
- **Non-persistent**: if busy, wait a random time before sensing again. Fewer collisions, more delay.
- **p-persistent** (slotted channels): when idle, transmit with probability *p*, defer to next slot with probability *1−p*.

## CSMA/CD — Collision Detection

Used by classic **wired Ethernet**. A station keeps listening **while transmitting**; if it detects a collision it aborts and sends a **32-bit jam signal**, then backs off using **binary exponential back-off**.

```text
Sense -> Idle? -> Transmit & keep listening
   |                   |
 busy               collision? -> Jam -> random backoff -> retry
```

- Requires **Tt ≥ 2 × Tp** (frame time at least twice propagation delay) so the sender is still transmitting when a collision returns — this sets the minimum Ethernet frame size (64 bytes).

## CSMA/CA — Collision Avoidance

Used in **wireless (Wi-Fi 802.11)** where collision detection is impractical (can't listen while sending; hidden-terminal problem). It *avoids* collisions using:

- **IFS** (Inter-Frame Space) waiting, then a random **back-off timer**.
- **ACK** frames to confirm delivery (no ACK = collision).
- Optional **RTS/CTS** handshake to reserve the channel and solve the hidden-terminal problem.

## Comparison

| Feature | CSMA/CD | CSMA/CA |
|---------|---------|---------|
| Medium | Wired (Ethernet) | Wireless (Wi-Fi) |
| Strategy | Detect collision, abort | Avoid collision beforehand |
| Collision handling | Jam + back-off | Back-off + ACK/RTS-CTS |
| Efficiency | Higher | Lower (overhead) |

## Key points

- CSMA = **listen before talk**; reduces but does not remove collisions.
- **CD** detects during transmission (wired); **CA** avoids beforehand (wireless).
- CSMA/CD uses jam signal + binary exponential back-off; needs minimum frame size.
- CSMA/CA uses ACKs and optional RTS/CTS for the hidden-terminal problem.
