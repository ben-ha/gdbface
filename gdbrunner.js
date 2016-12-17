"use strict"

const spawn = require('child_process').spawn;

const GDB_PROMPT = "(gdb) \n";
const EventEmitter = require("events");

class GDBCommand
{
    constructor(command, args, callback)
    {
	this._command = command;
	this._args = args;
	this._callback = callback;
    }

    GetCallback()
    {
	return this._callback;
    }
}

class GDBRunner
{
    constructor(path, args)
    {
	this._path = path;
	this._args = args;
	this._current_output = "";
	this._event_emitter = new EventEmitter();
	this._event_emitter.on('finished_command', this.OnFinishedCommand.bind(this));
	this._event_emitter.on('command_available', this.OnCommandAvailable.bind(this));
	this._commands = [];
    }

    Run()
    {
	this._process = spawn("gdb", ["-i=mi", this._path]);
	//this._process.stdin.write("-exec-arguments " + this._args + "\r\n");

	this._process.stdout.on("data", this.ReadOutput.bind(this));
    }

    RunCommand(command, args, callback)
    {
	this._commands.push(new GDBCommand(command, args, callback));
    }
    
    ReadOutput(data)
    {
	let raise_event = false;
	data = data.toString();
	if (this.IsCommandFinished(data))
	{
	    data = this.FinalizeCommand(data);
	    raise_event = true;
	}
	
	this._current_output += data;
	if (raise_event)
	    this._event_emitter.emit('finished_command');
    }

    IsCommandFinished(data)
    {
	return data.endsWith(GDB_PROMPT);
    }

    FinalizeCommand(data)
    {
	if (data.endsWith(GDB_PROMPT))
	    return data.replace(GDB_PROMPT, "");

	return data;
    }

    OnFinishedCommand()
    {
	    console.log("CALLED!!!");
    }

    OnCommandAvailable()
    {

    }
};

module.exports = GDBRunner;
