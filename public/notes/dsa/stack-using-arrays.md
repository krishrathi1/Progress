## Problem

Implement a **stack** (LIFO — Last In First Out) using a fixed-size array. Support `push(x)`, `pop()`, `top()`, `size()`, and `isEmpty()`, each in O(1).

## Intuition

A stack only ever adds or removes at **one end** (the top). If we track an index `top` pointing to the last inserted element, both `push` and `pop` are just index arithmetic on a contiguous array — no shifting needed.

## Approach — Array with a top pointer

- Start `top = -1` (empty).
- `push`: increment `top`, store the value.
- `pop`: read `arr[top]`, then decrement `top`.
- `top()`: return `arr[top]` without removing.

```java
class Stack {
    private int[] arr;
    private int top;
    private int capacity;

    Stack(int cap) {
        capacity = cap;
        arr = new int[cap];
        top = -1;
    }
    void push(int x) {
        if (top == capacity - 1) throw new RuntimeException("Overflow");
        arr[++top] = x;
    }
    int pop() {
        if (isEmpty()) throw new RuntimeException("Underflow");
        return arr[top--];
    }
    int peek() {
        if (isEmpty()) throw new RuntimeException("Empty");
        return arr[top];
    }
    int size()      { return top + 1; }
    boolean isEmpty() { return top == -1; }
}
```

**Time:** O(1) per operation · **Space:** O(capacity)

```text
push 10, push 20, push 30
index:  0    1    2
arr : [10] [20] [30]     top = 2
pop() -> returns 30, top = 1
peek() -> 20
```

## Key points

- `top` points to the **current** top element; `-1` means empty.
- Guard against **overflow** (`top == capacity-1`) and **underflow** (empty).
- All operations are O(1); no element shifting occurs.
- Fixed array has a size limit — use a dynamic array (resize x2 when full) or a linked list for an unbounded stack.
- LIFO order: last pushed is first popped.
