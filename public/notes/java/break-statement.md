## Definition

The `break` statement **immediately terminates** the nearest enclosing `switch`, `for`, `while`, or `do-while` and transfers control to the statement right after that loop/switch. It is used to exit early once a goal is met.

## Two uses

### 1. Inside a switch

Prevents fall-through by ending the switch after a matched case (see the `switch` topic).

### 2. Inside loops — early exit

```java
int[] arr = {4, 8, 15, 16, 23};
int target = 15, idx = -1;
for (int i = 0; i < arr.length; i++) {
    if (arr[i] == target) {
        idx = i;
        break;           // found it, stop searching
    }
}
System.out.println("Found at index " + idx);   // 2
```

```text
i=0 → 4  ≠15
i=1 → 8  ≠15
i=2 → 15 =15 ─► break ─► exit loop
(i=3, i=4 never checked)
```

## break vs continue vs return

| Statement | Effect |
|-----------|--------|
| `break` | Exits the whole loop/switch |
| `continue` | Skips to the next iteration |
| `return` | Exits the entire method |

## Labeled break — exiting nested loops

Plain `break` only leaves the **innermost** loop. A **labeled** break exits a specific outer loop:

```java
outer:
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
        if (i * j == 2) {
            System.out.println("Stop at " + i + "," + j);
            break outer;      // exits BOTH loops
        }
    }
}
```

Without the label, only the inner `for` would end and the outer loop would continue.

## Key points

- `break` exits only the **innermost** loop/switch unless a **label** is used.
- Improves efficiency by stopping work as soon as the answer is found (e.g., search).
- Overusing `break` can hurt readability — sometimes a well-formed loop condition is clearer.
- In a `switch`, a missing `break` causes unintended fall-through.
