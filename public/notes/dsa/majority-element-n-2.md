## Problem

Given an array `nums` of size `n`, return the element that appears **more than `n/2` times** (the majority element). You may assume it always exists.

- Example: `nums = [2, 2, 1, 1, 1, 2, 2]` → **2** (appears 4 times, n/2 = 3.5).

## Intuition

A majority element occupies more than half the array. If we **pair up** each occurrence of it with one non-majority element, the majority still has leftovers. Boyer–Moore voting exploits this: keep a candidate and a count; matching elements reinforce it, differing elements cancel it out. The true majority survives because it can never be fully outvoted.

## Brute force — count each element

For each element, count its occurrences across the array.

```java
int majorityBrute(int[] nums) {
    int n = nums.length;
    for (int i = 0; i < n; i++) {
        int cnt = 0;
        for (int j = 0; j < n; j++) if (nums[j] == nums[i]) cnt++;
        if (cnt > n / 2) return nums[i];
    }
    return -1;
}
```

**Time:** O(n^2) · **Space:** O(1)

## Better — hash map frequency

Count occurrences in one pass, then return the key exceeding `n/2`.

```java
int majorityHash(int[] nums) {
    Map<Integer,Integer> freq = new HashMap<>();
    for (int x : nums)
        if (freq.merge(x, 1, Integer::sum) > nums.length / 2) return x;
    return -1;
}
```

**Time:** O(n) · **Space:** O(n)

## Optimal — Boyer–Moore voting

Maintain `candidate` and `count`. When `count == 0`, adopt the current element as candidate. Increment on a match, decrement on a mismatch.

```java
int majorityMoore(int[] nums) {
    int candidate = 0, count = 0;
    for (int x : nums) {
        if (count == 0) candidate = x;
        count += (x == candidate) ? 1 : -1;
    }
    return candidate;   // guaranteed valid when majority exists
}
```

**Time:** O(n) · **Space:** O(1)

```text
nums = [2,2,1,1,1,2,2]
x=2 cnt0->cand2 cnt1
x=2 cnt2
x=1 cnt1
x=1 cnt0
x=1 cnt0->cand1 cnt1
x=2 cnt0
x=2 cnt0->cand2 cnt1  -> candidate = 2
```

## Key points

- Boyer–Moore is the optimal answer: O(n) time, O(1) space.
- It assumes a majority exists; if not guaranteed, add a **second pass** to verify `candidate` actually exceeds `n/2`.
- The count reaching 0 means the elements so far perfectly cancelled — safe to reset the candidate.
- Generalizes to **> n/3** (Majority Element II) using two candidates and two counters.
