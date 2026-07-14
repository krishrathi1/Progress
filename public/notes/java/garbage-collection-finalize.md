## Definition

**Garbage collection (GC)** is Java's automatic memory management: the JVM reclaims heap memory occupied by objects that are **no longer reachable** from any live reference. Developers do not free memory manually (no `delete`/`free`), which prevents most memory leaks and dangling-pointer bugs.

An object becomes eligible for GC when no active thread can reach it through a chain of references (a **GC root**).

## How reachability works

```text
GC Roots (stack vars, static fields, active threads)
   |
   v
 [A] --> [B] --> [C]        reachable  -> kept
                 
 [D] --> [E]                unreachable -> collected
 (no root points to D)
```

## Ways an object becomes eligible

```java
Object a = new Object();
a = null;                 // 1. nullify reference

Object b = new Object();
b = new Object();         // 2. reassign — old object orphaned

void m() {
    Object c = new Object();
}                         // 3. c goes out of scope when m() returns
```

You can *suggest* (not force) a collection cycle:

```java
System.gc();              // a hint to the JVM — may be ignored
```

## finalize()

`finalize()` was a `protected` method on `Object`, called by the GC **once** before reclaiming an object, meant for last-chance cleanup.

```java
@Override
protected void finalize() throws Throwable {
    System.out.println("cleaning up");
}
```

**Avoid it.** `finalize()` is **deprecated since Java 9** because it is unreliable: no guarantee it runs, no guaranteed timing, can resurrect objects, and hurts performance.

| Instead of finalize() | Use |
|-----------------------|-----|
| Releasing files/sockets | `try-with-resources` + `AutoCloseable` |
| Post-collection action | `java.lang.ref.Cleaner` |

## Key points

- GC reclaims **unreachable** objects automatically; you cannot force it, only request via `System.gc()`.
- Eligibility triggers: nullifying, reassigning, or going out of scope — and "island of isolation" (mutually referencing but unreachable objects).
- The heap is generational: **Young** (Eden + Survivor) and **Old** generations; short-lived objects die young (minor GC).
- `finalize()` is deprecated and unpredictable — never rely on it for critical cleanup.
- Prefer `AutoCloseable` with try-with-resources, or `Cleaner`, for deterministic resource release.
