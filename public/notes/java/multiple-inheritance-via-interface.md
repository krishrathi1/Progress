## Definition

**Multiple inheritance** means a type inheriting features from more than one parent. Java **does not allow** a class to `extends` more than one class — this avoids the classic **diamond problem** (ambiguity over which parent's state/method to inherit). Instead, Java supports **multiple inheritance of type** through **interfaces**: a class can `implements` any number of interfaces.

## Why classes can't, interfaces can

- A class carries **state** (instance fields) and constructors. Inheriting two classes could produce two conflicting copies of state — the diamond problem.
- A pre-Java-8 interface carried **no state and no method bodies**, so implementing many interfaces caused no ambiguity — the class supplies the single implementation.

```text
        A            B          <- two interfaces (contracts only)
         \          /
          \        /  implements
             Class C           <- C provides the one real implementation
```

## Example

```java
interface Flyer  { void fly(); }
interface Swimmer { void swim(); }

class Duck implements Flyer, Swimmer {   // multiple interfaces
    public void fly()  { System.out.println("Duck flies"); }
    public void swim() { System.out.println("Duck swims"); }
}

class Demo {
    public static void main(String[] a) {
        Duck d = new Duck();
        Flyer f = d;    // same object, viewed as Flyer
        Swimmer s = d;  // viewed as Swimmer
        f.fly(); s.swim();
    }
}
```

## The default-method diamond (Java 8+)

Since interfaces can now hold `default` methods, a limited diamond can occur. Java forces the class to resolve it explicitly:

```java
interface A { default void hi() { System.out.println("A"); } }
interface B { default void hi() { System.out.println("B"); } }

class C implements A, B {
    public void hi() { A.super.hi(); }   // must override; choose a parent
}
```

## Comparison

| | Class multiple inheritance | Interface multiple inheritance |
|--|----------------------------|-------------------------------|
| Allowed in Java | No | Yes |
| Inherits state | would (conflict) | No state |
| Diamond ambiguity | unresolved | resolved by class override |

## Key points

- Java forbids multiple **class** inheritance but allows multiple **interface** inheritance.
- This gives multiple inheritance of *type/behavior* without inheriting conflicting state.
- With Java 8 default methods, override manually and use `Interface.super.method()` to disambiguate.
- An interface itself can also `extends` several interfaces.
