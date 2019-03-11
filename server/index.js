const express = require('express');
const app = express();
const path = require('path')
const http = require('http').Server(app);
const userController = require('./controllers/data/db')
const bodyParser = require('body-parser')
<<<<<<< HEAD
const socket = require('socket.io');
const server = app.listen(3000, () => console.log('listening on port 3000'))
const io = socket(server);
=======
const server = require('http').Server(app)
const io = require('socket.io')(server)

server.listen(8000, () => console.log('listening on 8000'));
>>>>>>> 6d4cd3ca99ccd4ac05cd6e0129dedbb722991686

app.use(express.static('../build'))

<<<<<<< HEAD
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
=======
io.on('connection', (client) => {
  client.emit('news', client.id);
  console.log("new client connected: ", client.id)
  client.on('my other event', function (data) {
    console.log(data);
  });
})
>>>>>>> 6d4cd3ca99ccd4ac05cd6e0129dedbb722991686

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

<<<<<<< HEAD
app.get('/api/signup', bodyParser.json(), userController.createUser)
app.get('/api/signin', bodyParser.json(), userController.signinUser)

app.listen(3000, () => console.log("Listening on port 3k"))
=======
app.get('/socket', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../socket.html'))
})

app.post(
          '/api/signin', 
          bodyParser.json(), 
          userController.signinUser
          )

app.post(
          '/api/signup', 
          bodyParser.json(), 
          userController.signinUser
          )
>>>>>>> 6d4cd3ca99ccd4ac05cd6e0129dedbb722991686
