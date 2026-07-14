## Problem

Rearrange `nums` into the **next lexicographically greater** permutation **in place**. If it is already the largest (descending), wrap to the smallest (ascending). Must use O(1) extra space.

- `[1, 2, 3]` → `[1, 3, 2]`
- `[3, 2, 1]` → `[1, 2, 3]`
- `[1, 1, 5]` → `[1, 5, 1]`

## Intuition

To get the *smallest* increase, find the rightmost element that can be raised. Scanning from the right, the longest descending suffix is already maximal — it cannot be increased. The element just before it (the **pivot**) must be bumped up to the smallest value in that suffix greater than it, then the suffix is reversed to its smallest arrangement.

## Brute force — generate & search

Generate all permutations, sort them, find the current one, return the next. **Time:** O(n! · n) · **Space:** O(n! · n). Impractical; shown only for contrast.

## Optimal — three-step scan

```java
void nextPermutation(int[] a) {
    int n = a.length, i = n - 2;
    // 1. find pivot: first index (from right) where a[i] < a[i+1]
    while (i >= 0 && a[i] >= a[i + 1]) i--;
    // 2. if pivot exists, find rightmost element > a[i] and swap
    if (i >= 0) {
        int j = n - 1;
        while (a[j] <= a[i]) j--;
        swap(a, i, j);
    }
    // 3. reverse the suffix after pivot -> smallest order
    reverse(a, i + 1, n - 1);
}
void swap(int[] a, int i, int j){ int t=a[i]; a[i]=a[j]; a[j]=t; }
void reverse(int[] a, int l, int r){ while(l<r) swap(a, l++, r--); }
```

**Time:** O(n) · **Space:** O(1)

## Dry run

```text
a = [1, 3, 5, 4, 2]
step1 pivot: 5>4 skip, 3<5 -> pivot i=1 (value 3)
step2 rightmost > 3 in [5,4,2] is 4 (j=3) -> swap
     a = [1, 4, 5, 3, 2]
step3 reverse suffix idx2..4 [5,3,2] -> [2,3,5]
     a = [1, 4, 2, 3, 5]   <-- next permutation
```

## Key points

- **Pivot** = first drop scanning right (`a[i] < a[i+1]`); the suffix right of it is non-increasing.
- Swap pivot with the **rightmost** element strictly greater than it (keeps suffix sorted-ish).
- Reversing the suffix turns it from descending into ascending → minimal next value.
- No pivot (fully descending) → skip swap, reverse whole array → smallest permutation.
- Handles duplicates correctly because of the `>=` / `<=` comparisons.
