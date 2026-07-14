## Problem

Given two strings `s` and `goal`, return `true` if and only if `goal` can be obtained by **rotating** `s` some number of positions. A rotation moves a block from the front to the back, e.g. `"abcde"` -> `"cdeab"`.

## Intuition

Every rotation of `s` appears as a **substring of `s + s`**. Concatenating `s` with itself lays out all rotations back to back:

```text
s = "abcde"
s + s = "abcdeabcde"
        --------          rotations are windows of length 5:
        abcde
         bcdea
          cdeab
           deabc
            eabcd
```

So `goal` is a rotation of `s` iff lengths match and `goal` is contained in `s + s`.

## Optimal — concatenation + substring search

```java
class Solution {
    public boolean rotateString(String s, String goal) {
        return s.length() == goal.length()
            && (s + s).contains(goal);
    }
}
```

**Time:** O(n^2) with naive `contains`, O(n) if using KMP for the search · **Space:** O(n) for `s + s`

## Alternate — simulate every rotation

```java
for (int i = 0; i < s.length(); i++) {
    String rot = s.substring(i) + s.substring(0, i);
    if (rot.equals(goal)) return true;
}
return s.isEmpty() && goal.isEmpty();
```

**Time:** O(n^2) · **Space:** O(n)

### Dry run

```text
s = "abcde", goal = "cdeab"
lengths equal (5)
s+s = "abcdeabcde" contains "cdeab"? yes -> true

s = "abcde", goal = "abced"  -> not a substring -> false
```

## Key points

- Core trick: **all rotations live inside `s + s`**.
- Always check lengths first, else `"aa"` vs `"a"` slips through.
- Handle both-empty as `true`.
- Use KMP substring search to guarantee linear time.
