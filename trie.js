const fs = require('fs');

class Trie {
    constructor(root) {
        this.root = root;
    }

    save() {
        fs.writeFile('data.json', JSON.stringify(this.root), (err) => {
            if (err != null) 
                return err;
        });
    }
}

class TrieNode {
    constructor() {
        this.children = {};
        this.isWord = false;
    }
    /**
     * Recursively adds a word to the trie
     * @param {TrieNode} path - Path to a TrieNode
     * @param {String} word - Word
     * @returns {void}
     */
    static add(path, word) {
        if (word.length == 0) { 
            path.isWord = true;
            return;
        }

        if (path.children[word.charAt(0)] == undefined) {
            path.children[word.charAt(0)] = new TrieNode();
        }

        TrieNode.add(path.children[word.charAt(0)], word.slice(1));    
    }

    /**
     * 
     * @param {*} path 
     * @param {*} word
     * @returns {Boolean} 
     */
    static find(path, word) {
        let temp = word;
        let lastNodePath;

        for (let i=0; i<temp.length; i++) {
            if (path.children[temp.charAt(i)] == undefined)  {
                console.log(path)
                return false;
            }
            else {
                lastNodePath = path.children[temp.charAt(i)];
            }
        }

        return true;
    }



}

module.exports = {
    Trie,
    TrieNode
};
