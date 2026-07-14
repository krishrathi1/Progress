## Definition

An **`if-else`** statement chooses between two paths: one runs when the condition is `true`, the other when it is `false`. An **`else-if ladder`** chains multiple conditions so that exactly one matching block (or a final `else`) executes.

## if-else Syntax

```java
if (condition) {
    // true branch
} else {
    // false branch
}
```

## else-if Ladder

```java
public class GradeDemo {
    public static void main(String[] args) {
        int marks = 82;

        if (marks >= 90) {
            System.out.println("Grade A");
        } else if (marks >= 75) {
            System.out.println("Grade B");
        } else if (marks >= 60) {
            System.out.println("Grade C");
        } else {
            System.out.println("Fail");
        }
    }
}
```

Output: `Grade B`

## How the Ladder Evaluates

Conditions are checked **top to bottom**. The first `true` block runs and the rest are skipped. The trailing `else` is the default when none match.

```text
marks = 82

>= 90 ? false ---> skip
>= 75 ? true  ---> print "Grade B", EXIT ladder
>= 60 ? (not checked)
else    (not checked)
```

## Ordering Matters

Because the first match wins, conditions must go from **most specific/highest** to **least specific**. Reversing the order (checking `>= 60` first) would misclassify every high mark as Grade C.

| Structure | Branches taken |
|-----------|----------------|
| `if` alone | 0 or 1 |
| `if-else` | exactly 1 |
| `else-if` ladder | exactly 1 (matching or final `else`) |

## Key points

- Only the **first** true condition executes; remaining branches are skipped.
- The final `else` is optional but acts as a catch-all default.
- Order conditions carefully — overlapping ranges must be checked in the right sequence.
- Prefer a `switch` when comparing one variable against many constant values.
- Each condition must independently evaluate to a `boolean`.
