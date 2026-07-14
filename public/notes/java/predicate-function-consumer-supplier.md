## Definition

These are the four **core built-in functional interfaces** in `java.util.function` (Java 8). Each captures a common lambda shape and is used heavily in the Stream API.

| Interface | Signature | Abstract method | Purpose |
|-----------|-----------|-----------------|---------|
| `Predicate<T>` | `T -> boolean` | `test(T)` | Test a condition |
| `Function<T,R>` | `T -> R` | `apply(T)` | Transform a value |
| `Consumer<T>` | `T -> void` | `accept(T)` | Perform a side effect |
| `Supplier<T>` | `() -> T` | `get()` | Produce/supply a value |

## Examples

```java
// Predicate: returns boolean
Predicate<Integer> isEven = n -> n % 2 == 0;
System.out.println(isEven.test(4));      // true

// Function: maps input to output
Function<String, Integer> length = s -> s.length();
System.out.println(length.apply("java")); // 4

// Consumer: consumes, returns nothing
Consumer<String> printer = s -> System.out.println("Got: " + s);
printer.accept("hello");                  // Got: hello

// Supplier: supplies a value, takes nothing
Supplier<Double> random = () -> Math.random();
System.out.println(random.get());
```

## Default-method composition

```java
Predicate<Integer> positive = n -> n > 0;
Predicate<Integer> evenPositive = isEven.and(positive); // combine
Predicate<Integer> notEven = isEven.negate();

Function<Integer,Integer> times2 = n -> n * 2;
Function<Integer,Integer> plus1  = n -> n + 1;
times2.andThen(plus1).apply(3);  // (3*2)+1 = 7
times2.compose(plus1).apply(3);  // (3+1)*2 = 8
```

## Use in streams

```java
List<String> names = List.of("Amy", "Bob", "Al");
names.stream()
     .filter(n -> n.startsWith("A"))   // Predicate
     .map(String::toUpperCase)         // Function
     .forEach(System.out::println);    // Consumer
```

## Key points

- **Predicate** → boolean test; combine with `.and()`, `.or()`, `.negate()`.
- **Function** → transform `T` to `R`; chain with `.andThen()` / `.compose()`.
- **Consumer** → side effect, no return; chain with `.andThen()`.
- **Supplier** → lazily produces a value, takes no input (great for defaults/factories).
- Two-arg variants exist: `BiPredicate`, `BiFunction`, `BiConsumer`; primitive variants (`IntPredicate`, `ToIntFunction`) avoid boxing.
- `UnaryOperator<T>` / `BinaryOperator<T>` are `Function`/`BiFunction` where all types are the same.
