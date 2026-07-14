## Problem

Given an array `nums` and a target value `target`, return **all unique quadruplets** `[a, b, c, d]` from distinct indices such that `a + b + c + d == target`. No duplicate quadruplets in the result.

## Intuition

4Sum extends 3Sum: fix **two** elements, then solve **Two Sum with two pointers** on the remaining subarray. Sorting enables both the two-pointer scan and clean duplicate skipping at all four levels.

## Brute Force — Four Loops

Four nested loops, dedupe via a set of sorted quadruplets.

```java
// four nested loops i<j<k<l; if sum==target add sorted quad to a HashSet
```

**Time:** O(n^4) · **Space:** O(quadruplets)

## Better — Fix Two, Hash the Rest

Fix `i` and `j`; use a hash set to find pairs summing to `target - nums[i] - nums[j]`.

**Time:** O(n^3) · **Space:** O(n)

## Optimal — Sort + Two Outer Loops + Two Pointers

```java
List<List<Integer>> fourSum(int[] nums, int target) {
    Arrays.sort(nums);
    int n = nums.length;
    List<List<Integer>> res = new ArrayList<>();
    for (int i = 0; i < n - 3; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        for (int j = i + 1; j < n - 2; j++) {
            if (j > i + 1 && nums[j] == nums[j - 1]) continue;
            int k = j + 1, l = n - 1;
            while (k < l) {
                long sum = (long) nums[i] + nums[j] + nums[k] + nums[l];
                if (sum < target) k++;
                else if (sum > target) l--;
                else {
                    res.add(Arrays.asList(nums[i], nums[j], nums[k], nums[l]));
                    k++; l--;
                    while (k < l && nums[k] == nums[k - 1]) k++;
                    while (k < l && nums[l] == nums[l + 1]) l--;
                }
            }
        }
    }
    return res;
}
```

**Time:** O(n^3) · **Space:** O(1) (excluding output)

```text
nums=[1,0,-1,0,-2,2], target=0 -> sorted [-2,-1,0,0,1,2]
i=-2,j=-1: k=0,l=2 -> -2-1+0+2=-1<0 k++
            k=0(idx3),l=2 -> -2-1+0+2=-1 ... move
i=-2,j=-1 finds [-2,-1,1,2] and [-2,0,0,2]
i=-1,j=0  finds [-1,0,0,1]
```

## Key points

- Use a **`long`** accumulator for the sum to avoid integer overflow (four ints can overflow `int`).
- Duplicate skipping at all four positions: `i`, `j`, and both pointers `k`/`l` after a match.
- Pattern generalizes: k-Sum = (k-2) nested loops + two pointers, giving O(n^(k-1)).
