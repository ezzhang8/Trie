const express = require('express');

const fs = require('fs');
const { Trie, TrieNode } = require('./trie.js');

const app = express();

const http = require('http');
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


const json = JSON.parse(fs.readFileSync('data.json', {encoding: 'utf8'}));
const trie = new Trie(json);


app.use(express.static(__dirname, { dotfiles: 'allow' } ));

app.get('/words/', (req, res) => {
    res.send(JSON.stringify(trie));
});

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
            "error": n
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

httpsServer.listen(443, () => console.log('HTTPS Server running on port 443'));
