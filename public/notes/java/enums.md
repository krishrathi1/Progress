## Definition

An **enum** (enumeration) is a special Java type that represents a **fixed set of named constants**. Declared with the `enum` keyword, each constant is a `public static final` instance of the enum type. Enums are **type-safe** — a variable of an enum type can only hold one of its declared constants or `null`.

```java
enum Day { MON, TUE, WED, THU, FRI, SAT, SUN }

Day d = Day.WED;
```

Internally every enum implicitly extends `java.lang.Enum`, so it **cannot** extend another class (but it can implement interfaces).

## Enums with fields, constructor, and methods

Enums can carry state and behavior. The constructor is always **private** (implicitly) and runs once per constant.

```java
enum Planet {
    EARTH(5.97e24, 6.37e6),
    MARS(6.42e23, 3.39e6);

    private final double mass, radius;

    Planet(double mass, double radius) {   // implicitly private
        this.mass = mass;
        this.radius = radius;
    }
    double gravity() { return 6.67e-11 * mass / (radius * radius); }
}

System.out.println(Planet.EARTH.gravity());
```

## Built-in methods

| Method | Description |
|--------|-------------|
| `values()` | array of all constants (in order) |
| `valueOf(String)` | constant matching the name |
| `ordinal()` | zero-based position |
| `name()` | the constant's identifier as String |

```java
for (Day day : Day.values())
    System.out.println(day.ordinal() + " -> " + day.name());
```

## Enums in switch

```java
switch (d) {
    case SAT, SUN -> System.out.println("Weekend");
    default       -> System.out.println("Weekday");
}
```

## Why enums over int/String constants

```text
int STATUS_ACTIVE = 1;   // no type safety: any int accepted, typos compile
enum Status { ACTIVE }   // compiler enforces valid values, self-documenting
```

## Key points

- Enums are **type-safe**, immutable, and constant — ideal for fixed sets (days, states, directions).
- Each constant is a singleton instance; compare with `==` (safe) or `equals`.
- Can have **fields, constructors, methods**, and even abstract methods overridden per constant.
- Enum constructors are implicitly private; you cannot instantiate with `new`.
- Cannot extend a class (already extends `Enum`) but **can implement interfaces**.
- `EnumMap` and `EnumSet` are highly efficient collections keyed on enums.
- Enums are perfect for the singleton pattern and are `switch`-friendly.
