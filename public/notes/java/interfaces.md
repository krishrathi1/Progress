## Definition

An **interface** in Java is a reference type that declares a *contract* — a set of abstract method signatures (and constants) that an implementing class must fulfill. It specifies **what** a class must do, not **how**. Since Java 8 an interface may also hold `default` and `static` methods with a body, and since Java 9 `private` methods.

- Declared with the `interface` keyword; classes join it with `implements`.
- A class can implement **many** interfaces, enabling a form of multiple inheritance of type.
- All fields are implicitly `public static final` (constants); abstract methods are implicitly `public abstract`.

## Syntax & Example

```java
interface Shape {
    double PI = 3.14159;          // public static final constant
    double area();                // public abstract method

    default String describe() {   // Java 8 default method
        return "Area = " + area();
    }
}

class Circle implements Shape {
    private double r;
    Circle(double r) { this.r = r; }
    public double area() { return PI * r * r; }   // must be public
}

class Demo {
    public static void main(String[] a) {
        Shape s = new Circle(2);   // program to the interface
        System.out.println(s.describe());
    }
}
```

## Why use interfaces

- **Abstraction** — callers depend on a contract, not a concrete class.
- **Loose coupling / polymorphism** — swap implementations freely (`List l = new ArrayList<>()`).
- **Multiple inheritance of type** — a class can satisfy several roles.
- Foundation for callbacks, strategy patterns, and functional interfaces (lambdas).

```text
        <<interface>> Shape
              |  implements
     ---------------------------
     |                         |
  Circle                   Rectangle
 (area impl)               (area impl)
```

## Key member rules

| Member kind | Modifier (implicit) | Body allowed? |
|-------------|--------------------|---------------|
| Field | `public static final` | value required |
| Abstract method | `public abstract` | no |
| default method | `public` | yes (Java 8+) |
| static method | `public static` | yes (Java 8+) |
| private method | `private` | yes (Java 9+) |

## Key points

- Cannot be instantiated; can hold references (`Shape s`).
- Implementing methods must be declared `public`.
- An interface can `extends` one or more other interfaces.
- A **functional interface** has exactly one abstract method and can be a lambda target.
- Prefer interfaces over abstract classes when you only need a contract and want flexibility.
