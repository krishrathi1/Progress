## Definition

A **functional interface** is an interface with **exactly one abstract method** (SAM — Single Abstract Method). It is the target type for **lambda expressions** and **method references**. It may also contain any number of `default` and `static` methods (those don't count against the single-abstract-method rule).

## The @FunctionalInterface annotation

Optional but recommended — it makes the compiler **enforce** that the interface has exactly one abstract method.

```java
@FunctionalInterface
interface Calculator {
    int operate(int a, int b);   // single abstract method
    // adding a 2nd abstract method here => compile error

    default int square(int x) { return operate(x, x); } // allowed
}

Calculator add = (a, b) -> a + b;
System.out.println(add.operate(3, 4)); // 7
System.out.println(add.square(5));     // 25
```

## Built-in functional interfaces (java.util.function)

```text
Predicate<T>    T -> boolean     test()
Function<T,R>   T -> R           apply()
Consumer<T>     T -> void        accept()
Supplier<T>     () -> T          get()
```

```java
Predicate<Integer> isEven = n -> n % 2 == 0;
Function<String, Integer> len = String::length;
Supplier<Double> rnd = Math::random;
Consumer<String> print = System.out::println;
```

## Comparison

| Interface | Abstract method | Takes | Returns |
|-----------|-----------------|-------|---------|
| `Runnable` | `run()` | nothing | void |
| `Comparator<T>` | `compare(a,b)` | two `T` | int |
| `Callable<V>` | `call()` | nothing | `V` (throws) |
| `Predicate<T>` | `test(t)` | `T` | boolean |

## Key points

- Exactly **one abstract method**; `default`/`static`/`Object` methods (like `equals`) don't count.
- `@FunctionalInterface` is optional but guards against accidental extra abstract methods.
- Any functional interface can be implemented by a **lambda** or **method reference**.
- `java.util.function` provides ready-made ones — prefer them over writing your own.
- Older SAM interfaces (`Runnable`, `Comparator`, `Callable`) are functional interfaces too and work with lambdas.
