## Problem

Given two **sorted** arrays `a` and `b`, return their **union**: all elements that appear in either array, sorted in ascending order, **with no duplicates**.

- Example: `a = [1, 2, 3, 4, 5]`, `b = [2, 3, 4, 4, 5, 6]` → `[1, 2, 3, 4, 5, 6]`.

## Intuition

Both inputs are already sorted, so we can merge them like the merge step of merge sort while skipping any value equal to the last one we added. This gives a sorted, duplicate-free result in a single pass.

## Brute force — use a Set

Dump everything into a sorted set; it handles ordering and dedup.

```java
List<Integer> unionArray(int[] a, int[] b) {
    TreeSet<Integer> set = new TreeSet<>();
    for (int x : a) set.add(x);
    for (int x : b) set.add(x);
    return new ArrayList<>(set);
}
```

**Time:** O((n+m) log(n+m)) · **Space:** O(n+m)

## Optimal — two pointers merge

Advance the pointer at the smaller value. Before adding, check the result's last element to avoid duplicates.

```java
List<Integer> unionArray(int[] a, int[] b) {
    List<Integer> res = new ArrayList<>();
    int i = 0, j = 0;
    while (i < a.length && j < b.length) {
        if (a[i] <= b[j]) addUnique(res, a[i++]);
        else              addUnique(res, b[j++]);
    }
    while (i < a.length) addUnique(res, a[i++]);
    while (j < b.length) addUnique(res, b[j++]);
    return res;
}
void addUnique(List<Integer> res, int v) {
    if (res.isEmpty() || res.get(res.size() - 1) != v) res.add(v);
}
```

**Time:** O(n + m) · **Space:** O(1) extra (excluding output)

```text
a = [1,2,3], b = [2,3,4]     i=0 j=0
1<=2 add 1 -> [1]            i=1
2<=2 add 2 -> [1,2]         i=2
3<=2? no, add b 2 dup skip  j=1
3<=3 add 3 -> [1,2,3]       i=3 (a done)
drain b: 3 dup, 4 add -> [1,2,3,4]
```

## Key points

- Exploit the sorted order — no need to sort again.
- Dedup by comparing with the **last element added** to the result.
- Move only the pointer whose value was consumed; on ties still guard against duplicates.
- Same merge skeleton solves **intersection** (add only when `a[i] == b[j]`).
