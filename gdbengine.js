"use strict"

var GDBRunner = require('./gdbrunner.js');
const EventEmitter = require("events");

class GDBEngine
{
    constructor(path, args)
    {
	this._gdb_runner = new GDBRunner(path);
	this._args = args;
	this._ready = false;
	this.events = new EventEmitter();
    }

    Run(ready_callback)
    {
	this._gdb_runner.Run();
	this._SetupParameters();
    }

    _SetupParameters()
    {
	this._SendCommand("-exec-arguments", this._args, (output) =>
		    {
			this._ready = true;
			this.events.emit("ready");
		    });
    }

    _ParseRawOutput(output)
    {
	let matched = output.match(/([\^*~@&\+=])([a-z]+),(.*)/)
	let rescode = matched[1];
	let restext = matched[2];
	let result = matched[3];

	
    }
    
    _SendCommand(command, args, callback)
    {
	this._gdb_runner.RunCommand(command, args, callback);
    }

    
};

module.exports = GDBEngine;
