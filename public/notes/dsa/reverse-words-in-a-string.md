## Problem

Given a string `s` of words separated by spaces, reverse the **order of the words**. Trim leading/trailing spaces and collapse multiple spaces between words into a single space. The characters within each word stay in the same order.

```text
s = "  the sky  is blue "
->  "blue is sky the"
```

## Intuition

Two clean strategies:
1. **Split and reverse** — split on whitespace (ignoring empties), then join the words back-to-front.
2. **In-place-style** — reverse the whole string, then reverse each individual word (classic interview trick; `O(1)` extra space in languages with mutable strings like C++).

## Approach 1 — Split / trim / join (simple, optimal time)

```java
String reverseWords(String s) {
    String[] parts = s.trim().split("\\s+");   // split on runs of spaces
    StringBuilder sb = new StringBuilder();
    for (int i = parts.length - 1; i >= 0; i--) {
        sb.append(parts[i]);
        if (i > 0) sb.append(' ');
    }
    return sb.toString();
}
```

**Time:** O(n) · **Space:** O(n)

## Approach 2 — Reverse-whole-then-reverse-each-word (C++, O(1) aux)

```cpp
string reverseWords(string s) {
    reverse(s.begin(), s.end());          // 1) reverse everything
    int n = s.size(), idx = 0;
    for (int i = 0; i < n; ) {
        while (i < n && s[i] == ' ') i++;             // skip spaces
        if (i >= n) break;
        if (idx != 0) s[idx++] = ' ';                 // one separator
        int start = idx;
        while (i < n && s[i] != ' ') s[idx++] = s[i++];// copy word
        reverse(s.begin() + start, s.begin() + idx);  // 2) fix word
    }
    s.resize(idx);
    return s;
}
```

**Time:** O(n) · **Space:** O(1) auxiliary

```text
"  the sky is blue "
reverse all -> " eulb si yks eht  "
walk left->right, skip spaces, copy & reverse each token:
  "eulb"->"blue", "si"->"is", "yks"->"sky", "eht"->"the"
compacted -> "blue is sky the"
```

## Key points

- Regex `\\s+` after `trim()` handles multiple/leading/trailing spaces in one shot.
- The double-reverse trick avoids allocating a word array — reverse the buffer, then reverse each word back to correct order.
- Watch the output spacing: exactly one space between words, none at the ends.
