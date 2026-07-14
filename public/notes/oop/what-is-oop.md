## Definition

**Object-Oriented Programming (OOP)** is a programming paradigm that organizes software around **objects** — self-contained units that bundle **data (state / fields)** together with the **behavior (methods)** that operates on that data. Instead of writing programs as a sequence of functions acting on shared data, you model the problem as a set of interacting objects, each created from a blueprint called a **class**.

## Core building blocks

- **Class** — a blueprint/template defining the fields and methods an object will have.
- **Object** — a concrete instance of a class, holding its own state in memory.
- **Method** — a function defined inside a class that acts on the object's data.
- **Message** — one object invoking another object's method to request behavior.

## The four pillars

| Pillar | Idea |
|--------|------|
| **Encapsulation** | Bundle data + methods; hide internal state behind a public interface |
| **Abstraction** | Expose only essential features, hide implementation detail |
| **Inheritance** | A class reuses/extends the fields and behavior of another class |
| **Polymorphism** | One interface, many forms — the same call behaves per object type |

## Simple example

```java
class Car {                 // class = blueprint
    private int speed = 0;   // state (encapsulated)

    void accelerate(int by) { // behavior
        speed += by;
    }
    int getSpeed() { return speed; }
}

public class Main {
    public static void main(String[] args) {
        Car c = new Car();   // object = instance
        c.accelerate(30);    // sending a message
        System.out.println(c.getSpeed()); // 30
    }
}
```

## Mental model

```text
        Class: Car (blueprint)
                 │  new
       ┌─────────┼─────────┐
     Object    Object    Object
   speed=30   speed=0   speed=55
   (each has its own state, shares behavior)
```

## Key points

- OOP models software as **objects = state + behavior**, mirroring real-world entities.
- A **class** is the template; an **object** is a live instance of it.
- Built on four pillars: **encapsulation, abstraction, inheritance, polymorphism**.
- Encourages **modularity, reusability, and maintainability** in large programs.
- Popular OOP languages: Java, C++, C#, Python, Kotlin.
