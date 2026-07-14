## Definition

`java.util.Optional<T>` is a **container object** introduced in Java 8 that may or may not hold a non-null value. It is a cleaner, type-safe alternative to returning `null`, forcing callers to consciously handle the "absent value" case and helping eliminate `NullPointerException` (NPE).

- An `Optional` is either **present** (wraps a value) or **empty**.
- It is designed mainly as a **method return type**, not for fields or method parameters.

## Creating an Optional

```java
Optional<String> a = Optional.of("hello");      // value must be non-null, else NPE
Optional<String> b = Optional.ofNullable(name); // allows null -> empty Optional
Optional<String> c = Optional.empty();          // explicitly empty
```

## Consuming a value safely

```java
Optional<String> opt = Optional.ofNullable(findUser());

// 1. Provide a fallback
String v1 = opt.orElse("guest");                 // eager default
String v2 = opt.orElseGet(() -> loadDefault());  // lazy default (only if empty)
String v3 = opt.orElseThrow(() -> new IllegalStateException("missing"));

// 2. Conditional action
opt.ifPresent(u -> System.out.println("Found " + u));
opt.ifPresentOrElse(System.out::println, () -> System.out.println("none"));

// 3. Transform / filter without unwrapping
int len = opt.map(String::length).orElse(0);
Optional<String> big = opt.filter(s -> s.length() > 3);
```

## Common methods

| Method | Purpose |
|--------|---------|
| `isPresent()` / `isEmpty()` | Check presence (isEmpty since Java 11) |
| `get()` | Return value, throws `NoSuchElementException` if empty |
| `orElse(v)` | Value or default `v` |
| `orElseGet(sup)` | Value or lazily computed default |
| `orElseThrow()` | Value or throw exception |
| `map(fn)` | Transform value if present |
| `flatMap(fn)` | Transform when `fn` already returns an Optional |
| `filter(pred)` | Keep value only if predicate holds |

```text
findUser() --> "Ada"  =>  Optional[Ada] --map(length)--> Optional[3] --orElse(0)--> 3
findUser() --> null   =>  Optional.empty --map(length)--> empty      --orElse(0)--> 0
```

## Key points

- Optional prevents NPEs by **making absence explicit** in the type signature.
- Prefer `orElseGet` over `orElse` when the default is expensive to compute.
- Avoid calling `get()` without checking presence; prefer `map`/`orElse`.
- Don't use Optional for fields, constructor args, or collections — return an empty collection instead.
- `Optional` is not `Serializable`; use it for return values only.
