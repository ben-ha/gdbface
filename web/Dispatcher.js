import io from 'socket.io-client';

var _dispatcher = null;

function InitDispatcher(server_location)
{
	_dispatcher = new Dispatcher(server_location);
}

function GetDispatcher()
{
	if (_dispatcher == null)
	{
		throw "Dispatcher not initialized!!!";
	}

	return _dispatcher;
}

function RegisterDispatcherCallback(callback)
{
	let dispatcher = GetDispatcher();

	dispatcher.RegisterCallback(callback);
}

class Dispatcher
{
	constructor()
	{
		this.sock = io();		
	}

	RegisterCallback(callback)
	{
		this.sock.on("response", callback);
	}

	SendAction(msg)
	{
		this.sock.emit("api", msg);
	}
}

module.exports.InitDispatcher = InitDispatcher;
module.exports.GetDispatcher = GetDispatcher;
module.exports.RegisterDispatcherCallback = RegisterDispatcherCallback;
