## Definition

**Switching** is the mechanism by which data is routed from a source to a destination through intermediate nodes (switches/routers) in a network. Instead of a dedicated wire between every pair of devices, switches forward data over shared links. The three classic techniques are **circuit switching**, **message switching**, and **packet switching**.

## Circuit Switching

- A **dedicated end-to-end physical path** is established before any data transfer (setup phase), used exclusively, then torn down.
- Three phases: **setup → data transfer → teardown**.
- Guaranteed bandwidth and constant delay, but the circuit is **reserved even when idle** (wasteful).
- Example: traditional **telephone network (PSTN)**.

## Message Switching

- **Store-and-forward** at the message level: the entire message is received fully at each intermediate node, stored, then forwarded to the next hop.
- No dedicated path; links used on demand. No message-size limit, but nodes need **large storage** and delay accumulates.
- Largely obsolete; conceptual ancestor of packet switching. Example: **telegraph, early email relays**.

## Packet Switching

- Message is broken into small **packets**, each carrying a header (addresses, sequence number). Packets are independently forwarded and reassembled at the destination.
- Two modes: **Datagram** (each packet routed independently, may arrive out of order — used by IP) and **Virtual Circuit** (a logical path fixed at setup, packets follow it in order — used by MPLS/Frame Relay).
- Efficient link sharing (statistical multiplexing), robust to failures.

```text
Circuit:  reserve whole path ──────────► then stream data
Message:  [====== whole message ======] store & forward per hop
Packet:   [p1][p2][p3] each hop-by-hop, independently
```

## Comparison

| Feature | Circuit | Message | Packet |
|---------|---------|---------|--------|
| Dedicated path | Yes | No | No (datagram) |
| Store-and-forward | No | Yes (whole msg) | Yes (per packet) |
| Bandwidth use | Reserved/wasteful | On demand | Efficient (shared) |
| Setup delay | Yes | No | VC: yes, Datagram: no |
| Reliability | Path fails = call drops | Robust | Very robust |
| Example | PSTN phone | Telegraph | Internet (IP) |

## Key points

- Circuit switching = reserve a dedicated path; ideal for continuous voice, wasteful for bursty data.
- Message switching = store-and-forward whole messages; obsolete due to storage/delay.
- Packet switching = split into packets, share links; foundation of the Internet.
- Datagram (connectionless, out-of-order possible) vs Virtual Circuit (connection-oriented, ordered).
