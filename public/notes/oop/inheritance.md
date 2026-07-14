## Definition

**Inheritance** is an OOP mechanism where a new class (the **subclass / child / derived** class) acquires the fields and methods of an existing class (the **superclass / parent / base** class). It models an **"is-a"** relationship (a `Dog` *is an* `Animal`) and promotes **code reuse**, **extensibility**, and **polymorphism**.

The child can:
- **Reuse** inherited members as-is.
- **Add** new members of its own.
- **Override** inherited methods to specialise behaviour.

## How it works

```text
        ┌───────────────┐
        │   Animal      │   superclass (base)
        │  + eat()      │
        └───────▲───────┘
                │  extends ("is-a")
        ┌───────┴───────┐
        │    Dog        │   subclass (derived)
        │  + bark()     │
        └───────────────┘
   Dog inherits eat(), adds bark()
```

- In Java the `extends` keyword establishes inheritance; `super` accesses the parent's constructor/members.
- Constructors are **not inherited**, but the parent constructor runs first (via an implicit or explicit `super(...)` call).

## Example

```java
class Animal {
    String name;
    void eat() { System.out.println(name + " is eating"); }
}

class Dog extends Animal {         // Dog is-a Animal
    void bark() { System.out.println(name + " says woof"); }
}

public class Demo {
    public static void main(String[] a) {
        Dog d = new Dog();
        d.name = "Rex";
        d.eat();   // inherited from Animal
        d.bark();  // defined in Dog
    }
}
```

## Key points

- Models an **is-a** relationship; use **composition (has-a)** when "is-a" does not hold.
- Enables **code reuse** and is the basis for **runtime polymorphism** (overriding).
- Java supports single inheritance of **classes**; multiple inheritance of **type** is achieved via interfaces.
- `private` members are not directly accessible in the child (encapsulation), though they are still inherited internally.
- Overusing inheritance creates **tight coupling**; favour composition where flexibility matters ("prefer composition over inheritance").
