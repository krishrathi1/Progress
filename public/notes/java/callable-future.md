## Definition

- **`Callable<V>`** is a functional interface like `Runnable`, but its `call()` method **returns a result** of type `V` and can **throw a checked exception**.
- **`Future<V>`** is a handle to the *pending result* of an asynchronous computation submitted to an `ExecutorService`. It lets you retrieve the value later, check completion, or cancel the task.

```java
@FunctionalInterface
interface Callable<V> { V call() throws Exception; }
```

## Runnable vs Callable

| Feature | `Runnable` | `Callable<V>` |
|---------|-----------|---------------|
| Method | `void run()` | `V call()` |
| Returns value | No | Yes |
| Throws checked exception | No | Yes |
| Submitted via | `execute()` / `submit()` | `submit()` |

## Future methods

- `V get()` → **blocks** until the result is ready (or exception).
- `V get(timeout, unit)` → blocks with a timeout; throws `TimeoutException`.
- `boolean cancel(mayInterrupt)` → attempts cancellation.
- `isDone()`, `isCancelled()` → status checks.

## Example

```java
import java.util.concurrent.*;

public class FutureDemo {
    public static void main(String[] args) throws Exception {
        ExecutorService pool = Executors.newFixedThreadPool(2);

        Callable<Integer> task = () -> {
            int sum = 0;
            for (int i = 1; i <= 100; i++) sum += i;
            return sum;                 // returns a value
        };

        Future<Integer> f = pool.submit(task);
        System.out.println("Doing other work...");
        Integer result = f.get();       // blocks until ready = 5050
        System.out.println("Sum = " + result);

        pool.shutdown();
    }
}
```

## Execution flow

```text
main thread            worker thread
   |  submit(task) ------->  call() runs
   |  ... other work         computing...
   |  f.get()  [BLOCKS] <---- returns 5050
   |  print 5050
```

## invokeAll & CompletableFuture

- `invokeAll(list)` runs many `Callable`s and returns a `List<Future>`.
- `Future.get()` is blocking; for non-blocking pipelines and callbacks prefer **`CompletableFuture`** (`thenApply`, `thenCompose`, `supplyAsync`).

## Key points

- `Callable` = returns a value + throws checked exceptions; `Runnable` does neither.
- `get()` is **blocking** — calling it immediately after `submit` defeats concurrency.
- Exceptions inside `call()` surface as an `ExecutionException` from `get()`.
- Use `CompletableFuture` (Java 8+) for composable, non-blocking async code.
