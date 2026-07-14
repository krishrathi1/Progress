## Definition

A **regular expression (regex)** is a pattern describing a set of strings. Java's `java.util.regex` package provides two main classes: **`Pattern`** (a compiled regex) and **`Matcher`** (applies the pattern to input). `String` also offers shortcut methods (`matches`, `replaceAll`, `split`).

## Core Workflow

```java
import java.util.regex.*;

Pattern p = Pattern.compile("\\d{3}-\\d{4}"); // compile once, reuse
Matcher m = p.matcher("call 123-4567 now");
if (m.find()) {
    System.out.println(m.group()); // 123-4567
    System.out.println(m.start()); // 5  (index)
}
```

- `matches()` – whole input must match.
- `find()` – locates next partial match (call in a loop).
- `group(n)` – captured group `n` (0 = whole match).

## Common Metacharacters

| Pattern | Meaning |
|---------|---------|
| `.` | any char (except newline) |
| `\d` `\w` `\s` | digit / word char / whitespace |
| `\D` `\W` `\S` | negations |
| `^` `$` | start / end of line |
| `*` `+` `?` | 0+, 1+, 0 or 1 |
| `{n}` `{n,m}` | exactly n / n-to-m times |
| `[abc]` `[^abc]` | char class / negated |
| `(…)` | capturing group |
| `a|b` | alternation |

**Note:** in Java strings backslashes are doubled — regex `\d` is written `"\\d"`.

## Groups and Replacement

```java
String s = "2026-07-14";
Matcher m = Pattern.compile("(\\d{4})-(\\d{2})-(\\d{2})").matcher(s);
if (m.matches())
    System.out.println(m.group(2)); // 07  (month)

// swap to DD/MM/YYYY using back-references
String out = s.replaceAll("(\\d{4})-(\\d{2})-(\\d{2})", "$3/$2/$1");
System.out.println(out); // 14/07/2026
```

```text
Greedy vs lazy on "<a><b>":
  <.*>   greedy -> matches "<a><b>"  (as much as possible)
  <.*?>  lazy   -> matches "<a>"     (as little as possible)
```

## Key points

- Compile a `Pattern` once and reuse it; compilation is costly.
- `matches()` = full string; `find()` = search substring.
- Double backslashes in Java string literals (`"\\d+"`).
- `?` after a quantifier makes it **lazy** (minimal match).
- Use `$1, $2` in replacement strings to reference capture groups.
- `Pattern.CASE_INSENSITIVE` and other flags tune matching.
