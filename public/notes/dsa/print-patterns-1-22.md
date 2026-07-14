## Problem

Print various **star / number patterns** using loops. Patterns are the classic first exercise for mastering **nested loops** — the outer loop controls rows, the inner loop(s) control what prints in each row. Striver's set has 22 patterns; here we teach the reusable technique with representative examples.

## Intuition

Every pattern reduces to three questions per row:
1. How many **spaces** before the content?
2. How many **stars/numbers** to print?
3. Express both counts as a function of the **row index** `i`.

Once you map counts to `i`, the code writes itself.

### Pattern: solid square (Pattern 1)

```text
* * * * *
* * * * *
* * * * *
```

```java
void square(int n) {
    for (int i = 0; i < n; i++) {        // rows
        for (int j = 0; j < n; j++)      // cols
            System.out.print("* ");
        System.out.println();
    }
}
```

**Time:** O(n²) · **Space:** O(1)

### Pattern: right-angled triangle (Pattern 2)

```text
*
* *
* * *
* * * *
```

```java
void triangle(int n) {
    for (int i = 1; i <= n; i++) {       // row i has i stars
        for (int j = 1; j <= i; j++)
            System.out.print("* ");
        System.out.println();
    }
}
```

**Time:** O(n²) · **Space:** O(1)

### Pattern: pyramid (space handling, Pattern 8)

```text
    *
   ***
  *****
 *******
```

The key skill: for row `i` (0-indexed), print `n-i-1` spaces, then `2*i+1` stars.

```java
void pyramid(int n) {
    for (int i = 0; i < n; i++) {
        for (int s = 0; s < n - i - 1; s++) System.out.print(" ");
        for (int st = 0; st < 2 * i + 1; st++) System.out.print("*");
        System.out.println();
    }
}
```

**Time:** O(n²) · **Space:** O(1)

### Dry run — pyramid, n = 3

```text
i=0: spaces=2, stars=1  ->  "  *"
i=1: spaces=1, stars=3  ->  " ***"
i=2: spaces=0, stars=5  ->  "*****"
```

## Key points

- **Outer loop = rows, inner loop = columns.** Almost always O(n²) time.
- Reduce each row to a formula in `i`: spaces before + symbols to print.
- Pyramids/diamonds: spaces = `n-i-1`, stars = `2*i+1`.
- Number patterns: replace `*` with `j`, `i`, or a running counter.
- Practice deriving the count formulas — that is the transferable skill.
