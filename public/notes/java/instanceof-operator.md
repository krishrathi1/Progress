## Definition

The **`instanceof`** operator is a binary, boolean operator that **tests whether an object is an instance of a given type** (a class, subclass, or interface). It returns `true` if the left operand is non-null and can be safely cast to the right-hand type, otherwise `false`.

```java
object instanceof Type   // -> boolean
```

Its main use is **safe type checking before downcasting**, avoiding a `ClassCastException`.

## Example

```java
class Animal {}
class Dog extends Animal {}

class Demo {
    public static void main(String[] a) {
        Animal x = new Dog();

        System.out.println(x instanceof Dog);     // true
        System.out.println(x instanceof Animal);  // true (superclass)
        System.out.println(x instanceof Object);  // true

        Animal y = null;
        System.out.println(y instanceof Dog);     // false (null -> always false)

        if (x instanceof Dog) {         // guard before cast
            Dog d = (Dog) x;            // safe downcast
        }
    }
}
```

## Pattern matching (Java 16+)

Modern Java lets you test and bind in one step, removing the explicit cast:

```java
if (x instanceof Dog d) {   // d is auto-cast Dog, in scope inside the block
    d.bark();
}
```

## Behavior rules

| Left operand | Result |
|--------------|--------|
| `null` | always `false` (no exception) |
| instance of the type | `true` |
| instance of a subtype of the type | `true` |
| unrelated type | `false` |
| incompatible type at compile time | compile error |

```text
        Object
          |
        Animal   <- (Dog instanceof Animal) = true
          |
         Dog     <- (obj is a Dog) = true
```

## Key points

- Returns `boolean`; `null instanceof X` is always `false`.
- Checks the **runtime** type against a compile-time-known type.
- Comparing with a completely unrelated class type is a **compile error**, not `false`.
- Use it to guard downcasts and prevent `ClassCastException`.
- Prefer Java 16+ **pattern matching** (`obj instanceof Type var`) for cleaner code.
- Overusing `instanceof` chains can signal poor design — polymorphism/overriding is often better.
