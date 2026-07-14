## Definition

A **design pattern** is a general, reusable solution to a commonly occurring problem in software design. It is not finished code you paste in, but a **template** or blueprint that you adapt to your situation. Patterns capture the collective experience of expert developers as named, communicable vocabulary.

The concept was popularized by the **Gang of Four (GoF)** — Gamma, Helm, Johnson, and Vlissides — in their 1994 book *Design Patterns: Elements of Reusable Object-Oriented Software*, which catalogued **23 patterns**.

## Why use design patterns

- **Proven solutions**: battle-tested approaches to recurring problems.
- **Shared vocabulary**: saying "use a Factory here" conveys a whole design instantly.
- **Maintainability & flexibility**: patterns promote loose coupling and adherence to SOLID.
- **Faster design**: avoid reinventing the wheel.

## The three GoF categories

```text
                 Design Patterns (23 GoF)
        ┌───────────────┼────────────────┐
   Creational       Structural        Behavioral
  (object creation) (composition)  (communication)
        │                │                │
  Singleton         Adapter           Observer
  Factory           Decorator         Strategy
  Builder           Proxy             Iterator
  Prototype         Facade            Command
```

## Category comparison

| Category | Concern | Examples |
|----------|---------|----------|
| **Creational** | *How* objects are created/instantiated | Singleton, Factory, Builder, Prototype |
| **Structural** | *How* classes/objects are composed | Adapter, Decorator, Proxy, Facade, Composite |
| **Behavioral** | *How* objects interact & share responsibility | Observer, Strategy, Iterator, Command, State |

## A pattern's typical structure

- **Name** — a handle for the concept.
- **Problem / Intent** — when to apply it.
- **Solution** — the roles (classes/objects) and their relationships.
- **Consequences** — trade-offs (flexibility vs complexity).

## Caution

Patterns are tools, not goals. Applying a pattern where a simple method suffices adds needless complexity (violates KISS/YAGNI). Reach for a pattern when the problem it solves actually appears.

## Key points

- A design pattern is a **reusable, named solution template**, not concrete code.
- **GoF** defined 23 patterns in three families: **Creational, Structural, Behavioral**.
- Benefits: proven solutions, common vocabulary, loose coupling, maintainability.
- Don't over-engineer — use a pattern only when it genuinely fits the problem.
