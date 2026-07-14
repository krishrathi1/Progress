## Problem

A valid parentheses string `s` can be decomposed into **primitive** parts — non-empty valid strings that cannot be split into two non-empty valid strings. Remove the **outermost** pair of parentheses from every primitive and return the result.

```text
s = "(()())(())"
primitives: "(()())" and "(())"
strip outer:  "()()"  +  "()"   ->  "()()()"
```

## Intuition

Track the current nesting **depth**. An opening `(` is outermost exactly when depth is currently `0`; a closing `)` is outermost when it brings depth back to `0`. Every other bracket lies **inside** a primitive and must be kept. So we append a character only when it is not one of these outermost brackets.

## Approach — Depth counter (optimal, one pass)

```java
String removeOuterParentheses(String s) {
    StringBuilder sb = new StringBuilder();
    int depth = 0;
    for (char c : s.toCharArray()) {
        if (c == '(') {
            if (depth > 0) sb.append(c);   // keep inner '('
            depth++;
        } else { // c == ')'
            depth--;
            if (depth > 0) sb.append(c);   // keep inner ')'
        }
    }
    return sb.toString();
}
```

**Time:** O(n) · **Space:** O(n) for the output (O(1) auxiliary besides the result)

Key ordering detail:
- For `(`: append **before** incrementing (so the very first `(` at depth 0 is skipped), then `depth++`.
- For `)`: decrement **first**, then append only if depth is still `> 0` (so the closer that returns to depth 0 is skipped).

```text
s = "(()())(())"
c  depth(before)  action
(     0           skip, depth->1
(     1           keep '(', depth->2
)     2->1        keep ')'
(     1           keep '(', depth->2
)     2->1        keep ')'
)     1->0        skip
(     0           skip, depth->1
(     1           keep '(', depth->2
)     2->1        keep ')'
)     1->0        skip
result = "()()()"
```

## Key points

- Depth `0` marks primitive boundaries — those brackets are the ones to drop.
- Handle the increment/decrement timing carefully so the boundary bracket is excluded, not an inner one.
- A stack works too, but the integer depth counter is `O(1)` extra space and cleaner.
