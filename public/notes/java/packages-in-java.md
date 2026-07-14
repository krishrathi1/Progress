## Definition

A **package** in Java is a namespace that groups related classes, interfaces, and sub-packages together. It maps directly to a **directory** on disk and prevents naming conflicts by qualifying every type with its package name (e.g., `java.util.List` vs a custom `List`).

## Why packages

- **Avoid name clashes** — two classes named `Date` can coexist as `java.util.Date` and `java.sql.Date`.
- **Access control** — the `default` (package-private) modifier limits visibility to the same package.
- **Organization & reuse** — related code lives together and can be imported cleanly.

## Declaring a package

The `package` statement must be the **first non-comment line** of a source file.

```java
package com.example.banking;   // must match folder path com/example/banking

public class Account {
    public double balance;
}
```

## Types of packages

| Type | Example | Description |
|------|---------|-------------|
| Built-in | `java.util`, `java.io` | Shipped with the JDK |
| User-defined | `com.example.banking` | Created by the developer |

## Folder mapping

```text
Package:  com.example.banking
Path:     com/example/banking/Account.java
```

## Compile & run with packages

```text
# from the project root (parent of "com")
javac com/example/banking/Account.java
java  com.example.banking.Account       # use the fully-qualified name
```

- `javac -d out Account.java` places the compiled `.class` into `out/com/example/banking/`.

## Naming convention

- Use **reverse domain name**, all lowercase: `com.company.project.module`.
- This guarantees global uniqueness (based on owned internet domains).

## Key points

- Exactly **one** `package` statement per file, and it must come first.
- The package name **must match** the directory structure, or the JVM cannot find the class.
- Fully-qualified name = `packageName.ClassName`.
- A class with no `package` statement belongs to the **default (unnamed) package** — fine for tiny demos, discouraged in real projects.
- Packages combined with access modifiers (`public`, `protected`, default, `private`) form Java's encapsulation across code boundaries.
