var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(3000);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

var count = 0;

io.sockets.on('connection', function (socket) {

  socket.broadcast.emit('the count is', count);

  socket.on('what is the count', function () {
    socket.emit('the count is', count);
  });

  setInterval(function(){
    socket.emit('the count is', count);
  }, 200);
});

setInterval(function(){
  count = count + 1;
}, 1000);
