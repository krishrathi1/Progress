/**
 * Rich learning notes for DSA topics — keyed by slug of the exact topic name.
 * Markdown uses ~~~lang fences (CommonMark) so the content can live in JS
 * template literals without backtick conflicts.
 */
export const dsaNotes: Record<string, string> = {
  "largest-element-in-array": `
## Problem
Given an array, return its **largest** element.

## Intuition
Walk once through the array, remembering the biggest value seen so far. There is nothing to "look back" on, so a single pass is enough.

## Approach 1 — Sorting (naive)
Sort ascending; the last element is the largest.

~~~cpp
sort(a.begin(), a.end());
return a[n - 1];
~~~
- **Time:** O(n log n) · **Space:** O(1)

## Approach 2 — Single scan (optimal)
Keep a running maximum.

~~~cpp
int maxi = a[0];
for (int i = 1; i < n; i++)
    maxi = max(maxi, a[i]);
return maxi;
~~~
- **Time:** O(n) · **Space:** O(1)

## Dry run
a = [3, 7, 1, 9, 2] → maxi: 3 → 7 → 7 → 9 → 9 → **9**

## Key points
- The optimal is a textbook "running aggregate" pattern (also used for min, sum, count).
- Initialise **maxi** with a[0] (or INT_MIN), never 0 — arrays can be all-negative.
`,

  "two-sum-problem": `
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
`,

  "kadane-s-algorithm-max-subarray-sum": `
## Problem
Find the maximum sum of a **contiguous** subarray.

## Intuition
Scan left to right holding the best subarray sum ending *here*. If the running sum ever goes negative it can only hurt what comes next, so drop it and restart from the current element.

## Approach 1 — Brute force
Sum every subarray.
~~~cpp
int best = INT_MIN;
for (int i = 0; i < n; i++) {
    int sum = 0;
    for (int j = i; j < n; j++) {
        sum += a[j];
        best = max(best, sum);
    }
}
~~~
- **Time:** O(n²) · **Space:** O(1)

## Approach 2 — Kadane (optimal)
~~~cpp
int sum = 0, best = INT_MIN;
for (int i = 0; i < n; i++) {
    sum += a[i];
    best = max(best, sum);
    if (sum < 0) sum = 0;   // drop a negative prefix
}
~~~
- **Time:** O(n) · **Space:** O(1)

## Visual
~~~
a =  [-2,  1, -3,  4, -1,  2,  1, -5,  4]
sum:  -2  1  -2   4   3   5   6   1   5
             ^reset       ^best = 6  (subarray [4,-1,2,1])
~~~

## Key points
- Initialise **best = INT_MIN** (not 0) so all-negative arrays return the largest single element.
- To also print the subarray, remember the start index whenever you reset, and the end when you update **best**.
`,

  "binary-search-to-find-x": `
## Problem
Find the index of **x** in a **sorted** array (or −1 if absent).

## Intuition
Each comparison at the middle throws away half the search space — the array is sorted, so you always know which half to keep.

## Approach 1 — Iterative
~~~java
int lo = 0, hi = n - 1;
while (lo <= hi) {
    int mid = lo + (hi - lo) / 2;   // avoids overflow
    if (a[mid] == x) return mid;
    else if (a[mid] < x) lo = mid + 1;
    else hi = mid - 1;
}
return -1;
~~~
- **Time:** O(log n) · **Space:** O(1)

## Approach 2 — Recursive
~~~java
int bs(int[] a, int lo, int hi, int x) {
    if (lo > hi) return -1;
    int mid = lo + (hi - lo) / 2;
    if (a[mid] == x) return mid;
    return a[mid] < x ? bs(a, mid + 1, hi, x)
                      : bs(a, lo, mid - 1, x);
}
~~~
- **Time:** O(log n) · **Space:** O(log n) recursion stack

## Common bugs
- Use **lo + (hi - lo) / 2**, not (lo + hi) / 2, to avoid integer overflow.
- Loop condition is **lo <= hi** (not <), otherwise you miss single-element ranges.

## Key points
- Binary search generalises to "search on answer" problems (Koko bananas, Aggressive cows) — find the smallest/largest value satisfying a monotonic predicate.
`,

  "sort-0s-1s-and-2s-dnf": `
## Problem
Sort an array containing only 0s, 1s and 2s, in place.

## Approach 1 — Counting sort
Count how many 0/1/2, then overwrite.
~~~cpp
int c0=0,c1=0,c2=0;
for (int v : a) (v==0?c0:v==1?c1:c2)++;
int i=0;
while (c0--) a[i++]=0;
while (c1--) a[i++]=1;
while (c2--) a[i++]=2;
~~~
- **Time:** O(2n) · **Space:** O(1) · two passes

## Approach 2 — Dutch National Flag (optimal, one pass)
Three pointers partition the array into [0s | 1s | unknown | 2s].
~~~cpp
int low=0, mid=0, high=n-1;
while (mid <= high) {
    if (a[mid]==0)      swap(a[low++], a[mid++]);
    else if (a[mid]==1) mid++;
    else                swap(a[mid], a[high--]);
}
~~~
- **Time:** O(n) · **Space:** O(1) · single pass

## Invariant (why it works)
~~~
[0 .. low-1]  = 0s
[low .. mid-1]= 1s
[mid .. high] = unknown
[high+1 .. n-1]= 2s
~~~
When a[mid]==2 we swap it to the back but do **not** advance mid (the swapped-in value is still unknown).

## Key points
- DNF is the go-to for 3-way partitioning (also used in quicksort with duplicate pivots).
`,

  "reverse-linkedlist-iterative": `
## Problem
Reverse a singly linked list and return the new head.

## Intuition
Re-point each node's **next** to the node before it. Keep three pointers so you never lose the rest of the list while flipping a link.

## Approach 1 — Iterative (optimal)
~~~java
ListNode prev = null, curr = head;
while (curr != null) {
    ListNode next = curr.next; // save
    curr.next = prev;          // flip
    prev = curr;               // advance
    curr = next;
}
return prev;                   // new head
~~~
- **Time:** O(n) · **Space:** O(1)

## Approach 2 — Recursive
~~~java
ListNode reverse(ListNode head) {
    if (head == null || head.next == null) return head;
    ListNode newHead = reverse(head.next);
    head.next.next = head;  // make next node point back
    head.next = null;
    return newHead;
}
~~~
- **Time:** O(n) · **Space:** O(n) recursion stack

## Visual
~~~
null <- 1    2 -> 3 -> null      (mid-flip)
        prev curr
~~~

## Key points
- Always cache **curr.next** before overwriting it.
- Iterative is preferred in interviews for O(1) space.
`,
};
