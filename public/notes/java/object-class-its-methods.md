## Definition

`java.lang.Object` is the **root of the Java class hierarchy**. Every class implicitly extends `Object` (directly or indirectly), so every object — including arrays — inherits its methods. It defines the universal behaviour that all Java objects share.

```text
            Object          ← superclass of everything
          /   |   \
     String  List  YourClass ...
```

## Key methods

| Method | Purpose |
|--------|---------|
| `boolean equals(Object o)` | Logical equality (default: reference equality) |
| `int hashCode()` | Integer hash used by HashMap/HashSet |
| `String toString()` | Text representation (default: `ClassName@hex`) |
| `Class<?> getClass()` | Runtime class of the object |
| `protected Object clone()` | Field-by-field copy (needs `Cloneable`) |
| `void notify() / notifyAll() / wait()` | Thread inter-communication |
| `protected void finalize()` | Called before GC (deprecated) |

## Overriding equals and hashCode

These two are commonly overridden together. **Contract:** if `a.equals(b)` is true, then `a.hashCode() == b.hashCode()` must also be true.

```java
class Point {
    int x, y;
    Point(int x, int y) { this.x = x; this.y = y; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Point)) return false;
        Point p = (Point) o;
        return x == p.x && y == p.y;
    }

    @Override
    public int hashCode() {
        return java.util.Objects.hash(x, y);
    }

    @Override
    public String toString() {
        return "Point(" + x + ", " + y + ")";
    }
}
```

```text
Point a = new Point(1, 2);
Point b = new Point(1, 2);
a == b        -> false   (different references)
a.equals(b)   -> true    (overridden logical equality)
a.hashCode() == b.hashCode() -> true (contract holds)
```

## Key points

- `Object` is the ultimate superclass; `getClass()`, `hashCode()`, `equals()` are available on any reference.
- Default `equals()` compares references (`==`); override it for value equality.
- Always override `hashCode()` when you override `equals()`, or hash-based collections break.
- Default `toString()` returns `ClassName@hashHex`; override for readable output.
- `clone()` requires implementing `Cloneable` and does a shallow copy by default.
- `wait()`, `notify()`, `notifyAll()` must be called inside a `synchronized` block.
