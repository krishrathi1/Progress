## Definition

**Composition** is a "part-of" relationship where one object (the *whole*) owns and manages the lifecycle of another object (the *part*). The part cannot meaningfully exist independent of the whole — when the whole is destroyed, its parts are destroyed too. It is the strongest form of association and models a **strong has-a** relationship.

- A `Car` **has-a** `Engine`; the engine is created inside the car and dies with it.
- A `House` **has** `Room`s; rooms are meaningless without the house.

Composition is preferred over inheritance ("favor composition over inheritance") because it gives flexible, loosely reusable designs without the tight coupling of a class hierarchy.

## How it works

- The whole class holds the part as a member field.
- The whole is responsible for **creating** the part (usually in its constructor).
- The part is not shared with or passed from the outside — ownership is exclusive.

```text
+---------------------------+
|   Car   (whole)           |
|   +-------------------+   |
|   |  Engine (part)    |   |   <-- filled diamond in UML
|   +-------------------+   |
+---------------------------+
   destroying Car destroys Engine
```

## Example

```java
class Engine {                 // the part
    void start() { System.out.println("Engine starts"); }
}

class Car {                    // the whole
    private final Engine engine;   // strong ownership

    Car() {
        this.engine = new Engine();  // created & owned internally
    }

    void drive() {
        engine.start();
        System.out.println("Car is moving");
    }
}   // when Car is GC'd, its Engine becomes unreachable too
```

## Composition vs Inheritance

| Aspect | Composition (has-a) | Inheritance (is-a) |
|--------|--------------------|--------------------|
| Coupling | Loose | Tight |
| Reuse | Delegate to a member | Extend a base class |
| Flexibility | Swap parts at runtime | Fixed at compile time |
| Lifecycle | Whole owns the part | N/A |

## Key points

- Composition = strong has-a; the part's lifetime is bound to the whole.
- Part is created and owned internally, not shared externally.
- UML notation: filled (solid) diamond on the whole's side.
- "Favor composition over inheritance" for flexible, low-coupling designs.
- Contrast with aggregation, which is a *weak* has-a where parts outlive the whole.
