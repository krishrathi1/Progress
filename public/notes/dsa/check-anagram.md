## Problem

Given two strings `s` and `t`, return `true` if `t` is an **anagram** of `s` — i.e. they contain exactly the **same characters with the same frequencies**, just possibly reordered.

## Intuition

Order does not matter, only counts do. Two ways to normalize: **sort** both strings and compare, or **count** character frequencies. Counting is linear and cheaper.

## Approach 1 — Sorting

```java
boolean isAnagram(String s, String t) {
    if (s.length() != t.length()) return false;
    char[] a = s.toCharArray(), b = t.toCharArray();
    java.util.Arrays.sort(a);
    java.util.Arrays.sort(b);
    return java.util.Arrays.equals(a, b);
}
```

**Time:** O(n log n) · **Space:** O(n) (or O(1) in-place for char arrays)

## Approach 2 — Frequency count (optimal)

Increment for `s`, decrement for `t`. If every bucket returns to zero, they match.

```java
class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        int[] count = new int[26];
        for (int i = 0; i < s.length(); i++) {
            count[s.charAt(i) - 'a']++;
            count[t.charAt(i) - 'a']--;
        }
        for (int c : count) if (c != 0) return false;
        return true;
    }
}
```

**Time:** O(n) · **Space:** O(1) (fixed 26-size array)

### Dry run

```text
s = "anagram", t = "nagaram"
count after loop: a:0 n:0 g:0 r:0 m:0 ... all zero -> true

s = "rat", t = "car"
r:0 a:0 t:+1 c:-1  -> non-zero -> false
```

## Key points

- Different lengths -> immediately `false`.
- Frequency count is O(n); prefer over sorting.
- Use `int[26]` for lowercase, `int[256]` or a `HashMap` for Unicode.
- The +1/-1 single-array trick avoids a second pass to compare two count arrays.
