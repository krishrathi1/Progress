## Definition

A **method** is a named block of code that performs a task and can be invoked repeatedly. Methods provide **reusability**, **abstraction**, and **modularity** by grouping logic behind a single call.

## Method signature

```java
accessModifier [static] returnType name(parameterList) {
    // body
    return value;   // if returnType is not void
}
```

- **Method signature** = method name + parameter types (used to distinguish overloads). Return type is *not* part of the signature.

```java
public int add(int a, int b) {   // returns int
    return a + b;
}

public void greet(String name) { // returns nothing
    System.out.println("Hi " + name);
}
```

## Calling methods

```java
int sum = add(3, 4);   // instance/static call
greet("Krish");
```

## Instance vs static methods

| Aspect | Instance method | Static method |
|--------|-----------------|---------------|
| Belongs to | An object | The class |
| Called via | `obj.method()` | `ClassName.method()` |
| Access to `this` | Yes | No |
| Can access instance fields | Directly | Only via an object |

```java
class MathUtil {
    static int square(int x) { return x * x; }   // static
    int cube(int x) { return x * x * x; }         // instance
}
// MathUtil.square(5);           -> 25
// new MathUtil().cube(3);       -> 27
```

## Parameter passing (pass-by-value)

Java is strictly **pass-by-value**. For objects, the *reference value* is copied — so the method can mutate the object's state but cannot reassign the caller's variable.

```text
void change(int x)      -> caller's int is unaffected
void fill(int[] arr)    -> caller's array CONTENTS can change
                           (reference copied, same array object)
```

```java
void mutate(int[] a) { a[0] = 99; }   // affects caller's array
void reassign(int[] a) { a = new int[]{1}; }  // does NOT affect caller
```

## Variable arguments (varargs)

```java
int sum(int... nums) {          // 0..N ints
    int t = 0;
    for (int n : nums) t += n;
    return t;
}
// sum(1, 2, 3) -> 6 ;  sum() -> 0
```

## Key points

- A method may take zero or more parameters and return at most one value (or `void`).
- Return type is not part of the signature — you cannot overload by return type alone.
- Java passes arguments **by value**; object references let methods mutate shared state.
- Prefer small, single-purpose methods; use `static` for stateless utilities.
