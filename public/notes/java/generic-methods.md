## Definition

A **generic method** declares its own type parameter(s) independent of any generic class. The type parameter list appears **before the return type**. It can be a `static` or instance method, and even sit inside a non-generic class.

## Syntax

```java
public <T> T methodName(T arg) { ... }
//     ^^^ type-parameter section comes before the return type
```

## Example

```java
public class Util {

    // Prints any array
    public static <T> void printAll(T[] items) {
        for (T item : items) System.out.print(item + " ");
        System.out.println();
    }

    // Returns the middle element of an array
    public static <T> T middle(T[] a) {
        return a[a.length / 2];
    }

    public static void main(String[] args) {
        Integer[] nums = {1, 2, 3};
        String[]  strs = {"a", "b", "c"};

        printAll(nums);              // 1 2 3
        printAll(strs);              // a b c
        System.out.println(middle(strs));  // b
    }
}
```

## Type inference

You usually let the compiler **infer** the type from the arguments, but you may specify it explicitly:

```java
Util.<String>printAll(strs);   // explicit type witness (rarely needed)
```

## Multiple type parameters

```java
public static <K, V> void printEntry(K key, V value) {
    System.out.println(key + " = " + value);
}
printEntry("id", 42);    // id = 42
```

## Bounded example

Type parameters can be bounded so you may call methods of the bound:

```java
public static <T extends Comparable<T>> T max(T a, T b) {
    return a.compareTo(b) >= 0 ? a : b;
}
System.out.println(max(3, 7));        // 7
System.out.println(max("apple","bat")); // bat
```

## Generic method vs generic class

| | Generic class | Generic method |
|--|---------------|----------------|
| Where `<T>` is declared | After class name | Before return type |
| Scope of `T` | Whole class | Only that method |
| Can be static | Type param not usable in static members | Yes — common for statics |

## Key points

- Place `<T>` **before the return type**: `public <T> T foo(T x)`.
- The type parameter's scope is the method only, so static utility methods use them.
- The compiler infers the type from arguments; explicit `Class.<T>method()` witnesses are rarely needed.
- Use bounds like `<T extends Comparable<T>>` to call methods on the type.
