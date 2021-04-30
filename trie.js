const fs = require('fs');

class Trie {
    /**
     * Constructs the Trie object with global state
     * @param {TrieNode} root A root TrieNode from which the trie will branch off from
     */
    constructor(root) {
        this.root = root;
    }

    /**
     * Saves current state of trie's root node to a JSON file to retrieve later
     */
    save() {
        fs.writeFile('data.json', JSON.stringify(this.root), (err) => {
            if (err != null) 
                console.log(err);
        });
    }
}

class TrieNode {
    /**
     * Creates two properties of each object, a children object and a isWord boolean
     */
    constructor() {
        this.children = {};
        this.isWord = false;
    }

    /**
     * Recursively adds a word to the trie
     * @param {TrieNode} path Path to a TrieNode, typically starting from the root node
     * @param {string} word Word to add 
     */
    static add(path, word) {
        // Base case
        if (word.length == 0) { 
            path.isWord = true;
            return;
        }

        // If the node for the first letter of the word is not already created, create it
        if (path.children[word.charAt(0)] == undefined) 
            path.children[word.charAt(0)] = new TrieNode();

        /*
            Recursion:
            Go one level deeper into the trie, cut off first letter of word as each letter is added individually at a 
            deeper layer in the trie
        */
        this.add(path.children[word.charAt(0)], word.slice(1));    
    }

 
    /**
     * Finds a word in the trie, returns an array of all TrieNode objects associated with it if found
     * @param {TrieNode} path Path to a TrieNode, typically starting from the root node
     * @param {string} word Word to look for
     * @returns {(boolean | TrieNode[])} False if the word cannot be found, an array of TrieNode objects otherwise representing the path of the word
     */
    static find(path, word) {
        let hierarchy = [path]; // An array of all parent nodes to the final word
        let lastNodePath; // The path to the most recent node in hierarchy

        for (let i=0; i<word.length; i++) {
            lastNodePath = hierarchy[hierarchy.length-1];

            if (lastNodePath.children[word.charAt(i)] == undefined)
                return false; // Means the word does not exist in the trie.
            else 
                hierarchy.push(lastNodePath.children[word.charAt(i)]);
        }

        return hierarchy;
    }

    /**
     * Deletes a word and its associated unique nodes 
     * @param {TrieNode} path Path to the root node
     * @param {string} word Word to be found and deleted
     * @returns {boolean} True if the delete is successful, false otherwise
     */
    static delete(path, word) {
        let hierarchy = this.find(path, word); // First find the word to ensure it can be deleted.

        if (hierarchy == false) 
            return false; // If the word being deleted doesn't exist, return false 
        
        /*
            Iterating backwards through the array (depth-first), delete the first node in the hierarchy
            where there are siblings, which in turn will delete all descendant nodes which must be unique.
        */
        for (let i=hierarchy.length-1; i>0; i--) {
            if (Object.keys(hierarchy[i].children).length > 1) {
                delete hierarchy[i].children[word.charAt(i)];
                return true;
            }
        }

        // If the previous for loop does not return, the node to be deleted must be at the very top level and must be handled as such
        delete path.children[word.charAt(0)];
        return true;
    }

    /**
     * 
     * @param {*} find 
     * @param {*} word 
     * @param {*} maxResults 
     * @param {*} results 
     * @returns 
     */
    static prefix(find, word, maxResults, results = []) {
        if (results.length == maxResults || find == undefined) 
            return results;

        const root = [find];
        let firstSuggestion = root[0];
        let firstWord = word;

        while (!firstSuggestion.isWord) {
            firstWord += Object.keys(firstSuggestion.children)[0];
            firstSuggestion = firstSuggestion.children[Object.keys(firstSuggestion.children)[0]];
            root.push(firstSuggestion);
        }

        results.push(firstWord);

        for (let i = root.length-2; i >= 0; i--) {
            if (Object.keys(root[i].children).length > 1) {
                while (Object.keys(root[i].children).length > 0) {
                    delete root[i].children[Object.keys(root[i].children)[0]];
            
                    const nextfind = root[i].children[Object.keys(root[i].children)[0]]
                    const nextstr = results[results.length-1].substring(0, i+word.length)+Object.keys(root[i].children)[0]
    
                    this.prefix(nextfind, nextstr, maxResults, results);
                }
            }
        }

        return results;
    }


}

module.exports = {
    Trie,
    TrieNode
};
