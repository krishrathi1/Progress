## Definition

**Coupling** measures the degree of interdependence between software modules — how much one class knows about, and relies on, the internal workings of another. It answers: *"If I change class B, how many other classes break?"*

- **Loose (low) coupling** — modules interact through well-defined interfaces and know little about each other. Desirable.
- **Tight (high) coupling** — modules depend on each other's internal details. A change ripples widely. Undesirable.

Good object-oriented design aims for **low coupling** (together with **high cohesion**), producing systems that are easier to change, test, and reuse.

## Types of coupling (loose → tight)

| Type | Description | Coupling |
|------|-------------|----------|
| Data coupling | Modules share only simple parameters | Loosest (best) |
| Stamp coupling | Share a whole record/object, use part of it | Low |
| Control coupling | One passes a flag controlling another's logic | Medium |
| Common coupling | Share global data | High |
| Content coupling | One module modifies another's internals | Tightest (worst) |

## Example

```java
// TIGHT coupling: Order builds a concrete MySQLDatabase itself.
class Order {
    private MySQLDatabase db = new MySQLDatabase(); // hard-wired
    void save() { db.write("order"); }              // can't swap DB
}

// LOOSE coupling: depend on an interface, inject the implementation.
interface Database { void write(String s); }

class Order {
    private final Database db;
    Order(Database db) { this.db = db; }   // any Database works
    void save() { db.write("order"); }
}
```

```text
Tight:  Order ----> MySQLDatabase   (bound to one concrete class)
Loose:  Order ----> «Database»      (interface; impl injected)
                       ^  ^
              MySQLDatabase  MongoDatabase
```

## Key points

- Coupling = how strongly modules depend on one another; aim for **loose**.
- Reduce coupling with **interfaces**, **dependency injection**, and **encapsulation**.
- Loose coupling improves testability (mock dependencies), reusability, and maintainability.
- Content and common coupling are the worst; data coupling is the best.
- Design goal: **low coupling + high cohesion**.
