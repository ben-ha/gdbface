#!/usr/bin/nodejs
var GDBEngine = require('./gdbengine.js');

var engine = new GDBEngine("/home/shoshan/a.out");

engine.events.on("ready", () => {
    //engine.Run((output) => {console.log(output)});
    engine.Run();
    setTimeout(engine.Break.bind(engine), 6000);
});

engine.Start();

/*
var engine = require("./engine.js");

var port = 5555;

engine.run(port, "/home/shoshan/a.out");
*/
//const spawn = require('child_process').spawn;

//spawn("firefox", ["http://127.0.0.1:" + port], {"detached" : true});
