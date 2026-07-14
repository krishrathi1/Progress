## Problem
Given an array and a target, return the indices of two numbers that add up to the target.

## Intuition
For each number **x**, its partner is **target − x**. The question "have I already seen the partner?" is a lookup — which is exactly what a hash map answers in O(1).

## Approach 1 — Brute force
Try every pair.

~~~java
for (int i = 0; i < n; i++)
    for (int j = i + 1; j < n; j++)
        if (a[i] + a[j] == target)
            return new int[]{i, j};
~~~
- **Time:** O(n²) · **Space:** O(1)

## Approach 2 — Sort + two pointers
Sort, then move two pointers inward. (Good when you only need the *values* or a yes/no, since sorting destroys original indices.)

~~~java
int l = 0, r = n - 1;
while (l < r) {
    int sum = a[l] + a[r];
    if (sum == target) return true;
    else if (sum < target) l++;
    else r--;
}
~~~
- **Time:** O(n log n) · **Space:** O(1)

## Approach 3 — Hash map (optimal)
One pass; store each value → index and check for the complement first.

~~~java
Map<Integer,Integer> seen = new HashMap<>();
for (int i = 0; i < n; i++) {
    int need = target - a[i];
    if (seen.containsKey(need))
        return new int[]{seen.get(need), i};
    seen.put(a[i], i);
}
~~~
- **Time:** O(n) · **Space:** O(n)

## Complexity comparison

| Approach | Time | Space | Keeps indices? |
|---|---|---|---|
| Brute force | O(n²) | O(1) | Yes |
| Sort + 2 ptr | O(n log n) | O(1) | No |
| Hash map | O(n) | O(n) | Yes |

## Key points
- Check the complement **before** inserting the current element to handle duplicates cleanly.
- Two-pointer needs a **sorted** array; hashing does not.
