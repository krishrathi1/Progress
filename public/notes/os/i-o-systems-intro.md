## Definition

The **I/O subsystem** of an operating system manages all communication between the CPU/memory and peripheral devices (disks, keyboards, network cards, printers). It hides device-specific details behind a uniform interface so applications can do I/O without knowing hardware specifics.

## I/O Hardware Components

- **Ports:** connection points where a device attaches to the machine.
- **Bus:** shared wires that carry data among devices and the CPU (e.g., PCIe).
- **Controller:** electronics that operate a port/bus/device; contains registers the CPU reads/writes.
- **Device registers:** *data-in*, *data-out*, *status*, and *control* registers.

## How the CPU talks to devices

```text
+-----+     +------------+     +--------+
| CPU | <-> | Controller | <-> | Device |
+-----+     +------------+     +--------+
   |   status/control/data registers   |
   +--- port-mapped OR memory-mapped ---+
```

- **Port-mapped I/O:** special CPU instructions (e.g., `IN`/`OUT`) address device registers.
- **Memory-mapped I/O:** device registers appear as normal memory addresses; regular loads/stores access them.

## Techniques for performing I/O

| Technique | How it works | CPU cost |
|-----------|-------------|----------|
| **Polling (busy-wait)** | CPU repeatedly reads the status register until ready | High — wastes cycles |
| **Interrupt-driven** | Device raises an interrupt when ready; CPU handles it via an ISR | Lower — CPU free meanwhile |
| **DMA (Direct Memory Access)** | A DMA controller transfers blocks between device and memory directly, interrupting CPU only when done | Lowest for bulk transfer |

## Software layers (I/O stack)

```text
User application
   -> Device-independent OS I/O software (buffering, naming, protection)
      -> Device drivers (translate generic calls to device commands)
         -> Interrupt handlers
            -> Hardware
```

## Key points

- **Device drivers** provide a uniform interface, letting the kernel treat different devices alike.
- **Interrupts** let the CPU do other work instead of busy-waiting.
- **DMA** is essential for high-throughput devices (disk, network) so the CPU is not the bottleneck.
- **Buffering, caching, and spooling** in the device-independent layer smooth speed mismatches and enable device sharing.
- Devices are broadly **block** (disk — addressable blocks) or **character** (keyboard — byte stream) type.
