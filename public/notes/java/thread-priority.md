## Definition

**Thread priority** is an integer hint (1–10) that tells the JVM thread scheduler the relative importance of a thread. Higher-priority threads are *preferred* for CPU time, but priority is **advisory only** — actual behavior depends on the underlying OS scheduler.

## Priority Constants

The `Thread` class defines three named constants:

| Constant | Value | Meaning |
|----------|-------|---------|
| `Thread.MIN_PRIORITY` | 1 | Lowest priority |
| `Thread.NORM_PRIORITY` | 5 | Default (every thread inherits parent's, usually 5) |
| `Thread.MAX_PRIORITY` | 10 | Highest priority |

- Set with `setPriority(int)`, read with `getPriority()`.
- Valid range is 1–10; passing anything else throws `IllegalArgumentException`.
- A new thread inherits the priority of the thread that created it.

## Example

```java
public class PriorityDemo {
    public static void main(String[] args) {
        Thread high = new Thread(() -> print("HIGH"));
        Thread low  = new Thread(() -> print("low"));

        high.setPriority(Thread.MAX_PRIORITY);  // 10
        low.setPriority(Thread.MIN_PRIORITY);   // 1

        System.out.println("main priority = " +
            Thread.currentThread().getPriority()); // 5

        low.start();
        high.start();
    }
    static void print(String tag) {
        for (int i = 0; i < 3; i++) System.out.println(tag + " " + i);
    }
}
```

## Scheduling Diagram

```text
Priority is a HINT, not a guarantee:

  high (10) ─┐
             ├──► OS scheduler ──► CPU  (high usually favored,
  low  (1) ──┘                          but NOT guaranteed order)
```

## Key points

- Priority range is **1 to 10**; default is **5** (`NORM_PRIORITY`).
- It is only a **hint** — the OS may ignore it entirely (e.g., many systems map all Java priorities similarly).
- **Never** rely on priority for program correctness; use it only for performance tuning.
- Priority does not prevent race conditions or guarantee execution order.
- A child thread inherits its creator's priority unless explicitly changed.
