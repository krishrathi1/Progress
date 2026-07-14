## Definition

A `for` loop is an **entry-controlled** loop that packs initialization, condition, and update into a single line. It is ideal when the **number of iterations is known** in advance (counting loops, array traversal).

## Syntax and execution order

```java
for (initialization; condition; update) {
    // loop body
}
```

Execution sequence:

```text
1. init      → runs ONCE
2. condition → checked BEFORE each iteration
        true  → run body → 4. update → back to 2
        false → exit loop
```

```java
for (int i = 1; i <= 5; i++) {
    System.out.print(i + " ");   // 1 2 3 4 5
}
```

Order per pass: **condition → body → update → condition …**

## Variations

- **Multiple variables** (comma-separated):

```java
for (int i = 0, j = 9; i < j; i++, j--) {
    System.out.println(i + " " + j);
}
```

- **Infinite loop**: all three parts optional — `for(;;){ ... }`
- **Empty body**: `for (int i = 0; i < n; sum += arr[i++]);`

## for vs while vs for-each

| Loop | Best when | Counter |
|------|-----------|---------|
| `for` | Count is known | Explicit |
| `while` | Count unknown, condition-driven | Manual |
| `for-each` | Traverse a collection/array | Hidden |

## Scope note

A variable declared in the `init` part is **local to the loop** and cannot be used after it:

```java
for (int i = 0; i < 3; i++) { }
// System.out.println(i);  // ERROR: i out of scope
```

## Key points

- Entry-controlled: body may run **zero** times if condition is false initially.
- Condition is re-checked every pass; `update` runs **after** the body, not before.
- Keep loop bodies simple; avoid modifying the loop counter inside the body.
- Prefer the enhanced `for-each` for read-only iteration over arrays/collections.
