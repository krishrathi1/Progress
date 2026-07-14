## Problem

Same as *Search in Rotated Sorted Array I*, but the array may contain **duplicates**. Given rotated `nums` and target `x`, return **true** if `x` is present, else **false**.

- Example: `nums = [7,8,1,2,3,3,3,4,5]`, `x = 3` → `true`.
- Example: `nums = [3,1,2,3,3,3,3]`, `x = 2` → `true`.

## Intuition

The version-I logic decides which half is sorted with `a[lo] <= a[mid]`. **Duplicates break this**: when `a[lo] == a[mid] == a[hi]` we cannot tell which half is sorted (e.g. `[3,1,2,3,3]`). The fix: when `a[lo] == a[mid] == a[hi]`, we can't decide, so **shrink both ends by one** (`lo++`, `hi--`) and retry. Otherwise the standard rotated-search logic applies.

## Brute force — linear scan

```java
boolean search(int[] a, int x) {
    for (int v : a) if (v == x) return true;
    return false;
}
```

**Time:** O(n) · **Space:** O(1)

## Optimal — binary search with duplicate handling

```java
boolean search(int[] a, int x) {
    int lo = 0, hi = a.length - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (a[mid] == x) return true;
        if (a[lo] == a[mid] && a[mid] == a[hi]) { // can't decide
            lo++; hi--;
            continue;
        }
        if (a[lo] <= a[mid]) {                    // left half sorted
            if (a[lo] <= x && x < a[mid]) hi = mid - 1;
            else lo = mid + 1;
        } else {                                  // right half sorted
            if (a[mid] < x && x <= a[hi]) lo = mid + 1;
            else hi = mid - 1;
        }
    }
    return false;
}
```

**Time:** O(log n) average · **O(n)** worst case (all equal) · **Space:** O(1)

```text
a = [3,1,2,3,3,3,3], x = 2
lo=0 hi=6 mid=3 a=3  a[lo]=a[mid]=a[hi]=3 -> lo=1,hi=5
lo=1 hi=5 mid=3 a=3  != x; left[1..3] sorted? a[1]=1<=3 yes
   2 in [1,3)? yes -> hi=2
lo=1 hi=2 mid=1 a=1  right sorted; 2 in (1,2]? yes -> lo=2
lo=2 hi=2 mid=2 a=2  found -> true
```

## Key points

- Extra case: `a[lo] == a[mid] == a[hi]` ⇒ `lo++, hi--` and continue.
- This edge case pushes the **worst case to O(n)** (e.g. `[3,3,3,3,3]` searching `1`).
- Returns a boolean, not an index — duplicates make a unique index meaningless.
- All other branches are identical to version I.
