/**
 * A产品接口
 */
interface AbstractProductA {
  usefulFunctionA(): string;
}
/**
 * A产品具体实现1
 */
class ConcreteProductA1 implements AbstractProductA {
  public usefulFunctionA(): string {
    return "The result of the product a1.";
  }
}
/**
 * A产品具体实现2
 */
class ConcreteProductA2 implements AbstractProductA {
  public usefulFunctionA(): string {
    return "The result of the product a2.";
  }
}
/**
 * B产品接口
 */
interface AbstractProductB {
  usefulFunctionB(): string;
  anotherUsefulFunctionB(collaborator: AbstractProductA): string;
}
/**
 * B产品具体实现1
 */
class ConcreteProductB1 implements AbstractProductB {
  public usefulFunctionB(): string {
    return "The result of the product b1.";
  }
  public anotherUsefulFunctionB(collaborator: AbstractProductA): string {
    const result = collaborator.usefulFunctionA();
    return `The result of the B1 collaborating with the (${result})`;
  }
}
/**
 * B产品具体实现2
 */
class ConcreteProductB2 implements AbstractProductB {
  public usefulFunctionB(): string {
    return "The result of the product b2.";
  }
  public anotherUsefulFunctionB(collaborator: AbstractProductA): string {
    const result = collaborator.usefulFunctionA();
    return `The result of the B2 collaborating with the (${result})`;
  }
}

/**
 * 工厂可以生产A、B两种产品
 */
interface AbstractFactory {
  createProductA(): AbstractProductA;
  createProductB(): AbstractProductB;
}

/**
 * 工厂1的具体实现
 */
class ConcreteFactory1 implements AbstractFactory {
  public createProductA(): AbstractProductA {
    return new ConcreteProductA1();
  }
  public createProductB(): AbstractProductB {
    return new ConcreteProductB1();
  }
}
/**
 * 工厂2的具体实现
 */
class ConcreteFactory2 implements AbstractFactory {
  public createProductA(): AbstractProductA {
    return new ConcreteProductA2();
  }
  public createProductB(): AbstractProductB {
    return new ConcreteProductB2();
  }
}

/**
 * 客户端代码仅通过其抽象接口与工厂和产品进行交互。 该接口允许同一客户端代码与不同产品进行交互。
 */
function clientCode2(factory: AbstractFactory) {
  const productA = factory.createProductA();
  const productB = factory.createProductB();

  console.log(productB.usefulFunctionB());
  console.log(productB.anotherUsefulFunctionB(productA));
}

console.log("Client: Testing client code with the first factory type...");
// 由工厂1生产
clientCode2(new ConcreteFactory1());

console.log("");

console.log(
  "Client: Testing the same client code with the second factory type..."
);
// 由工厂2生产
clientCode2(new ConcreteFactory2());

// Client: Testing client code with the first factory type...
// The result of the product b1.
// The result of the B1 collaborating with the (The result of the product a1.)

// Client: Testing the same client code with the second factory type...
// The result of the product b2.
// The result of the B2 collaborating with the (The result of the product a2.)
