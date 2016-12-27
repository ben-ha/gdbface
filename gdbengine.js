"use strict"

var GDBRunner = require('./gdbrunner.js');
var GDBOutputParser = require('./gdboutputparser.js');
const EventEmitter = require("events");

class GDBEngine
{
    constructor(path, args)
    {
	this._gdb_runner = new GDBRunner(path);
	this._gdb_parser = new GDBOutputParser.GDBOutputParser();
	this._args = args;
	this._ready = false;
	this.events = new EventEmitter();
    }

    Start()
    {
	this._gdb_runner.Run(this._AsyncCallback.bind(this));
	this._SetupParameters();
    }

    _AsyncCallback(obj)
    {
	if (!this._ready)
	{
	    this._ready = true;
	    this.events.emit("ready");
	}
	
	console.log(obj);
    }
    
    _SetupParameters()
    {
	this._gdb_runner.RunCommand("-exec-arguments", this._args);
    }

    _ParseRawOutput(output)
    {
	return this._gdb_parser.Parse(output);
    }
    
    _SendCommand(command, args, callback)
    {
	this._gdb_runner.RunCommand(command, args);
    }

    AddBreakpointBySource(filename, line, callback)
    {
	let command = "-break-insert";
	let args = filename + ":" + line;

	this._SendCommand(command, args);
    }

    AddBreakpointByFuncName(func, callback)
    {
	let command = "-break-insert";
	let args = func;

	this._SendCommand(command, args);
    }

    AddBreakpointByAddress(address)
    {
	let command = "-break-insert";
	let args = "*" + address;

	this._SendCommand(command, args);
    }

    Run()
    {
	let command = "-exec-run";
	this._SendCommand(command, "");
    }

    Break()
    {
	this._gdb_runner.Break();
    }
};

module.exports = GDBEngine;
