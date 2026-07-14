## Definition

A **default method** is a method in an **interface** that has a body (a default implementation), declared with the `default` keyword. Introduced in **Java 8**, it lets you add new methods to an interface **without breaking** existing classes that already implement it.

```java
interface Vehicle {
    void start();                       // abstract

    default void honk() {               // default method
        System.out.println("Beep!");
    }
}

class Car implements Vehicle {
    public void start() { System.out.println("Car started"); }
    // honk() inherited automatically; may override if desired
}
```

## Why they were added

- Before Java 8, adding a method to an interface forced **every** implementing class to define it — a backward-compatibility nightmare.
- The Collections framework used them to add `forEach`, `stream`, `removeIf`, etc. to `Iterable`/`Collection` without rewriting all existing code.

## The diamond problem

If a class inherits **two** default methods with the same signature, the compiler forces you to resolve the conflict explicitly using `Interface.super.method()`.

```java
interface A { default void hi() { System.out.println("A"); } }
interface B { default void hi() { System.out.println("B"); } }

class C implements A, B {
    public void hi() {            // must override to resolve
        A.super.hi();             // pick A's version
    }
}
```

```text
   A.hi()      B.hi()
      \          /
       \        /
          C  --> ambiguous unless overridden
```

## Rules to remember

| Situation | Resolution |
|-----------|-----------|
| Class method vs interface default | **Class wins** (class > interface) |
| Two conflicting defaults | Must override, use `X.super.m()` |
| Sub-interface vs super-interface default | **More specific** interface wins |

## Default vs static interface methods

- **default** — instance method, inherited, overridable.
- **static** — belongs to the interface itself, called as `Interface.method()`, not inherited.

## Key points

- Declared with `default`; must have a body.
- Enable **interface evolution** without breaking implementors.
- Class implementations always take precedence over default methods.
- Diamond conflicts must be resolved manually with `Interface.super.method()`.
- Do not confuse with `static` interface methods, which are not inherited.
