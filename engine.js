var express = require("express")
var config = require("./config.js")
var path = require("path")
var GDBEngine = require("./gdbengine.js");

module.exports = {"run": run};

var client_contexts = [];

function run(port, app, args)
{
    var server = express();

    server.use(express.static(path.join(__dirname, 'static')));
    var gdb_engine = new GDBEngine(app, args);
    gdb_engine.Run();
    console.log("After run");
    server.listen(port);
}
