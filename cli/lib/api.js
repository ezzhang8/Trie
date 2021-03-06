const axios = require('axios');
const inquirer = require('inquirer');
const colors = require('colors');

/**
 * Main API class 
 */
class APIHandler {
    constructor() {
        this.url = 'https://trie.er1c.me/';
    }

    /**
     * Gets the entire trie from the server and prints it in the console
     * @param {boolean} pp Whether to pretty print or not
     */
    async getTrie(pp) {
        try {
            const response = await axios.get(this.url+"words/");
            let str = JSON.stringify(response.data, null, 1)

            if (pp) {
                // Use a lot of regexes to get rid of JSON
                str = str
                    .replace(/"children":/g, '')
                    .replace(/"isWord":/g, '')
                    .replace(/false/g, '')
                    .replace(/true/g, '')
                    .replace(/{/g, '')
                    .replace(/}/g, '')
                    .replace(/,/g, '')
                    .replace(/:/g, '')
                    .replace(/"/g, '')
                    .replace(/root/g, '')
                    .replace(/^\s*\n/gm, '')
            }

            // Output yellow text 
            console.log(str.yellow);
        }
        catch (e) {
            console.log("An error occured when contacting the server.".red);
        }
    }

    /**
     * Adds a word to the trie, if it does not already exist.
     * @param {string} word The word to add
     */
    async postTrie(word) {
        const response = await axios.post(this.url+"words/"+word)
            .catch((error) => {
                console.log(`An error occured: ${error.response.data.error}`.red);
                console.log(`Status code: ${error.response.status} ${error.response.statusText}`.red);
            });

        if (response) {
            if (response.data.success) {
                console.log(`"${word}"`.green + " was successfully added to the trie!".green);
                console.log(`Status code: ${response.status} ${response.statusText}`.green);
            }
            else {
                console.log(`"${word}"`.red + " could not be added to the trie!".red);
                console.log(`Status code: ${response.status} ${response.statusText}`.red);
            }
        }
    }
    /**
     * Deletes a word from teh trie if possible
     * @param {string} word The word to delete from the trie
     */
    async deleteTrie(word) {
        const response = await axios.delete(this.url+"words/"+word)
            .catch((error) => {
                console.log(`An error occured: ${error.response.data.error}`.red);
                console.log(`Status code: ${error.response.status} ${error.response.statusText}`.red);
            });
        
        if (response) {
            if (response.data.success) {
                console.log(`"${word}"`.green + " was successfully deleted from the trie!".green);
                console.log(`Status code: ${response.status} ${response.statusText}`.green);
            }
            else {
                console.log(`"${word}"`.red + " could not be deleted from the trie!".red);
                console.log(`Status code: ${response.status} ${response.statusText}`.red);
            }
        }

    }
    /**
     * Finds words in trie
     * @param {string} word The word which to look for
     */
    async find(word) {
        const response = await axios.get(this.url+"find/"+word)
            .catch((error) => {
                console.log(`An error occured: ${error.response.data.error}`.red);
                console.log(`Status code: ${error.response.status} ${error.response.statusText}`.red);
            });

        if (response) {
            if (response.data.success && response.data.found) {
                console.log(`"${word}"`.green + " was found in the trie.".green);
                console.log(`Status code: ${response.status} ${response.statusText}`.green);
            }
            else if (!response.data.found) {
                console.log(`"${word}"`.red + " was not found in the trie.".red);
                console.log(`Status code: ${response.status} ${response.statusText}`.yellow);
            }
            else {
                console.log("The find operation was not successful.".red);
                console.log(`Status code: ${response.status} ${response.statusText}`.red);
            }
        }
    }

    /**
     * Autocompletes incomplete words that use similar letters words in the trie.
     * @param {number} num max number of autocomplete results to collect
     * @param {string} word the prefix/word typed in so far that should be completed
     */
    async auto(num, word) {
        const response = await axios.get(this.url+"autocomplete/"+word+"/"+num)
            .catch((error) => {
                console.log(`An error occured: ${error.response.data.error}`.red);
                console.log(`Status code: ${error.response.status} ${error.response.statusText}`.red);
            });

        if (response) {
            if (response.data.success && response.data.words.length > 0) {
                console.log(`${response.data.words.length} (max ${num}) suggestions were found in the trie.`.green);
    
                console.log(response.data.words);
            }
            else if (response.data.success && response.data.words.length == 0) {
                console.log("No words with that prefix were found in the trie.".red);
            }
            else {
                console.log("The server failed to successfully return a response.".red);
            }
            
        } 
    }
}

/**
 * Descendant class of APIHandler, main purpose is to use inquirer to prompt the user to enter their words in a standalone field rather than in an argument.
 */
class TrieAPI extends APIHandler {
    constructor() {
        super();
    }
    
    async postTrie() {
        const input = await inquirer.prompt([
            {
                type: 'input',
                name: 'word',
                message: 'Enter a string: '.blue,
                validate: input => (input === '' ? 'You must enter a string.' : true)
            }
        ])

        super.postTrie(input.word);
    }

    async deleteTrie() {
        const input = await inquirer.prompt([
            {
                type: 'input',
                name: 'word',
                message: 'Enter a string: '.blue,
                validate: input => (input === '' ? 'You must enter a string.' : true)
            }
        ])

        super.deleteTrie(input.word);
    }

    async find() {
        const input = await inquirer.prompt([
            {
                type: 'input',
                name: 'word',
                message: 'Enter a string: '.blue,
                validate: input => (input === '' ? 'You must enter a string.' : true)
            }
        ])

        super.find(input.word);
    }

    async auto(num, word) {
        const input = await inquirer.prompt([
            {
                type: 'input',
                name: 'word',
                message: 'Enter a string: '.blue,
                validate: input => (input === '' ? 'You must enter a string.' : true)
            }
        ])

        super.auto(num, input.word);
    }
}

module.exports = {
    APIHandler,
    TrieAPI
};