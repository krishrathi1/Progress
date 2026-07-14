## Definition

**Error correction** lets the receiver not only *detect* but also *locate and fix* corrupted bits without asking for retransmission (Forward Error Correction, FEC). **Hamming code** is a classic single-bit error-correcting linear block code that inserts parity bits at power-of-two positions.

## Key Idea

To correct a single-bit error among `m` data bits we add `r` redundant (parity) bits such that:

```text
2^r >= m + r + 1
```

The `r` parity bits together form a **syndrome** — a binary number that points to the exact position of the flipped bit (0 means no error).

## Encoding Steps (Hamming(7,4) example)

- Parity bits sit at positions that are powers of two: **1, 2, 4, 8, ...**
- Data bits fill the remaining positions: 3, 5, 6, 7, ...
- Each parity bit `P` at position `2^k` covers every position whose binary index has bit `k` set (uses even parity).

```text
Data = 1011 (d1 d2 d3 d4)

Pos : 1  2  3  4  5  6  7
Bit : P1 P2 d1 P4 d2 d3 d4
        ?  ?  1  ?  0  1  1

P1 covers 1,3,5,7 -> 1,0,1 -> P1=0 (even)
P2 covers 2,3,6,7 -> 1,1,1 -> P2=1
P4 covers 4,5,6,7 -> 0,1,1 -> P4=0

Transmitted codeword: 0 1 1 0 0 1 1
```

## Decoding (locate the error)

- Receiver recomputes each parity check over its coverage set.
- Failed checks form the syndrome `C4 C2 C1` (binary) = **position of the bad bit**.
- Flip that bit to correct it; syndrome `000` means no error.

```text
Received: 0 1 1 0 1 1 1  (bit 5 flipped)
C1 (1,3,5,7): 0+1+1+1 = odd  -> 1
C2 (2,3,6,7): 1+1+1+1 = even -> 0
C4 (4,5,6,7): 0+1+1+1 = odd  -> 1
Syndrome = 101 = 5 -> flip position 5 -> corrected
```

## Comparison

| Scheme | Detects | Corrects | Overhead |
|--------|---------|----------|----------|
| Parity bit | 1-bit (odd count) | none | 1 bit |
| Hamming code | up to 2-bit | 1-bit | r bits |
| Hamming + extra parity (SECDED) | 2-bit | 1-bit | r+1 bits |
| CRC | burst errors | none (detect only) | n bits |

## Key points

- Add an overall parity bit to get **SECDED**: Single Error Correction, Double Error Detection.
- Minimum Hamming **distance d = 3** to correct 1 error (`t = (d-1)/2`).
- FEC avoids retransmission latency — ideal for one-way / high-latency links (satellite, deep space).
- Syndrome directly encodes the erroneous bit position, making correction O(1) after parity checks.
