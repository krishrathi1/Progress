## Definition

A **custom (user-defined) exception** is an exception class you write yourself by **extending** `Exception` (checked) or `RuntimeException` (unchecked). It lets you represent **domain-specific error conditions** with a meaningful type name and carry extra data relevant to your application.

## Why create one

- More **descriptive** than generic exceptions (`InsufficientBalanceException` vs `RuntimeException`).
- Lets callers catch **specific** error types.
- Can carry **custom fields** (error codes, offending values).

## Steps

```text
1. Choose base: extends Exception (checked) or RuntimeException (unchecked)
2. Add constructors — usually (String message) and (String, Throwable)
3. Call super(...) so message/cause propagate
4. throw new YourException(...) where the condition occurs
```

## Example: checked custom exception

```java
// 1. Define
class InsufficientBalanceException extends Exception {
    private final double shortfall;

    public InsufficientBalanceException(String msg, double shortfall) {
        super(msg);                 // pass message to Throwable
        this.shortfall = shortfall;
    }
    public double getShortfall() { return shortfall; }
}

// 2. Use
class Account {
    private double balance = 100;

    void withdraw(double amt) throws InsufficientBalanceException {
        if (amt > balance) {
            throw new InsufficientBalanceException(
                "Cannot withdraw " + amt, amt - balance);
        }
        balance -= amt;
    }
}

public class CustomExceptionDemo {
    public static void main(String[] args) {
        try {
            new Account().withdraw(150);
        } catch (InsufficientBalanceException e) {
            System.out.println(e.getMessage()
                + " | short by " + e.getShortfall());
        }
    }
}
```

Output:

```text
Cannot withdraw 150.0 | short by 50.0
```

## Checked vs unchecked custom exception

| Extend | Type | Caller must handle? | Use for |
|--------|------|---------------------|---------|
| `Exception` | Checked | Yes (catch/throws) | Recoverable business errors |
| `RuntimeException` | Unchecked | No | Programming/validation errors |

## Wrapping a cause (chained)

```java
public class ConfigException extends RuntimeException {
    public ConfigException(String msg, Throwable cause) {
        super(msg, cause);          // preserves original stack trace
    }
}
```

## Key points

- Extend `Exception` for **checked**, `RuntimeException` for **unchecked**.
- Always provide a `(String message)` constructor and ideally a `(String, Throwable)` one for chaining.
- Call `super(...)` so `getMessage()` / `getCause()` work correctly.
- Name classes ending in `Exception` and keep them meaningful to the domain.
