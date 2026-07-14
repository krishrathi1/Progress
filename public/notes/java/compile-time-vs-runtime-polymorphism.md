## Definition

**Polymorphism** ("many forms") lets the same method name behave differently in different contexts. Java offers two kinds distinguished by **when** the method call is resolved:

- **Compile-time polymorphism** (static binding) — resolved by the compiler, achieved through **method overloading**.
- **Runtime polymorphism** (dynamic binding) — resolved by the JVM, achieved through **method overriding**.

## Comparison table

| Aspect | Compile-time | Runtime |
|--------|-------------|---------|
| Achieved by | Method/constructor overloading | Method overriding |
| Binding | Static (early) | Dynamic (late) |
| Resolved at | Compile time | Runtime |
| Based on | Reference type & arguments | Actual object type |
| Speed | Faster (no lookup) | Slight overhead (vtable) |
| Inheritance needed | No | Yes |
| Flexibility | Less | More (extensible) |

## Compile-time example (overloading)

```java
class Calc {
    int add(int a, int b)        { return a + b; }
    double add(double a, double b) { return a + b; }
    int add(int a, int b, int c) { return a + b + c; }
}
// Compiler picks the method from argument types.
```

## Runtime example (overriding)

```java
class Shape { double area() { return 0; } }
class Square extends Shape {
    double s;
    Square(double s) { this.s = s; }
    @Override double area() { return s * s; }
}

Shape sh = new Square(4);  // parent ref -> child object
System.out.println(sh.area());  // 16.0 decided at runtime
```

## Decision flow

```text
Overloading:  add(2, 3)      --compiler--> add(int,int)
Overriding:   shape.area()   --JVM--------> actual object's area()
```

## Key points

- Overloading = **same class**, different parameter lists, decided by compiler.
- Overriding = **parent/child**, same signature, decided by JVM at runtime.
- Only overriding gives true **polymorphic behavior** via a base reference.
- Fields and `static`/`private`/`final` methods use static binding regardless.
- Both improve readability and extensibility but at different stages of execution.
