## Definition

A **variable** is a named container that holds a value of a specific type. **Scope** is the region of code where a variable is accessible, and **lifetime** is how long it exists in memory. Java has three main variable kinds based on where they are declared: **local**, **instance**, and **static (class)** variables.

## Types of variables

| Kind | Declared | Scope | Lifetime | Default |
|------|----------|-------|----------|---------|
| **Local** | Inside a method/block | That block only | Until block ends | None (must init) |
| **Instance** | In class, outside methods | Whole object | Until object GC'd | Type default (0/null) |
| **Static** | With `static` in class | Whole class | Program lifetime | Type default |

```java
class Counter {
    static int total = 0;   // static: shared by all objects
    int id;                 // instance: one per object

    void set() {
        int temp = 10;      // local: exists only here
        id = temp;
        total++;
    }
}   // temp is destroyed when set() returns
```

## Scope visualization

```text
class Scope {
    int instanceVar;         // visible to all methods
    void m() {
        int localVar;        // visible only inside m()
        if (true) {
            int blockVar;    // visible only inside this if-block
        }
        // blockVar NOT accessible here
    }
}
```

## Rules

- **Local variables** must be initialized before use — no default value.
- **Instance variables** get default values (`0`, `false`, `null`) automatically.
- A variable declared in an inner block **shadows** an outer variable of the same name.
- **Static** variables are shared across all instances and accessed via `ClassName.var`.
- Scope is **block-based**: `{ }` defines a boundary.

## Key points

- Three variable kinds: **local**, **instance**, **static**.
- Local variables live on the **stack**; instance variables live in the **heap** with the object.
- Local variables have **no default value** — using one uninitialized is a compile error.
- Narrower scope = safer, more readable code; declare variables as late/local as possible.
- Static variables belong to the **class**, not any single object.
