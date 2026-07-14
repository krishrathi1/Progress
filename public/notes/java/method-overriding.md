## Definition

**Method overriding** occurs when a subclass provides its **own implementation** of a method that is already defined in its superclass, with the **same name, parameters, and return type**. It is the basis of **runtime polymorphism** — the JVM decides which version to run based on the actual object type at runtime.

## Rules for overriding

- Method name and **parameter list** must be identical.
- Return type must be the same or a **covariant** (subclass) type.
- Access modifier cannot be **more restrictive** (e.g. can widen `protected` to `public`, not the reverse).
- Only **inherited, non-static, non-final, non-private** methods can be overridden.
- The overriding method cannot throw **broader checked exceptions** than the parent's.
- Use the `@Override` annotation — the compiler then verifies the signature.

## Example

```java
class Shape {
    double area() { return 0; }
}
class Circle extends Shape {
    double r;
    Circle(double r) { this.r = r; }
    @Override
    double area() { return Math.PI * r * r; }  // overrides Shape.area
}

public class Demo {
    public static void main(String[] args) {
        Shape s = new Circle(2);   // parent ref, child object
        System.out.println(s.area());  // 12.566 -> Circle.area() runs
    }
}
```

## Overriding vs Overloading

| Feature | Overriding | Overloading |
|---------|-----------|-------------|
| Classes | Two (parent & child) | Same class |
| Signature | Same | Different parameters |
| Binding | Runtime (dynamic) | Compile-time (static) |
| Polymorphism | Runtime | Compile-time |
| `@Override` | Applicable | Not applicable |

## Dispatch diagram

```text
Shape s = new Circle(2);
 s.area()
   |-- reference type: Shape  (compiler checks method exists)
   |-- object type:    Circle (JVM calls Circle.area at runtime)
```

## Key points

- Overriding enables **dynamic method dispatch** — the real object's method is invoked.
- `static` methods are **hidden**, not overridden (resolved by reference type).
- `private` and `final` methods cannot be overridden.
- A covariant return type lets the child return a more specific type.
- Always add `@Override` to catch signature mistakes at compile time.
