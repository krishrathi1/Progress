## Definition

A **wrapper class** is an object representation of a primitive type. Each of Java's 8 primitives has a corresponding class in `java.lang` that "wraps" the value inside an object, so it can be used where objects are required (e.g. in **collections**, generics, or when `null` is needed).

| Primitive | Wrapper |
|-----------|---------|
| `byte` | `Byte` |
| `short` | `Short` |
| `int` | `Integer` |
| `long` | `Long` |
| `float` | `Float` |
| `double` | `Double` |
| `char` | `Character` |
| `boolean` | `Boolean` |

## Autoboxing and unboxing

- **Autoboxing** — automatic conversion of a primitive to its wrapper object.
- **Unboxing** — automatic conversion of a wrapper object back to a primitive.

Introduced in Java 5, the compiler inserts these conversions for you.

```java
Integer a = 5;        // autoboxing:  Integer.valueOf(5)
int b = a;            // unboxing:    a.intValue()

List<Integer> list = new ArrayList<>();
list.add(10);         // autoboxed int -> Integer
int x = list.get(0);  // unboxed Integer -> int
```

```text
   int 5  ──autobox──►  Integer(5)   (heap object)
Integer(5) ──unbox──►     int 5
```

## Useful wrapper features

```java
int n = Integer.parseInt("123");        // String -> int
String s = Integer.toString(255);       // int -> String
int max = Integer.MAX_VALUE;            // constants
int hex = Integer.parseInt("FF", 16);   // 255
```

## Pitfalls

```java
Integer p = 127, q = 127;
System.out.println(p == q);   // true  (cached -128..127)
Integer r = 128, t = 128;
System.out.println(r == t);   // false (different objects) -> use .equals()

Integer nul = null;
int y = nul;                  // NullPointerException on unboxing
```

## Key points

- Wrappers let primitives participate in **generics/collections**, which store only objects.
- Autoboxing/unboxing is compiler sugar for `valueOf()` / `xxxValue()` calls.
- `Integer` caches values **-128 to 127**, so `==` may accidentally work — always compare wrappers with `.equals()`.
- Unboxing a `null` wrapper throws `NullPointerException`.
- Wrappers are **immutable** and provide handy static utilities (`parseInt`, `MAX_VALUE`, `valueOf`).
- Excessive boxing in tight loops hurts performance; prefer primitives when possible.
