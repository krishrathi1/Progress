## Definition

**Structural patterns** describe how classes and objects are **composed** to form larger structures while keeping them flexible and efficient. They focus on relationships between entities. Three key ones are **Adapter**, **Decorator**, and **Proxy**.

## Adapter

Converts the interface of a class into another interface the client expects — lets **incompatible** interfaces work together (like a plug adapter).

```java
interface MediaPlayer { void play(String file); }
class Mp4Player { void playMp4(String f) { System.out.println("MP4: " + f); } }

class Mp4Adapter implements MediaPlayer {   // wraps the incompatible class
    private final Mp4Player mp4 = new Mp4Player();
    public void play(String file) { mp4.playMp4(file); }
}
```

## Decorator

Attaches **additional responsibilities** to an object dynamically, without changing its class or affecting other instances. A flexible alternative to subclassing.

```java
interface Coffee { double cost(); }
class Espresso implements Coffee { public double cost() { return 2.0; } }

abstract class CoffeeDecorator implements Coffee {
    protected final Coffee inner;
    CoffeeDecorator(Coffee c) { this.inner = c; }
}
class Milk extends CoffeeDecorator {
    Milk(Coffee c) { super(c); }
    public double cost() { return inner.cost() + 0.5; }   // adds behavior
}
// Coffee c = new Milk(new Milk(new Espresso())); // 3.0
```

## Proxy

Provides a **surrogate/placeholder** for another object to control access to it — e.g. lazy loading, access control, logging, remote calls.

```java
interface Image { void display(); }
class RealImage implements Image {
    RealImage(String f) { System.out.println("Loading " + f); } // heavy
    public void display() { System.out.println("Display"); }
}
class ProxyImage implements Image {
    private RealImage real; private final String file;
    ProxyImage(String f) { this.file = f; }
    public void display() {                     // lazy creation
        if (real == null) real = new RealImage(file);
        real.display();
    }
}
```

## Comparison

| Pattern | Intent | Same interface as wrapped? |
|---------|--------|----------------------------|
| **Adapter** | Make incompatible interfaces work together | No — changes the interface |
| **Decorator** | Add responsibilities dynamically | Yes — enhances behavior |
| **Proxy** | Control access to an object | Yes — same interface, controls access |

```text
Client → [Wrapper] → RealObject
Adapter  : changes the interface
Decorator: adds behavior, keeps interface
Proxy    : gates/defers access, keeps interface
```

## Key points

- All three **wrap** an object, but for different reasons.
- **Adapter** changes an interface; **Decorator** adds behavior; **Proxy** controls access.
- Decorator vs Proxy: same interface — decorator *enhances*, proxy *controls/defers*.
- Favor composition over inheritance — the shared theme of structural patterns.
