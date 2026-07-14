## Definition

The **String pool** (a.k.a. string constant pool or intern pool) is a special region of the heap where the JVM stores **one shared copy** of each distinct string literal. When you write a string literal, the JVM checks the pool: if an equal string already exists it returns that reference; otherwise it adds the new one. This saves memory because immutable strings can be safely shared.

## Literals vs `new`

```java
String a = "cat";          // pooled
String b = "cat";          // same pooled object
String c = new String("cat"); // NEW heap object, NOT pooled

System.out.println(a == b); // true  (same reference)
System.out.println(a == c); // false (different objects)
System.out.println(a.equals(c)); // true (same content)
```

## The `intern()` method

`String.intern()` returns the pooled reference for a string. If the pool already has an equal string it returns that; otherwise it adds the current string to the pool and returns it.

```java
String c = new String("cat");
String d = c.intern();      // returns the pooled "cat"
System.out.println(a == d); // true
```

## Diagram

```text
Heap
 ┌───────────────── String Pool ─────────────────┐
 │   "cat" ◄──── a                                │
 │      ▲ ▲────── b                               │
 │      └──────── d (= c.intern())                │
 └────────────────────────────────────────────────┘
   outside pool:  [ "cat" ] ◄──── c  (new String)
```

## `==` vs `equals`

| Comparison | Checks | Literal vs literal | Literal vs `new` |
|------------|--------|--------------------|--------------------|
| `==` | Reference identity | `true` | `false` |
| `equals()` | Character content | `true` | `true` |

## Key points

- String literals are automatically pooled at class-load / compile time.
- `new String("x")` always creates a distinct object on the heap, bypassing the pool.
- `intern()` lets you force pooling at runtime — useful for deduplicating many equal strings, but overuse can pressure the pool.
- Since Java 7 the string pool lives in the main heap (not PermGen), so it is subject to garbage collection.
- Always compare string **content** with `equals()`, never `==`.
