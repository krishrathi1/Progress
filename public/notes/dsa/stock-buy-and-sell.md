## Problem

Given `prices[]` where `prices[i]` is the stock price on day `i`, maximize profit from **one** buy and one later sell. If no profit is possible, return `0`. You must buy before you sell.

- Example: `prices = [7, 1, 5, 3, 6, 4]` → buy at `1`, sell at `6` → profit `5`.

## Intuition

For each day, the best sell profit is `today's price - the minimum price seen so far`. So track the running minimum to the left; the answer is the largest such difference. No need to know when you buy explicitly — just the cheapest earlier price.

## Brute force — all pairs

```java
int maxProfitBrute(int[] p) {
    int best = 0;
    for (int i = 0; i < p.length; i++)
        for (int j = i + 1; j < p.length; j++)
            best = Math.max(best, p[j] - p[i]);
    return best;
}
```

**Time:** O(n²) · **Space:** O(1)

## Optimal — track minimum so far

```java
int maxProfit(int[] p) {
    int minPrice = Integer.MAX_VALUE, profit = 0;
    for (int price : p) {
        minPrice = Math.min(minPrice, price);   // cheapest buy so far
        profit   = Math.max(profit, price - minPrice);
    }
    return profit;
}
```

**Time:** O(n) · **Space:** O(1)

## Dry run

```text
p = [7, 1, 5, 3, 6, 4]
price=7 min=7 profit=0
price=1 min=1 profit=0
price=5 min=1 profit=4
price=3 min=1 profit=4
price=6 min=1 profit=5   <-- best
price=4 min=1 profit=5
answer = 5
```

## Key points

- Update `minPrice` **before** computing profit so buy day precedes sell day.
- Initialise `profit = 0` so a strictly decreasing array correctly returns `0`.
- Single-transaction only; multiple-transaction variants (buy/sell repeatedly) use a different greedy: sum every positive `p[i] - p[i-1]`.
- Greedy works because the optimal sell at day `i` always pairs with the global minimum to its left.
