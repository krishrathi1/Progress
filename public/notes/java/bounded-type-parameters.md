## Definition

A **bounded type parameter** restricts the types that can be used as a generic argument to a specified **upper bound** using the `extends` keyword. It lets the compiler know the type has certain members (methods/fields), so you can call them safely inside generic code.

## Syntax

```java
<T extends UpperBound>
```

Here `extends` means "is a subtype of" — it works for both classes (**extends**) and interfaces (**implements**). `UpperBound` is the most general type allowed.

## Why bounds are needed

Without a bound, a type parameter is treated as `Object`, so you can only call `Object` methods:

```java
public static <T> T max(T a, T b) {
    return a.compareTo(b) >= 0 ? a : b;   // ERROR: Object has no compareTo
}
```

Add a bound so `T` is known to be `Comparable`:

```java
public static <T extends Comparable<T>> T max(T a, T b) {
    return a.compareTo(b) >= 0 ? a : b;   // OK
}

System.out.println(max(10, 25));       // 25
System.out.println(max("cat","ant"));  // cat
```

## Multiple bounds

A parameter can have several bounds joined by `&`. If a class is among them it must come **first**, followed by interfaces:

```java
class Task implements Comparable<Task>, Runnable {
    public int compareTo(Task t) { return 0; }
    public void run() {}
}

// T must be BOTH Comparable AND Runnable
public static <T extends Comparable<T> & Runnable> void process(T t) {
    t.run();
    t.compareTo(t);
}
```

## Numeric bound example

```java
// Accept only Number subtypes so we can call doubleValue()
public static <T extends Number> double sum(T a, T b) {
    return a.doubleValue() + b.doubleValue();
}
sum(3, 4);       // 7.0  (Integer)
sum(2.5, 1.5);   // 4.0  (Double)
```

```text
        T extends Number
              |
     +--------+---------+
   Integer  Double   Float ...   <- allowed
   String                        <- NOT allowed (compile error)
```

## Bounded parameter vs wildcard

- **Bounded type parameter** `<T extends X>` names a type you reuse across arguments/return.
- **Bounded wildcard** `<? extends X>` is for a single unknown type in a parameter position (covariance), and cannot be referred to by name.

## Key points

- Use `extends` for the **upper bound**, whether the bound is a class or interface.
- Bounds unlock the bound type's methods (e.g. `compareTo`, `doubleValue`) inside generic code.
- Multiple bounds use `&`; any class bound must be listed first.
- There is **no `super`** for a type parameter bound (`super` is only for wildcards); type-parameter bounds are always upper bounds.
