## Definition

The **`import`** statement tells the Java compiler where to find classes and interfaces that live in other packages, so you can refer to them by their **simple name** instead of the fully-qualified name. It is a compile-time convenience — it does **not** load or copy code into your class.

## Placement

An `import` goes **after** the `package` statement and **before** any class declaration.

```java
package com.example.app;      // 1. package (optional)

import java.util.ArrayList;   // 2. imports
import java.util.List;

public class Main {           // 3. type declarations
    List<String> items = new ArrayList<>();
}
```

## Forms of import

| Form | Example | Meaning |
|------|---------|---------|
| Single-type | `import java.util.List;` | Imports one class |
| On-demand (wildcard) | `import java.util.*;` | All top-level types in the package |
| Static | `import static java.lang.Math.PI;` | Imports a static member |
| Static wildcard | `import static java.lang.Math.*;` | All static members |

## Without vs with import

```java
// Without import — fully-qualified name
java.util.Scanner sc = new java.util.Scanner(System.in);

// With `import java.util.Scanner;`
Scanner sc = new Scanner(System.in);
```

## Resolution flow

```text
Uses "List"  ->  compiler checks imports
                  |-- matches import java.util.List
                  '-> resolves to java.util.List
```

## Key points

- Wildcard `*` imports only the package's **own** types, **not** sub-packages (`java.util.*` does not pull in `java.util.concurrent`).
- Wildcards do **not** slow runtime or bloat the `.class` file — resolution is purely at compile time.
- **`java.lang`** (String, System, Math, Integer...) is imported **automatically**; never import it.
- If two imported packages define the same class name, you get a conflict — resolve it by using the fully-qualified name for one of them.
- Importing a package does not import its sub-packages; each level needs its own import.
- Unused imports are harmless but clutter code; IDEs flag them.
