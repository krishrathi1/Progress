## Overview

The OS coordinates all hardware and software so that programs run correctly, efficiently, and safely. Its responsibilities are grouped into several **management functions**, each handled by a dedicated subsystem of the kernel.

## Core functions

### 1. Process management
- Creates, schedules, suspends, and terminates processes/threads.
- Handles **CPU scheduling**, context switching, and inter-process communication (IPC).
- Deals with synchronization and **deadlock** handling.

### 2. Memory management
- Tracks which parts of memory are in use and by whom.
- Allocates/deallocates memory, implements **virtual memory** (paging/segmentation).
- Provides isolation so one process cannot corrupt another's memory.

### 3. File management
- Organizes data into **files and directories**.
- Controls creation, deletion, read/write, and access permissions.
- Maps logical files onto physical storage blocks.

### 4. Device (I/O) management
- Manages devices via **device drivers** and buffering/caching/spooling.
- Hides device-specific details behind a uniform interface.

### 5. Storage / secondary-storage management
- Handles disk scheduling, free-space management, and allocation.

## Supporting functions

| Function | What it does |
|----------|-------------|
| **Security & protection** | Authentication, access control, isolation between users/processes |
| **Networking** | Manages network connections and protocols |
| **Error detection** | Detects hardware/software faults and responds gracefully |
| **Accounting** | Tracks resource usage per user/process |
| **User interface** | Provides CLI (shell) and/or GUI |

## Diagram

```text
                +---------------------+
                |  Operating System   |
                +---------------------+
   Process Mgmt | Memory Mgmt | File Mgmt | I/O Mgmt | Security
   -----------------------------------------------------------
          CPU        RAM        Disk       Devices    Users
```

## Key points

- Five core managers: **process, memory, file, device, and storage**.
- Cross-cutting duties: **security/protection, error detection, accounting, networking, UI**.
- Overall goal: manage resources efficiently while giving programs a clean, safe abstraction.
- Frequently asked in interviews as "list and explain the functions of an OS."
