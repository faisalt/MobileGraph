/*
* The node server handles client connections and message 
* broadcasting (i.e. pushing messages to connected clients)
*
* @author Faisal T.
*/

var port=3000;

var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    fs = require('fs')

//Listen on specified port
app.listen(port);

function handler(req, res) {
    fs.readFile('index.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }
            res.writeHead(200);
            res.end(data);
        });
}

/*
* On client connection, handle events
*/
io.sockets.on('connection', function (socket) {
	console.log("A client has been connected successfully");
    //Listen for messages from mobile graph clip controller (control panel)
    socket.on("clientMsg", function (data) {
		console.log("Client has sent a message");
        //Send the data to the bar chart interface
        socket.broadcast.emit("serverMsg", data);
    });
	socket.on("requestingAllBlack", function (data) {
		console.log("Client has requested to set all pixels to black");
        //Send the data to the bar chart interface
        socket.broadcast.emit("calibrationRequest", data);
    });
	socket.on("requestingAllWhite", function (data) {
		console.log("Client has requested to set all pixels to white");
        //Send the data to the bar chart interface
        socket.broadcast.emit("calibrationRequest", data);
    });
	//Listen for test message to check connectivity to server/client from controller
	socket.on("clientTestMsg", function(data) {
		console.log("Client has sent a test message");
		//Pass message to the bar chart interface
		socket.broadcast.emit("serverTestMsg", data);
	});
    socket.on("sender", function (data) {
        socket.emit("sender", data);
        socket.broadcast.emit("sender", data);
    });
});