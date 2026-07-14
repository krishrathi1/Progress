## Problem

Given an array `books[]` where `books[i]` is the number of pages in the i-th book, and `m` students, allocate all books to students such that:

- Each student gets **at least one** book.
- Books are allocated in **contiguous** order (a student gets a consecutive block).
- Each book goes to exactly one student.

Minimise the **maximum** number of pages assigned to any single student. Return that minimum. If `m > n` (more students than books), allocation is impossible → return `-1`.

## Intuition

We search for the answer (the maximum pages a student reads) instead of the arrangement. The feasible answer lies in the range:

- **low** = `max(books)` — one student must hold the largest book, so the answer is never smaller.
- **high** = `sum(books)` — a single student holding everything.

For a candidate limit `mid`, greedily count how many students are needed if no student exceeds `mid` pages. This count is **monotonic**: a larger limit needs fewer students. So we binary search on the answer.

## Brute force — linear scan of the answer

Try every value from `max` to `sum`, and pick the first that is feasible.

```java
int feasibleStudents(int[] a, long limit) {
    int students = 1; long pages = 0;
    for (int p : a) {
        if (pages + p > limit) { students++; pages = p; }
        else pages += p;
    }
    return students;
}
int bruteForce(int[] a, int m) {
    if (m > a.length) return -1;
    long max = 0, sum = 0;
    for (int p : a) { max = Math.max(max, p); sum += p; }
    for (long lim = max; lim <= sum; lim++)
        if (feasibleStudents(a, lim) <= m) return (int) lim;
    return -1;
}
```

**Time:** O(sum × n) · **Space:** O(1)

## Optimal — binary search on answer

Because feasibility is monotonic, replace the linear scan with binary search.

```java
int findPages(int[] a, int m) {
    if (m > a.length) return -1;
    long low = 0, high = 0;
    for (int p : a) { low = Math.max(low, p); high += p; }
    while (low <= high) {
        long mid = low + (high - low) / 2;
        if (feasibleStudents(a, mid) <= m) high = mid - 1; // try tighter
        else low = mid + 1;
    }
    return (int) low;
}
```

**Time:** O(n × log(sum)) · **Space:** O(1)

```text
books = [12, 34, 67, 90], m = 2
low = 90 (max), high = 203 (sum)
mid=146 -> [12,34,67]=113, [90]=90 -> 2 students OK -> high=145
mid=117 -> [12,34,67]=113, [90] -> 2 students OK -> high=116
mid=103 -> [12,34]=46,[67]=67,[90] -> 3 students -> low=104
... converges to 113
Answer = 113
```

## Key points

- Answer range is `[max element, total sum]`; return `-1` when `m > n`.
- Feasibility check is greedy O(n): start a new student when the running page count would exceed `mid`.
- We take the **smallest** feasible limit — shrink `high` on success.
- Same template solves Split Array Largest Sum and Painter's Partition.
