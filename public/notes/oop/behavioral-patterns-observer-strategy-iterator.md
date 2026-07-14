## Definition

**Behavioral patterns** deal with **communication and the assignment of responsibilities** between objects — how they interact and distribute algorithms. Three widely used ones are **Observer**, **Strategy**, and **Iterator**.

## Observer

Defines a **one-to-many** dependency so that when one object (**subject**) changes state, all its dependents (**observers**) are notified automatically. Basis of event systems and MVC.

```java
interface Observer { void update(String news); }

class NewsAgency {                       // subject
    private final List<Observer> subs = new ArrayList<>();
    void subscribe(Observer o) { subs.add(o); }
    void publish(String news)  { subs.forEach(o -> o.update(news)); }
}
class Channel implements Observer {
    public void update(String news) { System.out.println("Got: " + news); }
}
```

## Strategy

Defines a family of **interchangeable algorithms**, encapsulates each, and makes them swappable at runtime. Replaces sprawling `if/else` with polymorphism.

```java
interface PayStrategy { void pay(int amount); }
class CardPay  implements PayStrategy { public void pay(int a){ System.out.println("Card: "+a);} }
class UpiPay   implements PayStrategy { public void pay(int a){ System.out.println("UPI: "+a);} }

class Cart {
    private PayStrategy strategy;
    void setStrategy(PayStrategy s) { this.strategy = s; }  // swap at runtime
    void checkout(int amt)          { strategy.pay(amt); }
}
```

## Iterator

Provides a way to access elements of a collection **sequentially** without exposing its underlying representation. Java's `Iterator`/`Iterable` and the for-each loop are built on it.

```java
List<String> list = List.of("a", "b", "c");
Iterator<String> it = list.iterator();
while (it.hasNext()) System.out.println(it.next());  // no index, no internals
```

## Comparison

| Pattern | Intent | Real-world Java use |
|---------|--------|---------------------|
| **Observer** | Notify many objects of state change | Event listeners, `PropertyChangeListener` |
| **Strategy** | Swap algorithms at runtime | `Comparator`, payment methods |
| **Iterator** | Traverse a collection uniformly | `Iterator`, for-each loop |

```text
Observer:  Subject --notify--> Obs1, Obs2, Obs3
Strategy:  Context --delegates--> [ AlgoA | AlgoB | AlgoC ]
Iterator:  Client --hasNext/next--> Collection (internals hidden)
```

## Key points

- Behavioral patterns organize **interaction and responsibility** between objects.
- **Observer**: publish/subscribe — one subject, many auto-notified observers.
- **Strategy**: encapsulate interchangeable algorithms; select at runtime; kills big if-else chains.
- **Iterator**: uniform sequential access without leaking a collection's structure.
- All promote **loose coupling** via programming to interfaces.
