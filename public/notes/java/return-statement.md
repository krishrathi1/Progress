## Definition

The `return` statement **ends execution of the current method** and optionally hands a value back to the caller. Control immediately transfers to the point where the method was invoked.

## Two forms

- **`return;`** — used in methods declared `void`; simply exits the method.
- **`return expression;`** — used in non-void methods; the expression's type must be assignable to the method's declared return type.

```java
// value-returning method
int max(int a, int b) {
    if (a > b) return a;   // exits here if true
    return b;
}

// void method with early return (guard clause)
void greet(String name) {
    if (name == null) return;      // stop early
    System.out.println("Hi " + name);
}
```

## Execution flow

```text
caller:  int m = max(3, 7);
             |
             v
        max(3,7) runs
             |
        return b;  --> value 7 produced
             |
             v
        control + value back to caller
             |
        m = 7
```

## Rules and behavior

- Every non-void method must return a value on **every** code path, or it is a compile error ("missing return statement").
- Code placed after an unconditional `return` is **unreachable** and won't compile.
- A `return` inside a `try` block still runs the associated `finally` block **before** actually returning. A `return` inside `finally` overrides any earlier return (a common bug — avoid it).

```java
int test() {
    try {
        return 1;
    } finally {
        System.out.println("finally runs before return");
    }
}
```

## return vs break vs continue

| Statement | Exits | Scope |
|-----------|-------|-------|
| `return` | The whole **method** | Anywhere in a method |
| `break` | The current **loop/switch** | Loops, switch |
| `continue` | Current **iteration** | Loops only |

## Key points

- `return` terminates the method, not just a loop — it can exit from deep inside nested loops in one step.
- Match the returned expression's type to the method signature (autowidening allowed, e.g. `int` returned as `long`).
- `finally` always executes; avoid returning from inside it.
- Early `return` guard clauses improve readability by reducing nesting.
