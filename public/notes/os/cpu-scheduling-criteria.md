## Definition

**CPU scheduling criteria** are the metrics used to evaluate and compare CPU scheduling algorithms. The goal is to pick the process from the ready queue that best optimizes system performance and user experience.

## The Key Criteria

| Criterion | Meaning | Goal |
|-----------|---------|------|
| **CPU utilization** | % of time CPU is busy | Maximize |
| **Throughput** | Processes completed per unit time | Maximize |
| **Turnaround time** | Completion − Arrival | Minimize |
| **Waiting time** | Time spent in ready queue | Minimize |
| **Response time** | First response − Arrival | Minimize |
| **Fairness** | No starvation; each process gets CPU | Maximize |

## Core Formulas

```text
Turnaround Time (TAT) = Completion Time - Arrival Time
Waiting Time   (WT)   = Turnaround Time  - Burst Time
Response Time  (RT)   = First CPU allocation - Arrival Time
```

## Timeline Illustration

```text
Arrival        First run        Completion
  |----wait----|====burst====...====|
  |<--------- Turnaround ---------->|
  |--Response--|
```

- **Waiting time** is the sum of all periods spent waiting in the ready queue (may be split across multiple bursts in preemptive scheduling).
- **Response time** matters most in **interactive** systems; **turnaround** matters most in **batch** systems.

## Example

Three processes, all arriving at t=0, run in order P1(24), P2(3), P3(3) under FCFS:

| Process | Burst | Completion | TAT | WT |
|---------|-------|-----------|-----|-----|
| P1 | 24 | 24 | 24 | 0 |
| P2 | 3 | 27 | 27 | 24 |
| P3 | 3 | 30 | 30 | 27 |

Average WT = (0 + 24 + 27) / 3 = **17 ms**.

## Optimization Trade-offs

- Maximizing **throughput** can hurt **response time** (long jobs monopolize CPU).
- Guaranteeing **fairness** may reduce **average turnaround**.
- No single algorithm optimizes all criteria — choice depends on system type (batch vs interactive vs real-time).

## Key Points

- **Maximize:** CPU utilization, throughput. **Minimize:** turnaround, waiting, response time.
- **WT = TAT − Burst**; **TAT = Completion − Arrival**.
- **Response time** is the metric for interactive systems; **turnaround/throughput** for batch.
- Avoid **starvation** — ensure fairness.
