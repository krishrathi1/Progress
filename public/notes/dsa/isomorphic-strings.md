## Problem

Two strings `s` and `t` are **isomorphic** if the characters in `s` can be replaced to get `t`, preserving order, where the mapping is a **bijection**: each character maps to exactly one character and **no two characters map to the same** character. Return `true` if isomorphic.

## Intuition

We need a consistent one-to-one mapping in **both directions**. Using a single map is not enough — `"ab" -> "aa"` would pass a one-way check but fails because two distinct source chars map to the same target. So track `s -> t` and `t -> s` together.

## Brute Force idea

Compare "pattern signatures" — replace each char by the index of its first occurrence and check both encode to the same sequence. Works but two passes and extra strings.

## Optimal — two hash maps

```java
class Solution {
    public boolean isIsomorphic(String s, String t) {
        if (s.length() != t.length()) return false;
        int[] mapST = new int[256];
        int[] mapTS = new int[256];
        java.util.Arrays.fill(mapST, -1);
        java.util.Arrays.fill(mapTS, -1);
        for (int i = 0; i < s.length(); i++) {
            char a = s.charAt(i), b = t.charAt(i);
            if (mapST[a] == -1 && mapTS[b] == -1) {
                mapST[a] = b;
                mapTS[b] = a;
            } else if (mapST[a] != b || mapTS[b] != a) {
                return false;      // conflict in either direction
            }
        }
        return true;
    }
}
```

**Time:** O(n) · **Space:** O(1) (fixed 256-size arrays)

### Dry run

```text
s = "egg", t = "add"
e->a, a->e   ok
g->d, d->g   ok
g->d already, matches   -> true

s = "foo", t = "bar"
f->b
o->a
o->r  but o already maps to a -> false
```

## Key points

- Requires a **bijection**: check `s->t` AND `t->s`.
- A single map fails cases like `"ab" -> "aa"`.
- Lengths must match first.
- Fixed alphabet -> O(1) space with int arrays; use `HashMap` for arbitrary Unicode.
