"use strict"

// TODO: Support program output

const spawn = require('child_process').spawn;
const util = require('util');
const process = require('process');
const pty = require('pty.js');
const tty = require('tty');
const API = require('./API.js');
const GDBOutputParser = require('./gdboutputparser.js');
const GDB_PROMPT = "(gdb) ";
const EventEmitter = require("events");

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
    
    RunCommand(command, args)
    {
	this._process.stdin.write(util.format("%s %s\r\n", command, args));
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

    OnProgramConsoleOutput(data)
    {
	this._output_callback(new GDBOutputParser.GDBOutput(API.results.GDB_INFERIOR_OUTPUT, data.toString())); 
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
