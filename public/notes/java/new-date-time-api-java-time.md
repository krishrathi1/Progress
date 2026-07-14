## Definition

The **`java.time`** package (JSR-310), added in Java 8, is a modern date and time API that replaces the old, error-prone `java.util.Date` and `Calendar`. Its core classes are **immutable, thread-safe**, and clearly separate human date/time concepts from machine timestamps.

## Core classes

| Class | Represents | Example |
|-------|-----------|---------|
| `LocalDate` | Date only (no time/zone) | `2026-07-14` |
| `LocalTime` | Time only | `10:15:30` |
| `LocalDateTime` | Date + time, no zone | `2026-07-14T10:15` |
| `ZonedDateTime` | Date + time + zone | `...+05:30 Asia/Kolkata` |
| `Instant` | Machine timestamp (UTC epoch) | `2026-07-14T04:45:00Z` |
| `Duration` | Time span (seconds/nanos) | `PT2H30M` |
| `Period` | Date span (years/months/days) | `P1Y2M10D` |

## Creating and reading

```java
LocalDate today = LocalDate.now();
LocalDate d = LocalDate.of(2026, 7, 14);
LocalDate parsed = LocalDate.parse("2026-12-25"); // ISO-8601

int year = d.getYear();
Month m = d.getMonth();          // JULY
DayOfWeek dow = d.getDayOfWeek(); // TUESDAY
```

## Manipulating (returns new objects — immutable)

```java
LocalDate next = today.plusDays(10).minusMonths(1);
LocalDateTime meeting = LocalDateTime.of(2026, 7, 14, 9, 0)
                                     .plusHours(2);
boolean before = d.isBefore(today);
```

## Durations, periods and formatting

```java
Period p = Period.between(LocalDate.of(2000,1,1), today); // years/months/days
Duration dur = Duration.between(t1, t2);                  // hours/mins/secs

DateTimeFormatter fmt = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm");
String s = LocalDateTime.now().format(fmt);
LocalDate back = LocalDate.parse("14-07-2026",
                    DateTimeFormatter.ofPattern("dd-MM-yyyy"));
```

```text
Instant  ──(ZoneId)──►  ZonedDateTime
   ▲                          │
epoch/UTC              human calendar view
```

## java.time vs legacy

| Feature | `java.time` | `Date`/`Calendar` |
|---------|-------------|-------------------|
| Mutability | Immutable | Mutable |
| Thread-safe | Yes | No |
| Month indexing | 1-based | 0-based (bug-prone) |
| Clarity | Separate types | One overloaded type |

## Key points

- All `java.time` types are **immutable**; every "modifier" returns a new instance.
- Use `LocalDate/Time/DateTime` for human dates; use `Instant` for timestamps/logging.
- `ZonedDateTime` handles time zones and daylight saving correctly.
- `Period` = date-based span, `Duration` = time-based span.
- `DateTimeFormatter` is thread-safe (unlike the old `SimpleDateFormat`).
