## Definition

A **multidimensional array** in Java is an *array of arrays*. The most common form is the 2D array, which models a table of rows and columns. Java does not store 2D arrays in a single contiguous block (like C); instead each row is a separate 1D array object referenced from an outer array.

## Declaration & Creation

```java
// Declaration + allocation
int[][] grid = new int[3][4];   // 3 rows, 4 columns (all 0)

// Declaration with initializer
int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6}
};

// 3D array
int[][][] cube = new int[2][3][4];
```

- `grid.length` -> number of rows (3).
- `grid[0].length` -> number of columns in row 0 (4).
- Default values follow the element type (`0`, `0.0`, `false`, `null`).

## Memory Layout

```text
grid ---> [ ref0 ][ ref1 ][ ref2 ]     (outer array of references)
             |       |       |
             v       v       v
          [0 0 0 0][0 0 0 0][0 0 0 0]   (each row = separate int[])
```

Because each row is an independent object, rows need not be the same length (see jagged arrays).

## Traversal

```java
int[][] m = {{1, 2, 3}, {4, 5, 6}};
for (int i = 0; i < m.length; i++) {
    for (int j = 0; j < m[i].length; j++) {
        System.out.print(m[i][j] + " ");
    }
    System.out.println();
}

// for-each version
for (int[] row : m)
    for (int val : row)
        System.out.print(val + " ");
```

## Row-major vs Column-major

| Aspect | Detail |
|--------|--------|
| Storage | Array of row references (not one flat block) |
| Access | `a[i][j]` = row `i`, column `j` |
| Iteration order | Row-major traversal is cache-friendlier |
| `Arrays.deepToString` | Prints nested contents cleanly |

```java
System.out.println(Arrays.deepToString(m)); // [[1, 2, 3], [4, 5, 6]]
```

## Key points

- A 2D array is an array whose elements are themselves arrays.
- `a.length` is the row count; `a[i].length` is that row's column count.
- Rows are separate objects, so lengths can differ.
- Use `Arrays.deepToString()` to print nested arrays.
- Uninitialized `int[3][3]` fills with `0`; an `int[3][]` leaves inner rows `null` until assigned.
