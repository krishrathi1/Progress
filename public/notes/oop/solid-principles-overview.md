## Definition

**SOLID** is an acronym for five object-oriented design principles introduced by Robert C. Martin ("Uncle Bob"). Following them produces code that is **easier to maintain, extend, and test** by reducing tight coupling and rigid design.

## The Five Principles

| Letter | Principle | One-line idea |
|--------|-----------|---------------|
| **S** | Single Responsibility | A class should have only **one reason to change**. |
| **O** | Open/Closed | Open for **extension**, closed for **modification**. |
| **L** | Liskov Substitution | Subtypes must be **substitutable** for their base type. |
| **I** | Interface Segregation | Many **small, specific** interfaces beat one fat interface. |
| **D** | Dependency Inversion | Depend on **abstractions**, not concretions. |

## Why They Matter

- **Maintainability** — changes stay localized; one edit does not ripple across the system.
- **Extensibility** — new features are added by writing new classes, not rewriting old ones.
- **Testability** — small, decoupled units are easy to mock and unit-test.
- **Reduced fragility** — avoids the "change one thing, break five others" trap.

## Mental Model

```text
   Rigid, coupled code                SOLID code
 ┌────────────────────┐        ┌──────────────────────┐
 │  God Class         │        │  small classes,      │
 │  does everything   │  ==>   │  interfaces,         │
 │  hard to change    │        │  dependency injection│
 └────────────────────┘        └──────────────────────┘
```

## Quick Example (violation vs fix)

```java
// Violates SRP: report generation + persistence in one class
class Report {
    String generate() { return "data"; }
    void saveToFile(String s) { /* file I/O */ }   // second responsibility
}

// SOLID: split responsibilities
class Report { String generate() { return "data"; } }
class ReportSaver { void save(Report r) { /* file I/O */ } }
```

## Key points

- SOLID = **S**RP, **O**CP, **L**SP, **I**SP, **D**IP — five complementary principles.
- Goal: **low coupling, high cohesion**, easy change and testing.
- They are **guidelines, not laws** — apply pragmatically; over-engineering violates their spirit.
- Frequently asked together in interviews; know one solid (pun intended) example per principle.
