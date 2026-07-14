## Definition

An **anonymous inner class** is a class **without a name** that is declared and instantiated in a single expression. It is used to create a one-time implementation of an **interface** or a **subclass** of an existing class, usually where you need a short, throwaway object.

Syntax:

```java
Type ref = new Type() {
    // override / implement methods here
};
```

Here `Type` can be an interface or a class. `new Type() { ... }` simultaneously **declares** an unnamed subclass/implementor and **creates** an instance of it.

## How it works

```text
Runnable r = new Runnable() {   ← compiler generates Outer$1
    public void run() { ... }        implements Runnable
};                                ← instance created immediately
```

The compiler generates a hidden class named like `Outer$1`. There is no way to write a constructor (the class has no name), so initialization uses instance initializer blocks.

## Code example

```java
interface Greeting { void greet(String name); }

public class Demo {
    public static void main(String[] args) {
        // 1. Implement an interface anonymously
        Greeting g = new Greeting() {
            @Override
            public void greet(String name) {
                System.out.println("Hello, " + name);
            }
        };
        g.greet("Krish");

        // 2. Subclass a class anonymously
        Thread t = new Thread() {
            @Override
            public void run() { System.out.println("Running"); }
        };
        t.start();

        // 3. As a callback argument
        new Thread(new Runnable() {
            public void run() { System.out.println("Task"); }
        }).start();
    }
}
```

## Anonymous class vs Lambda

| Aspect | Anonymous class | Lambda |
|--------|-----------------|--------|
| Targets | Interface OR class | Functional interface only |
| Methods | Can override multiple | Exactly one abstract method |
| `this` | Refers to the anonymous object | Refers to enclosing instance |
| Fields | Can declare fields | Cannot declare fields |

## Key points

- Can implement an interface **or** extend a class — but not both, and not multiple interfaces.
- Cannot have explicit constructors (no name); use instance initializer blocks instead.
- Captures only **effectively final** local variables from the enclosing scope.
- For a single-method (functional) interface, a **lambda** is shorter and preferred since Java 8.
- Inside the anonymous class, `this` refers to the anonymous instance, not the outer object.
