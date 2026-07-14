## Problem

Given an integer `n`, determine whether it is a **palindrome** — a number that reads the same forwards and backwards (e.g. `121`, `1331`). Return `true` if it is, `false` otherwise.

- `121` -> palindrome (`121` reversed is `121`)
- `123` -> not a palindrome
- Negative numbers like `-121` are **not** palindromes (the `-` breaks symmetry).

## Intuition

A number is a palindrome when it equals its own reverse. So the core sub-task is to **reverse the digits** and compare. We can reverse the whole number, or — more cleverly — reverse only the second half to save work.

## Approach 1: Reverse the full number (brute/standard)

Extract digits from the right using `% 10`, build the reversed value, then compare. Watch out for integer overflow on the reversed value for large inputs; using `long` avoids it.

```java
boolean isPalindrome(int n) {
    if (n < 0) return false;          // negatives never palindromes
    long rev = 0;
    int original = n;
    while (n > 0) {
        int digit = n % 10;           // last digit
        rev = rev * 10 + digit;       // append to reverse
        n /= 10;                      // drop last digit
    }
    return rev == original;
}
```

**Time:** O(d) where d = number of digits (log10 n) · **Space:** O(1)

## Approach 2: Reverse only half the digits (optimal)

Reverse digits until the remaining number is <= the reversed part. For odd lengths, drop the middle digit with `rev / 10`.

```java
boolean isPalindrome(int n) {
    if (n < 0 || (n % 10 == 0 && n != 0)) return false;
    int rev = 0;
    while (n > rev) {
        rev = rev * 10 + n % 10;
        n /= 10;
    }
    return n == rev || n == rev / 10; // even len or odd len
}
```

**Time:** O(d/2) · **Space:** O(1)

## Dry run

```text
n = 1221
step1: digit=1, rev=1,   n=122
step2: digit=2, rev=12,  n=12   -> now n(12) <= rev(12), stop
even length: n(12) == rev(12) -> TRUE (palindrome)
```

## Key points

- Handle negatives (`< 0`) and use `long` for the full-reverse version to dodge overflow.
- Half-reversal stops early and never overflows.
- Same digit-extraction pattern (`% 10`, `/= 10`) powers many number problems.
