## Definition

An **interface** is a pure contract: a named set of method signatures (behaviors) that an implementing class promises to provide, with **no** implementation of its own. It answers *"what a type can do"* without saying *"how"*. Interfaces enable **abstraction**, **loose coupling**, and a form of **multiple inheritance of type**.

## In different languages

- **Java / C#**: a first-class `interface` keyword. All methods are implicitly `public abstract` (Java pre-8); constants are `public static final`.
- **C++**: no keyword — simulated with an abstract class containing only pure virtual functions.

```java
interface Payable {
    double calculatePay();          // abstract by default
    default String currency() {     // Java 8+ default method
        return "USD";
    }
}

class Employee implements Payable {
    private double salary;
    Employee(double s) { salary = s; }
    public double calculatePay() { return salary / 12; }
}
```

## Multiple interfaces

A class can implement many interfaces, giving Java-style multiple inheritance of *type* without the diamond problem.

```java
class SmartPhone implements Camera, Phone, MusicPlayer { /* ... */ }
```

```text
   Camera   Phone   MusicPlayer   (interfaces = capabilities)
      \       |        /
        SmartPhone            (implements all three)
```

## Interface vs Abstract class

| Feature | Interface | Abstract class |
|---------|-----------|----------------|
| Multiple inheritance | Yes (implements many) | No (extend one) |
| State / fields | Constants only | Instance fields allowed |
| Method bodies | Only default/static (Java 8+) | Yes |
| Constructor | No | Yes |
| Use when | Unrelated types share a capability | Related types share code + state |

## Key points

- Interface = **contract of behavior**; the class supplies the implementation.
- Program to an interface, not a concrete class → swappable implementations, easier testing/mocking.
- Java 8+ allows `default` and `static` methods; Java 9+ allows `private` helper methods.
- A class implementing an interface must override all abstract methods or be declared abstract itself.
- Interfaces model **"can-do" (has-a capability)** relationships, e.g. `Comparable`, `Runnable`, `Iterable`.
