## Problem

Given an array `arr` and a target `k`, **print every subsequence** whose element sum equals `k`. A subsequence keeps the original order but may skip elements. There are `2^n` subsequences in total.

## Intuition

For each index we make a binary choice: **pick** the element or **not pick** it. This "take / not-take" pattern generates all subsequences. We carry a running sum; when we reach the end of the array and the sum equals `k`, we record the current subsequence.

This is the foundational template for the whole "subset/subsequence" family of recursion problems.

## Approach — Take / Not-Take Recursion

- At index `i`, first include `arr[i]` in the temp list and recurse on `i+1` with `sum+arr[i]`, then backtrack (remove it) and recurse on `i+1` with the same sum.
- Base case: `i == n`. If `sum == k`, print/collect `temp`.

```java
void solve(int i, int[] arr, int n, int k, int sum,
           List<Integer> temp, List<List<Integer>> ans) {
    if (i == n) {
        if (sum == k) ans.add(new ArrayList<>(temp));
        return;
    }
    // pick arr[i]
    temp.add(arr[i]);
    solve(i + 1, arr, n, k, sum + arr[i], temp, ans);
    temp.remove(temp.size() - 1);   // backtrack
    // not pick
    solve(i + 1, arr, n, k, sum, temp, ans);
}
```

**Time:** O(2^n · n) · **Space:** O(n) recursion depth (plus output).

### Dry run

```text
arr = [1, 2, 1], k = 2
                       []
              /pick1            \skip
          [1]                    []
        /pick2  \skip          /pick2  \skip
     [1,2]    [1]           [2]        []
     ...      [1,1]* sum=2  [2]* sum=2 ...
Valid: [1,1] and [2]
```

## Key points

- Every subset problem starts from this pick / not-pick skeleton.
- Always **copy** the temp list (`new ArrayList<>(temp)`) when storing — the shared list keeps mutating.
- Backtracking (add then remove) keeps a single list instead of allocating one per branch.
- Total subsequences are `2^n`; exponential time is unavoidable when printing all of them.
