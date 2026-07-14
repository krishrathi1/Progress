## Definition

**DRY**, **KISS**, and **YAGNI** are three foundational software-design principles that keep object-oriented code maintainable, readable, and cheap to change.

- **DRY — Don't Repeat Yourself**: Every piece of knowledge should have a single, authoritative representation. Duplicated logic is a bug waiting to happen because each copy must be fixed separately.
- **KISS — Keep It Simple, Stupid**: Prefer the simplest solution that works. Complexity should be justified, never accidental.
- **YAGNI — You Aren't Gonna Need It**: Do not build features or abstractions on speculation. Add them only when a real requirement demands them.

## DRY in practice

Extract repeated logic into a method, class, or constant.

```java
// Violates DRY — tax rule duplicated
double a = price + price * 0.18;
double b = cost  + cost  * 0.18;

// DRY — single source of truth
static double withTax(double amt) { return amt + amt * 0.18; }
```

## KISS in practice

```java
// Over-engineered
boolean isEven = (n & 1) == 0 ? true : false;

// KISS
boolean isEven = n % 2 == 0;
```

## YAGNI in practice

Do not add a `PaymentGateway` interface with 10 implementations when the app only needs one. Build it when the second payment method actually appears.

## Comparison

| Principle | Fights | Core question | Risk if ignored |
|-----------|--------|---------------|-----------------|
| DRY | Duplication | "Have I written this before?" | Inconsistent fixes, bugs |
| KISS | Complexity | "Is there a simpler way?" | Hard-to-read, fragile code |
| YAGNI | Speculation | "Do I need this now?" | Wasted effort, dead code |

## Tension between them

```text
Aggressive DRY  ─────►  can add abstraction  ─────►  hurts KISS / YAGNI
```

Over-applying DRY (extracting every 2-line similarity) can create premature abstractions that violate KISS and YAGNI. The "Rule of Three" helps: tolerate duplication until a pattern appears **three** times, then refactor.

## Key points

- **DRY** = one source of truth; **KISS** = simplest thing that works; **YAGNI** = build only what's needed now.
- Two code fragments that *look* similar but represent *different* knowledge are not true DRY violations — don't merge them.
- Balance the three: don't abstract prematurely (YAGNI/KISS) just to satisfy DRY.
- Together they reduce maintenance cost, bugs, and cognitive load — a favorite interview trio.
