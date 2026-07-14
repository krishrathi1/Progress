## Definition

`this` is a **reference to the current object** — the instance whose method or constructor is executing. It lets an object refer to itself, resolve naming conflicts, and pass itself around.

## Uses of `this`

| Use | Purpose |
|-----|---------|
| `this.field` | Distinguish an instance field from a parameter with the same name |
| `this(...)` | Call another constructor of the same class (constructor chaining) |
| `this.method()` | Call another instance method (usually optional) |
| `return this` | Return the current object (enables method chaining / builders) |
| `pass this` | Pass the current object as an argument to another method |

## Example

```java
class Account {
    private String owner;
    private double balance;

    Account(String owner) {
        this(owner, 0.0);          // constructor chaining
    }

    Account(String owner, double balance) {
        this.owner = owner;        // this.field vs parameter
        this.balance = balance;
    }

    Account deposit(double amt) {
        this.balance += amt;
        return this;               // fluent chaining
    }

    void print() {
        System.out.println(owner + ": " + balance);
    }
}

public class Main {
    public static void main(String[] args) {
        new Account("Ravi")
            .deposit(100)
            .deposit(50)           // chained calls
            .print();              // Ravi: 150.0
    }
}
```

## What `this` points to

```text
Account acc = new Account("Ravi");
       |
       v
  +------------------+
  | owner  = "Ravi"  |  <-- 'this' inside acc's methods
  | balance = 0.0    |      refers to THIS object
  +------------------+
```

## Key points

- `this` refers to the **current instance**; it is available only in **instance** context, **not** in `static` methods (there is no current object).
- The most common use is `this.field = field` to resolve shadowing between a field and a parameter.
- `this(...)` performs constructor chaining and must be the **first** statement in a constructor.
- `return this` powers **fluent/builder** APIs.
- You cannot reassign `this` — it is effectively final.
