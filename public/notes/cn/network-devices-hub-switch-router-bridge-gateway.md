## Definition

**Network devices** are hardware components that connect computers and forward data across a network. They differ by the **OSI layer** they operate at, which determines how "smart" their forwarding decisions are.

## Devices at a Glance

| Device | OSI Layer | Forwarding basis | Collision domain | Broadcast domain |
|--------|-----------|------------------|------------------|------------------|
| **Hub** | 1 · Physical | Broadcasts to all ports | One (shared) | One |
| **Bridge** | 2 · Data Link | MAC address (2 segments) | One per port | One |
| **Switch** | 2 · Data Link | MAC address table | One per port | One (per VLAN) |
| **Router** | 3 · Network | IP address / routing table | Per port | Per port |
| **Gateway** | Up to 7 · App | Protocol translation | Per port | Per port |

## What Each Does

- **Hub** — a "dumb" repeater. It receives a signal on one port and copies it to all other ports. No filtering, so it wastes bandwidth and creates one big collision domain.
- **Bridge** — connects two LAN segments and filters traffic using MAC addresses, keeping local traffic local. A switch is essentially a multiport bridge.
- **Switch** — the workhorse of modern LANs. It learns MAC addresses and forwards frames only to the destination port, giving each port its own collision domain (full-duplex).
- **Router** — connects different networks and forwards packets by IP address using a routing table. It separates broadcast domains and enables Internet connectivity (NAT, DHCP).
- **Gateway** — a protocol converter that joins networks using different architectures or protocols (e.g., translating between an email protocol and a legacy system).

## Diagram

```text
[PC]--\
[PC]---[ Switch ]---[ Router ]---[ Internet ]
[PC]--/   (L2)         (L3)
   \-- one collision domain per port
       one broadcast domain -----/  split here
```

## Key points

- **Layer determines intelligence**: Hub (L1) < Bridge/Switch (L2) < Router (L3) < Gateway (L4–7).
- A **switch** breaks up collision domains; a **router** breaks up broadcast domains.
- A hub floods everything; a switch forwards selectively using a MAC table.
- A **gateway** is the only device that translates between different protocols/architectures.
- Common interview line: "A switch is a multiport bridge with hardware forwarding."
