## Definition

A **virtual function** is a member function declared in a base class with the `virtual` keyword and **overridden** in derived classes. It enables **runtime (dynamic) polymorphism**: when called through a base-class pointer or reference, the **actual object's** version runs — decided at run time, not compile time.

## The problem it solves

Without `virtual`, the call is bound to the **static (declared) type** of the pointer, so the base version always runs. With `virtual`, binding is **dynamic** — resolved from the object's real type.

```cpp
class Shape {
public:
    virtual double area() const { return 0; }   // virtual
    virtual ~Shape() {}                          // virtual dtor!
};
class Circle : public Shape {
    double r;
public:
    Circle(double r) : r(r) {}
    double area() const override { return 3.14159 * r * r; }
};

Shape* s = new Circle(2.0);
s->area();      // calls Circle::area()  -> 12.566  (dynamic dispatch)
```

If `area()` were **not** virtual, `s->area()` would call `Shape::area()` and return 0.

## How it works — the vtable

Each class with virtual functions has a **vtable** (array of function pointers). Every object holds a hidden **vptr** pointing to its class's vtable. A virtual call is one extra indirection through that table.

```text
   Circle object                vtable (Circle)
  +-------------+              +------------------+
  | vptr  ------+------------->| area -> Circle   |
  | r = 2.0     |              | ~Shape -> Circle |
  +-------------+              +------------------+
```

## Static vs Dynamic binding

| Aspect | Non-virtual (static) | Virtual (dynamic) |
|--------|----------------------|-------------------|
| Bound at | Compile time | Run time |
| Uses | Declared type | Actual object type |
| Mechanism | Direct call | vtable / vptr |
| Cost | None | One indirection |

## Pure virtual & abstract classes

`virtual double area() const = 0;` makes a **pure virtual function**; the class becomes **abstract** (cannot be instantiated) and forces derived classes to implement it — defining an interface/contract.

## Key points

- `virtual` = enables run-time dispatch to the most-derived override.
- Always declare a **virtual destructor** in a polymorphic base to avoid partial destruction / leaks.
- Implemented via **vtable + vptr**; small time/space overhead.
- Use `override` (C++11) to catch signature mismatches at compile time.
- Pure virtual (`= 0`) creates abstract base classes / interfaces.
- In Java, methods are virtual **by default** (use `final` to prevent overriding).
