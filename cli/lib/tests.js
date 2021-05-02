const axios = require('axios');
const colors = require('colors');
const {APIHandler} = require('../lib/api.js');
const api = new APIHandler();

/**
 * Class containing 10 api test cases
 */
class APITests {
    constructor() {
        this.url = 'https://trie.er1c.me/';
    }

    async test1() {
        console.log("A very simple test to show the structure of the trie. Note the grouping of first, fourth, and fifth.".yellow)
        const test = ['first', 'second', 'third', 'fourth', 'fifth'];

        for (let t of test) {
            await api.postTrie(t);
        }
        await api.getTrie(true);
    }

    async test2() {
        console.log("Reverses test 1".yellow)
        const test = ['first', 'second', 'third', 'fourth', 'fifth'];

        for (let t of test) {
            await api.deleteTrie(t);
        }

        await api.getTrie(true);
    }

    async test3() {
        console.log("Demonstrates the dynamic nature of the autocomplete endpoint".yellow)
        const test = ['first', 'fifth', 'fifteenth', 'fortieth', 'fiftieth'];

        for (let t of test) {
            await api.postTrie(t);
        }

        await api.getTrie(true);
    }

    async test4() {
        console.log("Reverses test3".yellow)
        const test = ['first', 'fifth', 'fifteenth', 'fortieth', 'fiftieth'];

        for (let t of test) {
            await api.deleteTrie(t);
        }

        await api.getTrie(true);
    }

    async test5() {
        console.log("Should show server handling requests in the order they are received. Note the order of requests and the tree hierarchy. Intentionally does not use await.".yellow)
        const test = ['a', 'b', 'c', 'd', 'e'];

        for (let t of test) {
            api.postTrie(t);
        }
        api.getTrie(true);

    }
    async test6() {
        console.log("Reverses test 5".yellow)
        const test = ['a', 'b', 'c', 'd', 'e'];

        for (let t of test) {
            api.deleteTrie(t);
        }
        api.getTrie(true);

    }

    async test7() {
        console.log("Add and find")
        const test = ['f', 'g', 'h', 'i', 'j'];

        for (let t of test) {
            await api.postTrie(t);
            await api.find(t);
        }
    }

    async test8() {
        console.log("Reverse of test 7, remove and find".yellow)
        const test = ['f', 'g', 'h', 'i', 'j'];

        for (let t of test) {
            await api.deleteTrie(t);
            await api.find(t);
        }
    }

    async test9() {
        console.log("Longer words and phrases: add, find, suggest, then delete.".yellow)
        const test = ['onomatopoeia', 'orangutan', 'orange', 'oxford', 'oxen', "the quick brown fox", "jumped over", "a lazy dog"];

        for (let t of test) {
            await api.postTrie(t);
            await api.find(t);
            await api.auto(15, t.charAt(0));
        }

        for (let t of test) {
            await api.deleteTrie(t);
        }

        api.getTrie(true);
    }

    async test10() {
        for (let i = 1; i<10; i++) {
            await this["test"+i]();
        }
    }
}

module.exports = APITests;