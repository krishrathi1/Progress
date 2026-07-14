## Problem

Given a string `s`, determine whether it is a **palindrome** (reads the same forward and backward) using recursion.

## Intuition

A string is a palindrome if its **first and last characters match** and the substring between them is also a palindrome. Peel off matching outer characters and recurse inward. Use two pointers `left` and `right` moving toward each other — if any pair mismatches, it is not a palindrome.

## Approach 1: Two-pointer recursion

```java
class Solution {
    boolean isPalindrome(String s, int l, int r) {
        if (l >= r) return true;             // base: single char / empty
        if (s.charAt(l) != s.charAt(r))      // outer chars differ
            return false;
        return isPalindrome(s, l + 1, r - 1);// check inner substring
    }
    public boolean solve(String s) {
        return isPalindrome(s, 0, s.length() - 1);
    }
}
```

**Time:** O(N) · **Space:** O(N) recursion stack

## Approach 2: Single-index recursion

Compare `s[i]` with `s[n-1-i]`, recurse while indices haven't crossed the middle.

```java
boolean isPalindrome(String s, int i) {
    int n = s.length();
    if (i >= n / 2) return true;
    if (s.charAt(i) != s.charAt(n - 1 - i)) return false;
    return isPalindrome(s, i + 1);
}
// call: isPalindrome(s, 0);
```

**Time:** O(N) · **Space:** O(N)

## Dry run

```text
s = "MADAM"
l=0 r=4 : M == M -> recurse
l=1 r=3 : A == A -> recurse
l=2 r=2 : l >= r -> return true   => palindrome
```

## Key points

- Base case `l >= r` covers both odd length (pointers meet) and even length (pointers cross).
- **Early exit** on the first mismatch keeps it efficient — worst case still O(N).
- For case/space-insensitive checks, preprocess (lowercase, strip non-alphanumerics) before recursing.
- Iterative two-pointer version achieves O(1) space; recursion costs O(N) stack.
