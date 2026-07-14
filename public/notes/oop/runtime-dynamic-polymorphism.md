## Definition

**Runtime (dynamic) polymorphism** is polymorphism resolved **while the program is running**. When an overridden method is called through a superclass reference, the JVM invokes the version belonging to the **actual object type**, not the reference type. This is called **late / dynamic binding** and is achieved through **method overriding** plus **upcasting**.

It is the mechanism behind the OOP mantra *"program to an interface, not an implementation."*

## How dynamic dispatch works

```text
Animal a = new Dog();   // reference type Animal, object type Dog
a.sound();

At runtime the JVM checks the ACTUAL object (Dog):
   Animal ref ──► [ Dog object ] ──► Dog.sound()  ✓
   (declared type Animal is ignored for the call target)
```

- The compiler only verifies the method **exists** in the reference type.
- The **JVM** picks the concrete implementation at call time via a virtual method table (vtable).

## Example — method overriding

```java
class Animal {
    void sound() { System.out.println("Some sound"); }
}
class Dog extends Animal {
    @Override void sound() { System.out.println("Woof"); }
}
class Cat extends Animal {
    @Override void sound() { System.out.println("Meow"); }
}

public class Demo {
    public static void main(String[] x) {
        Animal[] pets = { new Dog(), new Cat(), new Animal() };
        for (Animal p : pets) p.sound();   // Woof / Meow / Some sound
    }
}
```

One call site `p.sound()` produces three behaviours — chosen at runtime by object type.

## Requirements

- **Inheritance** (or interface implementation) between classes.
- An **overridden** method (same signature) in the subclass.
- Call made through a **superclass/interface reference** (upcasting).

## Key points

- Achieved through **method overriding** — not overloading.
- Uses **late binding**: target chosen at **runtime** based on the real object.
- `static`, `final`, and `private` methods are **not** polymorphic (resolved statically).
- Fields are **not** overridden — field access is resolved by reference type, only methods are dynamically dispatched.
- Enables extensible, loosely-coupled designs (e.g., collections of a common base type).
