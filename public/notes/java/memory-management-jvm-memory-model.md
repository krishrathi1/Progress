## Definition

**JVM memory management** is how the Java Virtual Machine allocates, organizes, and reclaims memory during execution. Memory is divided into runtime data areas; the **heap** stores objects and is cleaned automatically by the **garbage collector**, while the **stack** holds per-thread method frames.

## Runtime Memory Areas

| Area | Shared? | Holds |
|------|---------|-------|
| **Heap** | All threads | Objects, instance fields, arrays |
| **Stack** | Per thread | Frames: local variables, references, partial results |
| **Metaspace** | All threads | Class metadata (replaced PermGen in Java 8) |
| **PC Register** | Per thread | Address of current instruction |
| **Native Method Stack** | Per thread | State for native (JNI) calls |

## Heap Generations

```text
+---------------------- HEAP ----------------------+
|  Young Generation        |   Old (Tenured) Gen   |
|  [ Eden | S0 | S1 ]      |   long-lived objects  |
+--------------------------+-----------------------+
        ^ minor GC here            ^ major/full GC here

New object -> Eden. Survives GC -> Survivor -> promoted to Old.
```

- **Young gen:** new objects; frequent, fast **minor GC** (most objects die young).
- **Old gen:** objects that survived many collections; **major GC** is rarer but costlier.
- **Metaspace:** grows in native memory; class definitions.

## Stack vs Heap

```java
void demo() {
    int x = 10;                 // x (value) -> stack
    Person p = new Person();    // reference p -> stack, object -> heap
}                               // frame popped; object now unreachable -> GC-eligible
```

| Aspect | Stack | Heap |
|--------|-------|------|
| Stores | primitives, references, frames | objects |
| Lifetime | method call duration | until GC |
| Access | fast (LIFO) | slower |
| Thread | private | shared |
| Error | `StackOverflowError` | `OutOfMemoryError` |

## Automatic Management

- `new` allocates on the heap; you never `free()` manually.
- The GC reclaims **unreachable** objects (no live reference chain from GC roots).
- Common tuning flags: `-Xms` (initial heap), `-Xmx` (max heap), `-Xss` (stack size).

## Key points

- Heap = objects (shared); Stack = frames/locals/references (per thread).
- Objects start in Eden; survivors are promoted to the old generation.
- Metaspace (native memory) replaced PermGen in Java 8.
- Unreachable heap objects are reclaimed automatically by the GC.
- Deep recursion → `StackOverflowError`; heap exhaustion → `OutOfMemoryError`.
