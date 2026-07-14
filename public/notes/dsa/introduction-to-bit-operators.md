## Introduction to Bit Operators

Bit manipulation works directly on the binary representation of integers. Because CPUs execute these operations in a single cycle, they are extremely fast and appear constantly in interview problems (masks, sets, toggling flags, math tricks).

### The core operators

| Operator | Symbol | Rule | Example (`a=6=110`, `b=3=011`) |
|----------|--------|------|-------------------------------|
| AND | `&` | 1 if **both** bits are 1 | `6 & 3 = 010 = 2` |
| OR | `\|` | 1 if **either** bit is 1 | `6 \| 3 = 111 = 7` |
| XOR | `^` | 1 if bits **differ** | `6 ^ 3 = 101 = 5` |
| NOT | `~` | flips every bit | `~6 = -7` (two's complement) |
| Left shift | `<<` | multiply by 2^k | `6 << 1 = 12` |
| Right shift | `>>` | divide by 2^k | `6 >> 1 = 3` |

### How each behaves

- **AND** is used to *check* or *clear* bits (masking).
- **OR** is used to *set* bits.
- **XOR** is used to *toggle* bits and has the magic property `x ^ x = 0`, `x ^ 0 = x`.
- **NOT** flips all bits; in two's complement `~x = -(x+1)`.
- **Shifts** move bits left/right. In Java use `>>>` for an *unsigned* (logical) right shift that fills with 0.

```java
int a = 6, b = 3;
System.out.println(a & b);   // 2
System.out.println(a | b);   // 7
System.out.println(a ^ b);   // 5
System.out.println(~a);      // -7
System.out.println(a << 1);  // 12
System.out.println(a >> 1);  // 3
```

```text
   a = 1 1 0   (6)
   b = 0 1 1   (3)
 & = 0 1 0   (2)   both 1
 | = 1 1 1   (7)   either 1
 ^ = 1 0 1   (5)   differ
```

### Common one-liners

- Multiply/divide by 2: `x << 1`, `x >> 1`
- Check if odd: `(x & 1) == 1`
- Swap without temp: `a ^= b; b ^= a; a ^= b;`
- Lowest set bit: `x & (-x)`

## Key points

- Two's complement means the leftmost bit is the sign; `~x = -x - 1`.
- `&` masks, `|` sets, `^` toggles — memorize these three verbs.
- Prefer `>>>` in Java when shifting unsigned quantities to avoid sign extension.
- Shifting by `>= 32` (int) or `>= 64` (long) is undefined/wraps — stay within width.
