## Definition

The **JVM** is the runtime engine that turns **bytecode** into machine actions. Its architecture has three main subsystems: the **Class Loader**, the **Runtime Data Areas (memory)**, and the **Execution Engine**.

## End-to-End Flow

```text
 .java --javac--> .class (bytecode)
                     |
              +------v-------+
              | Class Loader | load -> link (verify/prepare/resolve) -> init
              +------+-------+
                     |
        +------------v-------------+
        |   Runtime Data Areas     |
        |  Method Area | Heap      |  (shared)
        |  Stacks | PC | Native    |  (per thread)
        +------------+-------------+
                     |
             +-------v--------+
             | Execution Engine|  Interpreter + JIT + GC
             +-------+--------+
                     |
              Native OS / CPU
```

## 1. Class Loader Subsystem

- **Loading** – reads `.class` bytes. Three loaders follow **delegation**: **Bootstrap → Extension/Platform → Application**.
- **Linking** – **Verify** (bytecode safety) → **Prepare** (default-init statics) → **Resolve** (symbolic refs).
- **Initialization** – runs static blocks and static initializers.

## 2. Runtime Data Areas (Memory)

| Area | Scope | Stores |
|------|-------|--------|
| **Method Area** | Shared | Class metadata, static fields, constant pool |
| **Heap** | Shared | All objects and arrays (GC managed) |
| **JVM Stacks** | Per thread | Frames: local vars, partial results |
| **PC Register** | Per thread | Address of current instruction |
| **Native Method Stack** | Per thread | State for native (JNI) calls |

## 3. Execution Engine

- **Interpreter** – executes bytecode line-by-line (fast startup, slower repeat).
- **JIT Compiler** – compiles **hot** methods to native code for speed.
- **Garbage Collector** – reclaims unreachable heap objects.

## Key points

- JVM = **Class Loader + Runtime Data Areas + Execution Engine**.
- Class loading order: **load → link (verify/prepare/resolve) → initialize**.
- **Heap** and **Method Area** are shared; **Stack, PC, Native stack** are per-thread.
- **JIT** compiles hot code to native for performance; **GC** frees heap memory.
- The **bytecode verifier** enforces security before execution.
