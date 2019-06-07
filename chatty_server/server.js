  // server.js

  const express = require('express');
  const WebSocket = require('ws');
  const SocketServer = WebSocket.Server;
  const uuidv4 = require('uuid/v4');
  // Set the port to 3001
  const PORT = 3001;
  
  const server = express()
    .use(express.static('public'))
    .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));
  
  // Create the WebSockets server
  const wss = new SocketServer({ server });
  
  wss.on('connection', (ws) => {
    
    console.log('Client connected');
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }
    
    const color = ["yellow", "blue", "red", "purple", "green", "grey", "orange"];
    
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({clientColor: color[getRandomInt(7)]}));
    }

    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({clientNum: wss.clients.size}));
      }
    });

  ws.on('message', function incoming(data) {
    
    const messageObj = JSON.parse(data);
    
    if(messageObj.type === "postNotification") {
      messageObj.type = "username changed";
    } else {
      messageObj.type = "incomingMessage";
    }
    
    messageObj.id = uuidv4();

    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(messageObj));
      }
    });
    
  });

// Set up a callback for when a client closes the socket. This usually means they closed their browser.
    ws.on('close', () => {
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({clientNum: wss.clients.size}));
        }
      });
    });
});