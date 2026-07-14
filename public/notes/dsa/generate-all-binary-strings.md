## Problem

Given an integer `n`, generate **all binary strings of length `n`** such that **no two consecutive characters are both `1`** (no `"11"` substring). Return them in any order.

## Intuition

Build the string one position at a time using recursion:

- At each index you may place `0` freely.
- You may place `1` **only if the previous character was not `1`**.

Track the last placed bit. This is a classic backtracking / decision-tree walk: two branches per position, pruned when a `1` would follow a `1`.

## Approach — Backtracking with "last bit"

```java
import java.util.*;

class Solution {
    public List<String> generate(int n) {
        List<String> res = new ArrayList<>();
        solve(0, n, new StringBuilder(), 0, res); // prev = 0 (no previous 1)
        return res;
    }

    // prev = last placed bit (0 means safe to place 1)
    private void solve(int i, int n, StringBuilder cur, int prev, List<String> res) {
        if (i == n) {
            res.add(cur.toString());
            return;
        }
        // always allowed: place 0
        cur.append('0');
        solve(i + 1, n, cur, 0, res);
        cur.deleteCharAt(cur.length() - 1);

        // place 1 only if previous bit was not 1
        if (prev == 0) {
            cur.append('1');
            solve(i + 1, n, cur, 1, res);
            cur.deleteCharAt(cur.length() - 1);
        }
    }
}
```

**Time:** O(phi^n) valid strings — the count follows Fibonacci growth (~ golden ratio).
**Space:** O(n) recursion depth (excluding output).

## Dry Run

```text
n = 3, no "11" allowed

            ""
        /        \
      0            1
    /   \        /
  00     01    10
  / \    |     |
000 001 010   100
       (from 01 -> only 0, since prev=1)
Valid: 000 001 010 100 101
```

## Key points

- Two choices per index: `0` always; `1` only when `prev == 0`.
- Carry the **previous bit** to enforce the no-`"11"` rule — O(1) check.
- Backtrack by removing the appended char after each recursive call.
- Number of valid strings of length `n` = Fibonacci(n+2) — grows ~1.618^n.
- Drop the `prev == 0` guard to generate **all** 2^n binary strings.
