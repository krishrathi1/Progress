## Definition

- A **class** is a user-defined blueprint or template that groups related **data (fields/attributes)** and **behaviour (methods)** into a single unit. It defines *what* an object will look like but occupies no runtime data memory by itself.
- An **object** is a concrete **instance** of a class created at runtime. Each object gets its own copy of the instance fields and can invoke the class's methods.

Think of the class as the architectural drawing of a house and objects as the actual houses built from that drawing.

## Class vs Object

| Aspect | Class | Object |
|--------|-------|--------|
| Nature | Blueprint / logical template | Real instance in memory |
| Creation | Declared once with `class` | Created many times with `new` |
| Memory | No memory for instance data | Allocated on the heap |
| Example | `Car` | `myCar`, `yourCar` |

## Anatomy of a class

```java
class Car {
    // Fields (state)
    String model;
    int speed;

    // Constructor - initializes a new object
    Car(String model, int speed) {
        this.model = model;
        this.speed = speed;
    }

    // Method (behaviour)
    void accelerate(int delta) {
        speed += delta;
    }
}

public class Demo {
    public static void main(String[] args) {
        Car myCar = new Car("Tesla", 0); // object creation
        myCar.accelerate(30);
        System.out.println(myCar.model + " @ " + myCar.speed); // Tesla @ 30
    }
}
```

## How objects live in memory

```text
Stack                 Heap
+-----------+         +---------------------+
| myCar  o--+-------> | Car object          |
+-----------+         |  model = "Tesla"    |
 (reference)          |  speed = 30         |
                      +---------------------+
```

- `myCar` is a **reference** on the stack; the actual object lives on the **heap**.
- `new` allocates heap memory and runs the constructor.

## Key points

- A class defines structure + behaviour; an object is a runtime instance of it.
- Objects are created with the `new` keyword, which calls a constructor.
- Each object has independent copies of instance fields (state).
- A variable holding an object is a reference, not the object itself.
- Multiple objects can be built from one class, each with distinct state.
