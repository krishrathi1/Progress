## Definition

An **annotation** is metadata attached to Java code (classes, methods, fields, parameters) that does not directly change program logic but supplies information to the **compiler**, **build tools**, or the **runtime** (via reflection). Syntax: `@AnnotationName` placed just before the element.

## Categories

- **Marker** – no members, e.g. `@Override`.
- **Single-value** – one member named `value`, e.g. `@SuppressWarnings("unchecked")`.
- **Multi-value** – several members, e.g. `@Author(name="A", date="2026")`.

## Built-in Annotations

| Annotation | Applies to | Purpose |
|------------|-----------|---------|
| `@Override` | method | Compiler checks it really overrides a super method |
| `@Deprecated` | any | Marks element as outdated; warns on use |
| `@SuppressWarnings` | any | Silences named compiler warnings |
| `@FunctionalInterface` | interface | Ensures exactly one abstract method |
| `@SafeVarargs` | method | Suppresses unsafe generic-varargs warnings |

## Meta-Annotations (annotate annotations)

- `@Retention` – how long it is kept: `SOURCE`, `CLASS`, or `RUNTIME`.
- `@Target` – where it may be used (`METHOD`, `FIELD`, `TYPE`, …).
- `@Documented` – include in Javadoc.
- `@Inherited` – subclasses inherit it.

## Custom Annotation + Reflection

```java
import java.lang.annotation.*;
import java.lang.reflect.*;

@Retention(RetentionPolicy.RUNTIME)   // available at runtime
@Target(ElementType.METHOD)
@interface Test {
    String value() default "case";
}

class Demo {
    @Test("login")
    public void run() { }

    public static void main(String[] a) throws Exception {
        Method m = Demo.class.getMethod("run");
        if (m.isAnnotationPresent(Test.class)) {
            Test t = m.getAnnotation(Test.class);
            System.out.println("Found @Test = " + t.value()); // login
        }
    }
}
```

```text
Retention flow:
 SOURCE  -> discarded by compiler (e.g. @Override)
 CLASS   -> kept in .class, not loaded to JVM (default)
 RUNTIME -> visible via reflection  <-- needed for frameworks
```

Frameworks like Spring, JUnit, and Hibernate rely on `RUNTIME` annotations read through reflection.

## Key points

- Annotations are metadata; they don't alter code behaviour by themselves.
- Only `RUNTIME`-retained annotations are readable via reflection.
- `@Override` and `@FunctionalInterface` are compile-time safety checks.
- Meta-annotations `@Retention` and `@Target` configure custom annotations.
- Members act like methods; may have `default` values.
