"use strict"

const spawn = require('child_process').spawn;
const util = require('util');
const process = require('process');
const pty = require('pty.js');
const tty = require('tty');
const API = require('./API.js');
const GDBOutputParser = require('./gdboutputparser.js');
const GDB_PROMPT = "(gdb) ";
const EventEmitter = require("events");

class GDBCommandDescriptor
{
    constructor(id, filter_callback)
    {
	this.ID = id;
	this.Filter = filter_callback;
    }
}

class GDBRunner
{
    constructor(path, args)
    {
	this._path = path;
	this._current_output = "";
	this._event_emitter = new EventEmitter();
	this._gdb_parser = new GDBOutputParser.GDBOutputParser();
	this._saved_data = "";
	this._pty = null;
	this._pid =-1;
	this._command_id = 0;
	this._command_descriptors = {};
    }

    Run(output_callback)
    {
	this._AllocatePTYForProgramConsole();
	
	this._output_callback = output_callback;
	this._process = spawn("gdb", ["-i=mi", "-tty=" + this._pty.pty, this._path]);
	this._process.stdout.on("data", this.ReadOutput.bind(this));
    }

    SendConsoleInput(command)
    {
	this._pty.master.write(command);
    }
    
    RunCommand(command, args, filter_callback)
    {
	let cmd_descriptor = new GDBCommandDescriptor(this._command_id, filter_callback)
	this._command_descriptors[this._command_id] = cmd_descriptor;
	this._process.stdin.write(util.format("%d%s %s\r\n", this._command_id, command, args));
	this._command_id++;
    }

    _AllocatePTYForProgramConsole()
    {
	this._pty = pty.Terminal.open(80, 25);
	this._pty.master.on("data", this.OnProgramConsoleOutput.bind(this));
    }

    _ProcessGDBOutput(gdb_output)
    {
	if (gdb_output == undefined)
	    return;
	
	if (gdb_output.Data != null)
	{
	    if(gdb_output.Data['thread-group-started'] != undefined)
	    {
		this._pid = gdb_output.Data['thread-group-started']['pid'];
	    }
	}
    }

    _CallCommandFilter(gdb_output)
    {
	if (gdb_output == undefined)
	    return;

	if (gdb_output.Type != API.results.GDB_RESULT_RECORD)
		return;

	if (this._command_descriptors[gdb_output.ID] != undefined)
	{
	    let callback = this._command_descriptors[gdb_output.ID].Filter;

	    if (callback != undefined && callback != null)
			callback(gdb_output)
	}
    }

    OnProgramConsoleOutput(data)
    {
	this._output_callback(new GDBOutputParser.GDBOutput(API.results.GDB_INFERIOR_OUTPUT, "", data.toString())); 
    }
    
    ReadOutput(data)
    {
	this._saved_data += data;

	while (this._saved_data.indexOf("\n") != -1) //new line!
	{
	    let line = this._saved_data.substr(0, this._saved_data.indexOf("\n"));
	    if (line != GDB_PROMPT)
	    {
		let output = this._gdb_parser.Parse(line);
		this._ProcessGDBOutput(output);
		this._CallCommandFilter(output);
		this._output_callback(output);
	    }

	    this._saved_data = this._saved_data.substr(this._saved_data.indexOf("\n") + 1);
	}

	if (!this._gdb_parser.IsGDBCommand(this._saved_data))
	{
	    // Must be inferior output. Parse it.
	    this._output_callback(this._gdb_parser.Parse(this._saved_data));
	    this._saved_data = "";
	}
    }

    Break()
    {
	if (this._pid == -1)
	{
	    return;
	}
	
	process.kill(this._pid, "SIGINT");
    }
};

module.exports = GDBRunner;
