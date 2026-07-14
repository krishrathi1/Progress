## What is a while loop?

A **while loop** repeatedly executes a block of code **as long as a condition stays true**. Unlike a `for` loop (best when the number of iterations is known in advance), a `while` loop shines when you loop until some condition is met — reading input, processing digits of a number, or waiting for convergence.

```text
        +-------------------+
   +--->| check condition?  |--- false ---> exit loop
   |    +-------------------+
   |             | true
   |             v
   |    +-------------------+
   +----|   loop body       |
        +-------------------+
```

### Anatomy

```java
int i = 0;              // 1. initialization (before the loop)
while (i < 5) {         // 2. condition (checked BEFORE each pass)
    System.out.println(i);
    i++;                // 3. update (must move toward false!)
}
```

- The condition is evaluated **before** the body runs. If false initially, the body runs **zero** times.
- You must ensure the update eventually makes the condition false, otherwise you get an **infinite loop**.

### while vs do-while

| Feature | `while` | `do-while` |
|---------|---------|-----------|
| Condition checked | Before body | After body |
| Minimum runs | 0 | 1 |
| Use case | May skip entirely | Run at least once (menus) |

```java
int n = 0;
do {
    System.out.println(n);   // prints 0 once even though 0 < 0 is false
} while (n < 0);
```

### Classic pattern: process digits

```java
int n = 7413, count = 0;
while (n > 0) {      // stops when no digits left
    int digit = n % 10;
    count++;
    n /= 10;         // update: shrinks n toward 0
}
// count == 4
```

### break and continue

- `break` — exit the loop immediately.
- `continue` — skip to the next condition check.

```java
int i = 0;
while (true) {           // intentional infinite loop
    i++;
    if (i % 2 == 0) continue;  // skip evens
    if (i > 9) break;          // exit
    System.out.print(i + " "); // 1 3 5 7 9
}
```

## Key points

- Condition is tested **before** each iteration; body may run 0 times.
- Always include an **update** that drives the condition toward false.
- Use `while` for unknown iteration counts, `for` for known counts.
- `do-while` guarantees at least one execution.
- Missing/incorrect update is the #1 cause of infinite loops.
