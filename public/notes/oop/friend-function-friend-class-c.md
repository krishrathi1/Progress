## Definition

A **friend** in C++ is a function or class that is granted access to the **private** and **protected** members of another class, even though it is not a member of that class. Friendship is a deliberate, controlled exception to encapsulation, declared with the `friend` keyword **inside** the class that grants the access.

- **Friend function** — a standalone (or another class's) function that can see private data.
- **Friend class** — an entire class whose members can all access the granting class's internals.

## Friend function example

```cpp
class Box {
    int width;                       // private
public:
    Box(int w) : width(w) {}
    // grant access to a non-member function
    friend int getWidth(const Box& b);
};

int getWidth(const Box& b) {         // NOT a member of Box
    return b.width;                  // yet can read private width
}
```

A classic use is **operator overloading** where the left operand isn't the class object, e.g. `friend ostream& operator<<(ostream&, const Box&)`.

## Friend class example

```cpp
class Engine {
    int rpm = 0;
    friend class Car;   // Car can touch Engine's privates
};

class Car {
    Engine e;
public:
    void rev() { e.rpm = 6000; }   // allowed via friendship
};
```

## Properties of friendship

```text
friend is:  NOT inherited   ->  Car's friend is not Truck's friend
            NOT mutual      ->  A friend of B  =/=  B friend of A
            NOT transitive  ->  friend of a friend is not a friend
```

| Property | Holds? |
|----------|:------:|
| Inherited by subclasses | No |
| Reciprocal / mutual | No |
| Transitive | No |
| Granted by the owning class | Yes (must be) |

## When to use

- Operator overloading (`<<`, `>>`, symmetric `operator+`).
- Two tightly-coupled classes that must cooperate (e.g. a container and its iterator).
- A helper/factory that needs internal access without a public getter.

## Key points

- `friend` breaks encapsulation **intentionally and locally** — use sparingly.
- The class **grants** friendship; a class cannot declare itself a friend of another.
- Not inherited, not mutual, not transitive.
- A friend function is defined **without** the `::` scope resolution and has no `this`.
- Java/C# have no `friend`; they approximate it with package-private access or nested classes.
