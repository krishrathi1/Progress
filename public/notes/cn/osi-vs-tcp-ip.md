## Definition

Both the **OSI (Open Systems Interconnection)** model and the **TCP/IP** model are layered reference frameworks that describe how data moves from one host to another across a network. OSI is a 7-layer *conceptual* model standardized by ISO; TCP/IP is a 4-layer *practical* model that the modern Internet actually runs on.

## Layer Mapping

```text
OSI (7 layers)              TCP/IP (4 layers)
-----------------------------------------------
7 Application   ┐
6 Presentation  ├─────────► Application
5 Session       ┘
4 Transport     ──────────► Transport
3 Network       ──────────► Internet
2 Data Link     ┐
1 Physical      ┴─────────► Network Access (Link)
```

## Comparison

| Aspect | OSI | TCP/IP |
|--------|-----|--------|
| Layers | 7 | 4 |
| Nature | Conceptual / reference | Practical / implemented |
| Developed by | ISO | DARPA / IETF |
| Coupling | Layers independent | Layers somewhat coupled |
| Transport reliability | Both CO & CL | TCP (reliable), UDP (unreliable) |
| Usage today | Teaching / troubleshooting | Real Internet |
| Protocol dependence | Protocol-independent guide | Built around specific protocols |

## Key Similarities

- Both are **layered**, use encapsulation, and separate concerns.
- Both have an application, transport, and network layer that map closely.
- Both allow peer-to-peer communication where a layer talks to its counterpart on the remote host.

## Key Differences

- OSI cleanly splits presentation and session duties into separate layers; TCP/IP folds them into the application layer.
- OSI defines services, interfaces, and protocols separately; TCP/IP does not draw those lines as sharply.
- OSI was designed *before* protocols (top-down); TCP/IP protocols existed first and the model was described afterward (bottom-up).

## Key points

- Remember the OSI order with a mnemonic: **"All People Seem To Need Data Processing"** (layers 7→1).
- TCP/IP is what the Internet uses; OSI is the teaching/diagnostic reference.
- The OSI Application, Presentation, and Session layers collapse into a single TCP/IP Application layer.
- OSI Physical + Data Link collapse into TCP/IP Network Access layer.
- Transport = TCP/UDP; Internet layer = IP; these are the load-bearing protocols of the stack.
