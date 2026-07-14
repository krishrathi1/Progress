## Definition

**Encapsulation** is the OOP principle of **bundling data (fields) and the methods that operate on that data into a single unit (a class)**, while **restricting direct access** to the internal state. It is often called **data hiding**: fields are made `private` and exposed only through controlled `public` getters and setters.

## How to achieve it in Java

1. Declare the instance fields `private`.
2. Provide `public` **getter** and **setter** methods to read/update them.
3. Add validation inside setters to keep the object in a valid state.

```java
public class BankAccount {
    private double balance;          // hidden state

    public double getBalance() {     // controlled read
        return balance;
    }

    public void deposit(double amt) {// controlled write + validation
        if (amt <= 0)
            throw new IllegalArgumentException("Amount must be positive");
        balance += amt;
    }
}
```

```text
   +---------------------------+
   |       BankAccount         |
   |  - balance : double       |  <- private (hidden)
   |---------------------------|
   |  + getBalance()           |  <- public interface
   |  + deposit(amt)           |
   +---------------------------+
        access only through methods
```

## Benefits

- **Data hiding / security** — internal state can't be corrupted from outside.
- **Validation** — setters enforce invariants (e.g. balance never set to garbage).
- **Flexibility / maintainability** — internal representation can change without affecting callers.
- **Loose coupling & control** — you can make a field read-only (getter only) or write-only.

## Encapsulation vs Abstraction

| | Encapsulation | Abstraction |
|--|---------------|-------------|
| Focus | *How* — hiding internal data | *What* — hiding complexity/implementation |
| Mechanism | access modifiers, getters/setters | abstract classes, interfaces |
| Goal | protect and control state | expose only essential behavior |

## Key points

- Achieved via `private` fields + `public` accessor methods.
- Enables validation, immutability, and read-only/write-only fields.
- A class with only `private` fields and `public` getters/setters is a **POJO/JavaBean**.
- Reduces coupling: callers depend on the public API, not internal fields.
- Different from inheritance/polymorphism — it is about *protecting* state, not sharing behavior.
