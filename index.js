var app = require('express')();  
var server = require('http').Server(app);  
var io = require('socket.io')(server);

app.get('/', function(req, res) {  
    res.sendFile(__dirname + '/index.html');
    setTimeout(function(){
        io.on('connection', function(socket) {  
            socket.emit('announcements', { message: 'A new user has joined!' });
        });
    }, 5000);
    io.on(
        'connection',
        function(socket) {
            socket.on(
                'event',
                function(data){
                    console.log('What? Client now says ', data.message)
                }
            );
        }
    );
});

server.listen(8080);  