## Problem

Given a string `s`, partition it so that **every substring** in the partition is a palindrome. Return **all** possible palindrome partitionings.

**Example:** `s = "aab"` → `[["a","a","b"], ["aa","b"]]`

## Intuition

At each position we choose where to make the next "cut". We try every prefix `s[start..end]`; if that prefix is a palindrome, we accept it as one part and **recurse** on the remaining suffix. This explores all valid ways to slice the string — a textbook **backtracking** pattern.

## Backtracking solution

```java
class Solution {
    public List<List<String>> partition(String s) {
        List<List<String>> res = new ArrayList<>();
        backtrack(0, s, new ArrayList<>(), res);
        return res;
    }

    private void backtrack(int start, String s,
                           List<String> cur, List<List<String>> res) {
        if (start == s.length()) {
            res.add(new ArrayList<>(cur));   // reached the end → valid partition
            return;
        }
        for (int end = start; end < s.length(); end++) {
            if (isPalindrome(s, start, end)) {
                cur.add(s.substring(start, end + 1));
                backtrack(end + 1, s, cur, res);
                cur.remove(cur.size() - 1);  // undo
            }
        }
    }

    private boolean isPalindrome(String s, int i, int j) {
        while (i < j) if (s.charAt(i++) != s.charAt(j--)) return false;
        return true;
    }
}
```

**Time:** O(2^n · n) — up to 2^(n-1) partitions, each costing O(n) to build/check · **Space:** O(n) recursion depth

### Dry run ("aab")

```text
start=0
  "a" palindrome → recurse start=1
    "a" palindrome → recurse start=2
      "b" palindrome → recurse start=3 → add ["a","a","b"]
    "ab" not palindrome
  "aa" palindrome → recurse start=2
    "b" palindrome → start=3 → add ["aa","b"]
  "aab" not palindrome
Result: [["a","a","b"], ["aa","b"]]
```

## Optimization — precompute palindromes with DP

Build `dp[i][j] = true` if `s[i..j]` is a palindrome, so each check is O(1):

```java
boolean[][] dp = new boolean[n][n];
for (int i = n - 1; i >= 0; i--)
    for (int j = i; j < n; j++)
        dp[i][j] = s.charAt(i) == s.charAt(j) && (j - i < 2 || dp[i + 1][j - 1]);
```

This removes the inner O(n) palindrome cost from the recursion.

## Key points

- Reaching `start == n` means the whole string was consumed by valid palindromic parts → record it.
- `substring(start, end+1)` is inclusive of `end`; the recursion continues at `end+1`.
- Precomputing palindromes with 2D DP avoids repeated O(n) checks — a common interview follow-up.
- Output is exponential, so the algorithm cannot be polynomial overall.
