## Definition

The **`if` statement** is Java's fundamental decision-making construct. It executes a block of code **only when** a boolean condition evaluates to `true`; otherwise the block is skipped.

## Syntax

```java
if (condition) {
    // runs only when condition is true
}
```

The condition must be a **boolean expression** (or a `boolean`/`Boolean` value). Unlike C/C++, Java does **not** allow an integer like `if (1)` — that is a compile error.

## Example

```java
public class IfDemo {
    public static void main(String[] args) {
        int marks = 75;

        if (marks >= 40) {
            System.out.println("Passed");
        }

        boolean isRaining = true;
        if (isRaining) {
            System.out.println("Carry an umbrella");
        }
    }
}
```

## Execution Flow

```text
        +-------------------+
        |  evaluate cond    |
        +-------------------+
                 |
        true / \ false
            /     \
           v       v
   +-----------+   (skip block)
   | run block |        |
   +-----------+        |
           \           /
            v         v
        +-------------------+
        | statement after if |
        +-------------------+
```

## Braces and Single Statements

```java
// Braces optional for a SINGLE statement, but recommended
if (x > 0)
    System.out.println("positive");

// Without braces, only the FIRST statement is conditional:
if (x > 0)
    System.out.println("a"); // conditional
    System.out.println("b"); // ALWAYS runs — common bug!
```

## Key points

- The condition must be `boolean`; integers are not allowed.
- Braces `{}` are optional for one statement but always use them to avoid bugs.
- Common operators in conditions: `==`, `!=`, `<`, `>`, `<=`, `>=`, `&&`, `||`, `!`.
- Watch for `=` (assignment) vs `==` (comparison); `if (x = true)` only compiles for booleans and is a classic mistake.
- An `if` can stand alone (no `else` required).
