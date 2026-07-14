## Definition

`transient` is a Java **field modifier** that tells the serialization mechanism to **skip** that field. When an object is serialized, `transient` fields are ignored; on deserialization they are restored to their **default value** (`0`, `false`, or `null`).

It is used only in the context of `Serializable` objects.

## Why use it

- **Security** — keep secrets (passwords, tokens) out of the serialized byte stream.
- **Derived/cached data** — fields recomputable from others need not be stored.
- **Non-serializable references** — mark a field `transient` if its type does not implement `Serializable`, avoiding `NotSerializableException`.

## Example

```java
class Account implements Serializable {
    private static final long serialVersionUID = 1L;
    String user;
    transient String password;     // NOT serialized
    transient int loginAttempts;   // NOT serialized
}
```

## Behavior on round-trip

```text
Before serialize:  user="raj"  password="secret"  loginAttempts=3
        |  writeObject  (password & loginAttempts skipped)
        v
Byte stream:       user="raj"
        |  readObject
        v
After deserialize: user="raj"  password=null  loginAttempts=0
```

The transient fields come back as JVM defaults, not their original values.

## transient vs static vs volatile

| Modifier | Serialized? | Purpose |
|----------|-------------|---------|
| `transient` | No (skipped) | Exclude a field from serialization |
| `static` | No (class-level) | Shared across all instances |
| `volatile` | Yes | Visibility in multithreading (unrelated to I/O) |

Both `transient` and `static` fields are absent from the stream, but for different reasons.

## Restoring transient state

Override `readObject` to recompute or re-initialize excluded fields:

```java
private void readObject(ObjectInputStream in)
        throws IOException, ClassNotFoundException {
    in.defaultReadObject();
    this.loginAttempts = 0;       // custom re-init if needed
}
```

## Key points

- `transient` fields are **excluded** from serialization and restored to defaults.
- Common uses: passwords, sensitive data, cached/derived values, non-serializable references.
- Applies only to instance fields; combining `transient` with `static` is redundant.
- Unrelated to threading — do not confuse with `volatile`.
- Use `readObject`/`writeObject` hooks to customize how transient state is handled.
