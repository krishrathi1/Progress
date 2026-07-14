## Problem

Given a string of digits **2–9**, return all letter combinations the number could spell, using the classic phone keypad mapping. Return an empty list for an empty input.

```text
2→abc  3→def  4→ghi  5→jkl  6→mno
7→pqrs 8→tuv  9→wxyz
```

**Example:** `"23"` → `["ad","ae","af","bd","be","bf","cd","ce","cf"]`

## Intuition

Each digit maps to a set of letters. Building a combination = picking **one letter per digit**. This is a Cartesian product, naturally solved by **backtracking**: at index `i` try every letter of `digits[i]`, recurse to `i+1`, then undo.

## Backtracking solution

```java
class Solution {
    private static final String[] MAP = {
        "", "", "abc", "def", "ghi", "jkl",
        "mno", "pqrs", "tuv", "wxyz"
    };

    public List<String> letterCombinations(String digits) {
        List<String> res = new ArrayList<>();
        if (digits == null || digits.isEmpty()) return res;
        backtrack(0, digits, new StringBuilder(), res);
        return res;
    }

    private void backtrack(int i, String digits,
                           StringBuilder cur, List<String> res) {
        if (i == digits.length()) {
            res.add(cur.toString());
            return;
        }
        String letters = MAP[digits.charAt(i) - '0'];
        for (char c : letters.toCharArray()) {
            cur.append(c);
            backtrack(i + 1, digits, cur, res);
            cur.deleteCharAt(cur.length() - 1);  // undo
        }
    }
}
```

**Time:** O(4^n · n) — up to 4 letters per digit, n = number of digits · **Space:** O(n) recursion depth

### Recursion tree ("23")

```text
                  ""
        a          b          c        (digit 2)
      / | \      / | \      / | \
     ad ae af   bd be bf   cd ce cf    (digit 3)
```

## Iterative alternative (BFS build-up)

```java
List<String> res = new ArrayList<>(List.of(""));
for (char d : digits.toCharArray()) {
    String letters = MAP[d - '0'];
    List<String> next = new ArrayList<>();
    for (String prefix : res)
        for (char c : letters.toCharArray())
            next.add(prefix + c);
    res = next;
}
```

**Time:** O(4^n · n) · **Space:** O(4^n) output

## Key points

- Handle the empty-string edge case first — otherwise you return `[""]`.
- Backtracking with a shared `StringBuilder` avoids allocating a new string at every level.
- The number of results is the product of choices; complexity is exponential in digit count.
- Both recursive and iterative forms are common; interviewers often expect the recursive one.
