## Definition

**`Vector<E>`** is a legacy, **synchronized** resizable-array implementation of `List` (since JDK 1.0). It behaves like `ArrayList` but every public method is `synchronized`, making it thread-safe at the cost of speed.

**`Stack<E>`** extends `Vector` and models a **LIFO** (Last-In-First-Out) stack, adding `push`, `pop`, `peek`, `empty`, and `search`.

## Vector

```java
Vector<Integer> v = new Vector<>();
v.add(10);
v.add(20);
v.get(0);            // 10
v.firstElement();    // 10
v.lastElement();     // 20
v.size();            // 2
```

- Default capacity **10**; grows by **doubling** (vs ArrayList's 50%), controllable via a `capacityIncrement`.
- All methods synchronized -> safe across threads but slower single-threaded.

## Stack

```java
Stack<Integer> st = new Stack<>();
st.push(1);          // [1]
st.push(2);          // [1, 2]
st.peek();           // 2 (top, no removal)
st.pop();            // 2 (removed) -> [1]
st.empty();          // false
st.search(1);        // 1-based position from top
```

```text
push order: 1, 2, 3
   top -> | 3 |
          | 2 |
          | 1 |   <- bottom
pop() returns 3 (last in, first out)
```

## Comparison

| Feature | Vector | ArrayList | Stack |
|---------|--------|-----------|-------|
| Thread-safe | Yes | No | Yes |
| Growth | Doubles | +50% | Doubles (Vector) |
| Introduced | JDK 1.0 | JDK 1.2 | JDK 1.0 |
| Recommended | Legacy only | Yes | Use `ArrayDeque` |

## Key points

- `Vector` and `Stack` are **legacy**; synchronization on every call is usually wasteful.
- Prefer `ArrayList` (single-thread) or `CopyOnWriteArrayList` / `Collections.synchronizedList` (concurrent) over `Vector`.
- Prefer **`ArrayDeque`** over `Stack` for LIFO — it is faster and not burdened by `Vector` inheritance.
- `Stack` extends `Vector`, so it awkwardly exposes index-based list methods too.
- Both are fail-fast on structural modification during iteration.
