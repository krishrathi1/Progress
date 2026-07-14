## Problem

Implement `myAtoi(String s)` (like C's `atoi`), converting a string to a 32-bit signed integer using **recursion**. Rules:

- Skip leading whitespace.
- An optional single `+` or `-` sign may follow.
- Read digits until a non-digit is hit; stop there.
- Clamp to the `int` range: `[-2^31, 2^31 - 1]`.
- If no valid conversion is possible, return `0`.

## Intuition

Parsing digits left to right is naturally recursive: the value of a prefix is `10 * value(prefix without last digit) + lastDigit`. Equivalently, process one character at a time carrying the running number forward. The sign and whitespace are handled once up front, then recursion consumes the digit run while watching for overflow.

## Approach — Recursive digit consumption (optimal)

```java
class Solution {
    public int myAtoi(String s) {
        int i = 0, n = s.length();
        while (i < n && s.charAt(i) == ' ') i++;          // skip spaces
        if (i == n) return 0;

        int sign = 1;
        if (s.charAt(i) == '+' || s.charAt(i) == '-') {
            if (s.charAt(i) == '-') sign = -1;
            i++;
        }
        return solve(s, i, sign, 0);
    }

    private int solve(String s, int i, int sign, long num) {
        // stop at end or first non-digit
        if (i == s.length() || !Character.isDigit(s.charAt(i)))
            return (int) (sign * num);

        num = num * 10 + (s.charAt(i) - '0');

        // clamp on overflow (check BEFORE it grows unbounded)
        if (sign == 1  && num > Integer.MAX_VALUE) return Integer.MAX_VALUE;
        if (sign == -1 && -num < Integer.MIN_VALUE) return Integer.MIN_VALUE;

        return solve(s, i + 1, sign, num);
    }
}
```

**Time:** O(n) · **Space:** O(n) recursion depth (O(1) if written iteratively)

### Dry run: `"   -42abc"`

```text
skip 3 spaces -> i=3
sign char '-' -> sign=-1, i=4
solve: '4' -> num=4
solve: '2' -> num=42
solve: 'a' -> not a digit -> return -1 * 42 = -42
```

## Key points

- Handle the three phases in order: **whitespace → sign → digits**; stop at the first non-digit.
- Use a `long` accumulator (or check before multiplying) to detect **overflow** and clamp to `INT_MAX` / `INT_MIN`.
- Only **one** optional sign is allowed; a second `+`/`-` ends parsing.
- Return `0` when no digits are found (e.g. `"words 12"`, `"+-5"` before digits).
