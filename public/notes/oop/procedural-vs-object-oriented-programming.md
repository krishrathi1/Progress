## Definition

- **Procedural Programming (POP)** structures a program as a sequence of **procedures/functions** that operate on data. Data and functions are separate, and data often flows through the program as shared, global values (e.g. C, Pascal).
- **Object-Oriented Programming (OOP)** structures a program around **objects** that bundle data and the functions that act on it, communicating via method calls (e.g. Java, C++, Python).

## Key difference

In POP, the focus is on **"what steps to perform"** (top-down decomposition into functions). In OOP, the focus is on **"what things exist"** — modeling the domain as objects with responsibilities (bottom-up composition).

## Comparison

| Aspect | Procedural (POP) | Object-Oriented (OOP) |
|--------|------------------|------------------------|
| Basic unit | Function / procedure | Object (class instance) |
| Data & code | Separate | Bundled together |
| Data access | Often global, shared | Encapsulated, private by default |
| Approach | Top-down | Bottom-up |
| Reusability | Limited (copy functions) | High (inheritance, composition) |
| Security | Weaker — data exposed | Stronger — data hidden |
| Modeling real world | Harder | Natural |
| Examples | C, Pascal, FORTRAN | Java, C++, Python, C# |

## Same task, two styles

```java
// Procedural style: data + separate function
int balance = 100;
int deposit(int bal, int amt) { return bal + amt; }
// balance = deposit(balance, 50);  // data passed around

// OOP style: data + behavior together
class Account {
    private int balance = 100;        // encapsulated data
    void deposit(int amt) { balance += amt; }  // behavior owns data
    int getBalance() { return balance; }
}
```

## Structure diagram

```text
 PROCEDURAL                     OBJECT-ORIENTED
 ┌───────────┐                  ┌───────────────┐
 │  Global   │                  │   Object A    │
 │   Data    │◀── func1         │ data+methods  │──msg──▶┌───────────┐
 │           │◀── func2         └───────────────┘        │ Object B  │
 └───────────┘◀── func3          (data hidden inside)     └───────────┘
 functions share exposed data    objects talk via messages
```

## Key points

- POP = **functions + shared data**; OOP = **objects = data + behavior**.
- OOP adds **encapsulation, inheritance, polymorphism, abstraction** — POP has none of these built in.
- OOP scales better for **large, evolving** systems; POP can be simpler for small, linear scripts.
- OOP improves **data security** by hiding state; POP exposes data globally.
- Neither is universally "better" — choose based on problem size and domain complexity.
