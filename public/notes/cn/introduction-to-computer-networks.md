## Definition

A **computer network** is a collection of autonomous computing devices (nodes) interconnected by communication links so they can exchange data and share resources such as files, printers, and internet access.

## Why networks exist (goals)

- **Resource sharing:** hardware (printers), software, and data available to all users.
- **Communication:** email, messaging, video calls.
- **Reliability:** replicate data on multiple machines to survive failures.
- **Scalability & cost:** many cheap machines can replace one expensive one.

## Key components

- **Nodes/hosts:** end devices (PCs, phones, servers).
- **Links:** wired (twisted pair, coax, fiber) or wireless (Wi-Fi, cellular).
- **Network devices:** switch, router, hub, access point.
- **Protocols:** agreed rules governing format, timing, and ordering of messages (e.g., TCP/IP).
- **NIC (Network Interface Card):** hardware giving a host its physical/MAC address.

## Data transmission concepts

| Term | Meaning |
|------|---------|
| **Bandwidth** | Maximum data rate of a link (bits/sec) |
| **Latency** | Delay for a bit/packet to travel end-to-end |
| **Throughput** | Actual achieved data rate |
| **Packet** | Unit of data with header + payload |

## Simple network view

```text
[PC-A]---\                      /---[Server]
          \                    /
[PC-B]-----[ Switch ]---[ Router ]---(Internet)
          /                    \
[PC-C]---/                      \---[Printer]
```

## Modes of transmission

- **Simplex:** one direction only (keyboard to CPU).
- **Half-duplex:** both directions, one at a time (walkie-talkie).
- **Full-duplex:** both directions simultaneously (telephone).

## Key points

- A network needs **hardware (links, NICs, devices)** plus **software (protocols)** to work.
- **Protocols** ensure interoperability between different vendors/machines.
- Networks are described by **layered models** (OSI, TCP/IP) that split responsibilities.
- Performance is judged by **bandwidth, latency, throughput, and reliability**.
