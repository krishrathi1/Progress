## Arrays

An **array** is a fixed-size, contiguous block of memory storing elements of the **same type**, accessed by a 0-based index. Access by index is **O(1)** because the address is computed as `base + index × elementSize`.

```java
int[] a = new int[5];        // {0,0,0,0,0}
int[] b = {10, 20, 30};      // literal init
b[1] = 99;                   // update -> {10, 99, 30}
int len = b.length;          // 3  (field, no parentheses)

for (int i = 0; i < b.length; i++) System.out.print(b[i] + " ");
for (int x : b) System.out.print(x + " ");   // enhanced for-each
```

```text
Index:   0    1    2
       ┌────┬────┬────┐
Value: │ 10 │ 99 │ 30 │
       └────┴────┴────┘
 address = base + index*4 (int = 4 bytes) -> O(1) access
```

- **Size is fixed** at creation; you cannot grow it (use `ArrayList` for dynamic size).
- Out-of-range index throws `ArrayIndexOutOfBoundsException`.

## Strings

A **String** is a sequence of characters. In Java, `String` is **immutable** — any "modification" creates a new object.

```java
String s = "hello";
char c = s.charAt(1);        // 'e'
int n = s.length();          // 5   (method, has parentheses)
String up = s.toUpperCase(); // "HELLO"  (s unchanged)
String sub = s.substring(1, 3); // "el"  [start, end)
boolean eq = s.equals("hello"); // true — use equals, not ==
```

### Building strings efficiently

Concatenating in a loop with `+` is O(n²). Use `StringBuilder` (mutable):

```java
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 5; i++) sb.append(i);
String result = sb.toString();   // "01234"
```

## Array vs String

| Feature | Array | String |
|---------|-------|--------|
| Mutable | Yes | No (immutable) |
| Size | Fixed | Fixed per object |
| Length | `arr.length` (field) | `str.length()` (method) |
| Grow/modify | New array / ArrayList | New String / StringBuilder |

## Key points

- Arrays are 0-indexed; valid indices are `0 .. length-1`.
- `array.length` is a field; `string.length()` is a method — a frequent mix-up.
- Java Strings are immutable — compare with `.equals()`, build with `StringBuilder`.
- `substring(i, j)` is inclusive of `i`, exclusive of `j`.
- Prefer `StringBuilder` in loops to avoid O(n²) concatenation cost.
