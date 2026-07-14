## Definition

A **wildcard** (`?`) is an unknown type argument used with generics. It lets a method accept a *family* of parameterized types instead of one exact type. Java provides three forms:

- **Unbounded**: `List<?>` — a list of some unknown type.
- **Upper-bounded**: `List<? extends Number>` — some type that *is* `Number` or a subtype.
- **Lower-bounded**: `List<? super Integer>` — some type that is `Integer` or a supertype.

## Why wildcards are needed

Generics are **invariant**: `List<Integer>` is **not** a subtype of `List<Number>`. Wildcards restore controlled flexibility.

```java
static double sum(List<? extends Number> nums) {
    double s = 0;
    for (Number n : nums) s += n.doubleValue(); // READ ok
    return s;
}
sum(List.of(1, 2, 3));      // List<Integer> accepted
sum(List.of(1.5, 2.5));     // List<Double>  accepted
```

## PECS rule

**Producer Extends, Consumer Super** — the key interview mnemonic.

```java
// Producer: source you READ from -> use extends
static void copy(List<? extends T> src, List<? super T> dst) {
    for (T item : src) dst.add(item);   // read src, write dst
}
```

- `? extends T` → you can **read** `T` but **cannot add** (compiler doesn't know the exact subtype).
- `? super T` → you can **add** `T` but reads come back only as `Object`.

```text
? extends Number   ? super Integer
   [ read ✓ ]         [ write ✓ ]
   [ write ✗ ]        [ read as Object ]
```

## Comparison

| Wildcard | Read as | Add allowed? | Use for |
|----------|---------|--------------|---------|
| `? extends T` | `T` | No (except `null`) | Producers (data in) |
| `? super T` | `Object` | Yes (`T` & subtypes) | Consumers (data out) |
| `?` | `Object` | No (except `null`) | When type is irrelevant |

## Key points

- Generics are invariant; wildcards add safe covariance/contravariance.
- **PECS**: Producer `extends`, Consumer `super`.
- You cannot instantiate a wildcard type, e.g. `new ArrayList<?>()` is illegal.
- Use a named type parameter (`<T>`) instead of a wildcard when the relationship between arguments/return matters.
