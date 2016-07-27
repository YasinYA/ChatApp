var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);
var api = require('./api.js');

var Messages = require('./models/messages.js');

app.use(express.static(__dirname + '/client/'));
app.use('/api/', api);
app.get("*", function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});
server.listen(3000);
console.log('Server is running on port 3000');


io.on('connection', function(socket) {
    socket.emit('welcome', {sender: "Greater", msg: "Welcome to the chat"});
    socket.on('chat', function(data){
      var chatData = {
          name : data.name,
          userId : data.userId,
          message : data.message
      };

      Messages.saveMessages(chatData, function(err, msg) {
          if(err) {
              throw err;
          }
          console.log('Done!');
      });
      socket.emit('message', {data: 'Done!'});
    });
});