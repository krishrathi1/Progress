## Definition

**Inter-Process Communication (IPC)** is a set of mechanisms the OS provides that let cooperating processes **exchange data** and **synchronize** their actions. Processes need IPC because each has its own isolated address space and cannot directly read another's memory.

## Why Cooperate

- **Information sharing** (shared file/data)
- **Computation speedup** (parallel subtasks)
- **Modularity** and **convenience**

## Two Fundamental Models

```text
   SHARED MEMORY                 MESSAGE PASSING
 +----------+  +----------+     +--------+        +--------+
 |  P1      |  |   P2     |     |  P1    |  msg   |  P2    |
 |     \    |  |   /      |     |        |------->|        |
 +------\---+  +--/-------+     +--------+ kernel +--------+
      [ shared region ]           (send / receive via OS)
     (fast, user manages sync)   (slower, OS mediates)
```

## Shared Memory vs Message Passing

| Aspect | Shared Memory | Message Passing |
|--------|---------------|-----------------|
| Speed | Fast (no kernel per access) | Slower (kernel involved each msg) |
| Setup | Establish region once | System calls per message |
| Synchronization | Programmer's job (semaphores/mutex) | Implicit in send/receive |
| Best for | Large data, high volume | Small data, distributed systems |

## Message Passing Details

- **`send(destination, message)`** and **`receive(source, message)`**
- **Direct** (name the process) vs **Indirect** (via mailbox/port)
- **Blocking (synchronous)** vs **Non-blocking (asynchronous)**
- **Buffering:** zero capacity, bounded, or unbounded queue

## Common IPC Mechanisms

- **Pipes** — unidirectional byte stream (`ls | grep`); anonymous (related procs) or **named/FIFO**.
- **Message queues** — OS-maintained linked list of messages.
- **Shared memory segments** — `shmget`/`shmat` (fastest).
- **Sockets** — communication across machines (network IPC).
- **Signals** — asynchronous notifications (`SIGINT`, `SIGKILL`).

```c
int fd[2];
pipe(fd);                 // fd[0]=read, fd[1]=write
if (fork() == 0) {
    close(fd[0]);
    write(fd[1], "hi", 2);   // child writes
} else {
    close(fd[1]);
    char buf[3];
    read(fd[0], buf, 2);     // parent reads
}
```

## Key Points

- IPC solves isolation: processes cannot share memory by default.
- **Shared memory = fastest but needs manual synchronization**; **message passing = safer, OS-mediated**.
- Pipes, message queues, shared memory, sockets, and signals are the main UNIX IPC tools.
- Sockets extend IPC across networks (distributed systems).
