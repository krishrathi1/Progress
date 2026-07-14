## Definition

**Method overloading** means defining **multiple methods with the same name** in the same class, distinguished by a **different parameter list** (number, types, or order of parameters). It is a form of **compile-time (static) polymorphism** — the compiler picks which version to call based on the arguments.

## What makes an overload valid

Overloads must differ in at least one of:

- **Number** of parameters
- **Types** of parameters
- **Order** of parameter types

```java
class Printer {
    void print(int x)            { System.out.println("int: " + x); }
    void print(double x)         { System.out.println("double: " + x); }
    void print(String x)         { System.out.println("str: " + x); }
    void print(int x, int y)     { System.out.println("two ints"); }
    void print(String s, int n)  { System.out.println("str,int"); }
    void print(int n, String s)  { System.out.println("int,str"); } // order differs
}
```

## Not enough to overload

- **Return type alone** does not count — `int foo()` vs `double foo()` is a compile error.
- **Parameter names** don't matter, only types.

```java
int  area(int s) { return s * s; }
// double area(int s) { ... }  // ERROR: same param list, only return type differs
```

## How the compiler resolves a call

```text
call: print(5)

candidates: print(int), print(double), print(String)...
1. Exact match?           print(int)  <-- chosen
2. Else widening          int -> double  (print(double))
3. Else autoboxing        int -> Integer
4. Else varargs
```

The compiler prefers the **most specific** applicable method; ambiguity is a compile error.

## Overloading vs Overriding

| Aspect | Overloading | Overriding |
|--------|-------------|-----------|
| Where | Same class (or subclass) | Subclass redefines parent method |
| Signature | Must differ (params) | Must be identical |
| Binding | Compile-time (static) | Runtime (dynamic) |
| Polymorphism type | Static | Dynamic |
| Return type | Can differ | Same or covariant |

## Key points

- Overloading improves readability — one logical operation, many input forms (e.g., `println` is heavily overloaded).
- Resolution happens at **compile time** using the *declared/static* types of arguments.
- Beware ambiguity with autoboxing + widening; the compiler may reject calls it cannot uniquely resolve.
- Constructors can also be overloaded (constructor overloading follows the same rules).
