## Problem

Given an integer **N**, count the number of digits it contains.
Example: `N = 7413` → output `4`. `N = 5` → output `1`.

## Intuition

Repeatedly stripping the last digit (`N / 10`) shrinks the number by one digit each step. Count how many steps until it reaches 0. There is also a neat O(1) formula using logarithms.

### Approach 1 — Brute force (convert to string)

Turn the number into a string and read its length.

```java
int countDigits(int n) {
    return Integer.toString(Math.abs(n)).length();
}
```

**Time:** O(d) · **Space:** O(d)  (d = number of digits, string allocated)

### Approach 2 — Better (division loop, optimal in practice)

Divide by 10 until the number becomes 0, counting each division.

```java
int countDigits(int n) {
    n = Math.abs(n);
    if (n == 0) return 1;      // edge case: 0 has 1 digit
    int count = 0;
    while (n > 0) {
        count++;
        n /= 10;               // drop the last digit
    }
    return count;
}
```

**Time:** O(log₁₀ n) · **Space:** O(1)

### Approach 3 — Optimal (logarithm formula, O(1))

The number of digits of a positive integer is `floor(log10(n)) + 1`.

```java
int countDigits(int n) {
    if (n == 0) return 1;
    return (int)(Math.log10(Math.abs(n))) + 1;
}
```

**Time:** O(1) · **Space:** O(1)

### Dry run — division loop, N = 7413

```text
start: n=7413, count=0
n=7413 > 0 -> count=1, n=741
n=741  > 0 -> count=2, n=74
n=74   > 0 -> count=3, n=7
n=7    > 0 -> count=4, n=0
n=0 -> stop.  answer = 4
```

## Key points

- **Division loop** (`n /= 10`) is the standard, most-asked approach: O(log n) time, O(1) space.
- **log10 formula** gives O(1) but beware floating-point precision on very large numbers.
- Handle the **edge case N = 0** → answer is 1.
- Use `Math.abs(n)` to support negative inputs.
- The count of digits equals the number of times you can divide by 10 before hitting 0.
