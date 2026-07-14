## Problem

Given a string `s`, sort its characters in **decreasing order of frequency** and return the resulting string. Characters with the same frequency may appear in any order. Example: `"tree"` -> `"eert"` or `"eetr"`.

## Intuition

Count each character's occurrences, then output characters most-frequent first, repeating each by its count. Sorting the distinct characters by count gives the arrangement.

## Approach 1 — Count then sort

```java
class Solution {
    public String frequencySort(String s) {
        Map<Character, Integer> freq = new HashMap<>();
        for (char c : s.toCharArray())
            freq.merge(c, 1, Integer::sum);

        List<Character> chars = new ArrayList<>(freq.keySet());
        chars.sort((a, b) -> freq.get(b) - freq.get(a));  // desc

        StringBuilder sb = new StringBuilder();
        for (char c : chars) {
            int n = freq.get(c);
            for (int i = 0; i < n; i++) sb.append(c);
        }
        return sb.toString();
    }
}
```

**Time:** O(n + k log k), k = distinct chars · **Space:** O(n)

## Approach 2 — Bucket sort (optimal, linear)

Max frequency <= n, so bucket by frequency and read from high to low. No comparison sort.

```java
class Solution {
    public String frequencySort(String s) {
        int[] freq = new int[128];
        for (char c : s.toCharArray()) freq[c]++;

        List<StringBuilder> buckets = new ArrayList<>();
        for (int i = 0; i <= s.length(); i++) buckets.add(new StringBuilder());

        for (int c = 0; c < 128; c++) {
            int f = freq[c];
            if (f > 0) {
                StringBuilder b = buckets.get(f);
                for (int i = 0; i < f; i++) b.append((char) c);
            }
        }
        StringBuilder res = new StringBuilder();
        for (int f = s.length(); f >= 1; f--) res.append(buckets.get(f));
        return res.toString();
    }
}
```

**Time:** O(n) · **Space:** O(n)

### Dry run

```text
s = "tree"
freq: t=1 r=1 e=2
bucket[1] = "tr" (or "rt"), bucket[2] = "ee"
read f=2 down to 1 -> "ee" + "tr" = "eetr"
```

## Key points

- Count frequencies, emit in **descending** frequency order.
- Bucket sort by frequency achieves **O(n)** since max count <= n.
- Ties are allowed in any order.
- Use `StringBuilder`, not string `+=`, to avoid O(n^2) concatenation.
