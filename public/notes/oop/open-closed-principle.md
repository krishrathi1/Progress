## Definition

The **Open/Closed Principle (OCP)** — the **O** in SOLID — states that software entities (classes, modules, functions) should be **open for extension but closed for modification**.

You should be able to add new behavior by **adding new code** (new subclasses/implementations), **without editing existing, tested code**.

## Why It Matters

- Existing, working code stays untouched → fewer regressions.
- New features plug in via **polymorphism / abstraction**.
- Encourages designing to interfaces rather than concrete `if/else` chains.

## Violation Example

```java
// BAD: adding a new shape forces editing this method
class AreaCalculator {
    double area(Object shape) {
        if (shape instanceof Circle)    return /* ... */ 0;
        else if (shape instanceof Square) return /* ... */ 0;
        // must edit here for every new shape -> not closed
        return 0;
    }
}
```

## OCP-Compliant Fix

```java
interface Shape { double area(); }

class Circle implements Shape {
    double r;
    public double area() { return Math.PI * r * r; }
}
class Square implements Shape {
    double s;
    public double area() { return s * s; }
}

class AreaCalculator {
    double totalArea(Shape[] shapes) {
        double sum = 0;
        for (Shape sh : shapes) sum += sh.area(); // never changes
        return sum;
    }
}
// Add Triangle by writing a NEW class — no edits above.
```

## How Extension Happens

```text
        Shape (abstraction)
        /    |      \
   Circle  Square  Triangle  <-- add new ones freely
        \    |      /
      AreaCalculator (closed — loops over Shape)
```

## Key points

- **Open for extension, closed for modification.**
- Achieved mainly through **abstraction, inheritance, and polymorphism**.
- Replace growing `if/else`/`switch` on type with polymorphic dispatch.
- Balance: do not add abstraction prematurely; apply when variation is expected.
