"use strict";
/**
 * The Context defines the interface of interest to clients.
 */
class Context {
    /**
     * Usually, the Context accepts a strategy through the constructor, but also
     * provides a setter to change it at runtime.
     */
    constructor(strategy) {
        this.strategy = strategy;
    }
    /**
     * Usually, the Context allows replacing a Strategy object at runtime.
     */
    setStrategy(strategy) {
        this.strategy = strategy;
    }
    /**
     * The Context delegates some work to the Strategy object instead of
     * implementing multiple versions of the algorithm on its own.
     */
    doSomeBusinessLogic() {
        // ...
        console.log("Context: Sorting data using the strategy (not sure how it'll do it)");
        const result = this.strategy.doAlgorithm(["a", "b", "c", "d", "e"]);
        console.log(result.join(","));
        // ...
    }
}
/**
 * Concrete Strategies implement the algorithm while following the base Strategy
 * interface. The interface makes them interchangeable in the Context.
 */
class ConcreteStrategyA {
    doAlgorithm(data) {
        return data.sort();
    }
}
class ConcreteStrategyB {
    doAlgorithm(data) {
        return data.reverse();
    }
}
/**
 * The client code picks a concrete strategy and passes it to the context. The
 * client should be aware of the differences between strategies in order to make
 * the right choice.
 */
const context = new Context(new ConcreteStrategyA());
console.log("Client: Strategy is set to normal sorting.");
context.doSomeBusinessLogic();
console.log("");
console.log("Client: Strategy is set to reverse sorting.");
context.setStrategy(new ConcreteStrategyB());
context.doSomeBusinessLogic();
