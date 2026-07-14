## Definition

**Compile-time (static) polymorphism** is the form of polymorphism resolved by the compiler **before the program runs**. The exact method (or operator) to invoke is decided at **compile time** based on the **method signature** and the **static (declared) types** of the arguments. It is also called **early / static binding**.

In Java it is achieved mainly through **method overloading** (and, in languages like C++, **operator overloading**).

## How resolution works

```text
Source:  print(10)     print(10, 20)     print("hi")
             │              │                │
   compiler matches signature (name + arg types/count)
             ▼              ▼                ▼
        print(int)   print(int,int)   print(String)
        (chosen at COMPILE time — before execution)
```

- The compiler inspects the **number, types, and order** of arguments.
- It selects the best-matching overload and hard-wires that call.
- No runtime decision is involved, so it is **fast** with no dispatch overhead.

## Example — method overloading

```java
class Calc {
    int add(int a, int b)          { return a + b; }
    double add(double a, double b) { return a + b; }
    int add(int a, int b, int c)   { return a + b + c; }
}

public class Demo {
    public static void main(String[] x) {
        Calc c = new Calc();
        System.out.println(c.add(2, 3));        // -> add(int,int)
        System.out.println(c.add(2.5, 3.5));    // -> add(double,double)
        System.out.println(c.add(1, 2, 3));     // -> add(int,int,int)
    }
}
```

The three calls bind to three different methods, all resolved by the compiler.

## Compile-time vs runtime polymorphism

| Aspect | Compile-time (static) | Runtime (dynamic) |
|--------|-----------------------|-------------------|
| Achieved by | Overloading | Overriding |
| Binding | Early (compile) | Late (runtime) |
| Based on | Reference/arg **types** | Actual **object** |
| Speed | Faster (no dispatch) | Slight overhead |

## Key points

- Resolved by the **compiler** using method **signatures** and declared types.
- Realised through **method / constructor overloading** (and operator overloading in C++).
- Return type alone **cannot** distinguish overloads.
- Faster than dynamic dispatch because no virtual lookup occurs at runtime.
- Contrast with **overriding**, which is resolved at runtime.
