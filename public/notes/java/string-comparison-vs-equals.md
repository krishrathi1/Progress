## Definition

Comparing strings in Java can mean two different things:

- **`==`** compares **references** — whether two variables point to the *same object* in memory.
- **`.equals()`** compares **content** — whether two strings have the *same characters* in the same order.

For text comparison you almost always want `.equals()`.

## The Classic Trap

```java
String a = "hello";                 // pooled literal
String b = "hello";                 // same pooled object
String c = new String("hello");     // new object on heap

System.out.println(a == b);         // true  (same pool reference)
System.out.println(a == c);         // false (different objects)
System.out.println(a.equals(c));    // true  (same content)
```

## Reference Diagram

```text
String pool:        Heap:
 "hello" <--- a      new String("hello") <--- c
        \--- b

a == b : both -> pool "hello"   => true
a == c : pool vs heap object    => false
a.equals(c) : compares chars    => true
```

## Useful Variants

| Method | Purpose |
|--------|---------|
| `equals(o)` | Case-sensitive content match |
| `equalsIgnoreCase(o)` | Ignores case |
| `compareTo(o)` | Lexicographic order; 0 if equal |
| `==` | Reference identity (rarely what you want) |

## Null-Safe Comparison

```java
String input = null;
// input.equals("yes")  -> NullPointerException
"yes".equals(input);              // false, safe
Objects.equals(input, "yes");     // false, safe both ways
```

## Key points

- Use `.equals()` (or `equalsIgnoreCase`) to compare string **content**.
- `==` checks identity; it may return `true` for literals only because of the **string pool**.
- `new String("x")` always creates a distinct object, so `==` fails even for identical text.
- Call `.equals()` on a known non-null literal, or use `Objects.equals()`, to avoid `NullPointerException`.
- Whenever you override `equals()`, also override `hashCode()`.
