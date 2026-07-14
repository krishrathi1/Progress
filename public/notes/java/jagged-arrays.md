## Definition

A **jagged array** (also called a *ragged array*) is a multidimensional array in which the member arrays (rows) can have **different lengths**. Java supports this naturally because a 2D array is really an array of independent 1D array references — each row is allocated separately.

## Creating a Jagged Array

```java
// Allocate the outer array only (rows are null initially)
int[][] jagged = new int[3][];

jagged[0] = new int[2];   // row 0 has 2 columns
jagged[1] = new int[4];   // row 1 has 4 columns
jagged[2] = new int[1];   // row 2 has 1 column

// Or with an initializer
int[][] j2 = {
    {1, 2},
    {3, 4, 5, 6},
    {7}
};
```

The syntax `new int[3][]` is legal (only the first dimension is sized); `new int[][3]` is a **compile error**.

## Memory Layout

```text
jagged --> [ ref0 ][ ref1 ][ ref2 ]
              |       |       |
              v       v       v
            [0 0]  [0 0 0 0] [0]
```

## Safe Traversal

Always use `row.length` per row — never assume a fixed column count.

```java
for (int i = 0; i < jagged.length; i++) {
    for (int k = 0; k < jagged[i].length; k++) {
        System.out.print(jagged[i][k] + " ");
    }
    System.out.println();
}
```

## Rectangular vs Jagged

| Feature | Rectangular `new int[3][4]` | Jagged `new int[3][]` |
|---------|-----------------------------|------------------------|
| Row lengths | All equal | May differ |
| Inner rows | Auto-allocated | `null` until assigned |
| Use case | Matrices, grids | Triangular tables, variable data |

## Common Use Cases

- Pascal's triangle (row *i* has *i+1* elements).
- Storing lists of varying size per category.
- Adjacency lists for graphs.

## Key points

- Jagged = array of arrays where rows have different lengths.
- Declare with the second dimension empty: `new int[n][]`.
- Inner rows are `null` until explicitly allocated — accessing one throws `NullPointerException`.
- Loop bounds must use `arr[i].length`, not a shared constant.
- Every rectangular 2D array is a special case of a jagged array with equal rows.
