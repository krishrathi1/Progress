## Definition

**Aggregation** is a specialized, *weak* form of association that models a **"has-a"** relationship with **shared ownership**. The whole (container) holds a reference to parts, but the parts can **exist independently** of the whole — if the container is destroyed, the parts survive and may belong to other containers. It represents a *whole–part* link where the part's lifecycle is **not** bound to the whole.

## Characteristics

- **"Has-a"** with independent lifetimes.
- The part is typically **passed in** from outside (dependency injection), not created inside the whole.
- The same part object can be **shared** across multiple wholes.
- In UML, drawn as a line with a **hollow (open) diamond** at the whole's end.

```java
class Player {
    String name;
    Player(String n) { name = n; }
}

class Team {
    private List<Player> players;      // has-a Players
    Team(List<Player> players) {       // players created OUTSIDE, passed in
        this.players = players;
    }
}

Player p = new Player("Messi");
Team a = new Team(List.of(p));
Team b = new Team(List.of(p));   // same Player shared by two Teams
// If Team a is garbage-collected, Messi (p) still exists.
```

## Diagram

```text
   Team  ◇──────────►  Player          (hollow diamond = aggregation)
  (whole)   has-a       (part)

   Players are passed in and can outlive the Team,
   and be shared among several Teams.
```

## Aggregation vs Composition

| Aspect | Aggregation (weak) | Composition (strong) |
|--------|--------------------|----------------------|
| Ownership | Shared | Exclusive |
| Part lifecycle | Independent of whole | Dies with the whole |
| Part created | Outside, passed in | Inside the whole |
| UML diamond | Hollow ◇ | Filled ◆ |
| Example | Team – Player | House – Room |

## Key points

- Aggregation = **"has-a" with independent lifecycles**; the part outlives the whole.
- Parts are usually **injected** from outside and can be **shared** between wholes.
- Contrast with **composition**, where the part is exclusively owned and destroyed with the whole.
- UML cue: **hollow diamond** on the container side.
- Classic examples: `Department` has `Professor`s; a `Playlist` has `Song`s that exist on their own.
