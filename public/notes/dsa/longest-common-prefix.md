## Problem

Given an array of strings `strs`, return the **longest common prefix** shared by all of them. If there is no common prefix, return `""`.

## Intuition

The common prefix can never be longer than the **shortest string**. Compare characters column by column across all words; stop at the first mismatch or when any word ends.

## Approach 1 — Vertical scanning (optimal)

Fix a column index `j`, take the character from the first word, and verify every other word has the same character at `j`.

```java
class Solution {
    public String longestCommonPrefix(String[] strs) {
        if (strs == null || strs.length == 0) return "";
        for (int j = 0; j < strs[0].length(); j++) {
            char c = strs[0].charAt(j);
            for (int i = 1; i < strs.length; i++) {
                if (j >= strs[i].length() || strs[i].charAt(j) != c)
                    return strs[0].substring(0, j);
            }
        }
        return strs[0];
    }
}
```

**Time:** O(N · M) where N = number of strings, M = length of prefix scanned · **Space:** O(1)

## Approach 2 — Sort then compare ends

Sort the array; only the **first and last** strings need comparing, since sorting groups similar prefixes together.

```java
Arrays.sort(strs);
String a = strs[0], b = strs[strs.length - 1];
int i = 0;
while (i < a.length() && i < b.length() && a.charAt(i) == b.charAt(i)) i++;
return a.substring(0, i);
```

**Time:** O(N log N · M) for the sort · **Space:** O(1)

### Dry run

```text
strs = ["flower","flow","flight"]
j=0 'f' in all
j=1 'l' in all
j=2 'o' vs "flight"[2]='i' -> mismatch
return strs[0].substring(0,2) = "fl"
```

## Key points

- Prefix length is bounded by the shortest word — always guard `j >= strs[i].length()`.
- Vertical scanning short-circuits early, so best case is fast.
- Sort trick reduces the problem to comparing two strings but pays a sort cost.
- Edge cases: empty array, single string, empty string inside array.
