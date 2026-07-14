## Definition

A **nested `if`** is an `if` (or `if-else`) statement placed **inside** the body of another `if` or `else` block. The inner condition is evaluated only when the outer condition is already `true`, allowing multi-level decision making.

## Syntax

```java
if (outerCondition) {
    if (innerCondition) {
        // runs when BOTH are true
    }
}
```

## Example

```java
public class NestedIfDemo {
    public static void main(String[] args) {
        int age = 25;
        boolean hasLicense = true;

        if (age >= 18) {
            if (hasLicense) {
                System.out.println("Allowed to drive");
            } else {
                System.out.println("Get a license first");
            }
        } else {
            System.out.println("Too young to drive");
        }
    }
}
```

Output: `Allowed to drive`

## Execution Flow

```text
age >= 18 ?
   |
 false ---------> "Too young to drive"
   |
 true
   |
   v
hasLicense ?
   |
 true  --> "Allowed to drive"
 false --> "Get a license first"
```

## Nested if vs Logical AND

Two nested conditions with no separate `else` for the outer can often be flattened using `&&`:

```java
// Equivalent when there is no outer-only else branch
if (age >= 18 && hasLicense) {
    System.out.println("Allowed to drive");
}
```

| Approach | When to prefer |
|----------|----------------|
| Nested `if` | Different actions needed at each level |
| `&&` combined | Only the all-true case matters |

## Key points

- Inner `if` runs only if the outer condition is `true`.
- Each `else` binds to the **nearest unmatched `if`** (the "dangling else" rule) — use braces to make intent clear.
- Deep nesting hurts readability; flatten with `&&` or use guard clauses / early `return` where possible.
- Always brace each level to avoid dangling-else bugs.
