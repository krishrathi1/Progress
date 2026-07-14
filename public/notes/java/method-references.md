## Definition

A **method reference** is a compact, Java 8 syntax that lets you refer to an existing method (or constructor) by name instead of writing a lambda that only calls that method. It uses the `::` operator and is treated as an implementation of a **functional interface**.

If a lambda does nothing but forward its arguments to an existing method, replace it with a method reference.

```java
// Lambda
list.forEach(s -> System.out.println(s));
// Method reference (equivalent)
list.forEach(System.out::println);
```

## Four kinds of method references

| # | Kind | Syntax | Example |
|---|------|--------|---------|
| 1 | Static method | `Class::staticMethod` | `Integer::parseInt` |
| 2 | Instance method of a **particular** object | `object::instanceMethod` | `System.out::println` |
| 3 | Instance method of an **arbitrary** object of a type | `Class::instanceMethod` | `String::toUpperCase` |
| 4 | Constructor | `Class::new` | `ArrayList::new` |

### How type 3 differs from type 2

For `String::toUpperCase`, the first lambda parameter *becomes* the receiver:

```text
(String s) -> s.toUpperCase()   ==   String::toUpperCase
        ^ receiver supplied at call time
```

## Runnable example

```java
import java.util.*;
import java.util.function.*;

public class Demo {
    static int square(int x) { return x * x; }

    public static void main(String[] args) {
        Function<Integer,Integer> f = Demo::square;      // static
        Supplier<List<String>> s   = ArrayList::new;     // constructor
        Function<String,Integer> len = String::length;   // arbitrary object

        System.out.println(f.apply(5));   // 25
        System.out.println(len.apply("hi")); // 2

        List<String> names = new ArrayList<>(List.of("bob","al","cy"));
        names.sort(Comparator.comparing(String::length)); // clean sort
        names.forEach(System.out::println);
    }
}
```

## Key points

- `::` binds a method reference; the compiler infers which functional interface it targets.
- A method reference is only valid when the target method's signature is **compatible** with the functional interface's abstract method.
- Constructor references (`Type::new`) work great with `Supplier`, `Function`, and array creation (`int[]::new`).
- They improve readability but are just syntactic sugar over lambdas — no runtime difference.
