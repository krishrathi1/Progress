## Definition

A **destructor** is a special member function that is automatically invoked when an object is destroyed (goes out of scope, is explicitly `delete`d, or the program ends). Its job is **cleanup** — releasing resources the object acquired: heap memory, file handles, sockets, database connections, locks.

- In **C++** it is named `~ClassName()`, takes no arguments, returns nothing, and cannot be overloaded (exactly one per class).
- In **Java/C#** there are no true destructors; the garbage collector reclaims memory. Cleanup uses `try-with-resources`/`AutoCloseable` (Java) or `IDisposable`/`using` (C#). Java's deprecated `finalize()` is unreliable.

## Why destructors matter (RAII)

C++ ties resource lifetime to object lifetime — **RAII** (Resource Acquisition Is Initialization). The constructor acquires; the destructor releases. This guarantees cleanup even when exceptions are thrown.

```cpp
class FileWrapper {
    FILE* f;
public:
    FileWrapper(const char* name) { f = fopen(name, "r"); }
    ~FileWrapper() {                 // destructor
        if (f) fclose(f);            // guaranteed cleanup
    }
};
```

## Order of destruction

```text
Construction order:  Base -> Member -> Derived
Destruction order:   Derived -> Member -> Base   (reverse)
```

Objects are destroyed in the **reverse** order of construction; stack objects unwind last-in-first-out.

## Virtual destructors

When deleting a derived object through a base pointer, the base destructor **must be virtual**, otherwise only the base part is destroyed → resource leak / undefined behavior.

```cpp
class Base { public: virtual ~Base() {} };   // virtual = correct
Base* p = new Derived();
delete p;                                     // calls ~Derived then ~Base
```

## Constructor vs Destructor

| Aspect | Constructor | Destructor |
|--------|-------------|------------|
| Name | `ClassName()` | `~ClassName()` |
| Purpose | Initialize / acquire | Clean up / release |
| Arguments | Can take args | Never takes args |
| Overloading | Allowed | Not allowed |
| Call | On creation | On destruction |

## Key points

- Automatically called; you rarely call it manually.
- No parameters, no return type, cannot be overloaded.
- Make it **virtual** in any class meant to be a polymorphic base.
- Managed languages (Java/C#) rely on GC; use `AutoCloseable`/`IDisposable` for deterministic cleanup.
- Central to RAII and exception-safe resource management in C++.
