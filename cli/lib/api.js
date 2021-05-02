const axios = require('axios');
const inquirer = require('inquirer');
const colors = require('colors');

class TrieApi {
    constructor() {
        this.url = 'https://trie.er1c.me/';
    }

    async getTrie(pp) {
        try {
            const response = await axios.get(this.url+"words/");
            let str = JSON.stringify(response.data, null, 1)

            if (pp) {
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

            console.log(str.yellow);
        }
        catch (e) {
            console.log("An error occured when contacting the server.".red);
        }
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

        try {
            const response = await axios.post(this.url+"words/"+input.word);

            if (response.data.success) {
                console.log(`"${input.word}"`.green + " was successfully added to the trie!".green);
                console.log(`Status code: ${response.status} ${response.statusText}`.green);
            }
            else {
                console.log(`"${input.word}"`.red + " could not be added to the trie!".red);
                console.log(`Status code: ${response.status} ${response.statusText}`.red);
            }
        }
        catch(e) {
            console.log(`An error occured. Check your string to make sure you have entered it properly.`.red);
        }
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

        try {
            const response = await axios.delete(this.url+"words/"+input.word);

            if (response.data.success) {
                console.log(`"${input.word}"`.green + " was successfully deleted from the trie!".green);
                console.log(`Status code: ${response.status} ${response.statusText}`.green);
            }
            else {
                console.log(`"${input.word}"`.red + " could not be deleted from the trie!".red);
                console.log(`Status code: ${response.status} ${response.statusText}`.red);
            }
        }
        catch(e) {
            console.log(`An error occured. Check your string to make sure you have entered it properly.`.red);
        }   
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

        try {
            const response = await axios.get(this.url+"find/"+input.word);

            if (response.data.success && response.data.found) {
                console.log(`"${input.word}"`.green + " was found in the trie.".green);
                console.log(`Status code: ${response.status} ${response.statusText}`.green);
            }
            else if (!response.data.found) {
                console.log(`"${input.word}"`.red + " was not found in the trie.".red);
                console.log(`Status code: ${response.status} ${response.statusText}`.yellow);
            }
            else {
                console.log("The find operation was not successful.".red);
                console.log(`Status code: ${response.status} ${response.statusText}`.red);
            }
        }
        catch(e) {
            console.log(`An error occured. Check your string to make sure you have entered it properly.`.red);

        }   

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

        try {
            const response = await axios.get(this.url+"autocomplete/"+input.word+"/"+num);

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
        catch(e) {
            console.log(`An error occured. Check your string to make sure you have entered it properly.`.red);
        }   

    }
}

module.exports = TrieApi;