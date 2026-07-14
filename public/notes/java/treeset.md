## Definition

`TreeSet<E>` is a `Set` implementation backed by a **`TreeMap` (a self-balancing Red-Black tree)**. It stores **unique elements in sorted order** — either natural ordering (`Comparable`) or a supplied `Comparator`. It also implements `NavigableSet`, adding range and neighbour queries.

## Key characteristics

- **Sorted** ascending by default.
- **No duplicates**; **no `null`** (throws `NullPointerException` when compared).
- All core operations (`add`, `remove`, `contains`) are **O(log n)**.
- Elements must be mutually comparable or a `Comparator` must be given.

## Navigation methods

```text
Set: {10, 20, 30, 40, 50}

first()      -> 10      last()       -> 50
floor(35)    -> 30      ceiling(35)  -> 40   (35 not present)
lower(30)    -> 20      higher(30)   -> 40   (strict, excludes 30)
headSet(30)  -> [10,20]           tailSet(30) -> [30,40,50]
subSet(20,40)-> [20,30]           (40 exclusive)
```

## Example

```java
import java.util.TreeSet;
import java.util.Comparator;

public class Demo {
    public static void main(String[] args) {
        TreeSet<Integer> t = new TreeSet<>();
        t.add(40); t.add(10); t.add(30); t.add(20);
        System.out.println(t);            // [10, 20, 30, 40] sorted
        System.out.println(t.first());    // 10
        System.out.println(t.ceiling(25));// 30
        System.out.println(t.headSet(30));// [10, 20]

        // custom order (descending) via Comparator
        TreeSet<String> byLen =
            new TreeSet<>(Comparator.comparingInt(String::length));
        byLen.add("bb"); byLen.add("a"); byLen.add("ccc");
        System.out.println(byLen);        // [a, bb, ccc]
    }
}
```

## Comparison

| Aspect | `HashSet` | `TreeSet` |
|--------|-----------|-----------|
| Ordering | None | Sorted |
| Time complexity | O(1) avg | O(log n) |
| Null allowed | Yes (1) | No |
| Extra API | — | `NavigableSet` range/nearest queries |

## Key points

- Use `TreeSet` when you need elements **kept sorted** or need **range/nearest lookups**.
- With a `Comparator`, "equality" is defined by `compare() == 0` — inconsistent comparators can silently drop elements.
- `TreeSet` is not synchronized; wrap with `Collections.synchronizedSortedSet(...)` if shared.
