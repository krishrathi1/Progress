## Definition

**Keywords** are reserved words that have a predefined meaning in the Java language (e.g., `class`, `if`, `int`). They cannot be used as names. **Identifiers** are the names programmers give to classes, methods, variables, and packages. Choosing valid, meaningful identifiers is essential for readable code.

## Keywords

- Java has **~50 reserved keywords**; all are **lowercase**.
- They cannot be used as identifiers.
- `true`, `false`, and `null` are **reserved literals** (not technically keywords, but also cannot be used as names).

```text
Common keywords by group:
 Data types : int, double, char, boolean, long, byte, short, float
 Control    : if, else, switch, case, for, while, do, break, continue
 OOP        : class, interface, extends, implements, new, this, super
 Modifiers  : public, private, protected, static, final, abstract
 Exceptions : try, catch, finally, throw, throws
 Other      : void, return, package, import, instanceof, enum
```

## Identifier rules

1. May contain letters, digits, `_` (underscore), and `$`.
2. Must **not start with a digit** (letter, `_`, or `$` only).
3. **Cannot** be a reserved keyword.
4. **Case-sensitive**: `age`, `Age`, `AGE` are different.
5. No spaces or other symbols; no length limit.

```java
int age = 25;         // valid
int _count = 0;       // valid
int $price = 10;      // valid
double totalAmount;   // valid (camelCase convention)

// int 2num;          // invalid: starts with digit
// int class;         // invalid: keyword
// int my age;        // invalid: contains space
```

## Valid vs Invalid

| Identifier | Valid? | Reason |
|-----------|--------|--------|
| `myVar` | Yes | letters only |
| `total_1` | Yes | letters, digit, `_` |
| `1value` | No | starts with digit |
| `for` | No | reserved keyword |
| `first name` | No | contains a space |

## Naming conventions

- **Classes**: `PascalCase` (e.g., `StudentRecord`).
- **Variables/methods**: `camelCase` (e.g., `totalMarks`).
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `MAX_SIZE`).
- **Packages**: all lowercase (e.g., `com.app.utils`).

## Key points

- Keywords are **reserved and lowercase**; they cannot be identifiers.
- Identifiers cannot **start with a digit** and are **case-sensitive**.
- `_` and `$` are allowed; `$` is by convention reserved for generated code.
- Follow naming conventions for readable, professional code.
- `true`, `false`, `null` are literals and cannot be reused as names.
