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

        this.add(path.children[word.charAt(0)], word.slice(1));    
    }

    /**
     * 
     * @param {*} path 
     * @param {*} word
     * @returns {Boolean | Object} 
     */
    static find(path, word) {
        let temp = word;
        let hierarchy = [path];
        let lastNodePath;


        for (let i=0; i<temp.length; i++) {
            lastNodePath = hierarchy[hierarchy.length-1];

            if (lastNodePath.children[temp.charAt(i)] == undefined)
                return false;
            else {
                hierarchy.push(lastNodePath.children[temp.charAt(i)])
            }
        }

        return hierarchy;
    }


    static delete(path, word) {
        let hierarchy = this.find(path, word);

        if (hierarchy == false) 
            return false;
        
        for (let i = hierarchy.length-1; i > 0; i--) {
            if (Object.keys(hierarchy[i].children).length > 1) {
                console.log(i);
                delete hierarchy[i].children[word.charAt(i)];
                return true;
            }
        }

        delete path.children[word.charAt(0)];
        
        return true;
    }

    static #prefixHelper() {
        console.log(42);
    }

    static prefix(path, word, maxResults, results = []) {
        if (results.length == maxResults) 
            return results;

        const find = this.find(path, word)
        if (find == undefined) 
            return false;
        
        const root = [find[find.length-1]];
        let firstSuggestion = root[0];
        let firstWord = word;

        while (!firstSuggestion.isWord) {
            firstWord += Object.keys(firstSuggestion.children)[0];
            firstSuggestion = firstSuggestion.children[Object.keys(firstSuggestion.children)[0]];
            root.push(firstSuggestion);
        }

        results.push(firstWord);
        for (let i = root.length-1; i > 0; i--) {
            
        }


        return results;
       // this.#prefixHelper();
    }


}

module.exports = {
    Trie,
    TrieNode
};
