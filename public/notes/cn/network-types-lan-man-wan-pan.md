## Definition

Networks are classified by their **geographic scope** — how far apart the connected devices are. The four common categories are **PAN, LAN, MAN, and WAN**.

## The four types

### PAN — Personal Area Network
- Smallest scope: a few meters around one person.
- Examples: Bluetooth earbuds, smartwatch to phone, USB-connected devices.

### LAN — Local Area Network
- Covers a single building, home, office, or campus (up to ~1 km).
- Privately owned; high speed (100 Mbps–10 Gbps); low latency.
- Examples: office Ethernet, home Wi-Fi.

### MAN — Metropolitan Area Network
- Spans a city or large campus (up to ~50 km).
- Often connects multiple LANs; may be run by an ISP or city.
- Examples: cable TV network, city-wide Wi-Fi.

### WAN — Wide Area Network
- Spans countries or continents; largest scope.
- Uses leased lines, fiber backbones, satellites; typically higher latency.
- The **Internet** is the largest WAN.

## Comparison

| Feature | PAN | LAN | MAN | WAN |
|---------|-----|-----|-----|-----|
| **Range** | ~10 m | Up to ~1 km | Up to ~50 km | Country/global |
| **Ownership** | Individual | Private | Private/public | Distributed/public |
| **Speed** | Low–moderate | Very high | High | Variable, often lower |
| **Cost** | Very low | Low | Moderate | High |
| **Example** | Bluetooth | Office Wi-Fi | City network | Internet |

## Scale diagram

```text
PAN  -> single person (meters)
LAN  -> one building/campus (kilometer)
MAN  -> one city (tens of km)
WAN  -> country / world (thousands of km)
```

## Key points

- Classification is by **distance/scope**, which in turn affects **speed, cost, and ownership**.
- **LAN** = fastest and cheapest per node; **WAN** = widest reach but slower and costlier.
- A **MAN** typically interconnects several LANs across a city.
- Larger scope generally means **higher latency** and more reliance on third-party infrastructure.
- Related terms: **CAN** (Campus) and **SAN** (Storage Area Network) are occasional extras.
