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
        let hierarchy = TrieNode.find(path, word);
        if (hierarchy == false) {
            return false;
        }

        console.log(hierarchy);

        for (let i = hierarchy.length-1; i>0; i--) {
            if (Object.keys(hierarchy[i].children).length > 1) {
                console.log(i);
                delete hierarchy[i-1].children[word.charAt(i-1)];
                break;
            }
        }

        // if (Object.keys(path.children[word.charAt(0)].children).length == 0) {
        //     delete path.children[word.charAt(0)];
        // }

        return true;
    }


}

module.exports = {
    Trie,
    TrieNode
};
