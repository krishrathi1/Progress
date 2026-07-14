## Definition

**Inheritance** is an OOP mechanism where one class (the **subclass / child**) acquires the fields and methods of another class (the **superclass / parent**). It models an **"is-a"** relationship, promotes **code reuse**, and enables **runtime polymorphism**. In Java, inheritance is expressed with the `extends` keyword (classes) or `implements` (interfaces).

## Why use it

- Reuse existing, tested code instead of rewriting it.
- Establish a natural hierarchy (`Dog` **is-a** `Animal`).
- Allow a parent reference to hold child objects (polymorphism).

## Types of inheritance in Java

```text
Single:        A -> B
Multilevel:    A -> B -> C
Hierarchical:  A -> B, A -> C
Multiple:      (only via interfaces)   A, B -> C
Hybrid:        combination (via interfaces)
```

| Type | Meaning | Supported with classes? |
|------|---------|------------------------|
| Single | One child, one parent | Yes |
| Multilevel | Chain of inheritance | Yes |
| Hierarchical | Many children, one parent | Yes |
| Multiple | One child, many parents | No (use interfaces) |
| Hybrid | Mix of the above | Only via interfaces |

Java does **not** allow multiple inheritance of classes to avoid the **diamond problem** (ambiguity when two parents define the same method).

## Example

```java
class Animal {
    void eat() { System.out.println("eating"); }
}
class Dog extends Animal {      // single inheritance
    void bark() { System.out.println("barking"); }
}
class Puppy extends Dog { }     // multilevel: Puppy -> Dog -> Animal

public class Demo {
    public static void main(String[] args) {
        Puppy p = new Puppy();
        p.eat();   // inherited from Animal
        p.bark();  // inherited from Dog
    }
}
```

## Key points

- Use `extends` for classes, `implements` for interfaces.
- A subclass inherits `public`/`protected` members; `private` members are not directly accessible.
- Constructors are **not inherited**; the child constructor implicitly calls `super()` first.
- Java supports single, multilevel, and hierarchical class inheritance; multiple inheritance is achieved only through interfaces.
- Prefer inheritance for genuine **is-a** relationships; favor **composition** for **has-a**.
