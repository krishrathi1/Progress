## Definition

An **if-else statement** is a control-flow construct that executes a block of code only when a boolean condition is `true`, and optionally an alternative block when it is `false`. It is how programs make decisions.

## Syntax and Forms

```java
// 1. Simple if
if (age >= 18) {
    System.out.println("Adult");
}

// 2. if-else
if (n % 2 == 0) {
    System.out.println("Even");
} else {
    System.out.println("Odd");
}

// 3. if-else-if ladder (checked top to bottom, first match wins)
if (marks >= 90)      grade = 'A';
else if (marks >= 75) grade = 'B';
else if (marks >= 50) grade = 'C';
else                  grade = 'F';
```

## Control Flow Diagram

```text
        ┌──────────────┐
        │  condition?  │
        └──────┬───────┘
        true   │   false
      ┌────────┴────────┐
      ▼                 ▼
 ┌─────────┐       ┌─────────┐
 │ if body │       │else body│
 └────┬────┘       └────┬────┘
      └───────┬─────────┘
              ▼
        continue program
```

## Boolean Operators

| Operator | Meaning | Example |
|----------|---------|---------|
| `&&` | logical AND (short-circuit) | `a > 0 && b > 0` |
| `\|\|` | logical OR (short-circuit) | `x == 0 \|\| y == 0` |
| `!` | logical NOT | `!found` |
| `==`, `!=` | equality | `n == 0` |

**Short-circuit:** in `A && B`, if `A` is false, `B` is never evaluated — useful to guard against errors:

```java
if (arr != null && arr.length > 0) { ... }  // safe: length checked only if non-null
```

## Ternary Operator

A compact one-line if-else that returns a value:

```java
int max = (a > b) ? a : b;   // if a>b then a else b
```

## Key points

- Conditions must evaluate to `boolean`; unlike C, Java does not treat `0`/`1` as false/true.
- An `if-else-if` ladder stops at the **first** true condition — order matters.
- Use `&&` / `||` short-circuiting to avoid null-pointer or divide-by-zero errors.
- Prefer the ternary operator for simple value selection; use full if-else for multi-line logic.
- Always compare objects with `.equals()`, not `==` (which compares references).
