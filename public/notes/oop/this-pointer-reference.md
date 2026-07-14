## Definition

`this` is an implicit reference to the **current object** — the specific instance on which a member function was invoked. Every non-static method receives it automatically, so the method knows *which* object's data it is working on.

- In **C++**, `this` is a **pointer** (`ClassName*`), so you dereference with `this->member` or `(*this)`.
- In **Java/C#**, `this` is a **reference**, used as `this.member`.
- Static methods have **no `this`** because they are not tied to any object.

## Why it exists

All objects of a class share one copy of the code. `this` is how a method distinguishes each object's own fields at runtime.

```text
obj1.setX(5)  --->  method body   this ---> obj1
obj2.setX(9)  --->  same code     this ---> obj2
```

## Common uses

**1. Disambiguate shadowed names** (parameter hides a field):

```cpp
class Point {
    int x, y;
public:
    Point(int x, int y) {
        this->x = x;   // this->x is the field, x is the parameter
        this->y = y;
    }
};
```

**2. Return the current object for method chaining** (fluent interface):

```cpp
class Builder {
    int a = 0, b = 0;
public:
    Builder& setA(int v) { a = v; return *this; }
    Builder& setB(int v) { b = v; return *this; }
};
// Builder().setA(1).setB(2);   // chaining works via *this
```

**3. Pass the current object** to another function, or compare identity.

## C++ pointer vs Java reference

| Aspect | C++ | Java |
|--------|-----|------|
| Type | Pointer `ClassName*` | Reference |
| Field access | `this->x` | `this.x` |
| Whole object | `*this` | `this` |
| Reassignable | No (const pointer) | No |
| In static method | Not available | Not available |

## Key points

- `this` identifies the object the method was called on.
- Most often needed to resolve name clashes between parameters and fields.
- Returning `*this` (C++) / `this` (Java) enables **method chaining**.
- Not available in static contexts.
- In C++ `this` is a `const` pointer — you can't make it point elsewhere.
