"use strict";

process.title = 'node-chat';
var webSocketsServerPort = 8080;
var webSocketServer = require('websocket').server;
var http = require('http');


var clients = [ ];

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;')
                      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}




var server = http.createServer(function(request, response) {
    
});
server.listen(webSocketsServerPort, function() {
    console.log((new Date()) + " Server is listening on port " + webSocketsServerPort);
});


var wsServer = new webSocketServer({
    httpServer: server
});

wsServer.on('request', function(request) {
    console.log((new Date()) + ' Connection from origin ' + request.origin + '.');
    var connection = request.accept(null, request.origin); 
    var index = clients.push(connection) - 1;
    var userName = false;
    var userColor = false;

    console.log((new Date()) + ' Connection accepted.');

    connection.on('message', function(message) {
        if (message.type === 'utf8') {
                console.log((new Date()) + ' Received Message  '
                             + ': ' + message.utf8Data);
                
                var obj = {
                    time: (new Date()).getTime(),
                    text: htmlEntities(message.utf8Data)

                   
                };
                history.push(obj);
                history = history.slice(-100);

                // broadcast message to all connected clients
                var json = JSON.stringify({ type:'message', data: obj });
                for (var i=0; i < clients.length; i++) {
                    clients[i].sendUTF(json);
                }
        
        }
    });

    // user disconnected
    connection.on('close', function(connection) {
    
            console.log((new Date()) + " Peer "
                + connection.remoteAddress + " disconnected.");
            // remove user from the list of connected clients
            clients.splice(index, 1);
           
    });

});