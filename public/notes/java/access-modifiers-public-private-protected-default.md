## Definition

**Access modifiers** control the **visibility** (accessibility) of classes, fields, methods, and constructors. Java has four levels: `public`, `protected`, *default* (no keyword, also called package-private), and `private`. They are the primary tool for **encapsulation** — exposing only what is necessary.

## Visibility matrix

| Modifier | Same class | Same package | Subclass (other package) | Anywhere |
|----------|:----------:|:------------:|:------------------------:|:--------:|
| `private` | Yes | No | No | No |
| *default* | Yes | Yes | No | No |
| `protected` | Yes | Yes | Yes | No |
| `public` | Yes | Yes | Yes | Yes |

Ordering from most to least restrictive: `private` < *default* < `protected` < `public`.

## Example

```java
package shapes;

public class Shape {
    public String name;        // visible everywhere
    protected int sides;       // package + subclasses
    int internalId;            // default: package only
    private double secret;     // this class only

    public Shape(String name) {
        this.name = name;
        this.secret = Math.random();
    }
}
```

```java
package other;
import shapes.Shape;

class Square extends Shape {
    Square() {
        super("square");
        sides = 4;             // OK: protected, accessible in subclass
        // internalId = 1;     // ERROR: default, different package
        // secret = 0;         // ERROR: private
    }
}
```

## Access scope diagram

```text
private   -> [ class ]
default   -> [ class ][ package ]
protected -> [ class ][ package ][ subclasses ]
public    -> [ class ][ package ][ subclasses ][ world ]
```

## Rules and notes

- **Top-level classes** may only be `public` or *default* (not `private`/`protected`).
- `protected` members are reachable in a subclass from another package **through inheritance**, but not via an unrelated object reference.
- A common encapsulation pattern: keep fields `private`, expose `public` getters/setters.

## Key points

- Four levels: `private`, default (package-private), `protected`, `public`.
- Default = no keyword = visible only within the same package.
- `protected` adds subclass access across packages on top of default.
- Prefer the **most restrictive** level that still works — this is core to encapsulation.
- Only `public`/default allowed on top-level classes.
