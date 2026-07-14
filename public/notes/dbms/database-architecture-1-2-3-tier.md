## Definition

**Database architecture** describes how the user interface, the application/business logic, and the database are distributed across layers ("tiers"). A *tier* is a physical/logical separation of responsibility. Common models: **1-tier**, **2-tier**, and **3-tier**.

## 1-Tier Architecture

Client, application, and database all reside on the **same machine**. The user directly interacts with the DBMS.

- Used for local development, learning, or a DBA using SQL directly.
- Simple and fast but not sharable; no network access.

```text
+-------------------------------+
|  User + App + Database (one)  |
+-------------------------------+
```

## 2-Tier Architecture

A **client** application talks **directly** to the **database server** via an API (JDBC/ODBC). Business logic sits on the client (or partly in the DB).

- Faster for small user counts; direct connection.
- **Drawback:** poor scalability and security — every client holds DB credentials; hard to maintain when clients grow.

```text
[ Client App (UI + logic) ] <--JDBC/ODBC--> [ Database Server ]
```

## 3-Tier Architecture

Adds a middle **application server** between client and database. The client never talks to the DB directly.

1. **Presentation tier** — UI (browser, mobile app).
2. **Application/logic tier** — business rules, validation, on the app server.
3. **Data tier** — the database server.

```text
[ Presentation ]  <-->  [ Application Server ]  <-->  [ Database ]
   (browser)              (business logic)             (storage)
```

- **Advantages:** scalability, security (clients never see DB), maintainability, reusability. Standard for web applications.

## Comparison

| Feature | 1-Tier | 2-Tier | 3-Tier |
|---------|--------|--------|--------|
| Layers | 1 | 2 | 3 |
| Client sees DB? | Yes | Yes | No |
| Scalability | Poor | Limited | High |
| Security | N/A | Weak | Strong |
| Use case | Local/dev | Small LAN app | Web/enterprise |

## Key points

- Tier = separation of presentation, logic, and data responsibilities.
- **2-tier**: client ↔ DB directly; simple but weak security/scalability.
- **3-tier**: adds an app server; the industry standard for web apps.
- More tiers → better scalability, security, and maintainability at the cost of complexity.
