const express = require('express');
const queue = require('express-queue'); // Module used to preserve the order of requests 


const fs = require('fs');
const { Trie, TrieNode } = require('./trie.js');

const app = express();

// BEGIN DIGITALOCEAN ONLY
const https = require('https');

const privateKey = fs.readFileSync('/etc/letsencrypt/live/trie.er1c.me/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/trie.er1c.me/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/trie.er1c.me/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

const httpsServer = https.createServer(credentials, app);

// END DIGITALOCEAN ONLY

app.use(queue({ activeLimit: 1, queuedLimit: -1 }));

// Trie persistence
const json = JSON.parse(fs.readFileSync('data.json', {encoding: 'utf8'}));
const trie = new Trie(json);

// Sends entire trie
app.get('/words/', (req, res) => {
    try {
        res.send(trie);
    }
    catch(e) {
        console.log(e);
        res.status(500);
        res.send({
            "error": e.toString(),
        });
    }
});

// Adds words to trie
app.post('/words/:word', (req, res) => {
    try {
        const word = req.params.word.replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase();

        if (TrieNode.find(trie.root, word)) 
            throw "This word already exists in the trie."
        
        TrieNode.add(trie.root, word);
        trie.save(); 

        res.status(200);
        res.send({
            "success": true,
            "word": word
        });
    }   
    catch(e) {
        console.log(e);
        res.status(400);
        res.send({
            "success": false,
            "error": e.toString()
        });
    }
})

// Deletes a word from trie
app.delete('/words/:word', (req, res) => {
    try {
        if (!TrieNode.delete(trie.root, req.params.word)) 
            throw "This word cannot be deleted because it already does not exist.";
        
        trie.save(); 
    
        res.send({
            "success": true
        });
    }
    catch(e) {
        console.log(e);
        res.status(400);
        res.send({
            "success": false,
            "error": e.toString()
        });
    }
})

// Finds a particular word in trie
app.get('/find/:word', (req, res) => {
    try {
        const result = TrieNode.find(trie.root, req.params.word.toLowerCase())
        res.status(200);
        
        res.send({
            "success": true,
            "found": result == false ? false : result[result.length-1].isWord
        }); 
    }
    catch(e) {
        console.log(e);
        res.status(500);
        res.send({
            "success": false,
            "error": e.toString()
        });
    }
     
})

// Auto-completes based on prefix using trie
app.get('/autocomplete/:prefix/:max', (req, res) => {
    try {
        const prefix = req.params.prefix.replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase();
        const find = JSON.parse(JSON.stringify(TrieNode.find(trie.root, prefix)));
        if (find == undefined) 
            return;
    
        res.send({
            "success": true,
            "words": TrieNode.prefix(find[find.length-1], prefix, req.params.max)
        });
    }
    catch(e) {
        console.log(e);
        res.status(500);
        res.send({
            "success": false,
            "error": e.toString()
        });
    }
    
})

// DIGITALOCEAN ONLY
httpsServer.listen(443, () => console.log('Server running on port 443'));


// TESTING ONLY 
// app.listen(80, () => console.log(`Server running on port 80`)); 
