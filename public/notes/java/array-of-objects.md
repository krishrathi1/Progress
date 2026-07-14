## Definition

An **array of objects** is an array whose element type is a reference type (a class). Each element stores a **reference** to an object on the heap (or `null`), not the object itself. Creating the array only allocates the reference slots — the actual objects must be created separately.

## Two-Step Creation

```java
class Student {
    String name; int marks;
    Student(String name, int marks) { this.name = name; this.marks = marks; }
}

// Step 1: allocate array of references (all null)
Student[] students = new Student[3];

// Step 2: create each object
students[0] = new Student("Asha", 90);
students[1] = new Student("Ravi", 85);
students[2] = new Student("Meera", 78);
```

## Memory Layout

```text
students --> [ ref ][ ref ][ ref ]
                |      |      |
                v      v      v
            Student  Student  Student
            {Asha}   {Ravi}   {Meera}
```

Immediately after `new Student[3]`, every slot is `null`. Accessing a member before assigning an object throws `NullPointerException`.

## Iterating

```java
for (Student s : students) {
    System.out.println(s.name + " -> " + s.marks);
}
```

## Array Initializer Shortcut

```java
Student[] batch = {
    new Student("Asha", 90),
    new Student("Ravi", 85)
};
```

## Common Pitfall

| Code | Result |
|------|--------|
| `Student[] a = new Student[2];` | Two `null` slots |
| `a[0].name` (before assigning) | `NullPointerException` |
| `a[0] = new Student(...); a[0].name` | Works |

## Key points

- The array holds references; objects live separately on the heap.
- `new ClassName[n]` fills every element with `null` — you must instantiate each element.
- Forgetting step 2 (object creation) is the classic `NullPointerException` source.
- Elements can be subclass instances (polymorphism): `Shape[] s = { new Circle(), new Square() };`.
- Use enhanced for-loops or index loops to process the objects.
