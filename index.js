const express = require('express');
const fs = require('fs');
const { Trie, TrieNode } = require('./trie.js');

const app = express();

const trie = new Trie(JSON.parse(fs.readFileSync('data.json', {encoding: 'utf8'})));

app.post('/words/:word', (req, res) => {
    try {
        TrieNode.add(trie.root, req.params.word);
        trie.save(); 

        res.status(200);
        res.send(JSON.stringify({
            "success": true,
            "word": req.params.word
        }));
    }
    catch {
        res.status(400);
        res.send(JSON.stringify({
            "success": false,
            "error": "Could not be added to trie."
        }));
    }
})

app.get('/get/', (req, res) => {
    res.send(JSON.stringify(trie));

    console.log(TrieNode.find(trie.root, "test"));
})

app.post('/get/', (req, res) => {
    res.send(JSON.stringify(trie));
})

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));