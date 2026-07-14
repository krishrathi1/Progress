## Problem

Sort a stack in **ascending order** (largest on top) using **only recursion** — no extra arrays, no other stack, and no loops over an auxiliary container. You may use the call stack.

## Intuition

Break it into two recursive routines:

1. **`sort(stack)`** — pop the top, sort the smaller remaining stack, then insert the popped element back in the correct place.
2. **`insertSorted(stack, x)`** — insert `x` so the stack stays sorted. If `x` is larger than the top (or the stack is empty), push it. Otherwise pop the top, insert `x` into the rest, then push the top back.

This is essentially insertion sort expressed with the call stack holding the "held-out" elements.

## Approach — Two Recursive Helpers

```java
import java.util.Stack;

class Solution {
    public void sortStack(Stack<Integer> st) {
        if (st.isEmpty()) return;
        int top = st.pop();          // remove top
        sortStack(st);               // sort the rest
        insertSorted(st, top);       // put top back in order
    }

    private void insertSorted(Stack<Integer> st, int x) {
        // base case: empty OR x belongs on top
        if (st.isEmpty() || st.peek() <= x) {
            st.push(x);
            return;
        }
        int top = st.pop();          // hold larger element on call stack
        insertSorted(st, x);         // insert x below it
        st.push(top);                // restore
    }
}
```

**Time:** O(n^2) — each of `n` elements may trigger up to `n` insert steps.
**Space:** O(n) recursion stack depth.

## Dry Run

```text
Stack (bottom->top): [3, 1, 2]

sort pops 2, then 1, then 3 -> reaches empty
insert 3            -> [3]
insert 1: 1 < 3     -> hold 3, push 1, push 3  -> [1, 3]
insert 2: 2 < 3 hold, 2 >= 1 push -> [1, 2, 3]

Result (bottom->top): [1, 2, 3]  (3 on top = largest)
```

## Key points

- Two functions: recursive **sort** + recursive **sorted insert**.
- Base case of `insertSorted`: stack empty or top `<=` x → push.
- The call stack itself acts as the temporary storage — no explicit second stack.
- Change `<=` to `>=` in the base case to sort in the opposite order.
- Complexity: **O(n^2)** time, **O(n)** stack space.
