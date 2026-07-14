## Definition

A **comment** is text in source code that the Java compiler ignores. Comments document intent, explain logic, and temporarily disable code. They have zero impact on the compiled `.class` file.

## Types of Comments

Java supports three kinds of comments.

| Type | Syntax | Use |
|------|--------|-----|
| Single-line | `// text` | Short notes on one line |
| Multi-line | `/* text */` | Block explanations across lines |
| Documentation | `/** text */` | API docs parsed by the `javadoc` tool |

```java
public class CommentDemo {
    // Single-line comment: entry point
    public static void main(String[] args) {
        /*
         * Multi-line comment
         * describing the logic below.
         */
        int sum = 2 + 3; // inline comment
        System.out.println(sum);
    }
}

/**
 * Javadoc comment on a class or method.
 * @author Krish
 * @param args command line args
 */
```

## How the Compiler Sees Comments

```text
Source (.java)
   |  // this line is stripped
   v
[ Lexer removes all comments ]
   |
   v
Tokens -> Bytecode (.class)   <-- no comment survives
```

## Javadoc Tags

Documentation comments support structured tags read by the `javadoc` tool to generate HTML API pages.

- `@param` — describes a method parameter
- `@return` — describes the return value
- `@throws` / `@exception` — documents an exception
- `@author`, `@version`, `@since`, `@see`, `@deprecated`

## Key points

- Three types: `//`, `/* */`, and `/** */` (Javadoc).
- Comments are removed during lexical analysis; they never reach bytecode.
- `//` cannot span multiple lines; `/* */` and `/** */` can.
- Nesting `/* */` inside another `/* */` is **not allowed** and causes a compile error.
- Use Javadoc (`/** */`) on public classes/methods so tools can generate documentation.
- Prefer comments that explain **why**, not **what** — the code already shows what.
