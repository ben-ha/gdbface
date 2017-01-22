import {RegisterDispatcherCallback} from './Dispatcher.js';
import {results} from '../API.js';

var _datastore = null;

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
		ProgramState: "Stopped",
		ProgramFrameInformation : {}, //When program is stopped, this contains the frame information
		ProgramContext: {},
		SourceList : [],
		Sources : {},
		GDBConsoleOutput : "",
		ProgramConsoleOutput:"",
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
	this._GetProgramStateData(data);
	this._GetProgramBreakpointInfo(data);
	this._GetProgramFrameInformation(data);
	this._GetSourceInformation(data);
	this._GetConsoleOutput(data);
	this._NotifyRegisteredModules();
    }

    _GetConsoleOutput(data)
    {
	if (data.Type == results.GDB_INFERIOR_OUTPUT)
	    this.Store.ProgramConsoleOutput += data.Data;
    }

    _GetProgramStateData(data)
    {
	if (data.Data == undefined)
	    return;
	
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
		console.log(data.Data.BreakpointTable["body"]);
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