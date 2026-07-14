## Definition

A **dependency** is the weakest relationship between two classes: class *A* depends on class *B* if a change in *B* may force a change in *A*. It is a **uses-a** relationship — typically transient, existing only for the duration of a method call rather than being stored as a field.

Unlike association/aggregation/composition (which usually hold a reference as a member), a dependency is usually created when one class:

- Takes another class as a **method parameter**,
- Returns it as a **return type**, or
- Instantiates it as a **local variable** inside a method.

## Diagram

```text
   +--------+        uses         +----------+
   | Order  | - - - - - - - - - > | Printer  |
   +--------+   (dashed arrow)    +----------+

   UML: dashed line with an open arrowhead pointing to the used class.
```

## Example

```java
class Printer {
    void print(String text) { System.out.println(text); }
}

class Order {
    // Order DEPENDS ON Printer, but does not hold it as a field.
    void printReceipt(Printer printer) {   // uses-a via parameter
        printer.print("Receipt for order #123");
    }
}
```

Here `Order` needs `Printer` only while `printReceipt` runs. If `Printer.print`'s signature changes, `Order` must be updated — that is the dependency.

## Relationship strength

| Relationship | Strength | Held as field? | UML |
|--------------|----------|----------------|-----|
| Dependency (uses-a) | Weakest | No (transient) | Dashed arrow |
| Association | Weak | Usually | Solid line |
| Aggregation (weak has-a) | Medium | Yes (shared) | Hollow diamond |
| Composition (strong has-a) | Strongest | Yes (owned) | Filled diamond |

## Key points

- Dependency = **uses-a**; the weakest, most transient coupling.
- Commonly arises from method parameters, return types, or local instantiation.
- Reducing unnecessary dependencies lowers coupling and improves maintainability.
- **Dependency Injection** passes dependencies in from outside instead of hard-creating them, keeping classes loosely coupled and testable.
- UML: dashed line with an open arrowhead.
