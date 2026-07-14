## Definition

An **abstract class** is a class declared with the `abstract` keyword that **cannot be instantiated** directly. It is meant to be a **partially implemented base** — it can hold both concrete (implemented) methods and **abstract methods** (declared without a body). An **abstract method** has no implementation and **forces** subclasses to override it.

```java
abstract class Shape {
    abstract double area();          // abstract: no body
    void describe() {                // concrete: shared behavior
        System.out.println("Area = " + area());
    }
}
```

## Rules

- Declared with `abstract`; cannot create objects with `new`.
- May contain abstract methods, concrete methods, constructors, fields, and `static` methods.
- Any class with at least one abstract method **must** be declared abstract.
- A subclass must implement **all** inherited abstract methods, or itself be abstract.
- Can have constructors (called via `super()` when a subclass is instantiated).

## Example

```java
abstract class Shape {
    abstract double area();
}
class Circle extends Shape {
    double r;
    Circle(double r) { this.r = r; }
    @Override double area() { return Math.PI * r * r; }
}
class Rectangle extends Shape {
    double w, h;
    Rectangle(double w, double h) { this.w = w; this.h = h; }
    @Override double area() { return w * h; }
}

public class Demo {
    public static void main(String[] args) {
        Shape[] shapes = { new Circle(2), new Rectangle(3, 4) };
        for (Shape s : shapes)
            System.out.println(s.area());  // 12.566 , 12.0
    }
}
```

## Abstract class vs Interface

| Feature | Abstract class | Interface |
|---------|---------------|-----------|
| Methods | Abstract + concrete | Abstract, default, static |
| Fields | Any (instance, static) | `public static final` only |
| Constructor | Yes | No |
| Multiple inheritance | No | Yes |
| Keyword | `extends` | `implements` |

```text
        Shape (abstract)
       /            \
  Circle          Rectangle   <- must implement area()
```

## Key points

- Use an abstract class when subclasses share **common code + state** plus a required contract.
- Cannot be instantiated, but reference variables of the abstract type enable **polymorphism**.
- A method can be abstract only inside an abstract class (or interface).
- `abstract` cannot combine with `final`, `static`, or `private` on methods.
- Prefer an **interface** when you only need a contract with no shared implementation or need multiple inheritance.
