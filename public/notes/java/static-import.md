## Definition

A **static import** lets you use the **static members** (fields and methods) of a class directly by their simple name, without qualifying them with the class name. Introduced in Java 5, it is declared with `import static`.

## Syntax

```java
import static java.lang.Math.PI;    // a single static field
import static java.lang.Math.sqrt;  // a single static method
import static java.lang.Math.*;     // all static members of Math
```

## Without vs with static import

```java
// Without static import
double d = Math.sqrt(Math.pow(3, 2) + Math.pow(4, 2));
System.out.println(Math.PI);

// With: import static java.lang.Math.*;
double d = sqrt(pow(3, 2) + pow(4, 2));
System.out.println(PI);
```

## Regular import vs static import

| Aspect | `import` | `import static` |
|--------|----------|-----------------|
| Imports | Classes / interfaces (types) | Static fields & methods |
| Lets you write | `Scanner` instead of `java.util.Scanner` | `sqrt(x)` instead of `Math.sqrt(x)` |
| Keyword | `import` | `import static` |

## Common real use

```java
import static org.junit.jupiter.api.Assertions.assertEquals;

// in a test:
assertEquals(4, add(2, 2));   // reads cleanly, no "Assertions." prefix
```

## Resolution

```text
Call "sqrt(9)"  ->  no local method sqrt
                  -> checks static imports
                  -> java.lang.Math.sqrt matches  -> Math.sqrt(9) = 3.0
```

## Key points

- Use it to remove repetitive class qualifiers — great for `Math.*` and test assertion libraries.
- **Overuse hurts readability**: readers lose track of where `sqrt` or `assertEquals` comes from. Prefer single-member static imports over wildcards.
- If a static import **name conflicts** with a local method/field, the **local member wins** (shadowing); explicit conflicts between two static imports cause a compile error.
- It imports **members**, not types — you still need a normal `import` for the class itself if you reference the type.
- Static imports are resolved at **compile time** only; there is no runtime cost.
