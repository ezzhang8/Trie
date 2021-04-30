const express = require('express');
const fs = require('fs');
const { Trie, TrieNode } = require('./trie.js');

const app = express();

const json = JSON.parse(fs.readFileSync('data.json', {encoding: 'utf8'}));
const trie = new Trie(new TrieNode(json));


app.get('/words/', (req, res) => {
    res.send(JSON.stringify(trie));
})

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

app.delete('/words/:word', (req, res) => {
    TrieNode.delete(trie.root, req.params.word);
    trie.save(); 

    res.send(JSON.stringify({
        "success": true
    }));
})

app.get('/find/:word', (req, res) => {
    res.status(200);
    res.send(JSON.stringify({
        "success": true,
        "found": TrieNode.find(trie.root, req.params.word) == false ? false : true
    }));
})

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));