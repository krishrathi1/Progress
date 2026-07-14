## Definition

A **constructor** is a special method that is called automatically when an object is created with `new`. Its job is to **initialize** the object's state. It has the **same name as the class** and **no return type** (not even `void`).

## Key rules

- Same name as the class, no return type.
- Invoked automatically at object creation time.
- If you write **no constructor**, the compiler inserts a **default (no-arg) constructor** that sets fields to their defaults (`0`, `null`, `false`).
- Once you declare **any** constructor, the default one is **no longer** provided automatically.
- Constructors can be overloaded and can use `this()` / `super()` to chain.

## Types of constructors

| Type | Description | Example |
|------|-------------|---------|
| Default | Compiler-generated, no args | `Box()` |
| No-argument | You write it, takes no args | `Box() { ... }` |
| Parameterized | Takes arguments to set fields | `Box(int w)` |
| Copy | Builds a new object from another | `Box(Box other)` |

## Example

```java
class Student {
    String name;
    int age;

    // No-arg constructor chaining to parameterized one
    Student() {
        this("Unknown", 0);   // this() must be first statement
    }

    // Parameterized constructor
    Student(String name, int age) {
        this.name = name;      // 'this' distinguishes field from param
        this.age = age;
    }

    // Copy constructor
    Student(Student s) {
        this(s.name, s.age);
    }
}

public class Main {
    public static void main(String[] args) {
        Student a = new Student("Asha", 20);
        Student b = new Student(a);          // copy
        System.out.println(b.name + " " + b.age); // Asha 20
    }
}
```

## Object creation flow

```text
new Student("Asha",20)
      |
      v
1. Memory allocated on heap (fields = defaults)
2. super() runs (Object constructor)
3. Instance initializers / field initializers run
4. Constructor body executes -> fields set
5. Reference returned to variable
```

## Key points

- No return type; same name as class.
- `this(...)` calls another constructor in the **same** class; `super(...)` calls the parent's — either, if present, must be the **first** statement.
- Declaring any constructor removes the free default constructor.
- Constructors are **not inherited**, but a subclass constructor implicitly calls `super()`.
- A `private` constructor prevents external instantiation (used in Singletons and factory patterns).
