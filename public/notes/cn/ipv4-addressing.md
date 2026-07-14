## Definition

An **IPv4 address** is a **32-bit** logical address that uniquely identifies a device's network interface on an IP network. It is written in **dotted-decimal** notation as four 8-bit octets (0–255), e.g. `192.168.1.10`. The total address space is 2^32 ≈ 4.3 billion addresses.

## Structure: network + host

Every address splits into a **network portion** and a **host portion**, defined by a **subnet mask** (or CIDR prefix).

```text
 192.168.1.10 / 24
 11000000.10101000.00000001.00001010   address
 11111111.11111111.11111111.00000000   mask (/24)
 \______ network (24 bits) ______/\host/
 Network = 192.168.1.0   Broadcast = 192.168.1.255
```

- **Network address**: host bits all 0 (identifies the subnet).
- **Broadcast address**: host bits all 1 (reaches all hosts on the subnet).
- **Usable hosts = 2^h − 2** where h = number of host bits (subtract network + broadcast).

## CIDR (Classless notation)

- Written as `address/prefix`, where prefix = number of network bits (e.g. `/24`).
- Enables **VLSM** (Variable Length Subnet Masking) — subnets of different sizes — and **route aggregation** (supernetting), replacing rigid classful boundaries.

## Special / reserved ranges

| Range | Purpose |
|-------|---------|
| 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16 | **Private** (RFC 1918) |
| 127.0.0.0/8 | **Loopback** (127.0.0.1) |
| 169.254.0.0/16 | Link-local (APIPA) |
| 224.0.0.0/4 | Multicast |
| 255.255.255.255 | Limited broadcast |

## Subnetting example

Split `192.168.1.0/24` into 4 subnets → borrow 2 bits → `/26`, each with 2^6 − 2 = **62 usable hosts**: `.0`, `.64`, `.128`, `.192`.

## Key points

- IPv4 = 32-bit, dotted-decimal, ~4.3 billion addresses (exhausted → NAT + IPv6).
- Subnet mask / CIDR prefix separates network and host bits.
- Usable hosts = **2^h − 2** (exclude network and broadcast).
- Private, loopback (127.x), and APIPA (169.254.x) ranges are non-routable on the public Internet.
- CIDR enables VLSM and route aggregation.
