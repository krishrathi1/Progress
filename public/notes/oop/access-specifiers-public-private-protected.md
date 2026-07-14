## Definition

**Access specifiers** (access modifiers) control the **visibility** of class members (fields and methods) — deciding which code is allowed to read, write, or call them. They are the language-level mechanism that enforces **encapsulation** by hiding internal state and exposing a controlled interface.

## The three core specifiers

| Specifier | Same class | Derived class | Same package* | Anywhere |
|-----------|:---------:|:-------------:|:-------------:|:--------:|
| **private** | Yes | No | No | No |
| **protected** | Yes | Yes | Yes* | No |
| **public** | Yes | Yes | Yes | Yes |

\*Package-level access applies in Java; C++ has no package rule (only class/inheritance scope).

## Visualizing scope

```text
          +------------------------------+
          |         public               |  <- everyone
          |   +----------------------+    |
          |   |     protected        |    |  <- class + subclasses
          |   |   +--------------+    |    |
          |   |   |   private    |    |    |  <- only this class
          |   |   +--------------+    |    |
          |   +----------------------+    |
          +------------------------------+
```

## Example (C++)

```cpp
class Account {
private:
    double balance;          // hidden: only Account touches it
protected:
    void log(const char* m); // subclasses may reuse
public:
    void deposit(double a) {  // public interface
        if (a > 0) balance += a;
    }
    double getBalance() const { return balance; }
};
```

Outside code can call `deposit()` and `getBalance()` but can never corrupt `balance` directly — the invariant "balance changes only through validated methods" is enforced.

## Notes by language

- **C++**: default access is `private` for `class`, `public` for `struct`. Specifiers also govern inheritance mode (`public`/`protected`/`private` base).
- **Java**: adds a fourth level — **default (package-private)** when no keyword is written; `protected` is also visible within the same package.
- Best practice: keep fields **private**, expose behavior through **public** methods (getters/setters), use **protected** only for members a subclass genuinely needs.

## Key points

- Order of openness: `private` < `protected` < `public`.
- `private` = maximum encapsulation; prefer it for data.
- `protected` shares with subclasses without exposing to the world.
- `public` defines the class's contract/API.
- Access control is a **compile-time** check; it does not add runtime cost.
