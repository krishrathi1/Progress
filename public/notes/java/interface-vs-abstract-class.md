## Definition

Both **abstract classes** and **interfaces** let you define a type that cannot be instantiated and that leaves some behavior to subclasses. They differ in purpose:

- **Abstract class** — a partially implemented base class expressing an **"is-a"** relationship with shared state and behavior.
- **Interface** — a pure contract expressing a **capability / "can-do"** role, implementable by unrelated classes.

## Comparison table

| Feature | Abstract class | Interface |
|---------|----------------|-----------|
| Keyword to use | `extends` | `implements` |
| Multiple inheritance | No (single superclass) | Yes (many interfaces) |
| Fields | any kind (instance, static, mutable) | only `public static final` constants |
| Method bodies | concrete + abstract methods | `default`/`static`/`private` (Java 8/9+) + abstract |
| Constructors | Yes | No |
| Instance state | Yes | No |
| Access modifiers on methods | any | effectively `public` (abstract/default) |
| Purpose | shared base ("is-a") | capability ("can-do") |

## Examples

```java
abstract class Animal {          // has state + partial behavior
    protected String name;
    Animal(String n) { name = n; }
    abstract String sound();     // subclass must define
    void breathe() { System.out.println(name + " breathes"); }
}

interface Swimmer {              // a capability
    void swim();
}

class Dog extends Animal implements Swimmer {
    Dog(String n) { super(n); }
    String sound() { return "Woof"; }
    public void swim() { System.out.println(name + " paddles"); }
}
```

```text
   Animal (abstract, is-a)        Swimmer (interface, can-do)
        |  extends                     |  implements
        +------------- Dog ------------+
```

## When to choose which

- Use an **abstract class** when subclasses share common state/code and form a tight hierarchy, or when you need constructors or non-public members.
- Use an **interface** when unrelated classes must share a capability, when you need multiple inheritance of type, or for lambda targets.
- Modern design often combines both: an interface for the contract plus an abstract skeletal class (e.g. `List` + `AbstractList`).

## Key points

- A class can extend **one** class but implement **many** interfaces.
- Since Java 8, interfaces can carry behavior via `default` methods, narrowing the gap — but they still cannot hold instance state.
- Interfaces cannot have constructors; abstract classes can.
- "Program to an interface" for flexibility; use abstract classes to avoid code duplication.
