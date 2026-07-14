## Definition

**Creational patterns** abstract the process of object instantiation, giving a system control over *what*, *how*, and *when* objects are created — while hiding the concrete construction details from client code. Three of the most common are **Singleton**, **Factory**, and **Builder**.

## Singleton

Ensures a class has **exactly one instance** and provides a global access point to it (e.g. configuration, logging, connection pool).

```java
public class Logger {
    private static volatile Logger instance;
    private Logger() {}                       // private constructor

    public static Logger getInstance() {      // thread-safe lazy init
        if (instance == null) {
            synchronized (Logger.class) {
                if (instance == null) instance = new Logger();
            }
        }
        return instance;
    }
}
```

- Private constructor blocks `new`; static method controls access.
- Use `volatile` + double-checked locking (or an enum/holder idiom) for thread safety.

## Factory Method

Defines an interface for creating an object but lets a factory decide which concrete class to instantiate. Client depends on the **abstraction**, not the concrete type.

```java
interface Shape { void draw(); }
class Circle implements Shape { public void draw() { System.out.println("O"); } }
class Square implements Shape { public void draw() { System.out.println("[]"); } }

class ShapeFactory {
    static Shape create(String type) {
        return switch (type) {
            case "circle" -> new Circle();
            case "square" -> new Square();
            default -> throw new IllegalArgumentException(type);
        };
    }
}
// Shape s = ShapeFactory.create("circle");
```

## Builder

Constructs a complex object step by step, ideal when a constructor would have many (often optional) parameters. Improves readability and immutability.

```java
class Pizza {
    private final String size; private final boolean cheese;
    private Pizza(Builder b) { this.size = b.size; this.cheese = b.cheese; }

    static class Builder {
        private String size; private boolean cheese;
        Builder size(String s)  { this.size = s; return this; }
        Builder cheese(boolean c){ this.cheese = c; return this; }
        Pizza build()           { return new Pizza(this); }
    }
}
// new Pizza.Builder().size("L").cheese(true).build();
```

## Comparison

| Pattern | Intent | Use when |
|---------|--------|----------|
| **Singleton** | One shared instance | Config, cache, logger, pool |
| **Factory** | Delegate which class to create | Client shouldn't know concrete types |
| **Builder** | Assemble step-by-step | Many optional/complex parameters |

## Key points

- All three **decouple client code from concrete construction**.
- Singleton: private constructor + static accessor; guard thread safety.
- Factory: returns objects via a common interface, hiding `new`.
- Builder: fluent, chainable construction for complex/immutable objects.
