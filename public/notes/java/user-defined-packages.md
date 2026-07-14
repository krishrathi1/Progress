## Definition

A **user-defined package** is a package you create yourself to group your own related classes and interfaces. It works exactly like a built-in package but holds your application code, giving you organization, reuse, and package-level access control.

## Creating one

**Step 1 — declare the package** (first line of the file); the file must sit in a matching folder.

```java
// file: com/example/shapes/Circle.java
package com.example.shapes;

public class Circle {
    private double r;
    public Circle(double r) { this.r = r; }
    public double area() { return Math.PI * r * r; }
}
```

**Step 2 — use it from another package** via `import`.

```java
// file: com/example/app/Main.java
package com.example.app;

import com.example.shapes.Circle;

public class Main {
    public static void main(String[] args) {
        Circle c = new Circle(2.0);
        System.out.println(c.area());   // 12.566...
    }
}
```

## Directory ↔ package mapping

```text
project-root/
└── com/
    └── example/
        ├── shapes/
        │    └── Circle.java   package com.example.shapes;
        └── app/
             └── Main.java     package com.example.app;
```

## Compile & run

```text
javac -d out com/example/shapes/Circle.java com/example/app/Main.java
java  -cp out com.example.app.Main
```

- `-d out` writes `.class` files into `out/` mirroring the package folders.
- `-cp out` sets the classpath so the JVM can locate the packaged classes.

## Key points

- The `package` statement must be the **first** statement and **match the folder path** exactly.
- To use a `public` class from another package, it must be `public` **and** imported (or referenced by fully-qualified name).
- Only **`public`** types are visible outside their package; **default** (no modifier) types are package-private.
- Use the **reverse-domain, lowercase** convention: `com.company.project`.
- One `public` top-level class per `.java` file, and the file name must match that class.
- Sub-packages (`com.example.shapes.d3`) are independent — importing the parent does not import them.
