"use strict"

const spawn = require('child_process').spawn;
const util = require('util');

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

    GetCommand()
    {
	return this._command;
    }

    GetArgs()
    {
	return this._args;
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
	this._current_output = "";
	this._event_emitter = new EventEmitter();
	this._event_emitter.on('finished_command', this.OnFinishedCommand.bind(this));
	this._event_emitter.on('command_available', this.OnCommandAvailable.bind(this));
	this._commands = [];
	this._running = false;
    }

    Run()
    {
	this._process = spawn("gdb", ["-i=mi", this._path]);
	this._SetStateForInitialOutput();
	this._process.stdout.on("data", this.ReadOutput.bind(this));
    }
    
    RunCommand(command, args, callback)
    {
	this._commands.push(new GDBCommand(command, args, callback));
	this.CheckCommandAvailable();
    }

    // This is required so we consume all the garbage gdb throws at us when started
    _SetStateForInitialOutput()
    {
	this._running = true;
	this._commands.push(new GDBCommand("", "", undefined));
    }

    ReadOutput(data)
    {
	//TODO: Check if in running command mode to support async records output from gdb
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
	let current_command = this._commands.shift();
	if (current_command != undefined)
	{
	    let callback = current_command.GetCallback();

	    if (callback != undefined)
	    {
		//TODO: maybe setTimeout here?
		callback(this._current_output);
	    }
	}
	this._running = false;

	this.CheckCommandAvailable();
    }

    OnCommandAvailable()
    {
	if (this._running)
	    return;

	this.SendNextCommand();
    }

    CheckCommandAvailable()
    {
	if (this._commands.length > 0)
	    this._event_emitter.emit('command_available');
    }

    SendNextCommand()
    {
	const current_command = this._commands[0];
	this._running = true;
	this._current_output = "";

	this._process.stdin.write(util.format("%s %s\r\n", current_command.GetCommand(), current_command.GetArgs())); 
    }
};

module.exports = GDBRunner;