## Definition

**Switching** is the process of forwarding data frames between devices on a network. A **switch** is a Layer-2 device that uses **MAC addresses** to forward frames only to the intended destination port, unlike a hub which floods every port.

## How a switch works

- Maintains a **MAC address table** (CAM table) mapping MAC → port.
- **Learning**: records the source MAC and incoming port of each frame.
- **Forwarding**: looks up the destination MAC; sends the frame out only that port.
- **Flooding**: if the destination is unknown or is broadcast/multicast, sends to all ports except the source.
- Each switch port is a **separate collision domain**; all ports share one **broadcast domain** (by default).

```text
   PC-A (MAC aa) --port1--\
                           [ SWITCH ]  MAC table:
   PC-B (MAC bb) --port2--/            aa->1  bb->2  cc->3
   PC-C (MAC cc) --port3--
Frame aa->bb enters port1, switch forwards ONLY to port2.
```

## Switching methods

| Method | Behavior | Latency | Error check |
|--------|----------|---------|-------------|
| Store-and-forward | Receives whole frame, checks FCS | Higher | Yes |
| Cut-through | Forwards after reading dest MAC | Lowest | No |
| Fragment-free | Reads first 64 bytes | Medium | Partial |

## VLAN (Virtual LAN)

A **VLAN** logically segments one physical switch into multiple **broadcast domains**. Ports assigned to different VLANs cannot communicate at Layer 2 without a router / Layer-3 switch.

- Reduces broadcast traffic and improves **security** and **management**.
- **802.1Q** inserts a 4-byte tag (with 12-bit VLAN ID, 1–4094) into the Ethernet frame.
- **Access port**: belongs to one VLAN; **trunk port**: carries multiple tagged VLANs between switches.
- **Inter-VLAN routing** requires a router or L3 switch.

## Key points

- Switch forwards by MAC using a learned CAM table; each port = own collision domain.
- VLAN = logical broadcast-domain segmentation, tagged via **IEEE 802.1Q**.
- VLANs improve security, reduce broadcasts; inter-VLAN traffic needs a router/L3 switch.
- Store-and-forward validates FCS; cut-through minimizes latency.
