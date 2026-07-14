## Problem

Given an integer **N**, return the number formed by reversing its digits.
Example: `N = 7413` → `3147`. `N = 120` → `21` (leading zeros vanish).

## Intuition

Peel off the last digit with `N % 10`, and build the reversed number by shifting the running result left by one place (`rev * 10`) and adding the new digit. Repeat until nothing is left.

### Approach 1 — Brute force (string reversal)

Convert to a string, reverse it, parse back.

```java
int reverse(int n) {
    boolean neg = n < 0;
    String s = new StringBuilder(Integer.toString(Math.abs(n)))
                   .reverse().toString();
    int r = Integer.parseInt(s);
    return neg ? -r : r;
}
```

**Time:** O(d) · **Space:** O(d)  (extra string of d digits)

### Approach 2 — Optimal (mathematical, digit by digit)

```java
int reverse(int n) {
    int rev = 0;
    while (n != 0) {          // works for negatives too (% keeps sign in Java)
        int digit = n % 10;   // last digit
        rev = rev * 10 + digit;
        n /= 10;              // drop last digit
    }
    return rev;
}
```

**Time:** O(log₁₀ n) · **Space:** O(1)

### Approach 3 — Optimal with overflow guard

For 32-bit constraints (e.g. LeetCode), return 0 on overflow:

```java
int reverse(int n) {
    int rev = 0;
    while (n != 0) {
        int digit = n % 10;
        // check before multiplying
        if (rev > Integer.MAX_VALUE / 10 || rev < Integer.MIN_VALUE / 10)
            return 0;
        rev = rev * 10 + digit;
        n /= 10;
    }
    return rev;
}
```

**Time:** O(log₁₀ n) · **Space:** O(1)

### Dry run — N = 7413

```text
n=7413, rev=0
digit=3 -> rev=0*10+3   = 3,    n=741
digit=1 -> rev=3*10+1   = 31,   n=74
digit=4 -> rev=31*10+4  = 314,  n=7
digit=7 -> rev=314*10+7 = 3147, n=0
answer = 3147
```

## Key points

- Core recurrence: `rev = rev * 10 + (n % 10)`, then `n /= 10`.
- Runs in O(log n) time, O(1) space — beats the string approach.
- Trailing zeros in N naturally disappear (120 → 21).
- In Java, `%` keeps the sign, so negatives reverse correctly.
- Guard against **integer overflow** when the result must fit in 32 bits.
