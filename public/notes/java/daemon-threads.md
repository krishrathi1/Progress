## Definition

A **daemon thread** is a low-priority background service thread that supports user (non-daemon) threads. The JVM **exits automatically** when only daemon threads remain — it does **not** wait for them to finish. The garbage collector is the classic example of a daemon thread.

## User vs Daemon Threads

| Aspect | User thread | Daemon thread |
|--------|-------------|---------------|
| Keeps JVM alive? | Yes | No |
| Typical use | Main application work | Background services (GC, timers) |
| On JVM exit | JVM waits for it | Abruptly terminated |
| Default | Non-daemon | Inherits creator's status |

## Creating a Daemon Thread

- Call `setDaemon(true)` **before** `start()` — otherwise `IllegalThreadStateException`.
- A thread inherits daemon status from the thread that created it.

```java
public class DaemonDemo {
    public static void main(String[] args) throws InterruptedException {
        Thread bg = new Thread(() -> {
            while (true) {
                System.out.println("daemon working...");
                try { Thread.sleep(200); } catch (InterruptedException e) { }
            }
        });
        bg.setDaemon(true);          // MUST be before start()
        System.out.println("isDaemon = " + bg.isDaemon());
        bg.start();

        Thread.sleep(500);           // main is a USER thread
        System.out.println("main ends -> JVM exits, daemon killed");
        // The infinite daemon loop stops because JVM shuts down.
    }
}
```

## Lifecycle Diagram

```text
main (user) ───runs───► ends
daemon      ───runs───────────► [killed abruptly when
                                 last user thread ends]
JVM alive while >=1 USER thread exists.
```

## Key points

- `setDaemon(true)` must be called **before** `start()`.
- The JVM terminates once **no user threads** remain, killing daemons immediately.
- Daemons are abruptly stopped — **do not** use them for critical I/O or work needing cleanup (`finally` may not run).
- `isDaemon()` checks a thread's status; `main` and normal threads are user threads by default.
- Use daemons for housekeeping tasks: GC, monitoring, cache eviction, background pollers.
