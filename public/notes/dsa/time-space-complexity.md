## Time & Space Complexity

**Complexity analysis** measures how an algorithm's running time and memory grow as the input size **n** grows — independent of hardware. We express it with **Big-O notation**, which describes the **upper bound** (worst case) by keeping only the dominant term and dropping constants.

- **Time complexity** — number of basic operations as a function of n.
- **Space complexity** — extra memory used (excluding the input itself), as a function of n.

### Asymptotic notations

| Notation | Meaning | Bound |
|----------|---------|-------|
| Big-O (O) | Worst case | Upper |
| Omega (Ω) | Best case | Lower |
| Theta (Θ) | Tight (both) | Exact |

### Common growth rates (best → worst)

```text
O(1)  <  O(log n)  <  O(n)  <  O(n log n)  <  O(n^2)  <  O(2^n)  <  O(n!)

operations
  |                                   n!   2^n
  |                              n^2
  |                     n log n
  |            n
  |    log n
  |_1_________________________________________ n
```

| Complexity | Name | Example |
|-----------|------|---------|
| O(1) | Constant | Array index access |
| O(log n) | Logarithmic | Binary search |
| O(n) | Linear | Single loop / linear scan |
| O(n log n) | Linearithmic | Merge sort, heap sort |
| O(n²) | Quadratic | Nested loops, bubble sort |
| O(2ⁿ) | Exponential | Naive recursion (subsets) |

### How to derive it

```java
for (int i = 0; i < n; i++)        // runs n times
    for (int j = 0; j < n; j++)    // runs n times each
        sum += arr[i][j];          // O(1) work
// total: n * n = O(n^2)
```

Rules of thumb:
- **Drop constants:** O(2n) → O(n).
- **Keep the dominant term:** O(n² + n) → O(n²).
- **Sequential loops add:** O(n) + O(n) = O(n).
- **Nested loops multiply:** O(n) × O(n) = O(n²).

### Space complexity example

```java
int sum = 0;                    // O(1) extra space
for (int x : arr) sum += x;     // no new array -> O(1)

int[] copy = new int[n];        // O(n) extra space
```

Recursion also uses stack space: a recursion depth of n costs **O(n)** auxiliary space.

## Key points

- Big-O describes **worst-case growth**; drop constants and lower-order terms.
- Nested loops **multiply**, sequential blocks **add**.
- O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ).
- Space complexity counts **extra/auxiliary** memory, including recursion stack.
- Always analyze both time and space; there is often a trade-off between them.
