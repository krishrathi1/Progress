## Definition

- **Serialization** is the process of converting an object's state into a **byte stream** so it can be saved to disk or sent over a network.
- **Deserialization** is the reverse: reconstructing the object from that byte stream.

A class must implement the **marker interface** `java.io.Serializable` (it has no methods) to be eligible.

```text
 Object  --serialize-->  [ byte stream ]  --deserialize-->  Object
 (JVM)                    (file/socket)                     (JVM)
```

## Making a class serializable

```java
import java.io.Serializable;

class Student implements Serializable {
    private static final long serialVersionUID = 1L;
    int id;
    String name;
    transient String password;   // skipped during serialization
    Student(int id, String name){ this.id=id; this.name=name; }
}
```

## Writing (serialize) and reading (deserialize)

```java
// Serialize
try (ObjectOutputStream out =
        new ObjectOutputStream(new FileOutputStream("stu.ser"))) {
    out.writeObject(new Student(1, "Asha"));
}

// Deserialize
try (ObjectInputStream in =
        new ObjectInputStream(new FileInputStream("stu.ser"))) {
    Student s = (Student) in.readObject();   // needs cast
    System.out.println(s.name);              // Asha
}
```

## serialVersionUID

A version identifier used to verify that the sender and receiver classes are compatible. If you change the class but keep the same UID, old data still loads; a mismatch throws `InvalidClassException`. If omitted, the JVM computes one from class structure, making it fragile.

## What is / isn't serialized

| Serialized | Not serialized |
|-----------|----------------|
| Instance fields | `static` fields (belong to class) |
| Referenced objects (if Serializable) | `transient` fields |
| Full object graph | Methods / constructors |

Non-transient reference fields must **also** be `Serializable`, or a `NotSerializableException` is thrown.

## Key points

- `Serializable` is a **marker interface** — no methods to implement.
- Use `transient` to exclude sensitive/derived fields (e.g. passwords).
- **Always declare** `serialVersionUID` to control version compatibility.
- `static` fields are never serialized (they aren't part of object state).
- The constructor is **not** called during deserialization.
- The entire reachable object graph is serialized; every referenced type must be Serializable.
- `Externalizable` gives full manual control via `writeExternal`/`readExternal`.
