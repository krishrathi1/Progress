## Definition

A **lambda expression** (Java 8+) is a concise way to represent an **anonymous function** — a block of code that can be passed around as data. It provides an inline implementation of a **functional interface** (an interface with exactly one abstract method).

## Syntax

```java
(parameters) -> expression
(parameters) -> { statements; }
```

```java
() -> 42                          // no params
x -> x * x                        // one param, parens optional
(int a, int b) -> a + b           // typed params
(a, b) -> { return a + b; }       // block body needs return
```

## Example: replacing anonymous classes

```java
// Old: anonymous inner class (verbose)
Runnable r1 = new Runnable() {
    public void run() { System.out.println("hi"); }
};

// New: lambda
Runnable r2 = () -> System.out.println("hi");

// Sorting with Comparator
List<String> list = new ArrayList<>(List.of("bb", "a", "ccc"));
list.sort((x, y) -> x.length() - y.length());  // by length
```

## How it maps to a functional interface

```text
Runnable  { void run(); }        <- () -> System.out.println("hi")
Comparator{ int compare(a,b); }  <- (x, y) -> x - y
              |                         |
       one abstract method  ===  lambda body supplies it
```

The compiler infers the target type from context (the "target typing").

## Comparison

| Feature | Anonymous class | Lambda |
|---------|-----------------|--------|
| Verbosity | High | Low |
| `this` refers to | The inner class | The enclosing class |
| Extra `.class` file | Yes | No (uses `invokedynamic`) |
| Can have state/fields | Yes | No |

## Key points

- A lambda only works with a **functional interface** (one abstract method), e.g. `Runnable`, `Comparator`, `Predicate`.
- It can capture **effectively final** local variables (used but not reassigned).
- Inside a lambda, `this` refers to the **enclosing instance**, not the lambda itself.
- Lambdas enable the **Stream API** and functional-style programming.
- Prefer **method references** (`String::length`) when the lambda just calls one method.
