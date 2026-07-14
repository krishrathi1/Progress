## Overview

The OS provides a set of **operations** to manage the lifecycle of processes. The two fundamental ones are **process creation** and **process termination**; systems also support **wait**, **blocking**, and **suspension**.

## Process Creation

A process (the **parent**) creates one or more **child** processes, forming a **process tree**. In UNIX this is done with `fork()` followed by `exec()`.

- **`fork()`** — creates a child that is a copy of the parent's address space; returns child PID to parent, 0 to child.
- **`exec()`** — replaces the child's image with a new program.
- **`wait()`** — parent blocks until a child terminates and reaps its exit status.

```c
pid_t pid = fork();
if (pid == 0) {
    // child
    execlp("/bin/ls", "ls", NULL);
} else {
    // parent
    wait(NULL);   // wait for child to finish
}
```

**Resource sharing options:** parent and child share all, share a subset, or share nothing.
**Execution options:** run concurrently, or parent waits.

## Process Termination

A process ends via `exit()` (voluntary) delivering an exit status to the parent, or is killed by the OS/parent.

- **Normal exit** — `exit(status)`
- **Abnormal** — error, killed via `kill()` signal
- **Cascading termination** — if a parent dies, some OSes terminate all its children.

```text
Parent
 ├── Child A --> exit(0)  -> becomes ZOMBIE until parent wait()s
 └── Child B (parent dies) -> becomes ORPHAN -> adopted by init/systemd
```

## Special States

| Term | Meaning |
|------|---------|
| Zombie | Terminated child whose exit status not yet reaped by parent |
| Orphan | Child whose parent terminated first; re-parented to `init` |

## Other Operations

- **Block / Wakeup** — process waits on an event (I/O) then resumes.
- **Suspend / Resume** — swap a process out to disk (medium-term scheduler).

## Key Points

- `fork()` + `exec()` + `wait()` are the core UNIX process primitives.
- Processes form a **tree**; `init`/`systemd` (PID 1) is the root.
- Unreaped terminated children become **zombies**; parentless children become **orphans**.
- Termination frees resources (memory, open files, PCB).
