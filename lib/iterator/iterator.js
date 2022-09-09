"use strict";
/**
 * Iterator Design Pattern
 *
 * Intent: Lets you traverse elements of a collection without exposing its
 * underlying representation (list, stack, tree, etc.).
 */
/**
 * Concrete Iterators implement various traversal algorithms. These classes
 * store the current traversal position at all times.
 */
class AlphabeticalOrderIterator {
    constructor(collection, reverse = false) {
        /**
         * Stores the current traversal position. An iterator may have a lot of
         * other fields for storing iteration state, especially when it is supposed
         * to work with a particular kind of collection.
         */
        this.position = 0;
        /**
         * This variable indicates the traversal direction.
         */
        this.reverse = false;
        this.collection = collection;
        this.reverse = reverse;
        if (reverse) {
            this.position = collection.getCount() - 1;
        }
    }
    rewind() {
        this.position = this.reverse ? this.collection.getCount() - 1 : 0;
    }
    current() {
        return this.collection.getItems()[this.position];
    }
    key() {
        return this.position;
    }
    next() {
        const item = this.collection.getItems()[this.position];
        this.position += this.reverse ? -1 : 1;
        return item;
    }
    valid() {
        if (this.reverse) {
            return this.position >= 0;
        }
        return this.position < this.collection.getCount();
    }
}
/**
 * Concrete Collections provide one or several methods for retrieving fresh
 * iterator instances, compatible with the collection class.
 */
class WordsCollection {
    constructor() {
        this.items = [];
    }
    getItems() {
        return this.items;
    }
    getCount() {
        return this.items.length;
    }
    addItem(item) {
        this.items.push(item);
    }
    getIterator() {
        return new AlphabeticalOrderIterator(this);
    }
    getReverseIterator() {
        return new AlphabeticalOrderIterator(this, true);
    }
}
/**
 * The client code may or may not know about the Concrete Iterator or Collection
 * classes, depending on the level of indirection you want to keep in your
 * program.
 */
const collection = new WordsCollection();
collection.addItem("First");
collection.addItem("Second");
collection.addItem("Third");
const iterator = collection.getIterator();
console.log("Straight traversal:");
while (iterator.valid()) {
    console.log(iterator.next());
}
console.log("");
console.log("Reverse traversal:");
const reverseIterator = collection.getReverseIterator();
while (reverseIterator.valid()) {
    console.log(reverseIterator.next());
}
