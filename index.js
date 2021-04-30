const express = require('express');
const fs = require('fs');
const { Trie, TrieNode } = require('./trie.js');
const { Queue } = require('./queue.js');

const app = express();

const json = JSON.parse(fs.readFileSync('data.json', {encoding: 'utf8'}));
const trie = new Trie(json);
const queue = new Queue();

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
    catch(e) {
        console.log(e);
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
    const result = TrieNode.find(trie.root, req.params.word)
    res.status(200);
    res.send(JSON.stringify({
        "success": true,
        "found": result == false ? false : result[result.length-1].isWord
    }));
})

app.get('/autocomplete/:prefix/:max', (req, res) => {
    const find = JSON.parse(JSON.stringify(TrieNode.find(trie.root, req.params.prefix)));
    if (find == undefined) 
        return;

    res.send(JSON.stringify({
        "success": true,
        "words": TrieNode.prefix(find[find.length-1], req.params.prefix, req.params.max)
    }));
})


const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));