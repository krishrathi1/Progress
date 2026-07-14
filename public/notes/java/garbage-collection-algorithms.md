## Definition

**Garbage Collection (GC)** is the JVM's automatic process of finding heap objects that are no longer reachable from **GC roots** (stack references, static fields, JNI refs) and reclaiming their memory. A **GC algorithm** decides *how* live objects are identified and dead ones freed.

## Reachability

```text
GC Roots  --->  A  --->  B        (A, B reachable = LIVE)
                 \--> C

           X  --->  Y             (no root path = GARBAGE -> collected)
```

An object is collectible when no chain of references from any GC root reaches it.

## Core Reclamation Strategies

- **Mark-and-Sweep:** *mark* all reachable objects, then *sweep* (free) the unmarked. Simple but leaves fragmentation.
- **Mark-Compact:** after marking, *slide* live objects together to remove fragmentation.
- **Copying:** split space in two; copy live objects to the other half, discard the rest. Fast, no fragmentation, but uses double space. Used for the young generation.
- **Generational:** apply cheap frequent collection to the young gen (most objects die young) and rarer collection to the old gen.

## HotSpot Collectors

| Collector | Flag | Best for |
|-----------|------|----------|
| **Serial** | `-XX:+UseSerialGC` | Single-threaded, small heaps |
| **Parallel (Throughput)** | `-XX:+UseParallelGC` | Multi-core, max throughput (batch) |
| **CMS** *(deprecated)* | `-XX:+UseConcMarkSweepGC` | Low pause (older JVMs) |
| **G1** | `-XX:+UseG1GC` | Default (Java 9+); balanced, region-based |
| **ZGC / Shenandoah** | `-XX:+UseZGC` | Very large heaps, sub-ms pauses |

## Generational Flow

```text
Minor GC: Eden full -> copy survivors to Survivor space -> age++
          objects surviving N cycles are PROMOTED to Old gen
Major/Full GC: collects Old gen (mark-compact) -> longer "stop-the-world" pause
```

- **Stop-the-world:** application threads pause during (parts of) GC.
- **G1** divides the heap into equal **regions** and collects those with most garbage first ("garbage first"), giving predictable pause targets via `-XX:MaxGCPauseMillis`.

## Key points

- GC frees only **unreachable** objects; reachability is traced from GC roots.
- Mark-sweep fragments; mark-compact and copying avoid it.
- Generational GC exploits the "most objects die young" hypothesis.
- G1 is the modern default (Java 9+); ZGC/Shenandoah target ultra-low pauses.
- All collectors involve some stop-the-world pause; tune with `-Xmx`, `-XX:MaxGCPauseMillis`.
- `System.gc()` only *suggests* a collection — it is not guaranteed.
