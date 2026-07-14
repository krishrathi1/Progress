## Definition

**Generics** (added in Java 5) let you write classes, interfaces, and methods that operate on a **type parameter** supplied at use-time. They provide **compile-time type safety** and eliminate most explicit casts.

## Why generics?

Before generics, collections stored raw `Object`, forcing casts and risking runtime `ClassCastException`:

```java
List list = new ArrayList();
list.add("hello");
list.add(42);                       // no error at compile time
String s = (String) list.get(1);    // ClassCastException at runtime!
```

With generics the type is checked at compile time:

```java
List<String> list = new ArrayList<>();
list.add("hello");
// list.add(42);          // compile error — caught early
String s = list.get(0);   // no cast needed
```

## Benefits

- **Type safety** — errors caught at compile time, not runtime.
- **No casting** — cleaner, less error-prone code.
- **Code reuse** — one generic algorithm works for many types.

## Terminology

```text
        List<String>
        ^     ^
        |     +--- type argument (actual type)
        +--------- generic type

class Box<T> { ... }
             ^--- type parameter (placeholder)
```

Common single-letter conventions: `T` (type), `E` (element), `K`/`V` (key/value), `N` (number), `R` (return).

## The diamond operator

Since Java 7 the right-hand side type args can be inferred:

```java
Map<String, List<Integer>> m = new HashMap<>();  // <> = diamond
```

## Type erasure (brief)

Generics are a **compile-time** feature. The compiler removes type parameters (replacing them with `Object` or bounds) so the bytecode has no generic type info at runtime — this is **type erasure**. Hence you cannot do `new T()` or `list instanceof List<String>`.

## Key points

- Generics = parameterized types → compile-time type safety, no casts.
- Introduced in Java 5; the diamond `<>` (Java 7) enables type inference.
- Type parameters are placeholders (`T`, `E`, `K`, `V`) replaced by actual types.
- Implemented via **type erasure**, so generic info is not available at runtime.
