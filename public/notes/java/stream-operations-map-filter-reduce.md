## Definition

`map`, `filter`, and `reduce` are the three fundamental Stream operations that express **transform**, **select**, and **aggregate**. Together they cover most data-processing tasks in a declarative way.

## filter — select elements

Keeps only elements matching a `Predicate<T>`. It is an **intermediate** operation (returns a `Stream`).

```java
List<Integer> nums = List.of(1, 2, 3, 4, 5, 6);
List<Integer> evens = nums.stream()
    .filter(n -> n % 2 == 0)   // keep evens
    .collect(Collectors.toList());   // [2, 4, 6]
```

## map — transform elements

Applies a `Function<T,R>` to each element, producing a new stream of possibly different type. **1-to-1** mapping. Intermediate.

```java
List<String> words = List.of("hi", "world");
List<Integer> lengths = words.stream()
    .map(String::length)           // "hi"->2, "world"->5
    .collect(Collectors.toList()); // [2, 5]
```

`flatMap` is the sibling that flattens **1-to-many** (a stream of streams into one stream).

## reduce — aggregate to a single value

Combines all elements into one result using a `BinaryOperator`. **Terminal** operation.

```java
int sum = List.of(1, 2, 3, 4).stream()
    .reduce(0, (a, b) -> a + b);   // identity=0 -> 10

Optional<Integer> max = List.of(3, 7, 2).stream()
    .reduce(Integer::max);         // Optional[7]
```

## Full pipeline

```java
int total = List.of("a", "bb", "ccc").stream()
    .filter(s -> s.length() > 1)   // "bb", "ccc"
    .map(String::length)           // 2, 3
    .reduce(0, Integer::sum);      // 5
```

### Dry run

```text
["a","bb","ccc"]
  filter len>1  -> ["bb","ccc"]
  map length    -> [2, 3]
  reduce +      -> 0+2=2, 2+3=5  => 5
```

## Comparison

| Op | Input → Output | Type | Argument |
|----|----------------|------|----------|
| `filter` | Stream → Stream (fewer) | Intermediate | `Predicate<T>` |
| `map` | Stream → Stream (same count) | Intermediate | `Function<T,R>` |
| `reduce` | Stream → single value | Terminal | `BinaryOperator<T>` |

## Key points

- `filter` narrows, `map` transforms, `reduce` folds — a classic functional trio.
- Intermediate ops (`filter`, `map`) are **lazy**; `reduce` triggers execution.
- Three-arg `reduce(identity, accumulator, combiner)` supports parallel folding.
- Prefer `mapToInt(...).sum()` over `reduce` for numeric sums — clearer and avoids boxing.
- Use `flatMap` when each element expands into multiple elements.
