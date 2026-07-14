## Definition

**Operator overloading** lets you redefine the meaning of built-in operators (`+`, `-`, `==`, `<<`, `[]`, etc.) for **user-defined types**, so objects can be manipulated with familiar, readable syntax. It is a form of **compile-time (static) polymorphism** — the correct operator function is chosen by the compiler from operand types. C++ supports it fully; Java does **not** (except the built-in `+` for `String`).

## Syntax (C++)

An operator is overloaded by defining a function named `operator<symbol>`, either as a **member** or a **non-member (often `friend`)** function.

```cpp
class Complex {
    double re, im;
public:
    Complex(double r = 0, double i = 0) : re(r), im(i) {}

    // member: left operand is *this
    Complex operator+(const Complex& o) const {
        return Complex(re + o.re, im + o.im);
    }
    bool operator==(const Complex& o) const {
        return re == o.re && im == o.im;
    }
    // friend: needed when left operand isn't a Complex (e.g. cout)
    friend std::ostream& operator<<(std::ostream& os, const Complex& c) {
        return os << c.re << " + " << c.im << "i";
    }
};

Complex a(1, 2), b(3, 4);
Complex c = a + b;     // calls a.operator+(b)
std::cout << c;        // 4 + 6i
```

## Member vs non-member

```text
a + b   →  member:      a.operator+(b)
        →  non-member:  operator+(a, b)

Rule of thumb:
  unary, [], (), ->, =   →  MUST be members
  <<, >>  (stream ops)   →  non-member/friend (left operand is stream)
  symmetric binary (+ ==)→  non-member allows implicit conversion on both sides
```

## Rules & limits

| Rule | Detail |
|------|--------|
| Cannot invent operators | Only overload existing ones |
| Cannot overload | `::`, `.`, `.*`, `?:`, `sizeof` |
| Arity/precedence fixed | Cannot change how many operands or their precedence |
| At least one operand | Must be a user-defined type |

## Key points

- Overloading is syntactic sugar — under the hood it is a normal function call.
- Keep semantics **intuitive**: `+` should add, not surprise. Preserve expected symmetry (if `==`, also give `!=`).
- Return by value for arithmetic; return `*this` by reference for `=`, `+=`, `<<`.
- Java omits it deliberately for simplicity; use named methods like `add()` / `equals()` instead.
