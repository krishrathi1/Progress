## Definition

The `switch` statement is a **multi-way branch** that compares a single expression against several constant `case` labels and jumps to the first match. It is a cleaner alternative to a long `if-else-if` ladder when testing **one variable for equality** against many values.

## Allowed switch types

- `byte`, `short`, `char`, `int` (and their wrappers)
- `enum` constants
- `String` (since Java 7)

Not allowed: `long`, `float`, `double`, `boolean`, or non-constant expressions in `case`.

## Syntax and fall-through

```java
int day = 3;
switch (day) {
    case 1: System.out.println("Mon"); break;
    case 2: System.out.println("Tue"); break;
    case 3: System.out.println("Wed"); break;   // matches
    default: System.out.println("Other");
}
```

- `break` exits the switch. **Without `break`, execution falls through** into the next case.
- `default` runs when no case matches; it can be placed anywhere but runs only if reached/unmatched.

```text
day = 3
 case 1 ─ no
 case 2 ─ no
 case 3 ─ YES ─► print "Wed" ─► break ─► exit
```

### Intentional fall-through (grouping)

```java
switch (ch) {
    case 'a': case 'e': case 'i':
    case 'o': case 'u':
        System.out.println("Vowel"); break;
    default:
        System.out.println("Consonant");
}
```

## Classic vs enhanced switch (Java 14+)

```java
String type = switch (day) {
    case 1, 7 -> "Weekend?";
    case 2, 3, 4, 5, 6 -> "Weekday";
    default -> "Invalid";
};   // arrow form: no fall-through, can return a value
```

| Feature | Classic `switch` | Enhanced `switch ->` |
|---------|-----------------|----------------------|
| Fall-through | Yes (needs `break`) | No |
| Multiple labels | Separate cases | `case 1, 7 ->` |
| Returns value | No | Yes (expression) |

## Key points

- Works on equality only; use `if-else` for ranges/relational tests.
- Forgetting `break` in classic switch is a common bug (unintended fall-through).
- `case` labels must be **compile-time constants** and unique.
- Enhanced arrow switch is safer: no fall-through and usable as an expression.
