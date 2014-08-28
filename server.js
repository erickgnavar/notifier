var express = require('express');
var http = require('http');
var bodyParser = require('body-parser')
var app = express();
var server = http.createServer(app);

var io = require('socket.io').listen(server);


app.use(bodyParser.json());
app.use(express.static(__dirname + '/public/'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/home.html');
});

app.post('/save/', function (req, res) {
    var notification = req.body;
    notification.date = new Date();
    io.sockets.emit('notification', notification);
    res.status(201).send({
        status: 'OK'
    });
});
server.listen(3000);
