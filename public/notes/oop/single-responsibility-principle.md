## Definition

The **Single Responsibility Principle (SRP)** — the **S** in SOLID — states that a class should have **only one reason to change**, meaning it should have a single, well-defined responsibility or job.

A "responsibility" is an axis of change: if two different actors (billing team vs reporting team) could each demand changes to the same class, it has more than one responsibility.

## Why It Matters

- **Isolates change** — editing one concern cannot break unrelated ones.
- **Higher cohesion** — everything in the class relates to one purpose.
- **Easier testing & reuse** — small focused classes are simple to mock and reuse.

## Violation Example

```java
// BAD: three responsibilities in one class
class Employee {
    String name;
    double calculateSalary() { /* payroll logic */ return 0; }
    void saveToDatabase()   { /* persistence  */ }
    String generateReport() { /* presentation */ return ""; }
}
```

Changing the DB, the report format, or the salary rule all force edits to `Employee`.

## Refactored (SRP-compliant)

```java
class Employee { String name; }

class SalaryCalculator { double calculate(Employee e) { return 0; } }
class EmployeeRepository { void save(Employee e) { /* DB */ } }
class EmployeeReport { String generate(Employee e) { return ""; } }
```

## Structure

```text
        Employee (data only)
        /        |         \
Salary       Employee      Employee
Calculator   Repository    Report
(compute)    (persist)     (present)
 each class -> one reason to change
```

## SRP vs a "God Class"

| Aspect | God Class | SRP Design |
|--------|-----------|------------|
| Reasons to change | Many | One |
| Cohesion | Low | High |
| Testability | Hard | Easy |
| Reusability | Poor | Good |

## Key points

- **One class = one reason to change.**
- Improves cohesion, testability, and maintainability.
- Do not over-split into hundreds of trivial classes — balance is key.
- Related smells: large classes, methods spanning unrelated concerns, frequent merge conflicts.
