const axios = require('axios');
const colors = require('colors');
const {APIHandler} = require('../lib/api.js');
const api = new APIHandler();

class APITests {
    constructor() {
        this.url = 'https://trie.er1c.me/';
    }

    async test1() {
        console.log("A very simple test to show the structure of the trie. Note the grouping of first, fourth, and fifth.".yellow)
        const test = ['first', 'second', 'third', 'fourth', 'fifth'];

        for (t in test) {
            await api.postTrie(t);
        }
        await api.getTrie(true);
    }

    async test2() {
        console.log("Reverses test 1".yellow)
        const test = ['first', 'second', 'third', 'fourth', 'fifth'];

        for (t in test) {
            await api.deleteTrie(t);
        }

        await api.getTrie(true);
    }

    async test3() {
        console.log("Demonstrates the dynamic nature of the autocomplete endpoint".yellow)
        const test = ['first', 'fifth', 'fifteenth', 'fortieth', 'fiftieth'];

        for (t in test) {
            await api.postTrie(t);
        }

        await api.getTrie(true);
    }

    async test4() {
        console.log("Reverses test3".yellow)
        const test = ['first', 'fifth', 'fifteenth', 'fortieth', 'fiftieth'];

        for (t in test) {
            await api.deleteTrie(t);
        }

        await api.getTrie(true);
    }

    async test5() {
        console.log("Should show server handling requests in the order hey are received. Note the order of requests and the tree hierarchy. Intentionally does not use await.".yellow)
        const test = ['a', 'b', 'c', 'd', 'e'];

        for (t in test) {
            api.postTrie(t);
        }

        api.getTrie(true);

    }
    async test6() {
        console.log("Reverses test 5".yellow)
        const test = ['a', 'b', 'c', 'd', 'e'];

        for (t in test) {
            api.deleteTrie(t);
        }
    }
}

module.exports = APITests;