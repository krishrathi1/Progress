## Functions and parameter passing

A **function** is a named, reusable block of code that takes inputs (parameters), performs a task, and optionally returns a value. How arguments reach the function — **by value** or **by reference** — decides whether the caller's original data can be modified.

### Pass by value

A **copy** of the argument is made. Changes inside the function do **not** affect the caller's variable.

```cpp
void increment(int x) {   // x is a copy
    x = x + 1;            // only the copy changes
}
int a = 5;
increment(a);
// a is still 5
```

### Pass by reference

The function receives an **alias** to the caller's variable. Changes **do** affect the original. In C++ use `&`; in Java/Python object references are passed by value (the reference itself is copied).

```cpp
void increment(int &x) {  // x refers to caller's variable
    x = x + 1;
}
int a = 5;
increment(a);
// a is now 6
```

```text
Pass by value                Pass by reference
caller a:[5]                 caller a:[5]
          \ copy                       ^ alias
func   x:[5]  (separate)     func   x:---+  (same memory)
```

### Comparison

| Aspect | By value | By reference |
|--------|----------|--------------|
| What is passed | A copy | An alias/address |
| Caller data changed? | No | Yes |
| Cost for large objects | Expensive (full copy) | Cheap (no copy) |
| Safety | Safe, isolated | Caller can be mutated |

### The Java / Python nuance

Java is **always pass-by-value**, but for objects the *value* passed is the reference. So you can mutate the object's fields, but reassigning the parameter does not affect the caller.

```java
void mutate(int[] arr) { arr[0] = 99; }  // caller's array changes
void reassign(int[] arr) { arr = new int[]{1}; } // caller unaffected
```

### Best practice in C++

Use `const&` to pass large read-only objects efficiently without copying and without allowing modification:

```cpp
void print(const std::vector<int> &v) { /* no copy, cannot modify */ }
```

## Key points

- **By value** = copy; original is safe but copying large data is costly.
- **By reference** (C++ `&`) = alias; lets a function modify caller data and avoids copies.
- Java/Python: references are passed **by value** — you can mutate objects but not rebind the caller's variable.
- Prefer `const&` in C++ for big read-only parameters.
- Returning a value is an alternative to output-via-reference and is often clearer.
