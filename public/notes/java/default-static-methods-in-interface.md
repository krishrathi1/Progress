## Definition

Before Java 8 an interface could hold only abstract methods and constants. **Java 8** added two kinds of concrete methods to interfaces:

- **default methods** — instance methods with a body, marked `default`. They are inherited by implementing classes, which may override them. Their main purpose is **interface evolution**: adding new behavior to an existing interface without breaking the thousands of classes already implementing it.
- **static methods** — utility methods that belong to the interface itself, called as `InterfaceName.method()`. They are **not** inherited by implementing classes.

## Syntax & Example

```java
interface Vehicle {
    void start();                       // abstract

    default void honk() {               // default: inherited, overridable
        System.out.println("Beep!");
    }

    static Vehicle create() {           // static: factory utility
        return () -> System.out.println("engine on");
    }
}

class Car implements Vehicle {
    public void start() { System.out.println("Car starts"); }
    // honk() inherited as-is; could override
}

class Demo {
    public static void main(String[] a) {
        Car c = new Car();
        c.start();
        c.honk();                 // Beep!  (from default)
        Vehicle v = Vehicle.create();   // static called on interface
    }
}
```

## default vs static

| Aspect | default method | static method |
|--------|----------------|---------------|
| Belongs to | instance of implementing class | the interface itself |
| Inherited by class | Yes | No |
| Can be overridden | Yes | No |
| Called via | object reference | `Interface.method()` |
| Access to instance state | via other abstract methods | none |

## Diamond conflict resolution

If a class inherits two default methods with the same signature from different interfaces, it **must override** and can pick one explicitly:

```java
interface A { default void go() { System.out.println("A"); } }
interface B { default void go() { System.out.println("B"); } }
class C implements A, B {
    public void go() { A.super.go(); }   // resolve ambiguity
}
```

```text
   A.go()        B.go()
      \           /
       \         /
        C  --> must override, uses A.super.go()
```

## Key points

- `default` enables backward-compatible interface upgrades (e.g. `Collection.stream()`).
- `static` interface methods are not inherited and cannot be overridden.
- On a naming clash between two default methods, the class is forced to override (`Interface.super.method()` selects one).
- A class method always wins over an inherited default method.
- Since Java 9, interfaces may also declare `private` helper methods to share code among defaults.
