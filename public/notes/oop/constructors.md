## Definition

A **constructor** is a special method used to **initialise a newly created object**. It runs automatically when an object is created with `new`. A constructor has the **same name as the class** and **no return type** (not even `void`).

Its job is to put the object into a valid initial state — assigning fields, allocating resources, or invoking the parent's constructor.

## Types of constructors

| Type | Description |
|------|-------------|
| **Default** | Compiler-supplied no-arg constructor when none is written; sets fields to defaults |
| **No-argument** | Explicitly written constructor taking no parameters |
| **Parameterized** | Takes arguments to initialise fields with caller-supplied values |
| **Copy** | Creates a new object by copying another (idiom in Java, built-in style in C++) |

## Example

```java
class Student {
    String name;
    int age;

    Student() {                     // no-arg constructor
        this("Unknown", 0);         // calls the parameterized one
    }
    Student(String name, int age) { // parameterized constructor
        this.name = name;           // 'this' disambiguates field vs param
        this.age = age;
    }
    Student(Student other) {        // copy constructor
        this(other.name, other.age);
    }
}

Student a = new Student("Ana", 20);
Student b = new Student(a);         // copy of a
```

## Constructor chaining

```text
new Student()               new Student("Ana",20)
      │ this("Unknown",0)          │
      ▼                            │  (implicit) super();
new Student(String,int) ──────────┘
      │
      ▼
   Object()   (top of hierarchy runs first)
```

- `this(...)` chains to another constructor in the **same class**.
- `super(...)` calls a **parent** constructor and must be the **first statement**; if omitted, the compiler inserts a no-arg `super()`.

## Key points

- Same name as the class, **no return type**, invoked automatically by `new`.
- If you write **any** constructor, the compiler no longer supplies the default no-arg one.
- Constructors can be **overloaded** (constructor overloading) but **cannot be** `final`, `static`, `abstract`, or inherited.
- Use `this()` for same-class chaining and `super()` for parent initialisation — each must be the first line.
- A `private` constructor prevents external instantiation (used in Singletons and factory patterns).
