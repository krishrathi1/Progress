## Definition

Java's standard library bundles utility classes for numeric computation (**`java.lang.Math`**), randomness (**`java.util.Random`**, `Math.random()`, `ThreadLocalRandom`), and dates/times (legacy `java.util.Date`/`Calendar` and the modern **`java.time`** API).

## Math class

`Math` is `final` with all `static` methods and constants `Math.PI`, `Math.E`.

```java
Math.abs(-5);        // 5
Math.max(3, 9);      // 9
Math.pow(2, 10);     // 1024.0
Math.sqrt(144);      // 12.0
Math.ceil(4.1);      // 5.0
Math.floor(4.9);     // 4.0
Math.round(4.5);     // 5  (long/int)
Math.random();       // double in [0.0, 1.0)
```

## Random class

Produces a **pseudo-random** sequence; a fixed seed reproduces the sequence (useful for tests).

```java
import java.util.Random;
Random r = new Random(42);       // seeded -> deterministic
int dice = r.nextInt(6) + 1;     // 1..6
double d  = r.nextDouble();      // [0.0,1.0)
boolean b = r.nextBoolean();

// Concurrent code: avoid shared Random contention
int n = java.util.concurrent.ThreadLocalRandom.current().nextInt(1, 101); // 1..100
```

| Need | Best choice |
|------|-------------|
| Simple one-off value | `Math.random()` |
| Reproducible / typed values | `new Random(seed)` |
| Multi-threaded | `ThreadLocalRandom` |
| Cryptographic | `java.security.SecureRandom` |

## Date / Time utilities

Prefer the immutable, thread-safe `java.time` API (Java 8+) over legacy `Date`/`Calendar`.

```java
import java.time.*;
import java.time.format.DateTimeFormatter;

LocalDate today = LocalDate.now();          // 2026-07-14
LocalDate due   = today.plusDays(30);       // arithmetic
LocalDateTime dt = LocalDateTime.now();
Duration gap = Duration.ofHours(5);

String s = today.format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));
LocalDate parsed = LocalDate.parse("2026-01-01");
```

```text
Legacy vs modern:
  Date/Calendar  -> mutable, not thread-safe, 0-based months (bug-prone)
  java.time      -> immutable, thread-safe, clear API  <-- use this
```

## Key points

- `Math` methods are static; `Math.round` returns integral, `ceil/floor` return `double`.
- `Random` with a seed is reproducible; use `ThreadLocalRandom` under concurrency.
- Use `SecureRandom` for security-sensitive randomness.
- `java.time` classes are immutable and thread-safe — favour them.
- `Math.random()` = `[0,1)`; scale with `(int)(Math.random()*n)`.
