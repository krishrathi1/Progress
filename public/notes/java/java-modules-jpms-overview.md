## Definition

The **Java Platform Module System (JPMS)**, introduced in **Java 9** (Project Jigsaw), adds a higher level of grouping above packages: a **module** is a named, self-describing collection of packages and resources that explicitly declares what it **exports** to others and what it **requires** from others. It brings *strong encapsulation* and *reliable configuration* to the JDK and applications.

## Why modules?

- **Strong encapsulation** — packages are hidden unless explicitly `exported`; `public` no longer means "accessible everywhere".
- **Reliable configuration** — dependencies are checked at compile and startup time, avoiding classpath "JAR hell" and `NoClassDefFoundError` surprises.
- **Scalable JDK** — the JDK itself is split into modules (`java.base`, `java.sql`, …), so tools like `jlink` can build a slim runtime with only the needed modules.

## module-info.java

Every module has a descriptor `module-info.java` at its source root:

```java
module com.shop.orders {
    requires java.sql;              // depends on another module
    requires transitive com.shop.model; // consumers also get com.shop.model
    exports com.shop.orders.api;    // this package is visible to all
    exports com.shop.orders.spi to com.shop.web; // qualified export
    uses com.shop.orders.PaymentService;         // service consumer
    provides com.shop.orders.PaymentService
        with com.shop.orders.StripePayment;      // service provider
}
```

| Directive | Meaning |
|-----------|---------|
| `requires` | Declares a dependency on another module |
| `requires transitive` | Re-exports the dependency to your consumers |
| `exports` | Makes a package public to other modules |
| `exports ... to` | Exports only to named modules (qualified) |
| `opens` | Allows deep reflection (e.g. for frameworks) at runtime |
| `uses` / `provides ... with` | `ServiceLoader` consumer / provider |

## Module graph

```text
   java.base   (implicitly required by all modules)
      ▲
      │ requires
 com.shop.model ──requires transitive──┐
      ▲                                │
      │ requires                       ▼
 com.shop.orders ──exports──> com.shop.orders.api
```

## Key points

- `java.base` is the root module, **implicitly required** by every module.
- A package is accessible only if it is `exported` **and** the reader `requires` the module — `public` alone is not enough.
- Modules on the **module path** are resolved by JPMS; plain JARs on the **classpath** live in the *unnamed module* (legacy compatibility).
- Use `opens` (not `exports`) when frameworks like Spring/Hibernate need reflective access.
- `jlink` creates a custom, minimal runtime image from the modules an app actually uses.
- Adopting modules is **optional** — existing classpath applications still run unchanged.
