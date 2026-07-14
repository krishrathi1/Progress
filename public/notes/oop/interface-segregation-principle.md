## Definition

The **Interface Segregation Principle (ISP)** — the **I** in SOLID — states that **no client should be forced to depend on methods it does not use**. Prefer **many small, specific interfaces** over one large, general-purpose ("fat") interface.

## Why It Matters

- Classes implement only what they actually need — no empty/dummy methods.
- Reduces coupling; changes to one capability do not ripple to unrelated clients.
- Improves readability and cohesion.

## Violation Example

```java
// BAD: fat interface forces unused methods
interface Worker {
    void work();
    void eat();
}

class Robot implements Worker {
    public void work() { /* ok */ }
    public void eat()  { throw new UnsupportedOperationException(); } // robots don't eat!
}
```

`Robot` is forced to implement `eat()`, which it cannot support — a code smell.

## ISP-Compliant Fix

```java
interface Workable { void work(); }
interface Eatable  { void eat();  }

class Human implements Workable, Eatable {
    public void work() { /* ... */ }
    public void eat()  { /* ... */ }
}

class Robot implements Workable {
    public void work() { /* ... */ }   // only what it needs
}
```

## Structure

```text
  Fat interface                Segregated interfaces
  ┌───────────┐                ┌──────────┐  ┌──────────┐
  │  Worker   │                │ Workable │  │ Eatable  │
  │ work()    │      ==>       │ work()   │  │ eat()    │
  │ eat()     │                └────┬─────┘  └────┬─────┘
  └───────────┘                  Human,Robot     Human
   Robot forced to eat()          pick only needed ones
```

## ISP vs SRP

| Principle | Focus |
|-----------|-------|
| SRP | A **class** should have one responsibility |
| ISP | An **interface** should expose only cohesive, needed methods |

## Key points

- **Do not force clients to depend on methods they do not use.**
- Split fat interfaces into **role-specific** ones.
- Symptom of violation: implementers throwing `UnsupportedOperationException` or leaving methods empty.
- Complements SRP but applies at the **interface/contract** level.
