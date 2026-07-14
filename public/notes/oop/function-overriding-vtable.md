## Definition

**Function overriding** is when a derived class provides its own implementation of a method already defined in its base class, using the **same signature**. When called through a base-class pointer/reference, the *derived* version runs. This **runtime (dynamic) polymorphism** is implemented by the compiler using a **vtable** (virtual method table).

```cpp
class Animal {
public:
    virtual void speak() const { std::cout << "..."; }  // virtual!
};
class Dog : public Animal {
public:
    void speak() const override { std::cout << "Woof"; }
};

Animal* a = new Dog();
a->speak();   // "Woof"  → resolved at runtime via vtable
```

## What is a vtable?

For every class with virtual functions the compiler builds a **static, per-class table of function pointers** — one slot per virtual function, pointing to the *most-derived* override. Every object of such a class stores a hidden pointer (`vptr`) to its class's vtable, set during construction.

A virtual call `a->speak()` becomes: **follow `a->vptr` → index the vtable slot for `speak` → call that pointer.** The target is unknown at compile time; this indirection is *dynamic dispatch*.

## Diagram

```text
 Dog object            Dog vtable
+----------+          +---------------------+
|  vptr    | ───────► | speak → Dog::speak  |
| ...data  |          +---------------------+
+----------+

 a->speak():
   1. read a->vptr        (points to Dog's vtable)
   2. load slot[speak]    (Dog::speak)
   3. call it             → "Woof"
```

## Overriding vs overloading

| Aspect | Overriding | Overloading |
|--------|-----------|-------------|
| Signature | Same | Different params |
| Classes | Base ↔ derived | Same scope |
| Binding | Runtime (vtable) | Compile-time |
| Keyword (C++) | `virtual` + `override` | none |

## Key points

- Override requires the base method to be `virtual`; signature (name, params, const-ness) must match.
- One `vptr` per object; one shared vtable per class → small constant overhead + one extra indirection per call.
- Use the `override` specifier (C++11) / `@Override` (Java) so the compiler catches signature mistakes.
- Declare base **destructors virtual**, or `delete base_ptr` skips the derived destructor (resource leak).
- In Java **all** non-static, non-final methods are virtual by default.
