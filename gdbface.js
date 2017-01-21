#!/usr/bin/nodejs

var engine = require("./engine.js");

var port = 5555;

engine.run(port, "/root/a.out", "");

//const spawn = require('child_process').spawn;

//spawn("firefox", ["http://127.0.0.1:" + port], {"detached" : true});
