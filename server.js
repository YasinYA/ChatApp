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
    console.log('Connected');
    socket.emit('welcome', {sender: "Greater", msg: "Welcome to the chat"});
    socket.on('save', function(data){
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
        socket.emit('allMessages', msg);
      });
    });
    // i don't know why i need two event for send messages
    socket.on('allMessages', function(msgs) {
      Messages.getMessages(function(err, data) {
        if(err) {
          throw err;
        }
        console.log('Done!');
        msgs = data;
      });
    });

    Messages.getMessages(function(err, data) {
      if(err) {
        throw err;
      }
      console.log('Done!');
      socket.emit('msgs', data);
    });
});
