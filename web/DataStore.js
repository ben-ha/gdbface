import {RegisterDispatcherCallback} from './Dispatcher.js';
import {results} from '../API.js';

var _datastore = null;
const MAX_CONSOLE_OUTPUT = 1024;

function InitDataStore(dispatcher)
{
    _datastore = new DataStore();
    RegisterDispatcherCallback(_datastore._OnDataAvailable.bind(_datastore));
}

function GetDataStore()
{
    if (_datastore == null)
	throw "Datastore is not initialized!!!";

    return _datastore;
}

function RegisterDataStoreCallback(callback)
{
    GetDataStore().RegisterCallback(callback);
}

function UnregisterDataStoreCallback(callback)
{
    GetDataStore().UnregisterCallback(callback);
}

class DataStore
{
    constructor()
    {
	this.Store =
	    {
		Breakpoints : [],
		PID: -1,
		ProgramState: "NotStarted",
		ProgramFrameInformation : {}, //When program is stopped, this contains the frame information
		ProgramContext: {},
		SourceList : [],
		Sources : {},
		GDBConsoleOutput : "",
		ProgramConsoleOutput:"",
		LocalVariables : [],
		StackTrace : [],
		Watches : {},
		HexView : {Address : null, Hash: "", Memory:"", Changed : false},
	    };

	this._callbacks = [];
    }

    RegisterCallback(callback)
    {
	this._callbacks.push(callback);
    }

    UnregisterCallback(callback)
    {
	let index = this._callbacks.indexOf(callback);

	if (index == -1)
	    return;
	
	this._callbacks.splice(index, 1)
    }

    _OnDataAvailable(data)
    {
	console.log(data);

	if (data == null)
		return;

	this._GetProgramStateData(data);
	this._GetProgramBreakpointInfo(data);
	this._GetProgramFrameInformation(data);
	this._GetSourceInformation(data);
	this._GetConsoleOutput(data);
	this._GetLocalVariables(data);
	this._GetStackTraceInformation(data);
	this._GetWatchInformation(data);
	this._GetHexViewInformation(data);
	this._NotifyRegisteredModules();
    }

    _GetHexViewInformation(data)
    {
	this.Store.HexView.Changed = false;
	
	if (data.Data == undefined)
	    return;

	if (data.Data.memory == undefined && data.Data.memoryHash == undefined)
	    return;

	this.Store.HexView.Changed = true;
	this.Store.HexView.Address = parseInt(data.Data.memory[0].begin, 16);

	if (data.Data.memory != undefined)
	{
	    this.Store.HexView.Memory = data.Data.memory[0].contents;
	}

	if (data.Data.memoryHash != undefined)
	{
	    this.Store.HexView.Changed = data.Data.memoryHash != this.Store.HexView.Hash;
	    this.Store.HexView.Hash = data.Data.memoryHash;
	}
    }

    _GetConsoleOutput(data)
    {
	if (data.Type == results.GDB_INFERIOR_OUTPUT)
	    this.Store.ProgramConsoleOutput += data.Data;
    	
	if (this.Store.ProgramConsoleOutput > MAX_CONSOLE_OUTPUT)
		this.Store.ProgramConsoleOutput = this.Store.ProgramConsoleOutput.substr(-MAX_CONSOLE_OUTPUT);
    }

    _GetStackTraceInformation(data)
    {
	if (data.Data == undefined)
	    return;
	
	if (data.Data.stack == undefined)
	    return;

	this.Store.StackTrace = data.Data.stack;
    }

    _GetLocalVariables(data)
    {
	if (data.Data == undefined)
	    return;

	if (data.Data.locals == undefined)
	    return;

	this.Store.LocalVariables = data.Data.locals;
    }
    
    _GetProgramStateData(data)
    {
	if (data == null)
		return;

	if (data.Data == undefined)
	    return;

	if (data.Data.ProgramState != undefined)
		this.Store.ProgramState = data.Data.ProgramState;

	if (data.Data.running != undefined)
	    this.Store.ProgramState = "Running";

	if (data.Data.stopped != undefined)
	    this.Store.ProgramState = "Stopped";
	
	if (data.Data["thread-group-started"] != undefined)
	    this.Store.PID = data.Data["thread-group-started"].pid;
    }

    _GetProgramBreakpointInfo(data)
    {
	if (data.Data == undefined)
	    return;
	
	if (data.Data.bkpt != undefined)
	    this.Store.Breakpoints.push(data.Data.bkpt);

	if (data.Data.BreakpointTable != undefined)
	{
	    this.Store.Breakpoints = [];
	    for (let i = 0; i < data.Data.BreakpointTable["body"].length; ++i)
	    {
		this.Store.Breakpoints.push(data.Data.BreakpointTable["body"][i]);
	    }
	}
    }

    _GetProgramFrameInformation(data)
    {
	if (data.Data == undefined)
	    return;
	
	// Get information from stopped object
	if (data.Data.stopped != undefined)
	{
	    if (data.Data.stopped.frame != undefined)
		this.Store.ProgramFrameInformation = data.Data.stopped.frame;
	}
    }

    _GetSourceInformation(data)
    {
	if (data.Data == undefined)
	    return;
	
	if (data.Data.source != undefined)
	    this.Store.Sources[data.Data.source.filename] = data.Data.source.data;
	if (data.Data.files != undefined)
	    this.Store.SourceList = data.Data.files;
    }

    _GetWatchInformation(data)
    {
	if (data.Data.WatchID == "" || data.Data.WatchID == undefined)
	    return;
	
	this.Store.Watches[data.Data.WatchID] = data.Data.value;
    }

    _NotifyRegisteredModules()
    {
	for (let i = 0; i < this._callbacks.length; ++i)
	    this._callbacks[i](this.Store);
    }
}

module.exports.InitDataStore = InitDataStore;
module.exports.GetDataStore = GetDataStore;
module.exports.RegisterDataStoreCallback = RegisterDataStoreCallback;
module.exports.UnregisterDataStoreCallback = UnregisterDataStoreCallback;
