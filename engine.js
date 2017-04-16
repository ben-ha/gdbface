var express = require("express");
var path = require("path");
var GDBEngine = require("./gdbengine.js");
var io = require("socket.io");

module.exports = {"run": run};

var client_contexts = [];

function run(params)
{
    var server = express();

    var app = require('express')();
    var server = require('http').Server(app);
    var io = require('socket.io')(server);
    

    app.use(express.static(path.join(__dirname, "client")));

    
    var gdb_engine = new GDBEngine(params);

    gdb_engine.events.on("response", function(res) {
	io.sockets.emit("response", res);
    });
			 
    gdb_engine.Start();

    io.on("connection", function (socket) {
	socket.on("api", function (msg) { gdb_engine.ProcessRequest(msg);});
	});
       
    
    server.listen(0, () => {
	console.log("Listening on: " + server.address().port);
	console.log("Fire up your favorite browser and connect");
});
}
