## Definition

Both **aggregation** and **composition** are specialized forms of association that model a **has-a** relationship between objects. They differ in the strength of ownership and in whether the "part" can outlive the "whole".

- **Composition** — *strong* has-a. The whole owns the part; the part's lifecycle is tied to the whole. Destroy the whole and the part is destroyed too.
- **Aggregation** — *weak* has-a. The whole *uses* the part, but the part exists independently and can be shared by multiple wholes.

## Comparison

| Aspect | Aggregation (weak has-a) | Composition (strong has-a) |
|--------|--------------------------|----------------------------|
| Ownership | Shared / referenced | Exclusive |
| Lifecycle | Part outlives the whole | Part dies with the whole |
| Part creation | Passed in from outside | Created inside the whole |
| Coupling | Looser | Tighter |
| UML diamond | Hollow (open) | Filled (solid) |
| Example | `Department` has `Professor`s | `Car` has an `Engine` |

## Diagram

```text
Aggregation (hollow diamond):   Department <>---- Professor
   Professor exists without the Department (can move to another).

Composition (filled diamond):   Car <#>---- Engine
   Engine has no purpose once the Car is gone.
```

## Example

```java
// AGGREGATION: professors passed in, live independently
class Department {
    private List<Professor> professors;      // shared references
    Department(List<Professor> profs) {
        this.professors = profs;             // not created here
    }
}

// COMPOSITION: engine created & owned by the car
class Car {
    private final Engine engine;
    Car() { this.engine = new Engine(); }    // owns its part
}
```

## Key points

- Both are has-a relationships; the difference is **ownership strength**.
- Composition: part is created inside and dies with the whole (solid diamond).
- Aggregation: part is passed in, shared, and survives the whole (hollow diamond).
- Rule of thumb: if destroying the container should destroy the contained object, use composition; otherwise use aggregation.
- Aggregation implies looser coupling and easier reuse of the part.
