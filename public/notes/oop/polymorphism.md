## Definition
**Polymorphism** = "many forms": the same interface/call behaves differently depending on the underlying object or arguments.

## Two kinds

### 1. Compile-time (static) — Method Overloading
Same method name, different parameter lists. Resolved by the compiler.
~~~java
int add(int a, int b)          { return a + b; }
double add(double a, double b) { return a + b; }
int add(int a, int b, int c)   { return a + b + c; }
~~~

### 2. Run-time (dynamic) — Method Overriding
A subclass redefines a superclass method; the **actual object** decides which runs (dynamic dispatch via the vtable).
~~~java
class Animal { void sound() { System.out.println("..."); } }
class Dog extends Animal { void sound() { System.out.println("Woof"); } }
class Cat extends Animal { void sound() { System.out.println("Meow"); } }

Animal a = new Dog();
a.sound();   // "Woof"  — decided at runtime
~~~

## Overloading vs Overriding

| | Overloading | Overriding |
|---|---|---|
| Bound at | Compile time | Run time |
| Signature | Must differ | Must match |
| Inheritance | Not required | Required |

## Why it matters
Lets you write code against a **base type** (Animal) and plug in new subclasses without changing the caller — the heart of the Open/Closed Principle.
