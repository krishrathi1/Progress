## Definition

**Booting** is the sequence of steps that starts a computer and loads the operating system into main memory (RAM) so it becomes usable. It runs automatically when power is turned on (**cold boot**) or when the machine is restarted (**warm boot**).

Because RAM is volatile and empty at power-on, the CPU must run code from **non-volatile firmware** first, which then locates and loads the OS from disk. This staged loading is called **bootstrapping** ("pulling yourself up by your bootstraps").

## Step-by-step flow

1. **Power on / reset** — CPU registers reset; the program counter is set to a fixed address in ROM/firmware.
2. **Firmware (BIOS or UEFI)** runs the **POST** (Power-On Self-Test), checking RAM, CPU, and essential devices.
3. Firmware finds the boot device (per boot order) and loads the **bootloader**.
4. **Bootloader** (e.g., GRUB, Windows Boot Manager) loads the **OS kernel** into memory. It may show a menu to pick an OS.
5. **Kernel initialization** — sets up memory management, device drivers, interrupt handlers, and mounts the root filesystem.
6. **First process starts** (e.g., `init` / `systemd` on Linux) which launches system services.
7. **Login / shell / GUI** presented — system is ready.

```text
Power ON
  |
[Firmware BIOS/UEFI] --POST--> hardware OK?
  |
[Bootloader (MBR/EFI)] --loads--> Kernel
  |
[Kernel init] --> drivers, memory, filesystem
  |
[init/systemd] --> services --> Login/GUI
```

## BIOS vs UEFI

| Aspect | BIOS (legacy) | UEFI (modern) |
|--------|---------------|---------------|
| Disk scheme | MBR (≤ 2 TB) | GPT (huge disks) |
| Interface | Text, 16-bit | Graphical, 32/64-bit |
| Boot speed | Slower | Faster |
| Security | None | Secure Boot |

## Key points

- Firmware is stored in non-volatile ROM/flash because RAM is empty at power-on.
- **Bootstrapping**: a small program loads a bigger one, which loads the OS.
- **POST** validates hardware before loading software.
- **Cold boot** = from power-off; **warm boot** = restart without cutting power.
- Order: Firmware → Bootloader → Kernel → init process → user session.
