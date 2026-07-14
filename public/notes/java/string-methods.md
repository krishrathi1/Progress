## Definition

The `java.lang.String` class provides a rich set of built-in **methods** to inspect, search, extract, transform, and compare strings. Because `String` is immutable, methods that "modify" a string actually **return a new** `String`; the original is unchanged.

## Common methods by category

| Category | Method | Purpose / Example |
|----------|--------|-------------------|
| Length | `length()` | `"abc".length()` → 3 |
| Char access | `charAt(i)` | `"abc".charAt(1)` → `'b'` |
| Search | `indexOf`, `lastIndexOf`, `contains` | `"hello".indexOf('l')` → 2 |
| Test | `startsWith`, `endsWith`, `isEmpty`, `isBlank` | `"file.txt".endsWith(".txt")` → true |
| Extract | `substring(b)`, `substring(b,e)` | `"hello".substring(1,4)` → `"ell"` |
| Case | `toUpperCase`, `toLowerCase` | `"Hi".toUpperCase()` → `"HI"` |
| Trim | `trim()`, `strip()` | `"  x  ".trim()` → `"x"` |
| Replace | `replace`, `replaceAll` | `"a-b".replace('-','_')` → `"a_b"` |
| Split/Join | `split`, `String.join` | `"a,b".split(",")` → `["a","b"]` |
| Compare | `equals`, `equalsIgnoreCase`, `compareTo` | `"a".compareTo("b")` → -1 |
| Convert | `toCharArray`, `valueOf` | `String.valueOf(42)` → `"42"` |

## Example

```java
String s = "  Hello, World  ";
System.out.println(s.trim());              // "Hello, World"
System.out.println(s.strip().length());    // 12
System.out.println(s.contains("World"));   // true
System.out.println(s.trim().substring(7)); // "World"
System.out.println("a,b,c".split(",").length); // 3
System.out.println("HI".equalsIgnoreCase("hi")); // true
System.out.println("abc".compareTo("abd"));      // -1 (c < d)
```

## Immutability note

```text
String s = "hi";
s.toUpperCase();          // returns "HI" — result DISCARDED
System.out.println(s);    // "hi"  (unchanged!)
s = s.toUpperCase();      // must reassign to keep result
```

## Key points

- `substring(begin, end)` is **inclusive of begin, exclusive of end**; length is `end - begin`.
- `compareTo` returns 0 if equal, negative if the string is lexicographically smaller, positive if larger.
- `replace` treats arguments as literal chars/strings; `replaceAll` uses a **regex** pattern.
- Prefer `strip()` (Unicode-aware) over the older `trim()` in modern code.
- Always reassign the returned value — the original string is never mutated.
