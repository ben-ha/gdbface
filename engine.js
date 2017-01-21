var express = require("express");
var config = require("./config.js");
var path = require("path");
var GDBEngine = require("./gdbengine.js");
var io = require("socket.io");

module.exports = {"run": run};

var client_contexts = [];

function run(port, binpath, args)
{
    console.log("STARTING!");
    var server = express();

    var app = require('express')();
    var server = require('http').Server(app);
    var io = require('socket.io')(server);
    

    app.use(express.static(path.join(__dirname, "dist")));

    var gdb_engine = new GDBEngine(binpath, args);

    gdb_engine.events.on("response", function(res) {
	io.sockets.emit("response", res);
    });
			 
    gdb_engine.Start();
    console.log("After run");

    io.on("connection", function (socket) {
	socket.on("api", function (msg) { gdb_engine.ProcessRequest(msg);});
	});
       
    
    server.listen(port);
}
