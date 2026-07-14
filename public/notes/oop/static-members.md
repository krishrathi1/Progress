## Definition

A **static member** belongs to the **class itself** rather than to any individual object. All objects share a single copy. Static members exist even when zero objects have been created and are accessed through the class name.

There are two kinds:

- **Static data member (static field)** — one shared variable for the whole class (e.g. a counter, a shared config).
- **Static member function (static method)** — a method that operates without an object; it can access only other static members (it has **no `this`**).

## Instance vs Static

```text
            Object A          Object B          Object C
           +--------+        +--------+        +--------+
           | id = 1 |        | id = 2 |        | id = 3 |   <- instance (per object)
           +--------+        +--------+        +--------+
                \                |                /
                 \               |               /
                  +---------------------------------+
                  |   static count = 3  (ONE copy)  |   <- shared by class
                  +---------------------------------+
```

## Example (C++)

```cpp
class Widget {
    static int count;        // declaration (shared)
public:
    Widget()  { ++count; }
    ~Widget() { --count; }
    static int alive() { return count; }  // no 'this'
};
int Widget::count = 0;       // definition required outside class

// Widget::alive() called without any object
```

## Example (Java)

```java
class Counter {
    static int total = 0;    // shared across all instances
    Counter() { total++; }
    static int getTotal() { return total; }  // class method
}
// Counter.getTotal();  -> access via class name
```

## Instance member vs Static member

| Aspect | Instance member | Static member |
|--------|-----------------|---------------|
| Copies | One per object | One per class |
| Access | Through object | Through class name |
| `this` pointer | Available | Not available |
| Lifetime | With the object | Whole program |
| Use case | Per-object state | Shared state / utilities |

## Key points

- Shared across all objects — great for counters, caches, constants, factory/utility methods.
- Static methods **cannot** access instance (non-static) members directly, since there is no object.
- In C++ a non-`const`/non-`inline` static data member needs an out-of-class **definition**.
- Overusing static state creates hidden global coupling and hurts testability — use deliberately.
- `static final`/`static const` are the idiomatic way to declare class-level constants.
