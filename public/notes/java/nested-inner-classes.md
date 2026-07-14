## Definition

A **nested class** is a class declared inside another class. Java groups nested classes into two categories:

- **Static nested class** — declared with `static`; does **not** hold a reference to an outer instance.
- **Inner (non-static nested) class** — implicitly tied to an enclosing object; can access all outer members, including `private` ones.

Nesting is used to logically group classes that are only used in one place, increase encapsulation, and improve readability.

## Types of nested classes

```text
        Nested class
        /          \
  static nested    inner (non-static)
                    /     |        \
             member   local     anonymous
             inner    inner       inner
```

| Type | Needs outer object? | Access to outer members | Typical use |
|------|--------------------|-------------------------|-------------|
| Static nested | No | Only static members | Helper/builder classes |
| Member inner | Yes | All (incl. private) | Tightly coupled logic |
| Local inner | Yes | Outer + effectively-final locals | One-off inside a method |
| Anonymous | Yes | Same as local | One-shot interface/impl |

## Code example

```java
class Outer {
    private int x = 10;
    static int s = 5;

    // static nested class
    static class StaticNested {
        void show() { System.out.println("s = " + s); }
    }

    // member inner class
    class Inner {
        void show() { System.out.println("x = " + x); } // reads private x
    }

    void localDemo() {
        int local = 42;                 // effectively final
        class LocalInner {              // local inner class
            void show() { System.out.println(local); }
        }
        new LocalInner().show();
    }
}

public class Main {
    public static void main(String[] args) {
        Outer.StaticNested n = new Outer.StaticNested();   // no outer object
        n.show();

        Outer o = new Outer();
        Outer.Inner in = o.new Inner();                    // needs outer object
        in.show();
    }
}
```

## Key points

- Instantiate an inner class with `outerObject.new Inner()`; a static nested class with `Outer.StaticNested`.
- Inner classes hold an implicit reference to the outer instance, which can cause memory leaks if the inner object outlives the outer.
- Inner classes can access `private` members of the enclosing class directly.
- Local and anonymous inner classes can capture only **effectively final** local variables.
- Prefer static nested classes when no outer-instance access is needed — they are lighter.
