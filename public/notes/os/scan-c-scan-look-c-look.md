## Definition

These are **disk scheduling algorithms** that move the read/write head across cylinders in a directional sweep rather than jumping to the nearest request. They avoid the starvation of SSTF by giving a bounded, predictable service order. Collectively they are called **elevator algorithms** because the head behaves like a lift that services floors in one direction, then reverses.

## The four algorithms

- **SCAN (Elevator):** Head moves in one direction serving all requests until it reaches the **last cylinder (disk end)**, then reverses and services requests in the other direction.
- **C-SCAN (Circular SCAN):** Head moves in one direction to the disk end, then **jumps back to the start** (servicing nothing on the return) and scans the same direction again. Gives more **uniform wait time**.
- **LOOK:** Like SCAN, but the head only goes as far as the **last request** in that direction (it does not travel to the physical disk end), then reverses.
- **C-LOOK:** Like C-SCAN, but jumps back only to the **first request** (not cylinder 0), then continues.

```text
Queue: 98 183 37 122 14 124 65 67  | head at 53, moving toward higher cylinders, disk 0..199

SCAN  : 53->65->67->98->122->124->183->199 (end) ->37->14
C-SCAN: 53->65->67->98->122->124->183->199 -> 0 ->14->37
LOOK  : 53->65->67->98->122->124->183 (last) ->37->14
C-LOOK: 53->65->67->98->122->124->183 -> 14 ->37
```

## Comparison

| Algorithm | Travels to disk end? | Return sweep serves requests? | Wait uniformity |
|-----------|----------------------|-------------------------------|-----------------|
| SCAN      | Yes                  | Yes (reverse direction)       | Moderate        |
| C-SCAN    | Yes                  | No (jump back, one direction) | High (uniform)  |
| LOOK      | No (last request)    | Yes (reverse direction)       | Moderate        |
| C-LOOK    | No (first request)   | No (jump back)                | High (uniform)  |

## Key points

- LOOK/C-LOOK are **optimizations** of SCAN/C-SCAN that skip unnecessary travel to disk ends, so less total head movement.
- C-SCAN and C-LOOK give **more uniform** waiting times because every cylinder is approached from the same direction.
- No starvation: every request is served within one full sweep.
- Real disks favor LOOK-family schedulers for balanced throughput and fairness.
