## Definition

**`ArrayList<E>`** is a resizable-array implementation of the `List` interface in `java.util`. It stores elements in a contiguous backing array that **grows automatically** when full, giving fast random access by index.

## How it grows

- Default initial capacity is **10**.
- When full, capacity increases by roughly **50%** (`newCap = oldCap + oldCap/2`).
- A new larger array is allocated and elements are copied over (amortized O(1) add).

```text
add beyond capacity:
[a][b][c][d][e][f][g][h][i][j]   size=10, full
   -> allocate size 15, copy, then insert
[a][b][c][d][e][f][g][h][i][j][k][ ][ ][ ][ ]
```

## Time complexity

| Operation | Complexity |
|-----------|------------|
| `get(i)` / `set(i)` | O(1) |
| `add(e)` (end) | O(1) amortized |
| `add(i, e)` / `remove(i)` | O(n) (shifting) |
| `contains` / `indexOf` | O(n) |

## Common usage

```java
ArrayList<Integer> list = new ArrayList<>();
list.add(10);              // [10]
list.add(20);              // [10, 20]
list.add(1, 15);           // [10, 15, 20]
list.get(2);               // 20
list.set(0, 5);            // [5, 15, 20]
list.remove(Integer.valueOf(15)); // remove object 15
list.remove(0);            // remove index 0
list.size();               // 2
for (int x : list) System.out.println(x);
```

Note: `remove(int)` removes by **index**, `remove(Object)` by **value** — a classic gotcha with `Integer`.

## ArrayList vs array vs LinkedList

| Feature | ArrayList | Array | LinkedList |
|---------|-----------|-------|-----------|
| Size | Dynamic | Fixed | Dynamic |
| Random access | O(1) | O(1) | O(n) |
| Insert/delete middle | O(n) | N/A | O(n) find + O(1) link |
| Memory | Compact | Compact | Extra node pointers |

## Key points

- Best when reads/iteration dominate and inserts happen mostly at the end.
- Not synchronized — wrap with `Collections.synchronizedList` or use `CopyOnWriteArrayList` for threads.
- Set initial capacity (`new ArrayList<>(1000)`) to avoid repeated resizing.
- Fail-fast iterator: structural modification during iteration throws `ConcurrentModificationException`.
