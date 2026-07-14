## Definition

**Real-world modeling** is the core idea behind object-oriented programming: we map entities from a problem domain (a bank account, a student, a car) onto software **objects**. Each object bundles the **state** (data) and **behaviour** (operations) that the real entity naturally has.

- **State** answers *"what does it know?"* → fields/attributes.
- **Behaviour** answers *"what can it do?"* → methods.
- **Identity** answers *"which one is it?"* → each object is distinct even if its state matches another.

## From real world to code

```text
Real-world entity: A Student
   Attributes -> name, rollNo, marks   (STATE)
   Actions    -> study(), takeExam()    (BEHAVIOUR)
   Identity   -> "this specific student"

              maps to

class Student {
   String name; int rollNo; int marks;   // state
   void study() { ... }                   // behaviour
}
```

## Example

```java
class BankAccount {
    private String owner;
    private double balance;   // state

    BankAccount(String owner, double opening) {
        this.owner = owner;
        this.balance = opening;
    }

    void deposit(double amt) { balance += amt; }   // behaviour
    void withdraw(double amt) {
        if (amt <= balance) balance -= amt;
    }
    double getBalance() { return balance; }
}

// Two distinct real-world accounts -> two objects
BankAccount a = new BankAccount("Asha", 1000);
BankAccount b = new BankAccount("Ravi", 500);
a.deposit(250);   // only Asha's balance changes
```

## Why model this way

| Benefit | Explanation |
|---------|-------------|
| Intuitive | Code mirrors how we think about the domain |
| Modular | Each entity is a self-contained unit |
| Reusable | Classes can be instantiated many times |
| Maintainable | Changes to an entity stay localized |

## Identifying objects in a problem

- **Nouns** in the requirement usually become **classes/objects** (Order, Customer, Product).
- **Verbs** usually become **methods** (placeOrder, cancel).
- **Adjectives / data** become **fields** (price, quantity).

## Key points

- OOP models software after real-world entities, uniting data and behaviour.
- Every object has state, behaviour, and a unique identity.
- Nouns → classes, verbs → methods, data → fields is a useful mapping heuristic.
- Two objects can share identical state yet remain independent instances.
- Good modeling makes code intuitive, modular, and maintainable.
