## Definition

**Object cloning** is creating a copy of an existing object. In Java it is typically done via `Object.clone()`, which requires the class to implement the marker interface **`Cloneable`** (else it throws `CloneNotSupportedException`). The critical distinction is **shallow** vs **deep** copy — it governs whether nested (reference-type) fields are shared or duplicated.

## Shallow copy

Copies the object's top-level fields as-is. Primitive fields are copied by value, but **reference fields copy the reference**, so both objects point to the **same** nested object. `Object.clone()` performs a shallow copy by default.

```java
class Address { String city; Address(String c){ city = c; } }

class Person implements Cloneable {
    String name; Address addr;
    Person(String n, Address a){ name = n; addr = a; }
    public Person clone() throws CloneNotSupportedException {
        return (Person) super.clone();      // shallow: addr is shared
    }
}
```

## Deep copy

Duplicates the object **and** recursively copies every referenced object, so the copy is fully independent — no shared mutable state.

```java
public Person deepClone() throws CloneNotSupportedException {
    Person copy = (Person) super.clone();
    copy.addr = new Address(this.addr.city);  // clone nested object too
    return copy;
}
```

## What changes when you mutate

```text
Shallow copy:                    Deep copy:
 orig.name = "A"                  orig.name = "A"
 copy.name = "A"                  copy.name = "A"
   \        /  (shared)             |          |  (separate)
    Address{city="X"}          Address{X}   Address{X}
 copy.addr.city = "Y"           copy.addr.city = "Y"
 => orig.addr.city is "Y"  !!    => orig.addr.city stays "X"
```

## Comparison

| Aspect | Shallow copy | Deep copy |
|--------|--------------|-----------|
| Nested objects | Shared (same reference) | Duplicated (independent) |
| Speed / memory | Fast, less memory | Slower, more memory |
| Mutation safety | Changes leak between copies | Fully isolated |
| Default `clone()` | Yes | Must be coded manually |

## Ways to deep copy

- Manually clone each nested field (shown above).
- **Copy constructor**: `new Person(other)`.
- **Serialization**: serialize then deserialize (deep but slower).
- Libraries / `record` copies for immutable graphs.

## Key points

- `clone()` needs `Cloneable`, else throws `CloneNotSupportedException`.
- **Shallow** = nested references shared; **deep** = nested objects fully duplicated.
- Shallow is risky with **mutable** nested objects — changes propagate unexpectedly.
- Immutable nested fields make shallow copies safe (no need for deep copy).
- Prefer copy constructors/factory methods; many consider `clone()` broken/awkward in Java.
