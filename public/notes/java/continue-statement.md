## Definition

The `continue` statement **skips the rest of the current iteration** of a loop and jumps directly to the next iteration. Unlike `break` (which exits the loop entirely), `continue` only abandons the *current pass* and keeps the loop running.

## How it works

- In a `for` loop, `continue` jumps to the **update/increment** expression, then re-checks the condition.
- In a `while` / `do-while` loop, `continue` jumps straight back to the **condition test**.
- It works only inside loops; using it elsewhere is a compile-time error.

```java
// Print odd numbers from 1..10, skipping even ones
for (int i = 1; i <= 10; i++) {
    if (i % 2 == 0) {
        continue;      // skip the print below for even i
    }
    System.out.print(i + " ");
}
// Output: 1 3 5 7 9
```

## Control-flow diagram

```text
for (init; cond; update)
        |
        v
   [ check cond ] --false--> exit loop
        | true
        v
   ...body...
   continue;  ------------->\
        |                    |
        v                    |
   rest of body (skipped)    |
        |                    |
        +--------------------+--> [ update ] --> back to check cond
```

## Labeled continue

With a label, `continue` can skip to the next iteration of an **outer** loop:

```java
outer:
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
        if (j == 1) continue outer;   // next i, not next j
        System.out.println(i + "," + j);
    }
}
// Prints only pairs where j == 0
```

## continue vs break

| Aspect | `continue` | `break` |
|--------|-----------|---------|
| Effect | Skips current iteration | Exits the whole loop |
| Loop keeps running? | Yes | No |
| Jumps to | Update / condition | Statement after loop |
| Labeled form | Skips to next outer iteration | Exits labeled loop |

## Key points

- `continue` skips remaining statements in the body **for the current iteration only**.
- In `for` loops it still runs the update expression — beware of infinite loops in `while` if the increment sits below `continue`.
- Use it to cleanly avoid deep nesting (guard clauses inside loops).
- Labeled `continue` targets an enclosing loop; without a label it affects the innermost loop.
