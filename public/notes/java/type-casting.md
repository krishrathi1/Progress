## Definition

**Type casting** converts a value from one data type to another. Java supports two forms: **widening (implicit)** casting, done automatically when going to a larger-capacity type, and **narrowing (explicit)** casting, which you must write manually because it may lose data.

## Widening (Implicit)

Smaller type → larger type. Safe, automatic, no data loss.

```text
byte -> short -> int -> long -> float -> double
        char  ->  int -> ...
```

```java
int i = 100;
long l = i;        // int -> long  (automatic)
double d = l;      // long -> double (automatic)
System.out.println(d);  // 100.0
```

## Narrowing (Explicit)

Larger type → smaller type. Requires a cast; may **lose data or precision**.

```java
double d = 9.99;
int i = (int) d;       // 9  (fractional part dropped)

long big = 130;
byte b = (byte) big;   // -126 (overflow wraps around)
```

## Comparison

| Feature | Widening | Narrowing |
|---------|----------|-----------|
| Direction | Small → large | Large → small |
| Syntax | Automatic | Explicit `(type)` |
| Data loss | None | Possible |
| Example | `int` → `double` | `double` → `int` |

## Reference / object casting

- **Upcasting** (child → parent): implicit, always safe.
- **Downcasting** (parent → child): explicit, may throw `ClassCastException`.

```java
Object o = "hello";           // upcast (implicit)
String s = (String) o;        // downcast (explicit)
```

## Type promotion in expressions

```java
byte a = 10, b = 20;
int result = a + b;   // a,b promoted to int automatically
```

## Key points

- **Widening** is automatic and safe; **narrowing** needs an explicit cast.
- Narrowing can cause **overflow** or **precision loss** (e.g., dropping decimals).
- `char` and `int` are interconvertible via casting (Unicode value).
- In arithmetic, `byte`/`short`/`char` operands are **promoted to `int`**.
- Object downcasting requires an explicit cast and risks `ClassCastException` — guard with `instanceof`.
