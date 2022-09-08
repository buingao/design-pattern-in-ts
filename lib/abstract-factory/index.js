"use strict";
/**
 * A产品具体实现1
 */
class ConcreteProductA1 {
    usefulFunctionA() {
        return "The result of the product a1.";
    }
}
/**
 * A产品具体实现2
 */
class ConcreteProductA2 {
    usefulFunctionA() {
        return "The result of the product a2.";
    }
}
/**
 * B产品具体实现1
 */
class ConcreteProductB1 {
    usefulFunctionB() {
        return "The result of the product b1.";
    }
    anotherUsefulFunctionB(collaborator) {
        const result = collaborator.usefulFunctionA();
        return `The result of the B1 collaborating with the (${result})`;
    }
}
/**
 * B产品具体实现2
 */
class ConcreteProductB2 {
    usefulFunctionB() {
        return "The result of the product b2.";
    }
    anotherUsefulFunctionB(collaborator) {
        const result = collaborator.usefulFunctionA();
        return `The result of the B2 collaborating with the (${result})`;
    }
}
/**
 * 工厂1的具体实现
 */
class ConcreteFactory1 {
    createProductA() {
        return new ConcreteProductA1();
    }
    createProductB() {
        return new ConcreteProductB1();
    }
}
/**
 * 工厂2的具体实现
 */
class ConcreteFactory2 {
    createProductA() {
        return new ConcreteProductA2();
    }
    createProductB() {
        return new ConcreteProductB2();
    }
}
/**
 * 客户端代码仅通过其抽象接口与工厂和产品进行交互。 该接口允许同一客户端代码与不同产品进行交互。
 */
function clientCode(factory) {
    const productA = factory.createProductA();
    const productB = factory.createProductB();
    console.log(productB.usefulFunctionB());
    console.log(productB.anotherUsefulFunctionB(productA));
}
console.log("Client: Testing client code with the first factory type...");
// 由工厂1生产
clientCode(new ConcreteFactory1());
console.log("");
console.log("Client: Testing the same client code with the second factory type...");
// 由工厂2生产
clientCode(new ConcreteFactory2());
// Client: Testing client code with the first factory type...
// The result of the product b1.
// The result of the B1 collaborating with the (The result of the product a1.)
// Client: Testing the same client code with the second factory type...
// The result of the product b2.
// The result of the B2 collaborating with the (The result of the product a2.)
