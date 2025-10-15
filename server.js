// server.js
const express = require('express');
const http = require('http');
const path = require('path');
const WebSocket = require('ws');

const PORT = process.env.PORT || 3000; // port lokal aplikasi
const BASE_PATH = '/web-1';

const app = express();

// Serve client files from ./public (index.html, client.js, styles.css)
app.use(BASE_PATH, express.static(path.join(__dirname, 'public')));

// HTTP server
const server = http.createServer(app);

// WebSocket server on path BASE_PATH + /ws
const wss = new WebSocket.Server({ server, path: `${BASE_PATH}/ws` });

// Simple in-memory users store (socket -> username)
const clients = new Map();

function broadcast(data, exceptSocket = null) {
  const msg = JSON.stringify(data);
  for (const ws of wss.clients) {
    if (ws.readyState === WebSocket.OPEN && ws !== exceptSocket) {
      ws.send(msg);
    }
  }
}

wss.on('connection', (ws, req) => {
  // assign default name
  let username = `Guest-${Math.floor(Math.random() * 10000)}`;
  clients.set(ws, username);

  // announce new user
  broadcast({ type: 'system', text: `${username} connected` }, ws);
  // send welcome + current name to the connected socket
  ws.send(JSON.stringify({ type: 'welcome', username }));

  ws.on('message', raw => {
    try {
      const data = JSON.parse(raw);
      if (data.type === 'set-name') {
        const old = clients.get(ws);
        clients.set(ws, data.name || old);
        username = clients.get(ws);
        broadcast({ type: 'system', text: `${old} is now ${username}` });
      } else if (data.type === 'message') {
        const msg = {
          type: 'message',
          from: username,
          text: data.text,
          ts: Date.now()
        };
        broadcast(msg);
      } else if (data.type === 'ping') {
        ws.send(JSON.stringify({ type: 'pong' }));
      }
    } catch (e) {
      console.error('Invalid message', e);
    }
  });

  ws.on('close', () => {
    const name = clients.get(ws) || 'Unknown';
    clients.delete(ws);
    broadcast({ type: 'system', text: `${name} disconnected` });
  });
});

server.listen(PORT, () => {
  console.log(`HTTP+WS server listening on port ${PORT}`);
  console.log(`Client served at http://localhost:${PORT}${BASE_PATH}/`);
  console.log(`WebSocket path: ws(s)://<host>:${PORT}${BASE_PATH}/ws`);
});

