## Definition

**Multiplexing** is the technique of combining multiple signals (from several senders) so they can share a single physical transmission medium (link). At the receiving end, **demultiplexing** separates them back into individual streams. The goal is to maximize utilization of an expensive, high-capacity link.

```text
 Sender 1 ─┐                              ┌─ Receiver 1
 Sender 2 ─┤   MUX ═══ shared link ═══ DEMUX  ├─ Receiver 2
 Sender 3 ─┘   (combine)          (separate) └─ Receiver 3
```

## Types

### FDM — Frequency Division Multiplexing
- The link bandwidth is split into non-overlapping **frequency bands**; each signal is modulated onto its own carrier and all travel **simultaneously**.
- **Guard bands** (unused frequency gaps) prevent interference between channels.
- Analog technique. Used in **radio, TV broadcasting, cable TV, first-gen cellular**.

### TDM — Time Division Multiplexing
- The link is shared in **time**: each signal gets the full bandwidth for a short **time slot**, in round-robin fashion.
- **Synchronous TDM**: fixed slots per source (wastes idle slots). **Statistical (async) TDM**: slots allocated on demand, improving efficiency.
- Digital technique. Used in **T1/E1 lines, ISDN, digital telephony**.

### WDM — Wavelength Division Multiplexing
- FDM applied to **optical fiber**: multiple light beams of different **wavelengths (colors)** travel through one fiber.
- Combined/split by **prisms or diffraction gratings**. **DWDM** packs many closely spaced wavelengths for huge capacity.
- Used in **high-speed fiber-optic backbones**.

## Comparison

| Feature | FDM | TDM | WDM |
|---------|-----|-----|-----|
| Shares by | Frequency | Time | Wavelength |
| Signal type | Analog | Digital | Optical (analog) |
| Simultaneous? | Yes | No (interleaved) | Yes |
| Separator | Filters + guard bands | Time slots + sync | Prism/grating |
| Medium | Air, cable | Copper wire | Fiber optic |

## Key points

- Multiplexing improves link utilization and lowers cost per channel.
- FDM = share frequency, TDM = share time, WDM = FDM for light on fiber.
- FDM/WDM send all channels at once; TDM interleaves in time.
- Guard bands (FDM/WDM) and synchronization (TDM) prevent overlap/confusion.
- Statistical TDM beats synchronous TDM by skipping idle sources.
