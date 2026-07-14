## Definition

**Access control** in Java decides which classes, methods, and fields are visible from other classes and packages. It is enforced by the four **access modifiers**: `public`, `protected`, default (package-private, no keyword), and `private`. Across package boundaries the rules become stricter, so understanding them is essential for designing clean APIs.

## The four access levels

| Modifier | Same class | Same package | Subclass (other package) | Other package (non-subclass) |
|----------|:--:|:--:|:--:|:--:|
| `private` | Yes | No | No | No |
| default (no keyword) | Yes | Yes | No | No |
| `protected` | Yes | Yes | Yes | No |
| `public` | Yes | Yes | Yes | Yes |

## How it works across packages

- Only `public` members are freely usable from any package.
- **default** (package-private) members are invisible the moment you leave the package — even a `public` class hides its default members from outsiders.
- `protected` adds one extra grant on top of default: a subclass in a *different* package can access the member, but **only through a reference of its own type**, not through the parent type.

```text
com.shapes                 com.app
+----------------+         +----------------------+
| class Shape    |         | class Circle         |
|  public draw() | <------ |   extends Shape      |
|  protected id  | <--(ok via this.id in Circle)  |
|  default tag   |  X (not visible outside pkg)   |
|  private key   |  X                             |
+----------------+         +----------------------+
```

## Code example

```java
// File: com/shapes/Shape.java
package com.shapes;
public class Shape {
    public String name = "shape";   // visible everywhere
    protected int id = 1;           // subclasses in other pkgs
    String tag = "t";               // default: same pkg only
    private String key = "k";       // this class only
}

// File: com/app/Circle.java
package com.app;
import com.shapes.Shape;
public class Circle extends Shape {
    void show() {
        System.out.println(name);   // OK: public
        System.out.println(id);     // OK: protected via inheritance
        // System.out.println(tag); // ERROR: default, other package
        // System.out.println(key); // ERROR: private
    }
}
```

- A **top-level class** can only be `public` or default — not `private`/`protected`.
- A `public` class must live in a file matching its name.

## Key points

- Cross-package visibility depends on both the **class** modifier and the **member** modifier.
- `protected` = default access **plus** access by out-of-package subclasses (via their own reference).
- Default access confines members to their own package — good for internal helpers.
- Follow the **principle of least privilege**: expose the minimum (`private` fields, `public` API).
