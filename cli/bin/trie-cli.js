#!/usr/bin/env node
const program = require('commander');
const package = require('../package.json');

const {TrieAPI} = require('../lib/api.js');
const api = new TrieAPI();

program
    .version(package.version)
    .command('words', 'Create, read, and delete words in the trie.')
    .command('test', 'Test the global state of the trie.')

program
    .command('find')
    .description('Find whether a word is in the trie.')
    .action(cmd => api.find())

program
    .command('auto')
    .description('Return a list of autocomplete suggestions based on a prefix.')
    .option('--max <num>', 'Maximum amount of suggestions to return', 5)
   // .action(cmd => api.auto())
    .action(cmd => api.auto(cmd.max))

program.parse(process.argv);
