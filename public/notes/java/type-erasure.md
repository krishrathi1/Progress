## Definition

**Type erasure** is the process by which the Java compiler removes all generic type information during compilation. Generics exist only at **compile time** for type checking; at **runtime** the bytecode contains raw types. This is how Java added generics (Java 5) while keeping **backward compatibility** with pre-generic code.

## What the compiler does

1. Replaces type parameters with their **bound** (or `Object` if unbounded).
2. Inserts **casts** where needed to preserve type safety.
3. Generates **bridge methods** to keep polymorphism working after erasure.

```java
// You write:
class Box<T> {
    T value;
    T get() { return value; }
}
// After erasure it behaves like:
class Box {
    Object value;
    Object get() { return value; }
}
```

For a bounded type, the bound is used:

```java
class Box<T extends Number> { T v; }  // T erased to Number
```

## Consequences at runtime

```text
List<String> a = new ArrayList<>();
List<Integer> b = new ArrayList<>();
a.getClass() == b.getClass()  ->  true   (both ArrayList)
```

Because the type is gone at runtime, several things are illegal:

```java
// All ERRORS:
if (obj instanceof List<String>) {}   // can't check generic type
T t = new T();                        // can't instantiate T
T[] arr = new T[10];                  // can't create generic array
```

## Comparison

| Feature | Compile time | Runtime |
|---------|--------------|---------|
| Type parameter `T` | Known, checked | Erased to bound/`Object` |
| `List<String>` vs `List<Integer>` | Distinct types | Same class `List` |
| Casts | Inserted by compiler | Executed |

## Key points

- Generics are a **compile-time-only** feature (unlike C++ templates or C# reified generics).
- You **cannot** use `instanceof` with a parameterized type, create `new T()`, or `new T[]`.
- Overloads that differ only by type parameter (`f(List<String>)` vs `f(List<Integer>)`) **won't compile** — same erased signature.
- **Bridge methods** are synthetic methods the compiler adds so overriding works after erasure.
- Runtime type info can be recovered via reflection on **fields/parameters** (e.g. `getGenericType()`), not on plain objects.
