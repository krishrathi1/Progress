## Definition

**Method overloading** and **method overriding** are two distinct ways methods relate in OOP, and they are frequently confused.

- **Overloading**: multiple methods in the **same class** share a **name** but differ in **parameter list** (number, type, or order). Resolved at **compile time** — it is *compile-time polymorphism*.
- **Overriding**: a **subclass** provides a new implementation of a method already defined in its **superclass**, with the **same signature**. Resolved at **runtime** — it is *runtime polymorphism*.

## Comparison

| Aspect | Overloading | Overriding |
|--------|-------------|------------|
| Where | Same class (or inherited) | Parent ↔ child classes |
| Signature | Must **differ** in params | Must be **identical** |
| Return type | Can differ | Same or covariant |
| Binding | Compile-time (static) | Runtime (dynamic) |
| Polymorphism | Compile-time | Runtime |
| Access modifier | Any | Cannot be **more restrictive** |
| `static` methods | Can be overloaded | Cannot be overridden (only hidden) |
| Inheritance needed | No | Yes |

## Example

```java
class Printer {
    // Overloading — same class, different parameters
    void print(int x)    { System.out.println("int: " + x); }
    void print(String s) { System.out.println("str: " + s); }
}

class ColorPrinter extends Printer {
    // Overriding — same signature as parent
    @Override void print(int x) { System.out.println("color int: " + x); }
}
```

```text
Overloading:  print(int) vs print(String)  -> chosen by COMPILER (arg type)
Overriding:   Printer.print(int) vs ColorPrinter.print(int)
              Printer p = new ColorPrinter();
              p.print(7);  -> "color int: 7"  chosen at RUNTIME (object type)
```

## Common rules & pitfalls

- Overloads cannot differ by **return type alone** — the compiler needs the parameter list to disambiguate.
- An override **cannot** throw broader checked exceptions than the parent method.
- Use `@Override` — the compiler then flags an accidental overload (e.g., a typo'd signature).
- A `private`/`static`/`final` parent method cannot be overridden; redefining a static one is **method hiding**, not overriding.

## Key points

- Overloading = same name, different params, same class, compile-time.
- Overriding = same signature, subclass replaces behaviour, runtime.
- Overloading needs no inheritance; overriding requires an is-a relationship.
- Together they cover both flavours of polymorphism in OOP.
