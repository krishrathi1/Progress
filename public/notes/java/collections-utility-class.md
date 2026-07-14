## Definition

The `java.util.Collections` class is a **utility (helper) class** that consists exclusively of **static methods** operating on or returning collections. It cannot be instantiated (private constructor). Do not confuse it with the `Collection` **interface** — `Collections` (plural) is the toolbox; `Collection` is the root interface of the framework.

## Commonly used methods

| Method | Purpose |
|--------|---------|
| `sort(list)` | Sorts a list in natural order |
| `sort(list, cmp)` | Sorts using a `Comparator` |
| `reverse(list)` | Reverses element order |
| `shuffle(list)` | Randomly permutes elements |
| `max(coll)` / `min(coll)` | Largest / smallest element |
| `binarySearch(list, key)` | Searches a **sorted** list |
| `frequency(coll, o)` | Count of occurrences of `o` |
| `swap(list, i, j)` | Swaps two positions |
| `unmodifiableList(list)` | Read-only view |
| `synchronizedList(list)` | Thread-safe wrapper |
| `emptyList()` / `singletonList(o)` | Immutable convenience collections |
| `fill`, `copy`, `nCopies` | Bulk population |

## Example

```java
import java.util.*;

public class Demo {
    public static void main(String[] args) {
        List<Integer> nums = new ArrayList<>(List.of(4, 1, 3, 2));

        Collections.sort(nums);              // [1, 2, 3, 4]
        Collections.reverse(nums);           // [4, 3, 2, 1]
        System.out.println(Collections.max(nums));   // 4
        System.out.println(Collections.min(nums));   // 1
        System.out.println(Collections.frequency(nums, 3)); // 1

        Collections.sort(nums);              // must sort before binarySearch
        int idx = Collections.binarySearch(nums, 3); // 2

        List<Integer> ro = Collections.unmodifiableList(nums);
        // ro.add(9);  // throws UnsupportedOperationException
    }
}
```

## Notes

- `binarySearch` requires the list to already be **sorted** in the same order as the comparator, else the result is undefined.
- `sort` uses a stable **TimSort** (merge sort variant), guaranteeing O(n log n).
- Wrapper views like `unmodifiableList` / `synchronizedList` wrap the *original* list — structural changes to the backing list still show through.

## Key points

- `Collections` = static utility class; `Collection` = interface. Different things.
- Provides sorting, searching, reversing, shuffling, min/max, frequency.
- Offers immutable and synchronized wrappers around existing collections.
- `binarySearch` needs a pre-sorted list; `sort` is stable O(n log n).
