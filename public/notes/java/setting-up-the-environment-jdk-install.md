## Goal

Install the **JDK** and configure the OS so the `javac` and `java` commands work from any terminal. This requires setting **`JAVA_HOME`** and adding the JDK's `bin` folder to the **`PATH`**.

## Steps

1. **Download a JDK** – choose an LTS build (e.g., JDK 17 or 21) from Oracle, or an open-source distribution like **Eclipse Temurin (Adoptium)** or Amazon Corretto.
2. **Run the installer** – note the install directory, e.g. `C:\Program Files\Java\jdk-21`.
3. **Set `JAVA_HOME`** to the JDK root (not the `bin` folder).
4. **Add `%JAVA_HOME%\bin`** (Windows) or `$JAVA_HOME/bin` (Linux/macOS) to `PATH`.
5. **Verify** the installation.

## Configuring Variables

**Windows** (System Environment Variables, or `setx`):

```text
JAVA_HOME = C:\Program Files\Java\jdk-21
PATH     += %JAVA_HOME%\bin
```

**Linux / macOS** (add to `~/.bashrc` or `~/.zshrc`):

```bash
export JAVA_HOME=/usr/lib/jvm/jdk-21
export PATH=$JAVA_HOME/bin:$PATH
```

## Verifying the Install

```bash
java -version      # shows the JVM/runtime version
javac -version     # confirms the compiler (JDK) is on PATH
echo %JAVA_HOME%   # Windows  (echo $JAVA_HOME on Linux/macOS)
```

Expected output resembles:

```text
java version "21.0.2" 2024-01-16 LTS
javac 21.0.2
```

## Why `JAVA_HOME` Matters

| Variable | Purpose |
|----------|---------|
| **`JAVA_HOME`** | Points build tools (Maven, Gradle, Tomcat) to the JDK |
| **`PATH`** | Lets you run `java`/`javac` from any directory |

If `javac` is missing but `java` works, you likely installed only a **JRE** — reinstall the **JDK**.

## Key points

- Install an **LTS JDK** (17/21); prefer JDK over standalone JRE.
- Set **`JAVA_HOME`** to the JDK root and add its **`bin`** to **`PATH`**.
- Verify with **`java -version`** and **`javac -version`**.
- `javac` missing ⇒ only a JRE is installed; install the full JDK.
- Build tools rely on `JAVA_HOME` to locate the JDK.
