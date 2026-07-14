## Definition

**Message passing** is the mechanism by which objects communicate in OOP. Instead of directly manipulating another object's data, one object sends a **message** to another asking it to perform an operation. In most languages a message is simply a **method call** on an object.

A message has three parts:

1. **Receiver** – the object the message is sent to.
2. **Method (selector)** – the operation requested.
3. **Arguments** – any data the method needs.

```text
   sender                      receiver
  +--------+   message call   +----------+
  | Order  |----------------->| Account  |
  +--------+  debit(amount)   +----------+
              (name + args)   performs work,
                              may return a value
```

## Example

```java
class Printer {
    void print(String doc) {
        System.out.println("Printing: " + doc);
    }
}

class Office {
    void work(Printer p) {
        // Office sends the "print" message to the Printer object
        p.print("Report.pdf");     // receiver=p, method=print, arg="Report.pdf"
    }
}
```

Here `Office` does not know *how* printing works; it only sends a request. The `Printer` decides how to fulfil it. This decoupling is the whole point.

## Why it matters

| Property | Benefit |
|----------|---------|
| Encapsulation | Callers use behaviour, not internal data |
| Loose coupling | Sender depends on the *interface*, not implementation |
| Polymorphism | Same message, different responses by receiver type |
| Flexibility | Receivers can change internally without breaking senders |

## Message passing enables polymorphism

```java
Shape s = new Circle();
s.draw();   // the SAME message "draw()" ...
s = new Square();
s.draw();   // ... produces different behaviour based on the receiver
```

The runtime dispatches the message to the actual object's method — this is **dynamic dispatch**.

## Key points

- Objects interact by sending messages (method calls), not by touching each other's data.
- A message = receiver + method name + arguments.
- It reinforces encapsulation and loose coupling.
- The receiver decides how to respond, enabling polymorphism via dynamic dispatch.
- Senders depend on an object's interface, not its internal implementation.
