## Definition

The **Banker's algorithm** (Dijkstra) is a **deadlock-avoidance** algorithm for systems with **multiple instances** of resource types. Like a banker who never lends so much that customers can't be repaid, the OS grants a request only if the resulting state is **safe**.

## Data Structures

For `n` processes and `m` resource types:

| Structure | Meaning |
|-----------|---------|
| **Available[m]** | Free instances of each resource type |
| **Max[n][m]** | Maximum demand of each process |
| **Allocation[n][m]** | Currently allocated to each process |
| **Need[n][m]** | `Max − Allocation` (still required) |

## Safety Algorithm

```text
1. Work = Available;  Finish[i] = false for all i
2. Find i such that: Finish[i] == false AND Need[i] <= Work
      if none found -> go to step 4
3. Work = Work + Allocation[i];  Finish[i] = true;  repeat step 2
4. If Finish[i] == true for all i -> SAFE, else UNSAFE
```

## Resource-Request Algorithm

When process Pi requests `Request[i]`:

- If `Request[i] > Need[i]` → error (exceeds max claim).
- If `Request[i] > Available` → Pi must wait.
- Else **pretend to allocate**, then run the safety check. If safe, grant; otherwise roll back and make Pi wait.

## Worked Example (Java)

```java
// 5 processes, 3 resource types
int[][] alloc = {{0,1,0},{2,0,0},{3,0,2},{2,1,1},{0,0,2}};
int[][] max   = {{7,5,3},{3,2,2},{9,0,2},{2,2,2},{4,3,3}};
int[]   avail = {3,3,2};

int n=5, m=3;
int[][] need = new int[n][m];
for(int i=0;i<n;i++) for(int j=0;j<m;j++) need[i][j]=max[i][j]-alloc[i][j];

boolean[] finish = new boolean[n];
int[] work = avail.clone();
int[] seq = new int[n]; int c=0;
for(int k=0;k<n;k++)
  for(int i=0;i<n;i++){
    if(finish[i]) continue;
    boolean ok=true;
    for(int j=0;j<m;j++) if(need[i][j]>work[j]) ok=false;
    if(ok){ for(int j=0;j<m;j++) work[j]+=alloc[i][j];
            finish[i]=true; seq[c++]=i; }
  }
// Safe sequence: P1 P3 P4 P0 P2
```

```text
Safe sequence found: <P1, P3, P4, P0, P2>  => state is SAFE
```

## Key points

- Applies to **multiple-instance** resources; needs **Max claims** declared upfront.
- `Need = Max − Allocation`.
- Grants a request only if a **safe sequence** still exists afterward.
- Safety check runs in **O(n²·m)** time.
- Avoids deadlock but assumes a **fixed number of processes and resources** — impractical if demands are unknown.
