"use strict"

var GDBRunner = require('./gdbrunner.js');


class GDBEngine
{
    constructor(path, args)
    {
	this._gdb_runner = new GDBRunner(path, args);
    }

    Run()
    {
	this._gdb_runner.Run();
    }

    SendCommand(command, args, callback)
    {

    }
};

module.exports = GDBEngine;
