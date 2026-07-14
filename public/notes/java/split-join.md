## Definition

- **`split(regex)`** breaks a String into a `String[]` around matches of a **regular expression**.
- **`String.join(delimiter, parts...)`** does the reverse: it concatenates pieces with a separator between them.

They are complementary — parse input with `split`, rebuild output with `join`.

## split()

```java
String csv = "a,b,c";
String[] parts = csv.split(",");     // ["a", "b", "c"]

"1 2   3".split("\\s+");             // ["1", "2", "3"]  (regex: one+ spaces)
"a,b,,".split(",");                   // ["a", "b"]  trailing empties removed
"a,b,,".split(",", -1);               // ["a", "b", "", ""]  keep all
"a1b2c".split("\\d", 2);              // ["a", "b2c"]  limit = 2
```

- The argument is a **regex**, so escape metacharacters: `"\\."` to split on a dot.
- A positive **limit** caps the number of pieces; `-1` keeps trailing empty strings; `0` (default) drops them.

## join()

```java
String.join("-", "2024", "07", "14");        // "2024-07-14"

List<String> words = List.of("Java", "is", "fun");
String.join(" ", words);                       // "Java is fun"
```

## Round-Trip Diagram

```text
"a,b,c"  --split(",")-->  ["a","b","c"]  --join("-")-->  "a-b-c"
```

## Related Tools

| Task | Tool |
|------|------|
| Split with a `Stream` | `Pattern.compile(",").splitAsStream(s)` |
| Join with prefix/suffix | `Collectors.joining(", ", "[", "]")` |
| Split on literal (no regex) | `Pattern.quote(".")` |

## Key points

- `split` takes a **regex**; dots, pipes, and parentheses must be escaped.
- Use the two-arg `split(regex, limit)` with `-1` to preserve trailing empty fields.
- `String.join` (Java 8+) accepts varargs or any `Iterable<CharSequence>`.
- For streams, `Collectors.joining()` builds delimited output with optional prefix/suffix.
- `split` never includes the delimiter in the results.
