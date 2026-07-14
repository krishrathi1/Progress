## Definition

Generics let collections hold a **specific element type**, enforced by the compiler. Before Java 5, collections stored `Object`, forcing manual casts and risking `ClassCastException` at runtime. Generic collections move that error to **compile time** and remove casts.

## Before vs after generics

```java
// Pre-generics (raw) — unsafe
List list = new ArrayList();
list.add("hi");
Integer n = (Integer) list.get(0);  // compiles, ClassCastException at runtime!

// Generic — safe
List<String> names = new ArrayList<>();
names.add("hi");
String s = names.get(0);            // no cast, type-checked
// names.add(42);                   // compile error
```

## Common generic collections

```java
List<Integer> nums = new ArrayList<>();          // list of ints
Set<String> tags = new HashSet<>();              // unique strings
Map<String, Integer> ages = new HashMap<>();     // key -> value
Queue<Double> q = new LinkedList<>();
Map<String, List<Integer>> graph = new HashMap<>(); // nested
```

The **diamond operator** `<>` (Java 7+) infers the right-hand type:

```java
Map<String, List<Integer>> m = new HashMap<>();  // no need to repeat types
```

## Iterating type-safely

```java
Map<String, Integer> ages = new HashMap<>();
ages.put("Amy", 30);
for (Map.Entry<String, Integer> e : ages.entrySet()) {
    System.out.println(e.getKey() + " = " + e.getValue());
}
```

## Comparison

| Aspect | Raw collection | Generic collection |
|--------|----------------|--------------------|
| Element type | `Object` | Specified (`<T>`) |
| Casts | Required | None |
| Error detection | Runtime | Compile time |
| Readability | Poor | Self-documenting |

## Key points

- Always parameterize collections; avoid **raw types** — they defeat type safety and trigger unchecked warnings.
- Use the **diamond `<>`** to avoid repeating type arguments.
- Type parameters must be **reference types** (`Integer`, not `int`) — autoboxing bridges primitives.
- Combine with **wildcards** (`List<? extends Number>`) for flexible API parameters (PECS).
- Generic type info is erased at runtime (type erasure), so all `List<T>` share class `ArrayList`.
