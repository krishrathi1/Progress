## Definition

**Runtime polymorphism** (also called **dynamic method dispatch**) is the process where a call to an **overridden method** is resolved at **runtime** rather than compile time. A superclass reference points to a subclass object, and the JVM invokes the method belonging to the **actual object**, not the reference type.

## How it works

1. The compiler checks that the method exists in the **reference type** (compile-time type safety).
2. At runtime, the JVM looks at the **actual object** the reference points to.
3. It dispatches the call to that object's overriding method via the **virtual method table (vtable)**.

```text
Reference type -> used by compiler (does the method exist?)
Object type    -> used by JVM      (which version to run?)
```

## Example

```java
class Animal {
    void sound() { System.out.println("Generic sound"); }
}
class Dog extends Animal {
    @Override void sound() { System.out.println("Bark"); }
}
class Cat extends Animal {
    @Override void sound() { System.out.println("Meow"); }
}

public class Demo {
    public static void main(String[] args) {
        Animal a;               // one reference type
        a = new Dog();  a.sound();   // Bark
        a = new Cat();  a.sound();   // Meow
    }
}
```

The single reference `a` produces different behavior depending on the object assigned — that is dynamic dispatch.

## Why it matters

- Enables writing **general code** against a base type that works for any subclass.
- Core to design patterns (Strategy, Template Method, Factory) and frameworks.
- Example: a `List<Animal>` can be iterated and `sound()` called polymorphically.

```text
Animal[] zoo = { new Dog(), new Cat() };
for (Animal x : zoo) x.sound();   // Bark, then Meow
```

## Key points

- Requires **inheritance** + **method overriding**.
- Only **instance (non-static, non-final, non-private)** methods are dynamically dispatched.
- **Fields** and **static methods** are resolved by the **reference type**, not the object (no runtime dispatch).
- Achieved with `extends` (classes) or `implements` (interfaces).
- Also known as **late binding**; overloading by contrast is **early/static binding**.
