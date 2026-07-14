## Definition

The **Reflection API** (`java.lang.reflect` + `java.lang.Class`) lets a program **inspect and manipulate** classes, fields, methods, and constructors **at runtime** — even without knowing their names at compile time. It powers frameworks (Spring, JUnit, Jackson), IDEs, and serialization.

## Getting a `Class` Object

```java
Class<?> c1 = String.class;             // from type literal
Class<?> c2 = "hi".getClass();          // from an instance
Class<?> c3 = Class.forName("java.util.ArrayList"); // from name
```

## Core Capabilities

| Task | API |
|------|-----|
| List methods | `getDeclaredMethods()`, `getMethods()` |
| List fields | `getDeclaredFields()` |
| Create object | `getDeclaredConstructor().newInstance()` |
| Invoke method | `Method.invoke(obj, args...)` |
| Read/write field | `Field.get(obj)` / `Field.set(obj, val)` |
| Bypass access | `setAccessible(true)` |

## Example

```java
import java.lang.reflect.*;

class Person {
    private String name = "Ada";
    public String greet(String g) { return g + ", " + name; }
}

public class Demo {
    public static void main(String[] a) throws Exception {
        Class<?> cls = Class.forName("Person");
        Object p = cls.getDeclaredConstructor().newInstance();

        // invoke a method dynamically
        Method m = cls.getMethod("greet", String.class);
        System.out.println(m.invoke(p, "Hello")); // Hello, Ada

        // read a private field
        Field f = cls.getDeclaredField("name");
        f.setAccessible(true);                     // break encapsulation
        System.out.println(f.get(p));              // Ada
    }
}
```

```text
Reflection lookup chain:
  ClassLoader -> Class object -> [ Fields | Methods | Constructors ]
                                        |
                          invoke / get / set at runtime
```

## Trade-offs

- **Pros:** dynamic behaviour, extensible frameworks, generic tooling.
- **Cons:** slower than direct calls (no JIT inlining), breaks compile-time type safety, can violate encapsulation, may fail under a `SecurityManager` / strong module encapsulation.

## Key points

- Entry point is always a `Class<?>` object obtained three ways.
- `getDeclared*` sees private members of that class; `get*` sees public (incl. inherited) members.
- `setAccessible(true)` bypasses access checks — powerful but risky.
- Reflection is runtime-only and needs `RUNTIME`-retained annotations.
- Prefer normal calls in hot paths; reflection is for frameworks/tools.
