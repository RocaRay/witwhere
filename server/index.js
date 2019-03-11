const express = require('express');
const app = express();
const WebSocket = require('ws');
const path = require('path')
const userController = require('./controllers/data/db')
const bodyParser = require('body-parser')
const socket = require('socket.io');
const server = app.listen(3000, () => console.log('listening on port 3000'))
const io = socket(server);

app.use(express.static('../build'))

const wss = new WebSocket.Server({ port: 8080 });

io.on('connection', (socket) => {
  console.log('socket.io connection made!')
})

wss.on('connection', (ws) => {
  ws.send('connected to WS server');
  try {
    ws.on('message', (message) => {
      console.log('received: %s', message);
      // broadcast message to all open clients
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message)
        }
      })
    })
  } catch(err) {
    console.log('Error: ', err)
  };
});

app.get('/build/bundle.js', (req, res) => {
  res.sendFile(path.resolve('build', 'bundle.js'))
});

app.get('/fonts/Commodore64.ttf', (req, res) => {
  res.sendFile(path.resolve('build/font', 'C64.ttf'))
});

app.get('/', (req, res, next) => {
  // console.log('get route');
  res.sendFile(path.resolve(__dirname, '../index.html'));
});

app.get('/api/signup', bodyParser.json(), userController.createUser)
app.get('/api/signin', bodyParser.json(), userController.signinUser)

app.listen(3000, () => console.log("Listening on port 3k"))
