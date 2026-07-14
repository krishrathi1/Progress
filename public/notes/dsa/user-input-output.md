## Overview

Every program interacts with the outside world by **reading input** and **writing output**. In competitive programming and interviews, reading input correctly and fast is a common source of bugs and Time Limit Exceeded (TLE) errors.

## Reading Input in Java

Two main tools:

- **`Scanner`** — easy to use, but slow (fine for small inputs).
- **`BufferedReader`** — fast, reads a whole line as a `String`; you split/parse manually.

```java
import java.util.*;
import java.io.*;

public class Main {
    public static void main(String[] args) throws IOException {
        // Fast input
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine().trim());   // one integer
        int[] a = new int[n];
        StringTokenizer st = new StringTokenizer(br.readLine());
        for (int i = 0; i < n; i++) a[i] = Integer.parseInt(st.nextToken());

        // Fast output
        StringBuilder sb = new StringBuilder();
        long sum = 0;
        for (int x : a) sum += x;
        sb.append("Sum = ").append(sum);
        System.out.println(sb);
    }
}
```

## C++ Equivalent

```cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL); // fast IO
    int n; cin >> n;
    long long sum = 0, x;
    for (int i = 0; i < n; i++) { cin >> x; sum += x; }
    cout << "Sum = " << sum << "\n";
}
```

## Scanner vs BufferedReader

| Aspect | Scanner | BufferedReader |
|--------|---------|----------------|
| Speed | Slow | Fast |
| Parsing | Automatic (`nextInt`) | Manual (`parseInt`) |
| Thread-safe | No | Yes (synchronized) |
| Use when | Small input | Large input / tight limits |

## Key points

- Use `BufferedReader` + `StringTokenizer` (Java) or `sync_with_stdio(false)` (C++) for large inputs to avoid TLE.
- Build output in a `StringBuilder` and print once — repeated `System.out.println` is slow.
- Always match the exact input format (spaces vs newlines) described in the problem.
- Use `long` for sums that may overflow `int`.
