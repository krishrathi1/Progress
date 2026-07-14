import type { Subject } from "@/lib/types";

/**
 * Core Java — full GeeksforGeeks tutorial track, part by part.
 * Source: geeksforgeeks.org.
 */
const searchFn = (n: string) =>
  `https://www.google.com/search?q=${encodeURIComponent(n + " java site:geeksforgeeks.org")}`;

export const javaTrack: Subject = {
  id: "java",
  name: "Core Java (GFG)",
  short: "Java",
  color: "#ef4444",
  kind: "topic",
  desc: "Complete Java from syntax to Collections, Multithreading, Streams & JDBC.",
  source: "geeksforgeeks.org",
  search: searchFn,
  _total: 0,
  sections: [
    { name: "1 · Introduction & Basics", items: [
      "Introduction to Java", "History of Java", "JDK, JRE and JVM", "How JVM works / Java Architecture",
      "Setting up the environment (JDK install)", "Hello World program", "Compilation & execution flow",
      "Java Data Types", "Variables & scope", "Type casting", "Operators in Java", "Keywords & identifiers",
      "Comments", "Java Input using Scanner", "Java Output (print/println/printf)",
    ]},
    { name: "2 · Flow Control", items: [
      "if statement", "if-else & else-if ladder", "Nested if", "switch statement",
      "for loop", "while loop", "do-while loop", "for-each loop",
      "break statement", "continue statement", "return statement", "Labeled loops",
    ]},
    { name: "3 · OOP Fundamentals in Java", items: [
      "Classes and Objects", "Methods in Java", "Method overloading", "Constructors",
      "Constructor overloading", "this keyword", "static keyword", "final keyword",
      "Access modifiers (public/private/protected/default)", "Nested & inner classes",
      "Anonymous inner class", "Object class & its methods", "Garbage collection & finalize()",
      "Wrapper classes & autoboxing", "Command line arguments",
    ]},
    { name: "4 · Inheritance, Polymorphism & Abstraction", items: [
      "Inheritance & its types", "super keyword", "Method overriding", "Runtime polymorphism (dynamic dispatch)",
      "Compile-time vs runtime polymorphism", "Abstract classes & methods", "Interfaces",
      "Interface vs Abstract class", "Default & static methods in interface", "Multiple inheritance via interface",
      "Encapsulation", "instanceof operator", "Upcasting & downcasting",
    ]},
    { name: "5 · Strings", items: [
      "String class & immutability", "String pool / intern", "String methods",
      "StringBuffer", "StringBuilder", "StringBuffer vs StringBuilder vs String",
      "String comparison (== vs equals)", "String formatting", "Split & join", "toCharArray & char handling",
    ]},
    { name: "6 · Arrays", items: [
      "One-dimensional arrays", "Multidimensional arrays", "Jagged arrays",
      "Array of objects", "Arrays class utility methods", "Sorting & searching arrays",
      "Copying arrays (clone, arraycopy)", "Enhanced for loop with arrays",
    ]},
    { name: "7 · Packages & Access", items: [
      "Packages in Java", "import statement", "Built-in packages", "User-defined packages",
      "Static import", "Access control across packages", "CLASSPATH",
    ]},
    { name: "8 · Exception Handling", items: [
      "Introduction to exceptions", "Exception hierarchy", "try-catch block", "Multiple catch blocks",
      "Nested try", "finally block", "throw keyword", "throws keyword", "Checked vs unchecked exceptions",
      "Custom (user-defined) exceptions", "try-with-resources", "Chained exceptions",
    ]},
    { name: "9 · Multithreading & Concurrency", items: [
      "Introduction to threads", "Thread class vs Runnable interface", "Thread lifecycle & states",
      "Creating threads", "Thread methods (sleep, join, yield)", "Thread priority",
      "Synchronization (synchronized method & block)", "Inter-thread communication (wait/notify)",
      "Deadlock", "Daemon threads", "Thread pools & ExecutorService", "Callable & Future",
      "Concurrent collections", "volatile & atomic variables", "Locks (ReentrantLock)",
    ]},
    { name: "10 · Collections Framework", items: [
      "Collections framework overview", "Collection interface hierarchy", "List interface",
      "ArrayList", "LinkedList", "Vector & Stack", "Set interface", "HashSet", "LinkedHashSet",
      "TreeSet", "Queue interface", "PriorityQueue", "Deque & ArrayDeque", "Map interface",
      "HashMap (internal working)", "LinkedHashMap", "TreeMap", "Hashtable",
      "Iterator & ListIterator", "Comparable vs Comparator", "Collections utility class",
      "Fail-fast vs fail-safe iterators",
    ]},
    { name: "11 · Generics", items: [
      "Introduction to Generics", "Generic classes", "Generic methods", "Bounded type parameters",
      "Wildcards (? extends / ? super)", "Type erasure", "Generics with collections",
    ]},
    { name: "12 · Java 8 Functional Features", items: [
      "Lambda expressions", "Functional interfaces", "Predicate, Function, Consumer, Supplier",
      "Method references", "Default methods", "Stream API introduction", "Stream operations (map/filter/reduce)",
      "Collectors", "Parallel streams", "Optional class", "New Date/Time API (java.time)",
    ]},
    { name: "13 · File Handling & I/O", items: [
      "File class", "Byte streams (InputStream/OutputStream)", "Character streams (Reader/Writer)",
      "FileReader & FileWriter", "BufferedReader & BufferedWriter", "Scanner for files",
      "Serialization & Deserialization", "transient keyword", "NIO overview (Path/Files)",
    ]},
    { name: "14 · Advanced Topics", items: [
      "Enums", "Annotations", "Reflection API", "Regular expressions (java.util.regex)",
      "Math, Random & Date utilities", "Memory management & JVM memory model",
      "Garbage collection algorithms", "JDBC - connect to database",
      "JDBC - CRUD operations", "Java Modules (JPMS overview)",
    ]},
  ],
};
