## Definition

`toCharArray()` converts a `String` into a `char[]`, letting you inspect or process each character by index. A `char` in Java is a **16-bit unsigned** UTF-16 code unit and behaves like an integer, so you can do arithmetic and comparisons on it.

## Getting Characters

```java
String s = "Java";
char[] arr = s.toCharArray();   // ['J','a','v','a']
char first = s.charAt(0);        // 'J'  (single char without full array)

for (char c : s.toCharArray()) {
    System.out.print(c + " ");   // J a v a
}
```

## char Is a Number

```java
char c = 'A';
int code = c;             // 65  (implicit widening)
char next = (char)(c + 1);// 'B'
System.out.println('9' - '0');   // 9  (digit char -> int value)
System.out.println((char)('a' + 3)); // 'd'
```

## Character Utility Methods

| Method | Purpose |
|--------|---------|
| `Character.isDigit(c)` | is `'0'`–`'9'` |
| `Character.isLetter(c)` | is a letter |
| `Character.isLetterOrDigit(c)` | alphanumeric |
| `Character.isWhitespace(c)` | space/tab/newline |
| `Character.toUpperCase(c)` | uppercase form |
| `Character.toLowerCase(c)` | lowercase form |
| `Character.getNumericValue(c)` | `'7'` -> `7` |

## Example: Count Vowels

```java
int count = 0;
for (char c : "education".toCharArray()) {
    if ("aeiou".indexOf(Character.toLowerCase(c)) >= 0) count++;
}
System.out.println(count);   // 5
```

## Frequency Trick

```text
"abca"  ->  freq['a'-'a']++, freq['b'-'a']++, freq['c'-'a']++, freq['a'-'a']++
index:  a=0 b=1 c=2
freq =  [2, 1, 1, 0, ...]   // 'a' appears twice
```

## Key points

- `toCharArray()` gives a mutable `char[]`; edits to it do **not** change the original immutable String.
- `charAt(i)` is better when you need just one character — no array allocation.
- `char` participates in arithmetic; `c - '0'` converts a digit character to its int value.
- Use the `Character` wrapper's static helpers for classification instead of hand-written ranges.
- A `char[]` indexed by `c - 'a'` gives an O(1) frequency table for lowercase letters.
