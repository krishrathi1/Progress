## Definition

- A **class** is a blueprint / template that defines the **state** (fields) and **behavior** (methods) of a type of entity. It occupies no memory by itself.
- An **object** is a concrete **instance** of a class created at runtime with `new`. Each object has its own copy of the instance fields and lives on the heap.

## Anatomy of a class

```java
public class Car {
    // fields (state)
    String model;
    int speed;

    // constructor
    Car(String model) {
        this.model = model;
        this.speed = 0;
    }

    // methods (behavior)
    void accelerate(int delta) {
        speed += delta;
    }

    void show() {
        System.out.println(model + " @ " + speed + " km/h");
    }
}
```

## Creating and using objects

```java
public class Main {
    public static void main(String[] args) {
        Car c1 = new Car("Tesla");   // object 1
        Car c2 = new Car("BMW");     // object 2
        c1.accelerate(60);
        c1.show();   // Tesla @ 60 km/h
        c2.show();   // BMW @ 0 km/h
    }
}
```

## What `new` does

```text
Car c1 = new Car("Tesla");

 c1 (stack)                 Heap
 +--------+          +------------------+
 |  ref   | -------> | model = "Tesla"  |
 +--------+          | speed = 0        |
                     +------------------+

1. Allocate memory on the heap for the object
2. Run the constructor to initialize fields
3. Return the reference, stored in variable c1
```

## Class vs Object

| Class | Object |
|-------|--------|
| Blueprint / logical template | Real instance in memory |
| Declared once | Many can be created |
| No memory until instantiated | Occupies heap memory |
| Defines fields & methods | Holds actual field values |

## Key points

- A reference variable holds the **address** of the object, not the object itself; multiple references can point to the same object.
- Instance fields get default values (`0`, `false`, `null`) if not initialized; local variables do not.
- Objects with no live reference become eligible for **garbage collection**.
- One `.java` file can hold multiple classes but only one `public` class, whose name must match the file name.
