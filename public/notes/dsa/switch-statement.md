## Definition

A **switch statement** selects one of many code blocks to execute by comparing a single expression against a list of constant `case` labels. It is a cleaner alternative to a long `if-else-if` ladder when branching on one variable's discrete values.

## Classic Syntax

```java
int day = 3;
switch (day) {
    case 1:
        System.out.println("Monday");
        break;               // exits the switch
    case 2:
        System.out.println("Tuesday");
        break;
    case 3:
        System.out.println("Wednesday");
        break;
    default:                 // runs if no case matches
        System.out.println("Other");
}
```

## The `break` and Fall-Through

Without `break`, execution **falls through** into the next case. This is a common bug, but can be used deliberately to group cases:

```java
switch (ch) {
    case 'a':
    case 'e':
    case 'i':
    case 'o':
    case 'u':
        System.out.println("Vowel");   // any vowel lands here
        break;
    default:
        System.out.println("Consonant");
}
```

```text
day = 3
 case 1 ─ skip
 case 2 ─ skip
 case 3 ─ MATCH -> print "Wednesday" -> break -> exit
```

## Modern Switch Expression (Java 14+)

Uses `->`, no fall-through, and can return a value:

```java
String name = switch (day) {
    case 1 -> "Monday";
    case 2 -> "Tuesday";
    case 3 -> "Wednesday";
    default -> "Other";
};
```

## switch vs if-else

| Aspect | switch | if-else ladder |
|--------|--------|----------------|
| Best for | One variable, many constant values | Ranges / complex conditions |
| Readability | High for many cases | Degrades with many branches |
| Condition type | int, char, String, enum, byte/short | Any boolean expression |
| Fall-through risk | Yes (classic form) | No |

## Key points

- Always add `break` in the classic form unless intentional fall-through is wanted.
- `default` is optional but recommended to handle unexpected values.
- Switch works on `int`, `char`, `byte`, `short`, `String`, and `enum` — not on `long`, `float`, `double`, or `boolean`.
- Prefer the arrow (`->`) switch expression in modern Java: no fall-through, more concise, returns a value.
- Use `if-else` when branching on ranges or multiple variables.
