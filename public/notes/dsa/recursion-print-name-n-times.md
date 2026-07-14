## Problem

Print a given name (or any string) exactly **N times** using **recursion** — no loops. This is a classic first exercise for understanding how a recursive function calls itself and where the base case stops it.

- `N = 3`, name = `"Raj"` -> prints `Raj` three times.

## Intuition

Recursion solves a problem by reducing it to a **smaller version of itself** plus a stopping rule:

- **Base case** — the condition that ends recursion (here, when the count reaches 0). Without it you get infinite recursion and a `StackOverflowError`.
- **Recursive case** — do one unit of work (print once), then call yourself with a smaller argument.

## Approach 1: Count down (i goes N -> 1)

Print, then recurse with `i - 1` until `i` hits 0.

```java
void printName(int i, String name) {
    if (i == 0) return;          // base case: stop
    System.out.println(name);    // work: print once
    printName(i - 1, name);      // recurse on smaller problem
}
// call: printName(3, "Raj");
```

**Time:** O(N) · **Space:** O(N) recursion stack

## Approach 2: Count up (i goes 1 -> N)

Carry the current index and the limit; stop when `i` exceeds `n`.

```java
void printName(int i, int n, String name) {
    if (i > n) return;           // base case
    System.out.println(name);
    printName(i + 1, n, name);   // move toward base case
}
// call: printName(1, 3, "Raj");
```

**Time:** O(N) · **Space:** O(N) recursion stack

## Call-stack trace

```text
printName(3, "Raj")
  print "Raj"
  printName(2, "Raj")
    print "Raj"
    printName(1, "Raj")
      print "Raj"
      printName(0, "Raj")  -> i == 0, return (base case)
    return
  return
return                       -> "Raj" printed 3 times
```

## Key points

- Every recursion needs a **base case** and progress **toward** it, or it overflows the stack.
- Each call adds a frame to the call stack -> **O(N) auxiliary space**, unlike an `O(1)` loop.
- The parameter (`i - 1` or `i + 1`) is what shrinks the problem each call.
- This same skeleton (base case + one step + recurse) underlies factorial, sum of N, Fibonacci, and all tree/graph recursion.
