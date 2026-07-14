## Definition

Copying an array means producing a new array with the same elements. Java offers several ways: `clone()`, `System.arraycopy()`, `Arrays.copyOf()`, and `Arrays.copyOfRange()`. A key distinction is **shallow vs deep** copy.

## The Four Ways

```java
int[] src = {1, 2, 3, 4, 5};

// 1. clone() — simplest full copy
int[] c1 = src.clone();

// 2. Arrays.copyOf(src, newLength)
int[] c2 = Arrays.copyOf(src, 5);        // same length
int[] c3 = Arrays.copyOf(src, 7);        // padded with 0s

// 3. Arrays.copyOfRange(src, from, to)   [from, to)
int[] c4 = Arrays.copyOfRange(src, 1, 4); // {2, 3, 4}

// 4. System.arraycopy(src, sp, dst, dp, len) — fastest, in place
int[] dst = new int[5];
System.arraycopy(src, 0, dst, 0, src.length);
```

## Shallow vs Deep Copy

All the above are **shallow** copies. For a primitive array that is a true independent copy. For an **array of objects**, only the references are copied — both arrays point to the same objects.

```text
Object array shallow copy:

src  --> [ refA ][ refB ]
              \      \
               \      \
copy --> [ refA ][ refB ]     <- same underlying objects!
```

```java
// Deep copy of a 2D array (copy each row)
int[][] orig = {{1, 2}, {3, 4}};
int[][] deep = new int[orig.length][];
for (int i = 0; i < orig.length; i++)
    deep[i] = orig[i].clone();
```

Note: `orig.clone()` on a 2D array is still shallow — rows are shared.

## Comparison

| Method | Resize? | Range? | Notes |
|--------|---------|--------|-------|
| `clone()` | No | No | Quick full copy |
| `Arrays.copyOf` | Yes (pad/trim) | From index 0 | Returns new array |
| `Arrays.copyOfRange` | Yes | Any `[from,to)` | Returns new array |
| `System.arraycopy` | No (dst preexists) | Yes | Fastest, native |

## Key points

- `clone()`, `copyOf`, `copyOfRange`, and `arraycopy` all perform **shallow** copies.
- For object arrays or multidimensional arrays, copy each element/row to get a deep copy.
- `System.arraycopy` is the fastest — it is a native method and requires a preallocated destination.
- Assignment `int[] b = a;` is **not** a copy — both names refer to the same array.
- `Arrays.copyOf(a, len)` pads with default values (`0`/`null`) when `len` exceeds the source length.
