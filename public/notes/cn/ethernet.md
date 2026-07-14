## Definition

**Ethernet** is the dominant wired LAN technology, standardized as **IEEE 802.3**. It operates at the **physical** and **data link (MAC)** layers, historically using **CSMA/CD** on a shared medium; modern switched Ethernet is full-duplex and collision-free.

## Ethernet frame format

```text
+----------+-----+---------+---------+--------+-----------+-----+
| Preamble | SFD | Dest MAC| Src MAC | Type/  |  Payload  | FCS |
|  7 bytes | 1   | 6 bytes | 6 bytes | Len 2  | 46-1500 B | 4 B |
+----------+-----+---------+---------+--------+-----------+-----+
```

- **Preamble (7B) + SFD (1B)**: synchronization; SFD = 10101011 marks frame start.
- **Destination / Source MAC (6B each)**: 48-bit hardware addresses.
- **Type/Length (2B)**: ≥1536 = EtherType (e.g. 0x0800 IPv4); ≤1500 = length.
- **Payload**: 46–1500 bytes (padded up to 46 to meet minimum frame size).
- **FCS (4B)**: CRC-32 for error detection.
- **Minimum frame = 64 bytes**, maximum = 1518 bytes (excluding preamble).

## MAC address

- 48 bits, written as 6 hex octets (e.g. `00:1A:2B:3C:4D:5E`).
- First 24 bits = **OUI** (vendor); last 24 bits = NIC-specific.
- Broadcast address = `FF:FF:FF:FF:FF:FF`.

## Evolution

| Standard | Speed | Medium |
|----------|-------|--------|
| 10BASE-T | 10 Mbps | Twisted pair |
| Fast Ethernet (802.3u) | 100 Mbps | Cat5 |
| Gigabit (802.3ab/z) | 1 Gbps | Cat5e / fiber |
| 10 Gigabit | 10 Gbps | Fiber / Cat6a |

## Shared vs switched

- **Shared (hub)**: half-duplex, one collision domain, uses CSMA/CD.
- **Switched**: each port is its own collision domain, **full-duplex**, so CSMA/CD is effectively unused.

## Key points

- Ethernet = IEEE 802.3; uses 48-bit MAC addressing and CSMA/CD historically.
- Frame size: **64–1518 bytes**; 46-byte minimum payload ensures collision detection works.
- **FCS uses CRC-32** for error detection (no correction).
- Modern switched full-duplex Ethernet eliminates collisions; hubs (shared) are obsolete.
