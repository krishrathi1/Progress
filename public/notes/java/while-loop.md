## Definition

A `while` loop is an **entry-controlled** loop that repeats its body **as long as a boolean condition is true**. It is the natural choice when the number of iterations is **not known in advance** and depends on runtime state.

## Syntax and flow

```java
while (condition) {
    // body
    // update something that affects condition
}
```

```text
        ┌──────────────┐
        ▼              │
   check condition ─── true ──► run body ──┘
        │
      false
        ▼
     exit loop
```

Because the condition is checked **first**, the body may execute **zero times**.

```java
int i = 1;
while (i <= 5) {
    System.out.print(i + " ");   // 1 2 3 4 5
    i++;                          // must update, else infinite loop
}
```

## Common patterns

- **Reading until sentinel / EOF**:

```java
Scanner sc = new Scanner(System.in);
int sum = 0;
while (sc.hasNextInt()) {
    sum += sc.nextInt();
}
```

- **Infinite loop with break**:

```java
while (true) {
    String cmd = getCommand();
    if (cmd.equals("quit")) break;
    process(cmd);
}
```

## while vs do-while

| Feature | `while` | `do-while` |
|---------|---------|-----------|
| Condition check | Before body | After body |
| Minimum runs | 0 | 1 |
| Type | Entry-controlled | Exit-controlled |

## Key points

- Always ensure the condition eventually becomes false — a missing update causes an **infinite loop**.
- Use `while` when iteration count is unknown (input-, event-, or flag-driven).
- The body runs zero times if the condition is false at entry.
- `break` exits the loop; `continue` skips to the next condition check.
