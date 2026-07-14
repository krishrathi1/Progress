## Definition

An **operator** is a symbol that performs an operation on one or more **operands** (values/variables) and produces a result. Java operators are grouped by function: arithmetic, relational, logical, assignment, unary, bitwise, and the ternary conditional operator.

## Categories

| Category | Operators | Example |
|----------|-----------|---------|
| Arithmetic | `+ - * / %` | `a + b`, `a % b` |
| Relational | `== != > < >= <=` | `a > b` |
| Logical | `&& \|\| !` | `a && b` |
| Assignment | `= += -= *= /= %=` | `a += 5` |
| Unary | `+ - ++ -- !` | `a++`, `!flag` |
| Bitwise | `& \| ^ ~ << >> >>>` | `a & b` |
| Ternary | `?:` | `x > 0 ? "pos" : "neg"` |

```java
int a = 10, b = 3;
System.out.println(a / b);   // 3  (integer division)
System.out.println(a % b);   // 1  (remainder)

boolean r = (a > 5) && (b < 5);   // true
String sign = (a >= 0) ? "positive" : "negative";

int x = 5;
System.out.println(x++);   // 5 (post: use then increment)
System.out.println(++x);   // 7 (pre: increment then use)
```

## Bitwise & shift

```java
int p = 6, q = 3;      // 110 , 011
System.out.println(p & q);   // 2  (010)
System.out.println(p | q);   // 7  (111)
System.out.println(p ^ q);   // 5  (101)
System.out.println(p << 1);  // 12 (multiply by 2)
System.out.println(p >> 1);  // 3  (divide by 2)
```

## Precedence (high → low)

```text
1. Postfix        a++ a--
2. Unary          ++a --a !  ~
3. Multiplicative * / %
4. Additive       + -
5. Relational     < > <= >=
6. Equality       == !=
7. Logical AND    &&
8. Logical OR     ||
9. Ternary        ?:
10. Assignment    = += -= ...
```

## Key points

- Integer `/` truncates (`10/3 == 3`); use `double` operands for real division.
- `&&` and `||` are **short-circuit** — the right operand may not be evaluated.
- **Pre-increment** (`++x`) updates before use; **post-increment** (`x++`) after.
- `>>>` is the **unsigned right shift** (fills with 0); `>>` preserves the sign bit.
- Use parentheses to make precedence explicit and code readable.
