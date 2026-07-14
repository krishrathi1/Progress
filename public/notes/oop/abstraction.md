## Definition

**Abstraction** is the OOP principle of **exposing only the essential features of an object while hiding the underlying implementation details**. It lets users interact with *what* an object does without knowing *how* it does it.

Everyday analogy: you drive a car using the steering wheel, pedals, and gear — you don't need to know how the engine combusts fuel. The controls are the **abstraction**; the engine internals are hidden.

## How it is achieved in Java

- **Abstract classes** (`abstract` keyword): can have abstract (unimplemented) and concrete methods; cannot be instantiated.
- **Interfaces**: a fully abstract contract of method signatures (plus default/static methods since Java 8).

```java
abstract class Shape {
    abstract double area();          // WHAT: every shape has an area

    void describe() {                // shared concrete behaviour
        System.out.println("Area = " + area());
    }
}

class Circle extends Shape {
    double r;
    Circle(double r) { this.r = r; }
    double area() { return Math.PI * r * r; }   // HOW: circle-specific
}

Shape s = new Circle(2);
s.describe();   // caller only knows "describe", not the formula
```

## Interface example (pure abstraction)

```java
interface Payment {
    void pay(double amount);   // only the contract, no implementation
}

class UpiPayment implements Payment {
    public void pay(double amount) { /* UPI-specific logic */ }
}
```

## Levels of hiding

```text
   User sees:        pay(amount)         <- essential interface
   ---------------------------------------------------
   Hidden away:      network calls, encryption,
                     bank protocols, retries          <- details
```

## Benefits

| Benefit | Explanation |
|---------|-------------|
| Simplicity | Users deal with a small, clear interface |
| Reduced complexity | Implementation details are hidden |
| Flexibility | Implementation can change without affecting users |
| Reusability | Common contracts drive multiple implementations |

## Abstraction vs Encapsulation

- **Abstraction** = design level; hides *complexity* by exposing essentials (via abstract classes/interfaces).
- **Encapsulation** = implementation level; hides *data* by bundling and using access modifiers.

## Key points

- Abstraction shows essential features and hides implementation ("what", not "how").
- Achieved through abstract classes and interfaces in Java.
- Abstract classes cannot be instantiated; interfaces define pure contracts.
- Reduces complexity and lets implementations evolve independently.
- One of the four pillars of OOP.
