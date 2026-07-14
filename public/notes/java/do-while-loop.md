## Definition

A `do-while` loop is an **exit-controlled** loop: it executes its body **first**, then checks the condition. Because the check happens **after** the body, the body always runs **at least once**, even if the condition is false.

## Syntax and flow

```java
do {
    // body
} while (condition);   // note the semicolon
```

```text
   ┌──────────────┐
   ▼              │
 run body         │
   │              │
 check condition ─┘ true
   │
 false
   ▼
 exit loop
```

```java
int i = 1;
do {
    System.out.print(i + " ");   // 1 2 3 4 5
    i++;
} while (i <= 5);
```

Even when false at the start, the body runs once:

```java
int n = 100;
do {
    System.out.println("Runs once");   // prints once
} while (n < 10);
```

## Typical use case — menu / input validation

```java
int choice;
Scanner sc = new Scanner(System.in);
do {
    System.out.println("1.Add 2.Delete 3.Exit");
    choice = sc.nextInt();
    // handle choice...
} while (choice != 3);
```

The menu must be shown **before** the user can respond, so running the body first is exactly what we want.

## do-while vs while

| Feature | `do-while` | `while` |
|---------|-----------|---------|
| Condition check | After body | Before body |
| Minimum executions | 1 | 0 |
| Control type | Exit-controlled | Entry-controlled |
| Terminator | Needs `;` after `while(...)` | No trailing `;` |

## Key points

- Body always executes **at least once** — the defining trait.
- Don't forget the **semicolon** after `while(condition);`.
- Ideal for menus, retry prompts, and input validation where one execution is guaranteed.
- Still needs an update inside the body to avoid an infinite loop.
