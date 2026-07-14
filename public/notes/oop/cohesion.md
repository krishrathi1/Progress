## Definition

**Cohesion** measures how closely the responsibilities of a single module (class or method) are related to one another — how focused it is on a single, well-defined task. It answers: *"Does everything in this class belong together?"*

- **High cohesion** — a class does one thing and does it well; all its methods and fields serve one clear purpose. Desirable.
- **Low cohesion** — a class is a grab-bag of unrelated responsibilities ("God class"). Hard to understand and maintain. Undesirable.

High cohesion aligns with the **Single Responsibility Principle (SRP)**: a class should have only one reason to change.

## Types of cohesion (low → high)

| Type | Description | Cohesion |
|------|-------------|----------|
| Coincidental | Unrelated tasks grouped by accident | Worst |
| Logical | Similar-category tasks selected by a flag | Low |
| Temporal | Tasks run at the same time (e.g. startup) | Low |
| Procedural | Tasks follow a sequence | Medium |
| Communicational | Tasks operate on the same data | High |
| Functional | All parts contribute to one single task | Best |

## Example

```java
// LOW cohesion: unrelated jobs crammed together.
class Utility {
    void saveUser(User u) { /* DB */ }
    void sendEmail(String to) { /* SMTP */ }
    double calculateTax(double amt) { /* math */ }
}

// HIGH cohesion: each class has one focused responsibility.
class UserRepository { void save(User u) { /* DB only */ } }
class EmailService   { void send(String to) { /* email only */ } }
class TaxCalculator  { double calculate(double amt) { return amt * 0.18; } }
```

```text
Low  cohesion: [ save | email | tax ]  <- one class, many jobs
High cohesion: [save] [email] [tax]    <- one job each
```

## Key points

- Cohesion = how focused and related a module's responsibilities are; aim for **high**.
- High cohesion embodies the **Single Responsibility Principle**.
- Symptoms of low cohesion: large "God" classes, unrelated methods, vague names.
- High cohesion improves readability, reuse, and ease of change.
- Best practice pairs **high cohesion** with **low coupling**.
