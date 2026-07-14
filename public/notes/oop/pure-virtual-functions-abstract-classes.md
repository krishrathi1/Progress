## Definition

A **pure virtual function** is a virtual function declared with `= 0` that provides no implementation in the base class and **must** be overridden by any concrete derived class. A class that contains at least one pure virtual function becomes an **abstract class** — you cannot instantiate it directly; it exists only to define an interface/contract for its subclasses.

```cpp
class Shape {                 // abstract base class
public:
    virtual double area() const = 0;   // pure virtual
    virtual void draw() const = 0;      // pure virtual
    virtual ~Shape() = default;         // virtual destructor
};
```

## How it works

- `= 0` marks the function as having no body in the base (a *placeholder*).
- The compiler blocks `Shape s;` — abstract classes have no complete object layout.
- A derived class becomes concrete **only** when it overrides *every* inherited pure virtual function; otherwise it stays abstract too.
- You still use the base type through **pointers/references** for polymorphism.

```cpp
class Circle : public Shape {
    double r;
public:
    Circle(double r) : r(r) {}
    double area() const override { return 3.14159 * r * r; }
    void draw()  const override { /* render circle */ }
};

Shape* s = new Circle(2.0);   // OK: pointer to abstract base
std::cout << s->area();       // 12.566  (dynamic dispatch)
```

## Diagram

```text
        Shape (abstract)
      area()=0  draw()=0
       /            \
   Circle          Square
 (concrete)       (concrete)
  overrides all   overrides all
  pure virtuals   pure virtuals
```

## Abstract class vs interface

| Aspect | Abstract class (C++) | Pure interface |
|--------|----------------------|----------------|
| Data members | Allowed | Usually none |
| Concrete methods | Allowed | None (all pure) |
| Instantiable | No | No |
| Purpose | Partial impl + contract | Pure contract |

An abstract class with **only** pure virtual functions and no data effectively acts as an interface.

## Key points

- Syntax: `virtual T f() = 0;`. One pure virtual makes the whole class abstract.
- Cannot instantiate an abstract class; can use its pointers/references.
- A derived class stays abstract until it overrides all pure virtuals.
- Always declare a **virtual destructor** in an abstract base for safe polymorphic deletion.
- A pure virtual function *can* have a body, but it must be called explicitly (`Shape::area()`); it is still pure.
