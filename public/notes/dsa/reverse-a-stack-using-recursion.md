## Problem

Reverse a stack using **only recursion** — no extra data structure. You may use the recursion (call) stack to hold elements temporarily.

## Intuition

Two recursive routines mirror the "sort a stack" pattern:

1. **`reverse(stack)`** — pop the top, reverse the remaining stack, then **insert the popped element at the bottom**.
2. **`insertAtBottom(stack, x)`** — if the stack is empty, push `x`; otherwise pop the top, recurse to place `x` at the bottom, then push the top back.

Every original top element ends up pushed to the bottom, which flips the order.

## Approach — Insert at Bottom

```java
import java.util.Stack;

class Solution {
    public void reverse(Stack<Integer> st) {
        if (st.isEmpty()) return;
        int top = st.pop();
        reverse(st);            // reverse the smaller stack first
        insertAtBottom(st, top);
    }

    private void insertAtBottom(Stack<Integer> st, int x) {
        if (st.isEmpty()) {     // reached the very bottom
            st.push(x);
            return;
        }
        int top = st.pop();     // hold on the call stack
        insertAtBottom(st, x);  // drill down
        st.push(top);           // restore on the way back
    }
}
```

**Time:** O(n^2) — reversing calls `insertAtBottom` (O(n)) for each of n elements.
**Space:** O(n) recursion depth.

## Dry Run

```text
Stack (bottom->top): [1, 2, 3]

reverse pops 3, 2, 1 down to empty
insertAtBottom 1 -> [1]
insertAtBottom 2 -> hold 1, push 2, push 1 -> [2, 1]
insertAtBottom 3 -> hold 1, hold 2, push 3, restore -> [3, 2, 1]

Result (bottom->top): [3, 2, 1]
```

## Key points

- **Reverse** = repeatedly move the current top to the bottom.
- `insertAtBottom` base case: empty stack → push `x`.
- Call stack stores held elements; no auxiliary array or second stack.
- Compare with **sort a stack**: same two-function shape, but here the helper always drives to the bottom instead of comparing values.
- Complexity: **O(n^2)** time, **O(n)** space.
