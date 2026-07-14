## Definition

**Constructor overloading** means defining **multiple constructors** in the same class, each with a **different parameter list** (different number, types, or order of parameters). Java picks the correct one at **compile time** based on the arguments you pass. It is a form of **compile-time (static) polymorphism**.

## Why use it

- Create objects in different ways (with full data, partial data, or defaults).
- Improves flexibility and readability — no need for multiple factory method names.
- Enables **constructor chaining** to avoid duplicated initialization code.

## Rules

- Constructors must differ in the **signature** (parameter list). Return type is not part of a constructor, so it cannot be used to distinguish them.
- Use `this(...)` to call one constructor from another; it must be the **first** statement.
- Only differing in parameter **names** is not enough — the types/count/order must differ.

## Example

```java
class Rectangle {
    int length, width;

    Rectangle() {               // no-arg
        this(1, 1);             // delegates to (int,int)
    }

    Rectangle(int side) {       // square
        this(side, side);
    }

    Rectangle(int length, int width) {  // full
        this.length = length;
        this.width  = width;
    }

    int area() { return length * width; }
}

public class Main {
    public static void main(String[] args) {
        System.out.println(new Rectangle().area());      // 1
        System.out.println(new Rectangle(5).area());     // 25
        System.out.println(new Rectangle(4, 3).area());  // 12
    }
}
```

## Overload resolution

```text
new Rectangle(5)
      |
compiler matches by argument list
      |
   (int) --> Rectangle(int side)
      |
   calls this(5,5) --> Rectangle(int,int)
```

## Comparison

| Feature | Constructor overloading | Method overloading |
|---------|------------------------|--------------------|
| Name | Same as class | Any method name |
| Return type | None | Can have any |
| Purpose | Multiple ways to init object | Multiple ways to call behavior |
| Chaining | `this()` / `super()` | Normal calls |

## Key points

- Overloaded constructors differ only by parameter list.
- Resolved at **compile time** (static binding).
- `this(...)` chaining reduces duplicate initialization logic and must be the first statement.
- Distinct from **overriding**, which involves inheritance and runtime dispatch.
