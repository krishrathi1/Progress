## Problem

Given `n` pairs of parentheses, generate **all combinations of well-formed (balanced) parentheses**. For `n = 3`, one valid output is `["((()))","(()())","(())()","()(())","()()()"]`.

## Intuition

Build the string character by character while tracking two counters:

- `open` — number of `'('` used so far.
- `close` — number of `')'` used so far.

Rules that keep every prefix valid:

1. Add `'('` while `open < n`.
2. Add `')'` only while `close < open` (never close more than you've opened).

When the string reaches length `2n`, it is a complete valid combination.

## Approach — Backtracking with open/close counts

```java
import java.util.*;

class Solution {
    public List<String> generateParenthesis(int n) {
        List<String> res = new ArrayList<>();
        backtrack(new StringBuilder(), 0, 0, n, res);
        return res;
    }

    private void backtrack(StringBuilder cur, int open, int close,
                           int n, List<String> res) {
        if (cur.length() == 2 * n) {
            res.add(cur.toString());
            return;
        }
        if (open < n) {                 // can open more
            cur.append('(');
            backtrack(cur, open + 1, close, n, res);
            cur.deleteCharAt(cur.length() - 1);
        }
        if (close < open) {             // can safely close
            cur.append(')');
            backtrack(cur, open, close + 1, n, res);
            cur.deleteCharAt(cur.length() - 1);
        }
    }
}
```

**Time:** O(4^n / sqrt(n)) — the n-th Catalan number of valid strings, each length 2n.
**Space:** O(n) recursion depth (excluding output).

## Dry Run

```text
n = 2  (open<=2, close<close<open)

start ""
 -> "("   (open1)
    -> "((" (open2)
       -> "(()" -> "(())"   valid
    -> "()"  (close1)
       -> "()(" -> "()()"   valid

Result: ["(())", "()()"]
```

## Key points

- Two invariants: `open < n` to add `'('`; `close < open` to add `')'`.
- Base case: length `== 2n` → record the string.
- The pruning guarantees **every prefix stays valid**, so no post-filtering is needed.
- The count of results is the **Catalan number** C(n) = (2n)! / ((n+1)! n!).
- Always backtrack (remove the last char) so the `StringBuilder` is reused correctly.
