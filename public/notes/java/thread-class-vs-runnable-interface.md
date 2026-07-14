## Overview

Java offers two classic ways to define a thread's task: **extending `Thread`** or **implementing `Runnable`**. Both end up running via `Thread.start()`, but they differ in flexibility, reusability, and design cleanliness. **Implementing `Runnable` is generally preferred.**

## Extending Thread

```java
class MyThread extends Thread {
    public void run() {
        System.out.println("Via Thread subclass");
    }
}
new MyThread().start();
```

- The class **is** a thread; override `run()`.
- Uses up the single inheritance slot — you **cannot** extend any other class.

## Implementing Runnable

```java
class MyTask implements Runnable {
    public void run() {
        System.out.println("Via Runnable");
    }
}
Thread t = new Thread(new MyTask());
t.start();

// Or as a lambda (Runnable is a functional interface):
new Thread(() -> System.out.println("lambda task")).start();
```

- Separates the **task** (`Runnable`) from the **worker** (`Thread`).
- The class can still extend another class.
- The same `Runnable` can be reused across many threads or handed to an `ExecutorService`.

## Comparison

| Aspect | extends Thread | implements Runnable |
|--------|----------------|---------------------|
| Inheritance | Consumes the one `extends` slot | Leaves it free |
| Separation of concerns | Task tied to Thread | Task decoupled from Thread |
| Reusability | Poor | High (reuse/pool the task) |
| Works with Executors | Awkward | Natural fit |
| Lambda support | No | Yes (functional interface) |
| Recommended | Rarely | **Yes** |

## Design view

```text
extends Thread:   [MyThread = task + worker]  -> rigid

implements Runnable:
   [Runnable task] ---> [Thread worker] ---> start()
        (reusable)         (execution)
```

## Key points

- Both require overriding **`run()`** and launching with **`start()`**.
- **`Runnable`** decouples task from thread, preserves single inheritance, and integrates with thread pools — prefer it.
- `Runnable` is a **functional interface**, so lambdas work directly.
- Extend `Thread` only when you genuinely need to override thread behavior itself.
- **`Callable`** is the `Runnable` variant that returns a value and can throw checked exceptions.
