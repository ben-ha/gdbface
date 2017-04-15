#!/usr/bin/env node

var engine = require("./engine.js");

var params = {};

if (process.argv[2] == "-p")
{
	params["pid"] = parseInt(process.argv[3]);
}
else
{
	params["binpath"] = process.argv[2];
	params["args"] = process.argv.slice(3).join(" ");
}

engine.run(params);
