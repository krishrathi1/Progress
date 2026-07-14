## Definition

**Classful addressing** is the original (pre-1993) scheme for dividing the 32-bit IPv4 space into five fixed classes (**A, B, C, D, E**) based on the **leading bits** of the address. The class fixed where the network/host boundary fell, so subnet masks were implied rather than specified.

## The five classes

| Class | Leading bits | 1st octet range | Default mask | Network / Host bits | Networks | Hosts per net |
|-------|-------------|-----------------|--------------|---------------------|----------|---------------|
| A | 0 | 1–126 | /8 (255.0.0.0) | 8 / 24 | 2^7 | 2^24 − 2 ≈ 16M |
| B | 10 | 128–191 | /16 (255.255.0.0) | 16 / 16 | 2^14 | 2^16 − 2 = 65534 |
| C | 110 | 192–223 | /24 (255.255.255.0) | 24 / 8 | 2^21 | 2^8 − 2 = 254 |
| D | 1110 | 224–239 | — | Multicast | — | — |
| E | 1111 | 240–255 | — | Reserved/experimental | — | — |

```text
Class A: 0 NNNNNNN | HHHHHHHH.HHHHHHHH.HHHHHHHH
Class B: 10 NNNNNN.NNNNNNNN | HHHHHHHH.HHHHHHHH
Class C: 110 NNNNN.NNNNNNNN.NNNNNNNN | HHHHHHHH
```

- **127.0.0.0/8** is reserved for loopback (why Class A range stops at 126).
- Classes **A/B/C** are for unicast; **D** is multicast; **E** is reserved.

## Why it was replaced

- **Inefficient allocation**: a Class B (65 534 hosts) was too big for most organizations but a Class C (254) too small → wasted addresses.
- No flexibility: boundaries fixed at /8, /16, /24 only.
- Led to rapid IPv4 exhaustion.

This drove the move to **CIDR (Classless Inter-Domain Routing, 1993)**, which uses arbitrary prefix lengths and VLSM.

## Classful vs Classless

| Aspect | Classful | Classless (CIDR) |
|--------|----------|------------------|
| Boundary | Fixed /8, /16, /24 | Any prefix /0–/32 |
| Mask | Implied by class | Explicit prefix |
| Efficiency | Low (waste) | High (VLSM) |

## Key points

- Class identified by first octet: **A 1–126, B 128–191, C 192–223, D 224–239, E 240–255**.
- Default masks: A = /8, B = /16, C = /24.
- **127.x.x.x = loopback**, D = multicast, E = reserved.
- Fixed boundaries wasted addresses → replaced by **CIDR/VLSM**.
