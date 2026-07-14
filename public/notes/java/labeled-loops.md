## Definition

A **label** is an identifier followed by a colon placed before a loop. It lets `break` and `continue` target a **specific enclosing loop** instead of only the innermost one. This is Java's structured, safe alternative to `goto`.

## Syntax

```java
labelName:
for (...) {
    for (...) {
        break labelName;      // exit the labeled (outer) loop
        continue labelName;   // next iteration of labeled loop
    }
}
```

## Why they are needed

In nested loops, a plain `break` only exits the **inner** loop. To exit *all* loops at once (e.g., after finding a target in a 2D grid), you either need extra flag variables or a labeled break.

```java
int[][] grid = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
int target = 5;
boolean found = false;

search:
for (int i = 0; i < grid.length; i++) {
    for (int j = 0; j < grid[i].length; j++) {
        if (grid[i][j] == target) {
            System.out.println("Found at " + i + "," + j);
            found = true;
            break search;   // exits BOTH loops at once
        }
    }
}
```

## labeled break vs labeled continue

```text
labeled break  -> jumps to the statement AFTER the labeled loop
labeled continue -> jumps to the next iteration of the labeled loop

outer:
for i in 0..2:
   for j in 0..2:
       continue outer;  --> i++ , inner loop restarts fresh
       break outer;     --> leave both loops entirely
```

```java
outer:
for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= 3; j++) {
        if (j == 2) continue outer;   // skip to next i
        System.out.println(i + "," + j);
    }
}
// Output: 1,1  2,1  3,1
```

## Comparison

| Statement | Without label | With label |
|-----------|---------------|-----------|
| `break` | Exits innermost loop | Exits the labeled loop |
| `continue` | Skips iteration of innermost loop | Skips to next iteration of labeled loop |

## Key points

- A label can only prefix a loop (or block) and is referenced only by `break`/`continue`.
- Labeled `break` is the cleanest way to escape deeply nested loops.
- Labels are **not** a general `goto` — they can only jump *out* or *forward to the next iteration*, never arbitrarily.
- Overusing labels hurts readability; often extracting the loop into a method with `return` is cleaner.
