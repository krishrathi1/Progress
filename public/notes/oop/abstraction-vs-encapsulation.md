## Definition

Both are core OOP pillars concerned with **hiding**, but they hide different things at different levels:

- **Abstraction** hides **complexity** — it exposes only the essential *what* and hides the *how*. It is a **design-level** concern.
- **Encapsulation** hides **data** — it bundles fields and methods together and restricts direct access. It is an **implementation-level** concern.

A common one-liner: *Abstraction solves the problem at the design level; encapsulation solves it at the implementation level.*

## Side-by-side comparison

| Aspect | Abstraction | Encapsulation |
|--------|-------------|---------------|
| Hides | Implementation complexity (how) | Internal data/state |
| Level | Design | Implementation |
| Focus | *What* an object does | *How* access is controlled |
| Achieved via | Abstract classes, interfaces | `private` fields + getters/setters |
| Purpose | Reduce complexity, expose essentials | Protect data, enforce invariants |
| Analogy | Car's controls vs engine internals | Locked capsule with a controlled door |

## They work together

```text
        Abstraction (WHAT)                 Encapsulation (HOW hidden)
   +---------------------------+      +----------------------------+
   | interface Payment {       |      | class UpiPayment {         |
   |    void pay(double a);    |      |   private String pin;      |
   | }                         |      |   public void pay(double a)|
   |  (exposes only intent)    |      |   { validate(pin); ... }   |
   +---------------------------+      |  (hides + protects data)   |
                                      +----------------------------+
```

## Code showing both

```java
interface Account {              // ABSTRACTION: contract only
    void withdraw(double amt);
}

class SavingsAccount implements Account {
    private double balance;      // ENCAPSULATION: hidden data

    public void withdraw(double amt) {   // controlled, validated access
        if (amt > 0 && amt <= balance) balance -= amt;
    }
}
```

- The `Account` interface gives an **abstract** view (callers see only `withdraw`).
- The `private balance` and validation provide **encapsulation**.

## Key points

- Abstraction hides complexity; encapsulation hides data.
- Abstraction is design-level ("what"); encapsulation is implementation-level ("how it's protected").
- Abstraction uses interfaces/abstract classes; encapsulation uses access modifiers + accessors.
- They are complementary, not competing — well-designed classes use both.
- Both reduce the impact of change on client code.
