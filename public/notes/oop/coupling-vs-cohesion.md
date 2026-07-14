## Definition

**Coupling** and **cohesion** are two complementary metrics of software design quality. They are often confused but measure different things:

- **Coupling** — the degree of interdependence *between* modules (inter-module). Goal: **low**.
- **Cohesion** — the degree to which the elements *within* a single module belong together (intra-module). Goal: **high**.

The guiding principle of good OO design is **"low coupling, high cohesion."** Together they produce modular, maintainable, testable systems.

## Comparison

| Aspect | Coupling | Cohesion |
|--------|----------|----------|
| Scope | Between modules (inter) | Within a module (intra) |
| Measures | Interdependence / reliance | Focus / relatedness of responsibilities |
| Desired value | **Low** (loose) | **High** |
| Question | "How much does A depend on B?" | "Do A's parts belong together?" |
| Bad extreme | Content coupling | Coincidental cohesion |
| Improved by | Interfaces, DI, encapsulation | Single Responsibility Principle |

## Diagram

```text
        Module A            Module B
      +-----------+       +-----------+
      | m1 m2 m3  |       | n1 n2 n3  |
      +-----------+       +-----------+
           \___________________/
             coupling (keep LOW)

   inside each box: how related m1,m2,m3 are
             = cohesion (keep HIGH)
```

## Why they go together

Low coupling and high cohesion reinforce each other. A highly cohesive class has one clear job, so it exposes a small, stable interface — which lets other classes depend on it loosely. A poorly cohesive "God class" tends to be tightly coupled to many others because it touches everything.

## Key points

- **Coupling = between modules (low is good); cohesion = within a module (high is good).**
- They are independent axes but the ideal design maximizes cohesion *and* minimizes coupling.
- Low coupling + high cohesion → easier maintenance, testing, and reuse.
- Achieve them via interfaces, dependency injection, encapsulation, and the Single Responsibility Principle.
- Classic exam line: *"Strive for loose coupling and strong cohesion."*
