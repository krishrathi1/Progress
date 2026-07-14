## Problem

Given a string `num` representing a large non-negative integer, return the **largest-valued odd** integer that is a **non-empty substring**, or `""` if no odd substring exists. The answer must be a substring, so it always **starts at index 0**.

## Intuition

A number is odd iff its **last digit is odd**. Since the answer is a substring, its first character must be `num[0]`. To make the value as large as possible, we keep as many leading digits as we can. So we scan from the **right** and find the last odd digit — everything from index 0 up to that position is the largest odd number.

## Brute Force

Check every substring, test if odd, track the largest. This is `O(n^2)` substrings and expensive comparisons — unnecessary.

```text
"52" -> substrings: "5","52","2" ; odd ones: "5" -> answer "5"
```

## Optimal — scan from the right

```java
class Solution {
    public String largestOddNumber(String num) {
        for (int i = num.length() - 1; i >= 0; i--) {
            int d = num.charAt(i) - '0';
            if (d % 2 == 1) {           // last odd digit found
                return num.substring(0, i + 1);
            }
        }
        return "";                      // no odd digit at all
    }
}
```

**Time:** O(n) · **Space:** O(1) extra (output substring aside)

### Dry run

```text
num = "35427"
i=4 -> '7' odd  -> return num.substring(0,5) = "35427"

num = "4206"
i=3 '6' even, i=2 '0' even, i=1 '2' even, i=0 '4' even -> return ""
```

## Key points

- Oddness depends only on the **last digit**; keep maximum prefix length.
- Answer is a prefix `num[0..i]` where `i` is the **rightmost odd digit**.
- Return `""` when all digits are even.
- No need to worry about leading zeros — a prefix of the original string preserves them as given; value comparison still holds because longer prefix = larger number.
