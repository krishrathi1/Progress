## Problem

Given an array `nums`, return **all unique triplets** `[nums[i], nums[j], nums[k]]` such that `i`, `j`, `k` are distinct indices and `nums[i] + nums[j] + nums[k] == 0`. The solution set must not contain duplicate triplets.

## Intuition

For every element, we need two others that sum to its negation. This reduces 3Sum to a **Two Sum** subproblem. Sorting the array lets us skip duplicates cleanly and use the two-pointer technique for an efficient linear inner scan.

## Brute Force — Three Loops

Try every triplet, store the sorted triplet in a set to deduplicate.

```java
List<List<Integer>> threeSum(int[] nums) {
    Set<List<Integer>> set = new HashSet<>();
    int n = nums.length;
    for (int i = 0; i < n; i++)
        for (int j = i + 1; j < n; j++)
            for (int k = j + 1; k < n; k++)
                if (nums[i] + nums[j] + nums[k] == 0) {
                    List<Integer> t = Arrays.asList(nums[i], nums[j], nums[k]);
                    Collections.sort(t);
                    set.add(t);
                }
    return new ArrayList<>(set);
}
```

**Time:** O(n^3) · **Space:** O(triplets)

## Better — Hashing (fix one, Two Sum)

Fix `i`, then use a hash set to find pairs summing to `-nums[i]`.

**Time:** O(n^2) · **Space:** O(n)

## Optimal — Sort + Two Pointers

Sort the array. Fix `i`; move two pointers `j` (left) and `k` (right) inward. Skip duplicates for `i`, `j`, and `k`.

```java
List<List<Integer>> threeSum(int[] nums) {
    Arrays.sort(nums);
    List<List<Integer>> res = new ArrayList<>();
    int n = nums.length;
    for (int i = 0; i < n - 2; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue;   // skip dup i
        int j = i + 1, k = n - 1;
        while (j < k) {
            int sum = nums[i] + nums[j] + nums[k];
            if (sum < 0) j++;
            else if (sum > 0) k--;
            else {
                res.add(Arrays.asList(nums[i], nums[j], nums[k]));
                j++; k--;
                while (j < k && nums[j] == nums[j - 1]) j++;  // skip dup j
                while (j < k && nums[k] == nums[k + 1]) k--;  // skip dup k
            }
        }
    }
    return res;
}
```

**Time:** O(n^2) · **Space:** O(1) (excluding output)

```text
nums = [-1,0,1,2,-1,-4] -> sorted [-4,-1,-1,0,1,2]
i=-4: j=-1,k=2 sums -3..; no triplet
i=-1(idx1): j=-1,k=2 -> -1-1+2=0  add [-1,-1,2]
             j=0,k=1  -> -1+0+1=0  add [-1,0,1]
Result: [[-1,-1,2],[-1,0,1]]
```

## Key points

- Sorting is the enabler for both **two-pointer scan** and **duplicate skipping**.
- Three levels of duplicate skipping: outer `i`, and inner `j`/`k` after a hit.
- Optimal is O(n^2) time, O(1) extra space — the expected interview answer.
