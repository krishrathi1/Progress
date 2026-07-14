## Problem

Given a string `num` of digits and an integer `target`, insert the binary operators `+`, `-`, `*` (or nothing) **between** the digits so the resulting arithmetic expression evaluates to `target`. Return **all** such expressions. Numbers may not have leading zeros (so `"05"` is invalid).

## Intuition

Between every pair of adjacent digits we make a choice: `+`, `-`, `*`, or concatenate. That is a **backtracking** enumeration of all operator placements. The subtlety is `*`: multiplication binds tighter than `+`/`-`, so we cannot just track a running total — we must remember the **last operand** to "undo" its additive contribution and re-apply it multiplied.

## Approach: Backtracking with prev-operand tracking

Carry two values: `curVal` (value so far) and `prev` (the last term that was added). For `+`/`-`, prev becomes `±operand`. For `*`, we do `curVal - prev + prev * operand`.

```java
class Solution {
    public List<String> addOperators(String num, int target) {
        List<String> res = new ArrayList<>();
        solve(num, target, 0, 0, 0, "", res);
        return res;
    }

    private void solve(String num, int target, int idx,
                       long curVal, long prev, String expr, List<String> res) {
        if (idx == num.length()) {
            if (curVal == target) res.add(expr);
            return;
        }
        for (int i = idx; i < num.length(); i++) {
            if (i != idx && num.charAt(idx) == '0') break;      // no leading zero
            long cur = Long.parseLong(num.substring(idx, i + 1));
            String s = num.substring(idx, i + 1);
            if (idx == 0) {
                solve(num, target, i + 1, cur, cur, s, res);    // first number, no op
            } else {
                solve(num, target, i + 1, curVal + cur, cur, expr + "+" + s, res);
                solve(num, target, i + 1, curVal - cur, -cur, expr + "-" + s, res);
                long newPrev = prev * cur;
                solve(num, target, i + 1, curVal - prev + newPrev, newPrev, expr + "*" + s, res);
            }
        }
    }
}
```

**Time:** O(4^N) expressions explored (N = digits) · **Space:** O(N) recursion depth.

```text
num = "232", target = 8
"2*3+2" -> prev handling: start 2 (prev=2)
  '*3': curVal = 2 - 2 + 2*3 = 6, prev = 6
  '+2': curVal = 6 + 2 = 8  -> matches target
```

## Key points

- The `*` update `curVal - prev + prev*cur` correctly overrides the additive effect of the previous operand, respecting precedence.
- **Leading-zero guard**: `break` when the current operand starts with `'0'` and has length > 1.
- Use `long` to avoid overflow while building multi-digit operands.
- No operator is allowed *before* the first number — handled by the `idx == 0` branch.
