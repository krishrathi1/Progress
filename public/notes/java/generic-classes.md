## Definition

A **generic class** declares one or more **type parameters** in angle brackets after the class name. The parameters act as placeholders for real types supplied when an object is created, letting one class definition work type-safely with any reference type.

## Syntax

```java
class ClassName<T> {          // T is the type parameter
    private T value;
    public void set(T value) { this.value = value; }
    public T get() { return value; }
}
```

## Example — a generic Box

```java
public class Box<T> {
    private T content;

    public void put(T content) { this.content = content; }
    public T peek()            { return content; }

    public static void main(String[] args) {
        Box<String> sb = new Box<>();
        sb.put("hello");
        String s = sb.peek();        // no cast

        Box<Integer> ib = new Box<>();
        ib.put(100);
        int n = ib.peek();           // auto-unboxing
        System.out.println(s + " " + n);   // hello 100
    }
}
```

## Multiple type parameters

A class can declare several parameters, e.g. a key–value pair:

```java
public class Pair<K, V> {
    private final K key;
    private final V value;
    public Pair(K key, V value) { this.key = key; this.value = value; }
    public K getKey()   { return key; }
    public V getValue() { return value; }
}

Pair<String, Integer> p = new Pair<>("age", 30);
```

## Rules & gotchas

- Type parameters must be **reference types** — `Box<int>` is illegal; use `Box<Integer>`.
- You **cannot** instantiate a type parameter: `new T()` is not allowed (type erasure).
- You **cannot** create a generic array: `new T[10]` is illegal; use `(T[]) new Object[10]` or a `List`.
- `static` fields/methods cannot use the class's type parameter (it belongs to instances).

```text
Box<T>  --instantiate-->  Box<String>   T := String
                          Box<Integer>  T := Integer
   one class definition, many concrete types
```

## Key points

- Declare with `class Name<T> { ... }`; use fields/methods of type `T`.
- Enables reusable, type-safe containers (`Box`, `Pair`, collections).
- Supports multiple parameters like `<K, V>`.
- Restrictions from erasure: no `new T()`, no `new T[]`, no primitives, no static use of `T`.
