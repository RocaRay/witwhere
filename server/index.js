<<<<<<< HEAD
const express = require('express')
const app = express()
var expressWs = require ('express-ws')(app);

// app.use(function (req, res, next) {
//   console.log('middleware');
//   req.testing = 'testing';
//   return next();
// });
 
app.get('/', function(req, res, next){
  console.log('get route');
  res.end();
});
 
app.ws('/', function(ws, req) {
  ws.on('message', function(msg) {
    console.log(msg);
  });
  console.log('socket', req.testing);
=======
const express = require('express');
const app = express();
const WebSocket = require('ws');
const path = require('path')

// app.use(express.static('../build'))

const wss = new WebSocket.Server({ port: 8080 });

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
})

app.get('/', (req, res, next) => {
  // console.log('get route');
  res.sendFile(path.resolve(__dirname, '../index.html'));
>>>>>>> e7f3bec0b7dd13806e009f34ea583d95f729d21f
});

app.listen(3000, () => console.log("Listening on port 3k"))