## Definition

`java.util.Arrays` is a utility class of **static** helper methods for working with arrays: sorting, searching, filling, copying, comparing, and converting to string or stream. It saves you from writing manual loops for these routine operations.

```java
import java.util.Arrays;
```

## Core Methods

| Method | Purpose |
|--------|---------|
| `sort(a)` | Sorts ascending (dual-pivot quicksort for primitives) |
| `sort(a, from, to)` | Sorts a sub-range `[from, to)` |
| `binarySearch(a, key)` | Index of key (array **must be sorted**) |
| `fill(a, val)` | Sets every element to `val` |
| `copyOf(a, newLen)` | Returns a resized copy |
| `copyOfRange(a, from, to)` | Copies sub-range `[from, to)` |
| `equals(a, b)` | Element-wise equality (1D) |
| `deepEquals(a, b)` | Recursive equality (nested arrays) |
| `toString(a)` | Readable 1D string |
| `deepToString(a)` | Readable nested string |
| `asList(a)` | Fixed-size `List` view (objects only) |
| `stream(a)` | Creates a stream from the array |

## Examples

```java
int[] a = {5, 2, 8, 1};

Arrays.sort(a);                       // [1, 2, 5, 8]
int idx = Arrays.binarySearch(a, 5);  // 2
int[] c = Arrays.copyOf(a, 6);        // [1, 2, 5, 8, 0, 0]
int[] r = Arrays.copyOfRange(a, 1, 3);// [2, 5]
Arrays.fill(a, 0);                    // [0, 0, 0, 0]

System.out.println(Arrays.toString(c));      // [1, 2, 5, 8, 0, 0]

int[][] m = {{1, 2}, {3, 4}};
System.out.println(Arrays.deepToString(m));  // [[1, 2], [3, 4]]
```

## Gotchas

```text
binarySearch on an UNSORTED array -> undefined / wrong result.
Arrays.asList(int[])  -> a List with ONE element (the array itself),
                         because int is not an object. Use Integer[].
equals vs deepEquals  -> use deepEquals for 2D/nested arrays.
```

## Key points

- All methods are `static`; call as `Arrays.method(...)`.
- `binarySearch` requires the array to be sorted first.
- `sort` uses dual-pivot quicksort for primitives, TimSort (merge) for objects.
- `copyOf` / `copyOfRange` create new arrays; original is untouched.
- Use `deepToString` / `deepEquals` for multidimensional arrays.
- `asList` returns a **fixed-size** list backed by the array — `add`/`remove` throw `UnsupportedOperationException`.
