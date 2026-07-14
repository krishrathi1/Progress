## Definition

A **for loop** repeats a block of code a controlled number of times. It bundles the three parts of iteration — **initialization**, **condition**, and **update** — into one line, making it ideal when the number of iterations is known.

## Anatomy

```java
for (int i = 0; i < n; i++) {
    // body
}
//   ①init   ②cond  ③update
```

```text
 ① init  ->  ② check condition ── false ──► exit
                    │ true
                    ▼
                 run body
                    │
                 ③ update ──┐
                    ▲────────┘  (loop back to ②)
```

Execution order: init once → check condition → body → update → check again …

## Common Patterns

```java
// Sum of first n natural numbers
int sum = 0;
for (int i = 1; i <= n; i++) sum += i;

// Reverse traversal
for (int i = arr.length - 1; i >= 0; i--) System.out.print(arr[i]);

// Step by 2
for (int i = 0; i < n; i += 2) { ... }

// Enhanced for-each (read-only iteration, no index)
for (int x : arr) System.out.println(x);
```

## Nested Loops

Used for grids, matrices, and pair comparisons. Total iterations multiply.

```java
for (int i = 0; i < n; i++) {          // rows
    for (int j = 0; j < m; j++) {      // columns
        System.out.print(grid[i][j] + " ");
    }
    System.out.println();
}
// Time complexity: O(n × m)
```

## Loop Control

| Keyword | Effect |
|---------|--------|
| `break` | Exit the loop immediately |
| `continue` | Skip to the next iteration (runs update) |

```java
for (int i = 0; i < n; i++) {
    if (arr[i] < 0) continue;   // skip negatives
    if (arr[i] == target) break;// stop when found
}
```

## for vs while

| Use `for` when | Use `while` when |
|----------------|------------------|
| Iteration count is known | Loop until a condition changes |
| Iterating over a range/array | Reading input until sentinel/EOF |

## Key points

- Order: init (once) → condition → body → update → repeat.
- An off-by-one error usually comes from `<` vs `<=` — count iterations carefully.
- Nested loops multiply cost: two loops over n give O(n²).
- Use `break` to stop early and `continue` to skip; both improve efficiency.
- Prefer the for-each loop for simple read-only traversal when you don't need the index.
