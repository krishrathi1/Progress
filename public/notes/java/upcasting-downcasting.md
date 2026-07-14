## Definition

**Upcasting** and **downcasting** are two forms of reference type casting between a parent class (supertype) and a child class (subtype) in an inheritance hierarchy.

- **Upcasting** — treating a subclass object through a superclass (or interface) reference. It is **implicit** (automatic) and always safe.
- **Downcasting** — converting a superclass reference back to a subclass reference. It must be **explicit** and is only safe if the object actually is an instance of that subclass; otherwise it throws `ClassCastException` at runtime.

## Diagram

```text
        Animal  (parent)
          ▲
          │ upcast  (Animal a = new Dog();)   implicit, safe
          │
         Dog     (child)
          ▲
          │ downcast ((Dog) a;)               explicit, risky
```

## Example

```java
class Animal { void eat() { System.out.println("eating"); } }
class Dog extends Animal {
    void eat() { System.out.println("dog eats"); }
    void bark() { System.out.println("woof"); }
}

public class Demo {
    public static void main(String[] args) {
        Animal a = new Dog();      // UPCAST: implicit
        a.eat();                   // dog eats  (dynamic dispatch)
        // a.bark();               // COMPILE ERROR: Animal has no bark()

        if (a instanceof Dog) {    // guard before downcast
            Dog d = (Dog) a;       // DOWNCAST: explicit
            d.bark();              // woof
        }

        Animal x = new Animal();
        Dog bad = (Dog) x;         // throws ClassCastException at runtime
    }
}
```

## Upcasting vs Downcasting

| Aspect | Upcasting | Downcasting |
|--------|-----------|-------------|
| Direction | Child → Parent | Parent → Child |
| Syntax | Implicit | Explicit cast required |
| Safety | Always safe | Risky (`ClassCastException`) |
| Accessible members | Only parent's (overridden run) | Child-specific members too |
| Common use | Polymorphism, generic APIs | Recover subtype behavior |

## Key points

- Upcasting enables **runtime polymorphism**: the reference type limits which methods compile, but the actual object determines which overridden method runs.
- Upcasting restricts you to members declared in the supertype; child-only methods are hidden until you downcast.
- Always guard a downcast with `instanceof` (or Java 16+ pattern matching: `if (a instanceof Dog d) d.bark();`) to avoid `ClassCastException`.
- You can only downcast to a type the object was actually created as (or a supertype of it).
