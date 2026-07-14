## Definition

The **Liskov Substitution Principle (LSP)** — the **L** in SOLID, formulated by Barbara Liskov — states that **objects of a superclass should be replaceable with objects of a subclass without breaking the program's correctness**.

A subclass must honor the **contract** of its parent: same expected behavior, no strengthened preconditions, no weakened postconditions.

## Why It Matters

- Guarantees safe polymorphism — code using a base type works with any subtype.
- Prevents surprising bugs from subclasses that "break the rules."

## Classic Violation: Rectangle / Square

```java
class Rectangle {
    protected int w, h;
    void setWidth(int w)  { this.w = w; }
    void setHeight(int h) { this.h = h; }
    int area() { return w * h; }
}

class Square extends Rectangle {   // seems natural, but...
    void setWidth(int w)  { this.w = this.h = w; }
    void setHeight(int h) { this.w = this.h = h; }
}
```

```text
Client code:
  Rectangle r = new Square();
  r.setWidth(5);
  r.setHeight(4);
  expect area == 20  ->  actual area == 16  ✗  LSP broken!
```

A `Square` cannot substitute a `Rectangle`; the client's assumption breaks.

## LSP-Compliant Design

```java
interface Shape { int area(); }

class Rectangle implements Shape {
    int w, h;
    Rectangle(int w, int h) { this.w = w; this.h = h; }
    public int area() { return w * h; }
}
class Square implements Shape {
    int side;
    Square(int side) { this.side = side; }
    public int area() { return side * side; }
}
```

## Rules a Subtype Must Follow

| Rule | Meaning |
|------|---------|
| Preconditions | Must not be **stronger** than the base's |
| Postconditions | Must not be **weaker** than the base's |
| Invariants | Must be **preserved** |
| Exceptions | Should not throw new unexpected checked types |

## Key points

- **Subtypes must be substitutable for their base types** without altering correctness.
- Violated by overriding methods that change expected behavior (e.g. throwing `UnsupportedOperationException`).
- Favor composition or separate abstractions when an "is-a" relationship breaks the contract.
- Enables reliable polymorphism, the backbone of OCP.
