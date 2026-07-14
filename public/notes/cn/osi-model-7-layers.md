## OSI Model
A 7-layer reference model describing how data moves across a network. Each layer serves the one above and uses the one below. Mnemonic (top→bottom): **All People Seem To Need Data Processing**.

| # | Layer | Job | Examples / PDU |
|---|---|---|---|
| 7 | Application | User-facing services | HTTP, DNS, SMTP |
| 6 | Presentation | Encoding, encryption, compression | TLS, JPEG |
| 5 | Session | Open/manage/close sessions | RPC, sockets |
| 4 | Transport | End-to-end delivery, reliability, ports | TCP, UDP · *Segment* |
| 3 | Network | Logical addressing & routing | IP · *Packet* |
| 2 | Data Link | Node-to-node frames, MAC, error detect | Ethernet · *Frame* |
| 1 | Physical | Bits over the medium | cables, radio · *Bits* |

## Data flow (encapsulation)
~~~
Sender:   Data -> +TCP hdr -> +IP hdr -> +Frame hdr -> bits ->
Receiver: bits -> Frame -> IP -> TCP -> Data   (each layer strips its header)
~~~

## OSI vs TCP/IP
TCP/IP collapses OSI into 4 layers: Application (7-5), Transport (4), Internet (3), Network Access (2-1). OSI is the *teaching* model; TCP/IP is what the Internet actually runs.

## Key point
Remember which **PDU** and **addresses** live where: Layer 2 = MAC/frames, Layer 3 = IP/packets, Layer 4 = ports/segments.
