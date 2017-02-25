import {uiproxyevents} from '../API.js';

var _uiproxy = null;

function InitUIProxy()
{
    _uiproxy = new UIProxy();
}

function GetUIProxy()
{
    if (_uiproxy == null)
	throw "UI Proxy not initialized!!!";

    return _uiproxy;
}

function RegisterUIProxyCallback(evt, callback)
{
    GetUIProxy().RegisterCallback(evt, callback);
}

class UIProxy
{
    constructor()
    {
	this._events = {};
    }

    RegisterCallback(evt, callback)
    {
	if (this._events[evt] == undefined)
	    this._events[evt] = [];

	this._events[evt].push(callback);
    }

    NotifyCallbacks(evt, obj)
    {
	if (this._events[evt] == undefined)
	    return;

	for (let i = 0; i < this._events[evt].length; ++i)
	    this._events[evt][i](obj);
    }
    
    OpenSourceFile(fullpath, filename)
    {
	let obj = {"fullpath" : fullpath, "caption" : filename};
	this.NotifyCallbacks(uiproxyevents.ON_OPEN_SOURCE_FILE, obj);
    }

    InvalidateMemory()
    {
	this.NotifyCallbacks(uiproxyevents.ON_INVALIDATE_MEMORY, null);
    }
}

module.exports.InitUIProxy = InitUIProxy;
module.exports.GetUIProxy = GetUIProxy;
module.exports.RegisterUIProxyCallback = RegisterUIProxyCallback;

