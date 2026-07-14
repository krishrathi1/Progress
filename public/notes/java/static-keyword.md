## Definition

`static` marks a member as belonging to the **class itself** rather than to any individual object. Static members are shared across **all** instances and exist even before any object is created.

## What can be static

| Member | Meaning |
|--------|---------|
| Static variable | One shared copy for the whole class (class variable) |
| Static method | Called on the class; cannot use `this` or instance members directly |
| Static block | Runs once when the class is loaded, to initialize static data |
| Static nested class | A nested class that does not need an outer instance |

## Example

```java
class Counter {
    static int count = 0;      // shared across all objects
    int id;

    static { System.out.println("Class loaded"); } // static block

    Counter() {
        count++;               // affects the single shared copy
        id = count;
    }

    static int total() {       // static method
        return count;          // may use static fields only
    }
}

public class Main {
    public static void main(String[] args) {
        new Counter();
        new Counter();
        Counter c = new Counter();
        System.out.println(c.id);            // 3
        System.out.println(Counter.total()); // 3  (via class name)
    }
}
```

## Memory view

```text
Class area (metaspace)          Heap
+-------------------+       +-----------+ +-----------+ +-----------+
| Counter.count = 3 | <---- |  id = 1   | |  id = 2   | |  id = 3   |
+-------------------+       +-----------+ +-----------+ +-----------+
   one shared copy            obj1          obj2          obj3
```

## Instance vs static

| Aspect | Instance member | Static member |
|--------|-----------------|---------------|
| Belongs to | Each object | The class |
| Copies | One per object | Exactly one |
| Access | `obj.member` | `ClassName.member` |
| `this` | Available | Not available |
| Lifetime | While object lives | While class is loaded |

## Key points

- One shared copy per class — ideal for counters, constants, and utility methods.
- Static methods **cannot** access instance fields/methods or use `this` directly.
- `static final` fields are **constants** (e.g., `Math.PI`).
- Static blocks run **once** at class-load time, in top-to-bottom order.
- `main` is `static` so the JVM can call it without creating an object.
