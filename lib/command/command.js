"use strict";
/**
 * Some commands can implement simple operations on their own.
 */
class SimpleCommand {
    constructor(payload) {
        this.payload = payload;
    }
    execute() {
        console.log(`SimpleCommand: See, I can do simple things like printing (${this.payload})`);
    }
}
/**
 * However, some commands can delegate more complex operations to other objects,
 * called "receivers."
 */
class ComplexCommand {
    /**
     * Complex commands can accept one or several receiver objects along with
     * any context data via the constructor.
     */
    constructor(receiver, a, b) {
        this.receiver = receiver;
        this.a = a;
        this.b = b;
    }
    /**
     * Commands can delegate to any methods of a receiver.
     */
    execute() {
        console.log("ComplexCommand: Complex stuff should be done by a receiver object.");
        this.receiver.doSomething(this.a);
        this.receiver.doSomethingElse(this.b);
    }
}
/**
 * The Receiver classes contain some important business logic. They know how to
 * perform all kinds of operations, associated with carrying out a request. In
 * fact, any class may serve as a Receiver.
 */
class Receiver {
    doSomething(a) {
        console.log(`Receiver: Working on (${a}.)`);
    }
    doSomethingElse(b) {
        console.log(`Receiver: Also working on (${b}.)`);
    }
}
/**
 * The Invoker is associated with one or several commands. It sends a request to
 * the command.
 */
class Invoker {
    /**
     * Initialize commands.
     */
    setOnStart(command) {
        this.onStart = command;
    }
    setOnFinish(command) {
        this.onFinish = command;
    }
    /**
     * The Invoker does not depend on concrete command or receiver classes. The
     * Invoker passes a request to a receiver indirectly, by executing a
     * command.
     */
    doSomethingImportant() {
        console.log("Invoker: Does anybody want something done before I begin?");
        if (this.isCommand(this.onStart)) {
            this.onStart.execute();
        }
        console.log("Invoker: ...doing something really important...");
        console.log("Invoker: Does anybody want something done after I finish?");
        if (this.isCommand(this.onFinish)) {
            this.onFinish.execute();
        }
    }
    isCommand(object) {
        return object.execute !== undefined;
    }
}
/**
 * The client code can parameterize an invoker with any commands.
 */
const invoker = new Invoker();
invoker.setOnStart(new SimpleCommand("Say Hi!"));
const receiver = new Receiver();
invoker.setOnFinish(new ComplexCommand(receiver, "Send email", "Save report"));
invoker.doSomethingImportant();
