## Definition

**Encapsulation** is the OOP principle of **bundling data (fields) and the methods that operate on that data into a single unit (a class)**, while **restricting direct access** to the internal state. It is also called **data hiding**.

The idea: expose a controlled public interface and keep the raw data private, so an object protects its own invariants.

## How it is achieved in Java

- Declare fields as `private`.
- Provide `public` **getter** and **setter** methods to read/modify them.
- Add validation inside setters to keep the object in a valid state.

```java
class Account {
    private double balance;      // hidden state

    public double getBalance() { // controlled read
        return balance;
    }

    public void deposit(double amt) {   // controlled write + validation
        if (amt > 0) balance += amt;
        else throw new IllegalArgumentException("Amount must be positive");
    }
}
```

Client code cannot do `account.balance = -5000;` — it must go through `deposit`, which enforces the rule.

## Access before vs after encapsulation

```text
Without encapsulation          With encapsulation
+------------------+           +---------------------------+
| balance (public) |           | balance (private)         |
|   anyone writes  |           |   |                       |
|   any value  X   |           |   v via deposit()/getX()  |
+------------------+           |   validated access  OK    |
                               +---------------------------+
```

## Benefits

| Benefit | Explanation |
|---------|-------------|
| Data hiding | Internal representation is not exposed |
| Control | Setters validate input, enforcing invariants |
| Flexibility | Internal fields can change without breaking callers |
| Maintainability | Bugs are localized behind the interface |
| Reusability | Well-defined, self-contained units |

## Encapsulation vs Abstraction (quick contrast)

- **Encapsulation** = *how* to hide → bundling + access modifiers (implementation-level).
- **Abstraction** = *what* to hide → showing only essential features (design-level).

## Key points

- Encapsulation binds data and methods together and hides internal state.
- Achieved via `private` fields plus `public` getters/setters.
- Setters can validate data, protecting the object's invariants.
- Improves maintainability, security, and flexibility.
- It is one of the four pillars of OOP (with abstraction, inheritance, polymorphism).
