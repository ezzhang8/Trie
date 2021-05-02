const program = require('commander');

const {TrieAPI} = require('../lib/api.js');
const api = new TrieAPI();

program
    .command('get')
    .description('Gets the current global state of the trie.')
    .option('--pp', 'Pretty-prints trie in console as characters without JSON.')
    .action(cmd => api.getTrie(cmd.pp))

program 
    .command('add')
    .description('Adds a string to the trie.')
    .action(cmd => api.postTrie())


program 
    .command('delete')
    .description('Deletes a string to the trie.')
    .action(cmd => api.deleteTrie())
    

program.parse(process.argv);      