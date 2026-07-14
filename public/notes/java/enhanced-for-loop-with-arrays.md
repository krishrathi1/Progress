## Definition

The **enhanced for loop** (also called the **for-each loop**), introduced in Java 5, iterates over every element of an array or `Collection` without using an explicit index or counter. It reads the elements in order, from first to last.

## Syntax

```java
for (ElementType var : arrayOrCollection) {
    // use var — a copy of the current element
}
```

- `ElementType` must be compatible with the array's element type.
- `var` receives a **copy** of each element on every iteration.
- No index variable, no bounds check to write, no `length` needed.

## Example

```java
int[] marks = {90, 75, 60, 88};
int total = 0;
for (int m : marks) {      // m takes 90, then 75, then 60, then 88
    total += m;
}
System.out.println("Sum = " + total);   // Sum = 313

String[] names = {"Ada", "Alan", "Grace"};
for (String n : names) {
    System.out.println(n);
}
```

## How it works

```text
marks = [90][75][60][88]
          ^
 pass 1:  m = 90
 pass 2:      m = 75
 pass 3:          m = 60
 pass 4:              m = 88   -> loop ends
```

## Enhanced for vs traditional for

| Aspect | Enhanced for | Traditional for |
|--------|--------------|-----------------|
| Index access | Not available | Available (`i`) |
| Direction | Forward only | Any direction |
| Modify element in place | No (writes to copy) | Yes (`a[i] = x`) |
| Boundary bugs | None | Possible off-by-one |
| Readability | Higher | Lower for simple scans |

## Key points

- Best for **read-only** traversal where the index is not needed.
- You **cannot** reassign array elements through the loop variable — `m = 0` only changes the local copy, not `marks[i]`. (For objects you can still mutate the object's fields, since the copy is a reference.)
- You cannot iterate backwards, skip elements, or access two indices at once — use a traditional `for` for those.
- Works on any array and anything implementing `Iterable` (e.g., `ArrayList`, `HashSet`).
- Removing elements from a collection during a for-each throws `ConcurrentModificationException`; use an `Iterator` instead.
