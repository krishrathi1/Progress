## Problem

An **Armstrong number** (narcissistic number) is a number equal to the sum of each of its digits raised to the power of the **number of digits**. Given `n`, return whether it is Armstrong.

- 3-digit example: `153 = 1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153` -> true
- `9474 = 9^4 + 4^4 + 7^4 + 4^4 = 9474` -> true
- `123 = 1 + 8 + 27 = 36 != 123` -> false

## Intuition

Two things are needed: the **digit count** `d` (to know the exponent) and the **sum of each digit^d**. Extract digits with `% 10` and `/ 10`, raise each to the power `d`, accumulate, then compare to the original.

## Approach 1: Two passes (clear/standard)

First pass counts digits, second pass sums the powers.

```java
boolean isArmstrong(int n) {
    int original = n, d = 0, temp = n;
    while (temp > 0) { d++; temp /= 10; }   // count digits

    int sum = 0;
    temp = n;
    while (temp > 0) {
        int digit = temp % 10;
        sum += (int) Math.pow(digit, d);     // digit ^ d
        temp /= 10;
    }
    return sum == original;
}
```

**Time:** O(d · cost(pow)) ~ O(d log d) · **Space:** O(1)

## Approach 2: Precompute digit count, integer power (optimal)

Avoid `Math.pow` (floating point) by writing an integer power helper; count digits with `log10`.

```java
boolean isArmstrong(int n) {
    int d = (int) Math.log10(n) + 1;         // digit count
    int sum = 0, temp = n;
    while (temp > 0) {
        int digit = temp % 10;
        int p = 1;
        for (int i = 0; i < d; i++) p *= digit; // integer power
        sum += p;
        temp /= 10;
    }
    return sum == n;
}
```

**Time:** O(d^2) · **Space:** O(1)

## Dry run

```text
n = 153, d = 3
  digit=3 -> 3^3 = 27,  sum=27
  digit=5 -> 5^3 = 125, sum=152
  digit=1 -> 1^3 = 1,   sum=153
sum(153) == n(153) -> Armstrong TRUE
```

## Key points

- Exponent = **number of digits**, not always 3 (only 3-digit ones use cube).
- Prefer integer power over `Math.pow` to avoid floating-point rounding on large digits.
- Digit count = `(int) Math.log10(n) + 1` for `n > 0` (special-case `0`).
- Same digit-extraction loop as palindrome / digit-sum problems.
