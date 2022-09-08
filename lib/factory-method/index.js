"use strict";
/**
 * 具体产品，产品接口的不同实现
 * 不同的实现，不同的产品
 */
class ConcreteProduct1 {
    operation() {
        return "{Result of the ConcreteProduct1}";
    }
}
class ConcreteProduct2 {
    operation() {
        return "{Result of the ConcreteProduct2}";
    }
}
/**
 * Creator类声明了工厂方法，该方法应该返回一个Product类的对象。
 * Creator类的子类通常提供这个方法的实现。
 *
 * 创建者类声明工厂方法，用于返回产品对象
 * 该方法的返回对象类型Product必须与产品接口相匹配
 *
 * 【实现方式2】在创建类中添加一个空的工厂方法。该方法的返回类型必须遵循通用的产品接口。
 */
class Creator {
    /**
     * 注意的是，尽管它的名字是创建者，Creator的主要职责不是创建产品
     * 通常，它包含一些依赖于由工厂方法返回的Product对象的核心业务逻辑
     * 工厂方法将这些逻辑处理从具体产品类中分离出来
     * 子类可以通过重写工厂方法间接改变业务逻辑并返回不同类型的产品。
     */
    someOperation() {
        // this 指向调用 someOperation方法 的对象，即creator
        // 【实现方式3】在创建者代码中找到对于产品构造函数的所有引用。将它们依次替换为对于工厂方法的调用，同时将创建产品的代码移入工厂方法。
        const product = this.factoryMethod();
        return `Creator: The same creator's code has just worked with ${product.operation()}`;
    }
}
/**
 * 具体的创建者重写工厂方法以更改返回产品的类型。
 *
 * 【实现方式4】为工厂方法中的每种产品编写一个创建者子类，然后在子类中重写工厂方法，并将基本方法中的相关创建代码移动到工厂方法中。
 */
class ConcreteCreator1 extends Creator {
    /**
     * 注意，方法的签名仍然使用抽象的产品类型，即使具体的产品实际上是从方法返回的。
     * 这样，Creator就可以独立于具体的产品类。
     * 在子类中重写工厂方法， 从而改变其创建产品的类型。
     * 注意， 并不一定每次调用工厂方法都会创建新的实例。工厂方法也可以返回缓存、对象池或其他来源的已有对象。
     */
    factoryMethod() {
        // 对象仍将通过 new运算符创建， 只是该运算符改在工厂方法中调用罢了
        // 工厂方法返回的对象通常被称作 “产品”
        return new ConcreteProduct1();
    }
}
class ConcreteCreator2 extends Creator {
    factoryMethod() {
        return new ConcreteProduct2();
    }
}
function clientCode(creator) {
    console.log("Client: I'm not aware of the creator's class, but it still works.");
    console.log(creator.someOperation());
}
console.log("App: Launched with the ConcreteCreator1.");
// App: Launched with the ConcreteCreator1.
clientCode(new ConcreteCreator1());
// Client: I'm not aware of the creator's class, but it still works.
// Creator: The same creator's code has just worked with {Result of the ConcreteProduct1}
console.log("");
// 工厂方法模式适合的应用场景
// 当你在编写代码的过程中，如果无法预知对象确切类别及其依赖关系时，可使用工厂方法。
// 工厂方法将创建产品的代码与实际使用产品的代码分离，从而能在不影响其他代码的情况下扩展产品创建部分代码。
// 例如，如果需要向应用中添加一种新产品，你只需要开发新的创建者子类，然后重写其工厂方法即可。
console.log("App: Launched with the ConcreteCreator2.");
// App: Launched with the ConcreteCreator2.
clientCode(new ConcreteCreator2());
// Client: I'm not aware of the creator's class, but it still works.
// Creator: The same creator's code has just worked with {Result of the ConcreteProduct2}
