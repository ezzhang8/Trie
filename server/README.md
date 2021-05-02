# Trie (server)

This server uses Express and Node to deliver API endpoints for interfacing with the trie.

# How the server is hosted
The server is hosted on DigitalOcean. I chose DigitalOcean as my host due to its relative simplicity for a task such as this-- many other hosts offer a confusing array of extra features I do not need for this project. I paid $10 for a server, or "droplet" with 2 gigabytes of RAM, 1 vCPU, and 50 gigabytes of SSD storage. I chose my operating system to be Ubuntu 20. After having the server set up, I SSH'd in using my credentials in PowerShell, and installed the necessary packages for my server scripts to run. Since I did not want my API calls to go to an IP address, I used one of my domain names, made a subdomain, and created an alias DNS record. The server still lacked an SSL certificate, but I got one issued from LetsEncrypt. I allowed for HTTPS connections only in the end, as that has become pretty much an industry standard for APIs nowadays. For persistence of the trie, I used the built in fs module to write all changes to the trie to a JSON file.

# CLI Interaction
The CLI acts as a client and makes requests to the API endpoints established by the server. The CLI prompts the user to fill in all the parameters to get a meaningful response from one of the endpoints. In turn, the server plays an important role in sending error messages, handling the flow of requests, and processing the more intensive algorithms. The server takes in the request from the CLI, or any API call, and performs the said operation on the trie. 

# REST endpoints
I have documented all the endpoints on [this](https://github.com/ezzhang8/Trie/wiki/API-Documentation) Github wiki page, with cURL commands and the format for API calls.