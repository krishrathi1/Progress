## Definition

**Types of inheritance** classify the shapes a class hierarchy can take based on how many parents and children are involved. There are five recognised forms: **single, multilevel, hierarchical, multiple,** and **hybrid**.

## The five types

```text
Single          Multilevel        Hierarchical
  A                 A                   A
  |                 |                 / | \
  B                 B                B  C  D
                    |
                    C

Multiple            Hybrid
 A   B            A (top)
  \ /            / \
   C            B   C
                 \ /
                  D  (combines hierarchical + multiple)
```

| Type | Structure | Class example |
|------|-----------|---------------|
| **Single** | One base → one derived | `B extends A` |
| **Multilevel** | Chain of derivations | `C extends B extends A` |
| **Hierarchical** | One base → many derived | `B,C,D extends A` |
| **Multiple** | One derived → many bases | class-level not in Java |
| **Hybrid** | Mix of the above | via interfaces in Java |

## Language support

- **Java** supports single, multilevel, and hierarchical inheritance of **classes** directly.
- **Multiple (class) inheritance is not allowed** in Java to avoid the **Diamond Problem** — ambiguity when two parents provide the same method. Java achieves multiple inheritance of **type** through interfaces.
- **C++** supports multiple inheritance directly (resolved with virtual inheritance / scope resolution).

## Example (multilevel)

```java
class Animal { void eat() {} }
class Dog extends Animal { void bark() {} }
class Puppy extends Dog { void weep() {} }   // Puppy → Dog → Animal
```

## The Diamond Problem

```text
   A  (method m())
  / \
 B   C   (both may override m())
  \ /
   D   -> which m() does D inherit?  Ambiguous!
```

Java sidesteps this: a class implementing two interfaces with the same **default** method must explicitly override it.

## Key points

- Java classes: **single, multilevel, hierarchical** allowed; **multiple** and **hybrid** only via **interfaces**.
- Multiple class inheritance is banned in Java to prevent the **diamond ambiguity**.
- Multilevel forms a chain; hierarchical forms a tree with a shared root.
- Deep hierarchies increase coupling and fragility — keep them shallow.
