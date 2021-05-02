# Trie (CLI)
The command line interface for the trie.

# Installation
This CLI can be installed by running
`npm i @ezzhang8/trie-cli`

# Usage
A list of commands will be below:

`trie-cli -V` Version number
`trie-cli -h` Help
`trie-cli words get` Gets entire trie as a JSON string
`trie-cli words get --pp` Gets entire trie and pretty prints it so only letters appear in the console
`trie-cli words add` Adds a word to the trie
`trie-cli words delete` Deletes a word from the trie
`trie-cli find` Determines whether a specified word is in the trie
`trie-cli auto --max=<num>` Returns a list of autofill suggestions based on a prefix and a maximum amount of results

For more information on these commands, see [here](https://github.com/ezzhang8/Trie/wiki/API-Documentation) for documentation on the API.

# Test Commands
There are some test commands included to test the API:

`trie-cli test exec --t=<num>` Executes one of the ten numbered tests by specifying the --t flag.
Ex: `trie-cli test exec --t=3` executes test 3.

