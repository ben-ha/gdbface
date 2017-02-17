"use strict"

var GDBRunner = require('./gdbrunner.js');
var GDBOutputParser = require('./gdboutputparser.js');
var API = require('./API.js');
var fs = require("fs");
const EventEmitter = require("events");

class GDBEngine
{
    constructor(path, args)
    {
	this._gdb_runner = new GDBRunner(path);
	this._gdb_parser = new GDBOutputParser.GDBOutputParser();
	this._args = args;
	this._ready = false;
	this._api = new API();
	this.events = new EventEmitter();

	this._SetupBindings();
    }

    _SetupBindings()
    {
	this._api.BindAPI(API.actions.GET_BREAKPOINTS, this.GetBreakpointInfo.bind(this));

	this._api.BindAPI(API.actions.RUN_DEBUGEE, this.Run.bind(this));
	this._api.BindAPI(API.actions.BREAK_DEBUGEE, this.Break.bind(this));
	this._api.BindAPI(API.actions.STEP_INTO, this.StepInto.bind(this));
	this._api.BindAPI(API.actions.STEP_OVER, this.StepOver.bind(this));
	this._api.BindAPI(API.actions.RESUME_DEBUGEE, this.ResumeDebugee.bind(this));
	this._api.BindAPI(API.actions.ADD_BREAKPOINT_FUNCNAME, this.AddBreakpointByFuncName.bind(this));
	this._api.BindAPI(API.actions.ADD_BREAKPOINT_SOURCE, this.AddBreakpointBySource.bind(this));
	this._api.BindAPI(API.actions.DISABLE_BREAKPOINT, this.DisableBreakpoint.bind(this));
	this._api.BindAPI(API.actions.ENABLE_BREAKPOINT, this.EnableBreakpoint.bind(this));
	this._api.BindAPI(API.actions.GET_SOURCE_FILE, this.GetSourceFile.bind(this));
	this._api.BindAPI(API.actions.GET_SOURCES_LIST, this.GetSourcesList.bind(this));
	this._api.BindAPI(API.actions.REMOVE_BREAKPOINT, this.RemoveBreakpoint.bind(this));
	this._api.BindAPI(API.actions.SEND_CONSOLE_PROGRAM_INPUT, this.SendConsoleInput.bind(this));
	this._api.BindAPI(API.actions.GET_LOCAL_VARIABLES, this.GetLocalVariables.bind(this));
	this._api.BindAPI(API.actions.SET_VARIABLE, this.SetVariable.bind(this));
	this._api.BindAPI(API.actions.GET_STACK_TRACE, this.GetStackTrace.bind(this));
	this._api.BindAPI(API.actions.EVALUATE_EXPRESSION, this.EvaluateExpression.bind(this));
	this._api.BindAPI(API.actions.GET_MEMORY_CHUNK, this.GetMemoryChunk.bind(this));
	this._api.BindAPI(API.actions.SET_MEMORY_CHUNK, this.SetMemoryChunk.bind(this));
    }

    Start()
    {
	this._gdb_runner.Run(this._AsyncCallback.bind(this));
	this._SetupParameters();
    }

    ProcessRequest(request)
    { 
	return this._api.HandleRequest(request);
    }
    
    _AsyncCallback(obj)
    {
	if (!this._ready)
	{
	    this._ready = true;
	    this.events.emit("ready");
	}

	this.events.emit("response", obj);
    }
    
    _SetupParameters()
    {
	this._gdb_runner.RunCommand("-exec-arguments", this._args);
    }

    _ParseRawOutput(output)
    {
	return this._gdb_parser.Parse(output);
    }
    
    _SendCommand(command, args)
    {
	this._gdb_runner.RunCommand(command, args);
    }

    SendConsoleInput(command)
    {
	console.log("HERE!");
	this._gdb_runner.SendConsoleInput(command);
    }

    AddBreakpointBySource(source_info)
    {
	let command = "-break-insert";
	let args = source_info['filename'] + ":" + source_info['line'];

	this._SendCommand(command, args);
    }

    AddBreakpointByFuncName(func)
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

    RemoveBreakpoint(num)
    {
	let command = "-break-delete";
	let args = num;

	this._SendCommand(command, args);
    }

    GetBreakpointInfo()
    {
	let command = "-break-list";

	this._SendCommand(command, "");
    }

    GetLocalVariables()
    {
	let command = "-stack-list-locals";

	this._SendCommand(command, "1");
    }
    
    GetRegisters()
    {
	let cmd1 = "-data-list-register-names";
	this._SendCommand(cmd1, "");

	let cmd2 = "-data-list-register-values";
	this._SendCommand(cmd2, "");
    }

    StepInto()
    {
	let cmd = "-exec-step";

	this._SendCommand(cmd, "");
    }

    StepOver()
    {
	let cmd = "-exec-until";

	this._SendCommand(cmd, "");
    }

    ResumeDebugee()
    {
	let cmd = "-exec-continue";

	this._SendCommand(cmd, "");
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

    DisableBreakpoint(bpnum)
    {
	let command = "-break-disable";
	this._SendCommand(command, bpnum);
    }

    EnableBreakpoint(bpnum)
    {
	let command = "-break-enable";
	this._SendCommand(command, bpnum);
    }

    SetVariable(v)
    {
	let command= "-gdb-set var";

	this._SendCommand(command, v.name + "=" + v.value);
    }

    // For now, this is the only command that uses numeric prefixes.
    EvaluateExpression(expr)
    {
	let command=expr.id + "-data-evaluate-expression";

	this._SendCommand(command, expr.data);
    }

    GetSourceFile(filename)
    {
	fs.readFile(filename, (err, data) =>
		    {
			if (err)
			{
			    this._SerializeGDBEngineError(err);
			    return;
			}
			
			this._AsyncCallback(this._SerializeGDBEngineResult({source : {"filename" : filename, "data" : data.toString()}}));
		    });
    }

    GetSourcesList()
    {
	let command = "-file-list-exec-source-files";
	this._SendCommand(command, "");
    }

    GetStackTrace()
    {
	let command = "-stack-list-frames";
	this._SendCommand(command, "");
    }

    GetMemoryChunk(obj)
    {
	let command = "-data-read-memory-bytes";
	this._SendCommand(command, "(" + obj.expr + ") " + obj.size);
    }

    SetMemoryChunk(obj)
    {
	let command="-data-write-memory-bytes";
	this._SendCommand(command, obj.address + " " + obj.contents);
    }
    
    _SerializeGDBEngineResult(obj)
    {
	return {Type:API.results.GDB_ENGINE_RESULT, Data:obj};
    }

    _SerializeGDBEngineError(obj)
    {
	return {Type:API.results.GDB_ENGINE_ERROR, Data:obj};
    }
}

module.exports = GDBEngine;
