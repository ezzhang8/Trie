# Trie (CLI)
The command line interface for the trie.

# Installation
This CLI can be installed by running <br>
`npm install -g @ezzhang8/trie-cli`

# Usage
A list of commands will be below:

```trie-cli -V``` Version number <br>
```trie-cli -h``` Help <br>
```trie-cli words get``` Gets entire trie as a JSON string <br>
```trie-cli words get --pp``` Gets entire trie and pretty prints it so only letters appear in the console <br>
```trie-cli words add``` Adds a word to the trie <br>
```trie-cli words delete``` Deletes a word from the trie <br>
```trie-cli find``` Determines whether a specified word is in the trie <br>
```trie-cli auto --max=<num>``` Returns a list of autofill suggestions based on a prefix and a maximum amount of results (default 5)<br>

For more information on these commands, see [here](https://github.com/ezzhang8/Trie/wiki/API-Documentation) for documentation on the API.

# Test Commands
There are some test commands included to test the API:

```trie-cli test exec --t=<num>``` Executes one of the ten (1-10) numbered tests by specifying the --t flag. <br>
Example: ```trie-cli test exec --t=3``` executes test 3.

