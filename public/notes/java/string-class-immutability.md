## Definition

A **String** in Java is an object of `java.lang.String` that represents a sequence of characters. Strings are **immutable**: once created, the character contents of a `String` object can never be changed. Any operation that appears to modify a string actually creates a **new** `String` object, leaving the original untouched.

## Why immutable?

- **String pool caching** — literals are shared; mutability would corrupt other references.
- **Security** — file paths, URLs, credentials passed as strings can't be altered after validation.
- **Thread safety** — immutable objects are inherently safe to share across threads.
- **Hashcode caching** — `String` caches its hash, enabling fast, reliable `HashMap` keys.

## Demonstration

```java
String s = "Hello";
s.concat(" World");         // result discarded
System.out.println(s);      // Hello  (original unchanged)

String t = s.concat(" World"); // NEW object returned
System.out.println(t);      // Hello World

String a = "Java";
a = a + "8";                // a now points to a NEW object "Java8"
```

## Memory diagram

```text
String s = "Hello";
s ──────────────► [ "Hello" ]      (unchanged forever)

s = s + " World";
s ──────X                          old object now unreferenced
 └──────────────► [ "Hello World" ] (brand new object)
```

## Immutable vs Mutable text types

| Type | Mutable? | Thread-safe | Use when |
|------|----------|-------------|----------|
| `String` | No | Yes | Fixed / rarely changed text |
| `StringBuilder` | Yes | No | Heavy edits, single thread |
| `StringBuffer` | Yes | Yes | Heavy edits, multi-thread |

## Key points

- Immutability is enforced: `String` is `final`, its internal `byte[]/char[]` is `private final`, and no method mutates it in place.
- Repeated concatenation in a loop creates many throwaway objects — use `StringBuilder` instead for performance.
- `final String s` makes the **reference** unchangeable; the object was already immutable — the two are different guarantees.
- Because strings are immutable, they are safe as `HashMap` keys and can be freely shared via the string pool.
