## Definition

The **`super`** keyword is a reference variable used inside a subclass to refer to its **immediate parent class**. It lets you access the parent's members even when the child has overridden or hidden them.

## Three uses of `super`

| Usage | Syntax | Purpose |
|-------|--------|---------|
| Parent field | `super.field` | Access a hidden parent variable |
| Parent method | `super.method()` | Call the overridden parent method |
| Parent constructor | `super(args)` | Invoke a parent constructor |

## 1. Accessing parent field and method

```java
class Animal {
    String type = "Animal";
    void sound() { System.out.println("Some sound"); }
}
class Dog extends Animal {
    String type = "Dog";                 // hides parent field
    void sound() {
        super.sound();                   // calls Animal.sound()
        System.out.println("Bark");
        System.out.println(super.type);  // prints "Animal"
        System.out.println(this.type);   // prints "Dog"
    }
}
```

## 2. Calling the parent constructor

`super(...)` must be the **first statement** in the child constructor. If omitted, the compiler inserts a no-arg `super()` automatically.

```java
class Person {
    String name;
    Person(String name) { this.name = name; }
}
class Student extends Person {
    int roll;
    Student(String name, int roll) {
        super(name);      // must be first statement
        this.roll = roll;
    }
}
```

## Constructor chaining flow

```text
new Student("Amit", 5)
   -> Student(String,int)
        -> super(name)  -> Person(String)
                              -> Object()
   -> back to Student body (this.roll = roll)
```

## Key points

- `super()` always runs the parent constructor **before** the child's body executes.
- `super(...)` and `this(...)` cannot both appear in one constructor (each must be first).
- `super` cannot be used in a `static` context — it needs an instance.
- Use `super.method()` to reuse and extend parent behavior instead of fully replacing it.
- If the parent has no no-arg constructor, the child **must** call an explicit `super(args)`.
