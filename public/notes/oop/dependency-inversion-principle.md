## Definition

The **Dependency Inversion Principle (DIP)** — the **D** in SOLID — states:

1. **High-level modules should not depend on low-level modules. Both should depend on abstractions.**
2. **Abstractions should not depend on details. Details should depend on abstractions.**

In short: depend on **interfaces**, not concrete classes.

## Why It Matters

- Decouples policy (business logic) from implementation details (DB, email, APIs).
- Makes swapping implementations trivial and enables easy mocking in tests.
- Foundation of **Dependency Injection (DI)** and IoC containers (e.g., Spring).

## Violation Example

```java
// BAD: high-level Notifier depends on a concrete low-level class
class EmailService {
    void sendEmail(String msg) { /* ... */ }
}

class Notifier {
    private EmailService email = new EmailService(); // tight coupling
    void notifyUser(String msg) { email.sendEmail(msg); }
}
// Cannot switch to SMS without editing Notifier.
```

## DIP-Compliant Fix

```java
interface MessageService { void send(String msg); }   // abstraction

class EmailService implements MessageService {
    public void send(String msg) { /* email */ }
}
class SmsService implements MessageService {
    public void send(String msg) { /* sms */ }
}

class Notifier {
    private final MessageService service;             // depends on abstraction
    Notifier(MessageService service) { this.service = service; } // injected
    void notifyUser(String msg) { service.send(msg); }
}

// Usage: new Notifier(new SmsService());  — swap freely, easy to test
```

## Dependency Direction

```text
 Without DIP:  Notifier ───▶ EmailService        (high depends on low)

 With DIP:     Notifier ───▶ MessageService ◀─── EmailService
                            (abstraction)         SmsService
               both high-level & low-level depend on the abstraction
```

## Key points

- **Depend on abstractions, not concretions.**
- Enabled by **Dependency Injection** (constructor/setter/interface injection).
- Inverts the traditional dependency flow so details plug into policy.
- Improves testability (inject mocks) and flexibility (swap implementations).
- DIP is about *inverting direction*; DI/IoC are the *techniques* that achieve it.
