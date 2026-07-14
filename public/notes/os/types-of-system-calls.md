## Overview

System calls are grouped by the **kind of service** they request from the kernel. There are five broad categories.

## 1. Process control
- Create/terminate processes, load/execute programs, wait for events, allocate/free memory.
- Examples: `fork()`, `exec()`, `exit()`, `wait()` (Unix); `CreateProcess()`, `ExitProcess()` (Windows).

## 2. File management
- Create, delete, open, close, read, write, and reposition files; get/set file attributes.
- Examples: `open()`, `read()`, `write()`, `close()`, `lseek()` (Unix); `CreateFile()`, `ReadFile()` (Windows).

## 3. Device management
- Request/release a device, read/write/reposition on a device, get/set device attributes.
- Devices are often treated like files. Examples: `ioctl()`, `read()`, `write()`.

## 4. Information maintenance
- Get/set system data such as time, date, process/file attributes, and system configuration.
- Examples: `getpid()`, `alarm()`, `time()`, `sleep()`.

## 5. Communication
- Establish connections, send/receive messages, share memory between processes.
- Two models: **message passing** (`pipe()`, `send()`, `recv()`) and **shared memory** (`shmget()`, `mmap()`).

## Category summary

| Category | Purpose | Unix examples | Windows examples |
|----------|---------|---------------|------------------|
| Process control | Manage processes | `fork`, `exec`, `exit`, `wait` | `CreateProcess`, `ExitProcess` |
| File management | Manage files | `open`, `read`, `write`, `close` | `CreateFile`, `ReadFile` |
| Device management | Manage devices | `ioctl`, `read`, `write` | `ReadConsole`, `WriteConsole` |
| Information | System data | `getpid`, `time`, `alarm` | `GetCurrentProcessID` |
| Communication | IPC | `pipe`, `shmget`, `mmap` | `CreatePipe`, `MapViewOfFile` |

```text
                 System Calls
   ______________|_______________________
  |        |          |          |         |
Process  File     Device    Information  Communication
control  mgmt     mgmt      maintenance
```

## Key points

- Five categories: **process control, file management, device management, information maintenance, communication**.
- Communication uses either **message passing** or **shared memory**.
- The same operation name (e.g., `read`) may serve both file and device management since devices are often file-like.
- Knowing representative examples per category is a frequent exam ask.
