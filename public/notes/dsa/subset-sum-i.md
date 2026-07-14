## Problem

Given an array `arr` of `n` elements, return the **sum of every subset**, listed in **non-decreasing (sorted) order**. There are `2^n` subsets, so the output has `2^n` sums.

## Intuition

Classic take / not-take recursion. Carry a running `sum`; at the base case (all indices consumed) push the accumulated sum. This visits all `2^n` subsets. Sort the result at the end to satisfy the ordering requirement.

## Approach — Take / Not-Take, collect sums

```java
void solve(int i, int[] arr, int n, int sum, List<Integer> res) {
    if (i == n) { res.add(sum); return; }
    solve(i + 1, arr, n, sum + arr[i], res); // include arr[i]
    solve(i + 1, arr, n, sum, res);          // exclude arr[i]
}

List<Integer> subsetSums(int[] arr, int n) {
    List<Integer> res = new ArrayList<>();
    solve(0, arr, n, 0, res);
    Collections.sort(res);
    return res;
}
```

**Time:** O(2^n) to generate + O(2^n log(2^n)) = O(2^n · n) to sort · **Space:** O(2^n) output + O(n) recursion depth.

### Dry run

```text
arr = [2, 3]
            sum=0
        /+2        \skip
     sum=2          sum=0
    /+3  \skip     /+3  \skip
   5     2        3     0
Sums (raw): [5,2,3,0] -> sorted: [0,2,3,5]
```

## Key points

- Only the **sum** is tracked, so no temp list or backtracking is needed — cleaner than printing subsets.
- Exactly `2^n` values are produced (one per subset, including the empty subset = 0).
- Sorting is a separate final step; the recursion itself does not produce sorted output.
- This is the simplest member of the subset family — memorize it as the base template.
